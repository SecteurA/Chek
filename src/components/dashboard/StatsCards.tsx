import { Wallet, ArrowDownCircle, Clock, AlertCircle } from 'lucide-react';

interface StatsCardsProps {
  totalAmount: number;
  totalReceived: number;
  totalPending: number;
  totalRejected: number;
}

const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString('fr-MA')} DH`;
};

export function StatsCards({ totalAmount, totalReceived, totalPending, totalRejected }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
            <Wallet className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-gray-600 truncate">Total</p>
            <p className="text-lg font-semibold text-gray-900 truncate">
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
            <ArrowDownCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-gray-600 truncate">Reçus</p>
            <p className="text-lg font-semibold text-gray-900 truncate">
              {formatCurrency(totalReceived)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-gray-600 truncate">En attente</p>
            <p className="text-lg font-semibold text-gray-900 truncate">
              {formatCurrency(totalPending)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2 bg-red-100 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-gray-600 truncate">Rejetés</p>
            <p className="text-lg font-semibold text-gray-900 truncate">
              {formatCurrency(totalRejected)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}