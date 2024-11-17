import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { LCRForm } from './LCRForm';
import type { ReceivedLCR, IssuedLCR } from '../../types/lcr';

interface LCRListProps {
  lcrs: (ReceivedLCR | IssuedLCR)[];
  onEdit: (lcr: ReceivedLCR | IssuedLCR) => Promise<void>;
}

export function LCRList({ lcrs, onEdit }: LCRListProps) {
  const [editingLCR, setEditingLCR] = useState<ReceivedLCR | IssuedLCR | null>(null);
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

  const getName = (lcr: ReceivedLCR | IssuedLCR) => {
    return 'issuerName' in lcr ? lcr.issuerName : lcr.beneficiaryName;
  };

  const handleEdit = (lcr: ReceivedLCR | IssuedLCR) => {
    setEditingLCR(lcr);
  };

  const handleSubmit = async (data: any) => {
    if (!editingLCR) return;
    
    setIsLoading(true);
    try {
      await onEdit({ ...editingLCR, ...data });
      setEditingLCR(null);
    } catch (error) {
      console.error('Error updating LCR:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (lcrs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun LCR à afficher</p>
      </div>
    );
  }

  if (editingLCR) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Modifier le LCR
        </h2>
        <LCRForm
          type={'issuerName' in editingLCR ? 'received' : 'issued'}
          onSubmit={handleSubmit}
          initialData={editingLCR}
          isLoading={isLoading}
          onCancel={() => setEditingLCR(null)}
        />
      </div>
    );
  }

  const lcrType = 'issuerName' in lcrs[0] ? 'Émetteur' : 'Bénéficiaire';

  return (
    <div className="overflow-hidden">
      {/* Desktop view */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                N° LCR
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {lcrType}
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
            {lcrs.map((lcr) => (
              <tr key={lcr.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {lcr.lcrNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {lcr.amount.toLocaleString('fr-MA')} DH
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getName(lcr)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(lcr.dueDate), 'dd MMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lcr.status)}`}>
                    {lcr.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(lcr)}
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
        {lcrs.map((lcr) => (
          <div key={lcr.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  N° {lcr.lcrNumber}
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {lcr.amount.toLocaleString('fr-MA')} DH
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lcr.status)}`}>
                {lcr.status}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                <span className="font-medium">{lcrType}:</span>{' '}
                {getName(lcr)}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Échéance:</span>{' '}
                {format(new Date(lcr.dueDate), 'dd MMM yyyy', { locale: fr })}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleEdit(lcr)}
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