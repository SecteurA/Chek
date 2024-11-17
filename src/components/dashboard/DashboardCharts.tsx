import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface ChartData {
  monthlyData: {
    labels: string[];
    receivedChecks: number[];
    issuedChecks: number[];
    receivedLCRs: number[];
    issuedLCRs: number[];
  };
  checksDistribution: {
    labels: string[];
    receivedData: number[];
    issuedData: number[];
  };
  lcrsDistribution: {
    labels: string[];
    receivedData: number[];
    issuedData: number[];
  };
  quarterlyComparison: {
    labels: string[];
    received: number[];
    issued: number[];
  };
}

const COLORS = {
  primary: '#0376C3',
  secondary: '#10B981',
  tertiary: '#F59E0B',
  quaternary: '#6366F1',
  error: '#EF4444'
};

export function DashboardCharts({ monthlyData, checksDistribution, lcrsDistribution, quarterlyComparison }: Partial<ChartData>) {
  const lineChartData = {
    labels: monthlyData?.labels || [],
    datasets: [
      {
        label: 'Chèques Reçus',
        data: monthlyData?.receivedChecks || [],
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}20`,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Chèques Émis',
        data: monthlyData?.issuedChecks || [],
        borderColor: COLORS.secondary,
        backgroundColor: `${COLORS.secondary}20`,
        fill: true,
        tension: 0.4
      },
      {
        label: 'LCRs Reçus',
        data: monthlyData?.receivedLCRs || [],
        borderColor: COLORS.tertiary,
        backgroundColor: `${COLORS.tertiary}20`,
        fill: true,
        tension: 0.4
      },
      {
        label: 'LCRs Émis',
        data: monthlyData?.issuedLCRs || [],
        borderColor: COLORS.quaternary,
        backgroundColor: `${COLORS.quaternary}20`,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('fr-MA', {
                maximumFractionDigits: 0
              }).format(context.parsed.y) + ' DH';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('fr-MA', {
              maximumFractionDigits: 0
            }).format(value) + ' DH';
          }
        }
      }
    }
  };

  const checksPieData = {
    labels: checksDistribution?.labels || [],
    datasets: [
      {
        data: checksDistribution?.receivedData || [],
        backgroundColor: [
          COLORS.primary,
          COLORS.secondary,
          COLORS.tertiary,
          COLORS.quaternary,
          COLORS.error
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const lcrsPieData = {
    labels: lcrsDistribution?.labels || [],
    datasets: [
      {
        data: lcrsDistribution?.receivedData || [],
        backgroundColor: [
          COLORS.primary,
          COLORS.secondary,
          COLORS.tertiary,
          COLORS.quaternary,
          COLORS.error
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const barChartData = {
    labels: quarterlyComparison?.labels || [],
    datasets: [
      {
        label: 'Reçus',
        data: quarterlyComparison?.received || [],
        backgroundColor: COLORS.primary,
      },
      {
        label: 'Émis',
        data: quarterlyComparison?.issued || [],
        backgroundColor: COLORS.secondary,
      }
    ]
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    cutout: '60%'
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('fr-MA', {
                maximumFractionDigits: 0
              }).format(context.parsed.y) + ' DH';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('fr-MA', {
              maximumFractionDigits: 0
            }).format(value) + ' DH';
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Line Chart - Full Width */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Évolution mensuelle</h3>
        <div className="h-[400px]">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Three Column Layout for Pie Charts and Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution des Chèques</h3>
          <div className="h-[300px]">
            <Doughnut data={checksPieData} options={pieChartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution des LCRs</h3>
          <div className="h-[300px]">
            <Doughnut data={lcrsPieData} options={pieChartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Comparaison trimestrielle</h3>
          <div className="h-[300px]">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}