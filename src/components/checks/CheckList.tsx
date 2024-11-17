import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CheckForm } from './CheckForm';
import type { ReceivedCheck, IssuedCheck } from '../../types/check';

interface CheckListProps {
  checks: (ReceivedCheck | IssuedCheck)[];
  onEdit: (check: ReceivedCheck | IssuedCheck) => Promise<void>;
}

export function CheckList({ checks, onEdit }: CheckListProps) {
  const [editingCheck, setEditingCheck] = useState<ReceivedCheck | IssuedCheck | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      'Reçu': 'bg-blue-100 text-blue-800',
      'Émis': 'bg-blue-100 text-blue-800',
      'Déposé': 'bg-yellow-100 text-yellow-800',
      'Payé': 'bg-green-100 text-green-800',
      'Rejeté': 'bg-red-100 text-red-800',
      'Annulé': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getName = (check: ReceivedCheck | IssuedCheck) => {
    return 'issuerName' in check ? check.issuerName : check.beneficiaryName;
  };

  const handleSubmit = async (data: any) => {
    if (!editingCheck) return;
    
    setIsLoading(true);
    try {
      await onEdit({ ...editingCheck, ...data });
      setEditingCheck(null);
    } catch (error) {
      console.error('Error updating check:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (checks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun chèque à afficher</p>
      </div>
    );
  }

  if (editingCheck) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Modifier le chèque
        </h2>
        <CheckForm
          type={'issuerName' in editingCheck ? 'received' : 'issued'}
          onSubmit={handleSubmit}
          initialData={editingCheck}
          isLoading={isLoading}
          onCancel={() => setEditingCheck(null)}
        />
      </div>
    );
  }

  const checkType = 'issuerName' in checks[0] ? 'Émetteur' : 'Bénéficiaire';

  return (
    <div className="overflow-hidden">
      {/* Desktop view */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                N° Chèque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {checkType}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Échéance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {checks.map((check) => (
              <tr key={check.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {check.checkNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {check.amount.toLocaleString('fr-MA')} DH
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getName(check)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(check.dueDate), 'dd MMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(check.status)}`}>
                    {check.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setEditingCheck(check)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4 p-4">
        {checks.map((check) => (
          <div key={check.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  N° {check.checkNumber}
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {check.amount.toLocaleString('fr-MA')} DH
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(check.status)}`}>
                {check.status}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                <span className="font-medium">{checkType}:</span>{' '}
                {getName(check)}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Échéance:</span>{' '}
                {format(new Date(check.dueDate), 'dd MMM yyyy', { locale: fr })}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setEditingCheck(check)}
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}