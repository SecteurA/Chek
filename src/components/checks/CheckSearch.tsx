import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export interface SearchFilters {
  dateFrom: string;
  dateTo: string;
  amountMin: string;
  amountMax: string;
  status: string;
  issuer: string;
  checkNumber: string;
}

interface CheckSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
}

const initialFilters: SearchFilters = {
  dateFrom: '',
  dateTo: '',
  amountMin: '',
  amountMax: '',
  status: '',
  issuer: '',
  checkNumber: '',
};

export function CheckSearch({ onSearch, onReset }: CheckSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onReset();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="p-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full md:w-auto"
        >
          <Search className="h-4 w-4 mr-2" />
          Recherche avancée
        </Button>

        {isExpanded && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="N° Chèque"
                name="checkNumber"
                value={filters.checkNumber}
                onChange={handleInputChange}
                placeholder="Numéro du chèque"
              />
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Statut
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="">Tous les statuts</option>
                  <option value="Reçu">Reçu</option>
                  <option value="Déposé">Déposé</option>
                  <option value="Payé">Payé</option>
                  <option value="Rejeté">Rejeté</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </div>

              <Input
                label="Émetteur"
                name="issuer"
                value={filters.issuer}
                onChange={handleInputChange}
                placeholder="Nom de l'émetteur"
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Date du
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Date au
                </label>
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Montant min"
                  name="amountMin"
                  type="number"
                  value={filters.amountMin}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
                <Input
                  label="Montant max"
                  name="amountMax"
                  type="number"
                  value={filters.amountMax}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleReset}>
                <X className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}