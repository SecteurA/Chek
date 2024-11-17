import { useState } from 'react';
import { format, isToday, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FileText, Building2, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/Button';
import { LCRForm } from '../../lcrs/LCRForm';
import { api } from '../../../lib/api';

interface UpcomingLCRsProps {
  items: any[];
  type: 'received' | 'issued';
}

export function UpcomingLCRs({ items, type }: UpcomingLCRsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    const colors = {
      'Reçu': 'bg-blue-100 text-blue-800 border-blue-200',
      'Émis': 'bg-blue-100 text-blue-800 border-blue-200',
      'Déposé': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Payé': 'bg-green-100 text-green-800 border-green-200',
      'Rejeté': 'bg-red-100 text-red-800 border-red-200',
      'Annulé': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleEdit = async (formData: any) => {
    if (!editingItem) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const updateData = {
        lcr_number: formData.lcrNumber,
        amount: parseFloat(formData.amount),
        issue_date: formData.issueDate,
        due_date: formData.dueDate,
        status: formData.status,
        bank_name: formData.bankName,
        notes: formData.notes || null,
        ...(type === 'received' 
          ? { issuer_name: formData.issuerName }
          : { beneficiary_name: formData.beneficiaryName }
        )
      };

      if (type === 'received') {
        await api.receivedLCRs.update(editingItem.id, updateData);
      } else {
        await api.issuedLCRs.update(editingItem.id, updateData);
      }

      window.location.reload();
    } catch (err) {
      console.error('Error updating LCR:', err);
      setError("Une erreur s'est produite lors de la mise à jour");
    } finally {
      setIsLoading(false);
      setEditingItem(null);
    }
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (editingItem) {
    const formData = {
      lcrNumber: editingItem.number,
      amount: editingItem.amount,
      issueDate: editingItem.issueDate,
      dueDate: editingItem.dueDate,
      status: editingItem.status,
      bankName: editingItem.bankName || '',
      notes: editingItem.notes || '',
      ...(type === 'received' 
        ? { issuerName: editingItem.issuerName }
        : { beneficiaryName: editingItem.beneficiaryName }
      )
    };

    return (
      <div className="bg-white rounded-lg">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Modifier le LCR
        </h2>
        <LCRForm
          type={type}
          onSubmit={handleEdit}
          initialData={formData}
          isLoading={isLoading}
          onCancel={() => setEditingItem(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {paginatedItems.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border ${
            isToday(parseISO(item.dueDate))
              ? 'bg-red-50 border-red-200'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex items-start space-x-4 mb-4 sm:mb-0">
            <div className="p-2 rounded-lg bg-green-100">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-900">
                  LCR N° {item.number}
                </p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {type === 'received' ? item.issuerName : item.beneficiaryName}
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-gray-500">
                  {format(parseISO(item.dueDate), 'dd MMMM yyyy', { locale: fr })}
                </p>
                <span className="text-sm font-medium text-gray-900">
                  {item.amount.toLocaleString('fr-MA')} DH
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingItem(item)}
            className="ml-auto"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Précédent
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}