import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CheckForm } from '../components/checks/CheckForm';
import { CheckList } from '../components/checks/CheckList';
import { CheckSearch, SearchFilters } from '../components/checks/CheckSearch';
import { Pagination } from '../components/checks/Pagination';
import { api } from '../lib/api';
import type { ReceivedCheck } from '../types/check';

export function ReceivedChecks() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [checks, setChecks] = useState<ReceivedCheck[]>([]);
  const [filteredChecks, setFilteredChecks] = useState<ReceivedCheck[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  useEffect(() => {
    loadChecks();
  }, []);

  const loadChecks = async () => {
    try {
      const data = await api.receivedChecks.list();
      setChecks(data);
      setFilteredChecks(data);
    } catch (err) {
      setError('Erreur lors du chargement des chèques');
      console.error(err);
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await api.receivedChecks.create(data);
      await loadChecks();
      setIsFormVisible(false);
    } catch (err) {
      setError('Erreur lors de la création du chèque');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (check: ReceivedCheck) => {
    setIsLoading(true);
    try {
      await api.receivedChecks.update(check.id, check);
      await loadChecks();
    } catch (err) {
      setError('Erreur lors de la modification du chèque');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...checks];

    if (filters.checkNumber) {
      filtered = filtered.filter(check => 
        check.checkNumber.toLowerCase().includes(filters.checkNumber.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(check => check.status === filters.status);
    }

    if (filters.issuer) {
      filtered = filtered.filter(check =>
        check.issuerName.toLowerCase().includes(filters.issuer.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(check => 
        new Date(check.dueDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(check => 
        new Date(check.dueDate) <= new Date(filters.dateTo)
      );
    }

    if (filters.amountMin) {
      filtered = filtered.filter(check => 
        check.amount >= parseFloat(filters.amountMin)
      );
    }

    if (filters.amountMax) {
      filtered = filtered.filter(check => 
        check.amount <= parseFloat(filters.amountMax)
      );
    }

    setFilteredChecks(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilteredChecks(checks);
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalItems = filteredChecks.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedChecks = filteredChecks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Chèques Reçus</h1>
        <Button onClick={() => setIsFormVisible(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau chèque
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {!isFormVisible && (
        <CheckSearch onSearch={handleSearch} onReset={handleReset} />
      )}

      {isFormVisible ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Ajouter un nouveau chèque
          </h2>
          <CheckForm 
            type="received"
            onSubmit={handleSubmit} 
            isLoading={isLoading}
            onCancel={() => setIsFormVisible(false)}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CheckList checks={paginatedChecks} onEdit={handleEdit} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}
    </div>
  );
}