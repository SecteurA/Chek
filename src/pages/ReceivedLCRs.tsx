import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { LCRForm } from '../components/lcrs/LCRForm';
import { LCRList } from '../components/lcrs/LCRList';
import { LCRSearch, SearchFilters } from '../components/lcrs/LCRSearch';
import { Pagination } from '../components/checks/Pagination';
import { api } from '../lib/api';
import type { ReceivedLCR } from '../types/lcr';

export function ReceivedLCRs() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [lcrs, setLCRs] = useState<ReceivedLCR[]>([]);
  const [filteredLCRs, setFilteredLCRs] = useState<ReceivedLCR[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  useEffect(() => {
    loadLCRs();
  }, []);

  const loadLCRs = async () => {
    try {
      const data = await api.receivedLCRs.list();
      setLCRs(data);
      setFilteredLCRs(data);
    } catch (err) {
      setError('Erreur lors du chargement des LCRs');
      console.error(err);
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await api.receivedLCRs.create(data);
      await loadLCRs();
      setIsFormVisible(false);
    } catch (err) {
      setError('Erreur lors de la création du LCR');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (lcr: ReceivedLCR) => {
    setIsLoading(true);
    try {
      await api.receivedLCRs.update(lcr.id, lcr);
      await loadLCRs();
    } catch (err) {
      setError('Erreur lors de la modification du LCR');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...lcrs];

    if (filters.lcrNumber) {
      filtered = filtered.filter(lcr => 
        lcr.lcrNumber.toLowerCase().includes(filters.lcrNumber.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(lcr => lcr.status === filters.status);
    }

    if (filters.issuer) {
      filtered = filtered.filter(lcr =>
        lcr.issuerName.toLowerCase().includes(filters.issuer.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(lcr => 
        new Date(lcr.dueDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(lcr => 
        new Date(lcr.dueDate) <= new Date(filters.dateTo)
      );
    }

    if (filters.amountMin) {
      filtered = filtered.filter(lcr => 
        lcr.amount >= parseFloat(filters.amountMin)
      );
    }

    if (filters.amountMax) {
      filtered = filtered.filter(lcr => 
        lcr.amount <= parseFloat(filters.amountMax)
      );
    }

    setFilteredLCRs(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilteredLCRs(lcrs);
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalItems = filteredLCRs.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedLCRs = filteredLCRs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">LCRs Reçus</h1>
        <Button onClick={() => setIsFormVisible(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau LCR
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {!isFormVisible && (
        <LCRSearch onSearch={handleSearch} onReset={handleReset} />
      )}

      {isFormVisible ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Ajouter un nouveau LCR
          </h2>
          <LCRForm 
            type="received"
            onSubmit={handleSubmit} 
            isLoading={isLoading}
            onCancel={() => setIsFormVisible(false)}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <LCRList lcrs={paginatedLCRs} onEdit={handleEdit} />
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