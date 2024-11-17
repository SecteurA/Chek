import { format, isToday, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Building2, Pencil } from 'lucide-react';
import { Button } from '../ui/Button';
import { CheckForm } from '../checks/CheckForm';
import { LCRForm } from '../lcrs/LCRForm';
import { api } from '../../lib/api';

interface DueItem {
  id: string;
  type: 'check' | 'lcr';
  number: string;
  amount: number;
  dueDate: string;
  entity: string;
  status: string;
  issuerName?: string;
  beneficiaryName?: string;
  bankName?: string;
  notes?: string;
  issueDate?: string;
}

interface UpcomingItemsProps {
  items: DueItem[];
}

export function UpcomingItems({ items }: UpcomingItemsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState<DueItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const prepareFormData = (item: DueItem) => {
    const baseData = {
      amount: item.amount,
      issueDate: item.issueDate || format(new Date(), 'yyyy-MM-dd'),
      dueDate: item.dueDate,
      status: item.status,
      bankName: item.bankName || '',
      notes: item.notes || '',
    };

    if (item.type === 'check') {
      return {
        ...baseData,
        checkNumber: item.number,
        ...(item.issuerName ? { issuerName: item.issuerName } : { beneficiaryName: item.beneficiaryName })
      };
    } else {
      return {
        ...baseData,
        lcrNumber: item.number,
        ...(item.issuerName ? { issuerName: item.issuerName } : { beneficiaryName: item.beneficiaryName })
      };
    }
  };

  const handleEdit = async (formData: any) => {
    if (!editingItem) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const updateData = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      if (editingItem.type === 'check') {
        if ('issuerName' in editingItem) {
          await api.receivedChecks.update(editingItem.id, {
            check_number: formData.checkNumber,
            amount: updateData.amount,
            issue_date: formData.issueDate,
            due_date: formData.dueDate,
            status: formData.status,
            issuer_name: formData.issuerName,
            bank_name: formData.bankName,
            notes: formData.notes || null
          });
        } else {
          await api.issuedChecks.update(editingItem.id, {
            check_number: formData.checkNumber,
            amount: updateData.amount,
            issue_date: formData.issueDate,
            due_date: formData.dueDate,
            status: formData.status,
            beneficiary_name: formData.beneficiaryName,
            bank_name: formData.bankName,
            notes: formData.notes || null
          });
        }
      } else {
        if ('issuerName' in editingItem) {
          await api.receivedLCRs.update(editingItem.id, {
            lcr_number: formData.lcrNumber,
            amount: updateData.amount,
            issue_date: formData.issueDate,
            due_date: formData.dueDate,
            status: formData.status,
            issuer_name: formData.issuerName,
            bank_name: formData.bankName,
            notes: formData.notes || null
          });
        } else {
          await api.issuedLCRs.update(editingItem.id, {
            lcr_number: formData.lcrNumber,
            amount: updateData.amount,
            issue_date: formData.issueDate,
            due_date: formData.dueDate,
            status: formData.status,
            beneficiary_name: formData.beneficiaryName,
            bank_name: formData.bankName,
            notes: formData.notes || null
          });
        }
      }

      window.location.reload();
    } catch (err) {
      console.error('Error updating item:', err);
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
    const formData = prepareFormData(editingItem);
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Modifier {editingItem.type === 'check' ? 'le chèque' : 'le LCR'}
        </h2>
        {editingItem.type === 'check' ? (
          <CheckForm
            type={'issuerName' in editingItem ? 'received' : 'issued'}
            onSubmit={handleEdit}
            initialData={formData}
            isLoading={isLoading}
            onCancel={() => setEditingItem(null)}
          />
        ) : (
          <LCRForm
            type={'issuerName' in editingItem ? 'received' : 'issued'}
            onSubmit={handleEdit}
            initialData={formData}
            isLoading={isLoading}
            onCancel={() => setEditingItem(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Échéances de la semaine
        </h2>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                isToday(parseISO(item.dueDate))
                  ? 'bg-red-50 border-red-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  item.type === 'check' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <FileText className={`h-5 w-5 ${
                    item.type === 'check' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.type === 'check' ? 'Chèque' : 'LCR'} N° {item.number}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(parseISO(item.dueDate), 'dd MMMM yyyy', { locale: fr })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <p className="text-sm font-medium text-gray-900">
                      {item.entity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {item.amount.toLocaleString('fr-MA')} DH
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingItem(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
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
    </div>
  );
}