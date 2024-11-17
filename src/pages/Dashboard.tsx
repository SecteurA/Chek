import { useEffect, useState } from 'react';
import { isToday, isThisWeek, parseISO } from 'date-fns';
import { StatsCards } from '../components/dashboard/StatsCards';
import { DashboardCharts } from '../components/dashboard/DashboardCharts';
import { UpcomingSection } from '../components/dashboard/UpcomingSection';
import { api } from '../lib/api';
import type { ReceivedCheck, IssuedCheck } from '../types/check';
import type { ReceivedLCR, IssuedLCR } from '../types/lcr';

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

export function Dashboard() {
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalReceived: 0,
    totalPending: 0,
    totalRejected: 0
  });

  const [chartData, setChartData] = useState({
    monthlyData: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      receivedChecks: [650000, 590000, 800000, 810000, 560000, 750000],
      issuedChecks: [450000, 520000, 730000, 620000, 430000, 680000],
      receivedLCRs: [420000, 380000, 450000, 480000, 520000, 510000],
      issuedLCRs: [380000, 420000, 460000, 440000, 490000, 470000]
    },
    checksDistribution: {
      labels: ['Reçu/Émis', 'Déposé', 'Payé', 'Rejeté', 'Annulé'],
      receivedData: [30, 25, 20, 15, 10],
      issuedData: [25, 30, 20, 15, 10]
    },
    lcrsDistribution: {
      labels: ['Reçu/Émis', 'Déposé', 'Payé', 'Rejeté', 'Annulé'],
      receivedData: [35, 25, 20, 10, 10],
      issuedData: [30, 25, 25, 10, 10]
    },
    quarterlyComparison: {
      labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
      received: [2500000, 2800000, 3100000, 2900000],
      issued: [2300000, 2600000, 2900000, 2700000]
    }
  });

  const [upcomingItems, setUpcomingItems] = useState<DueItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [receivedChecks, issuedChecks, receivedLCRs, issuedLCRs] = await Promise.all([
          api.receivedChecks.list().catch(() => [] as ReceivedCheck[]),
          api.issuedChecks.list().catch(() => [] as IssuedCheck[]),
          api.receivedLCRs.list().catch(() => [] as ReceivedLCR[]),
          api.issuedLCRs.list().catch(() => [] as IssuedLCR[])
        ]);

        // Calculate stats
        const totalReceived = [...receivedChecks, ...receivedLCRs]
          .reduce((sum, item) => sum + item.amount, 0);

        const totalIssued = [...issuedChecks, ...issuedLCRs]
          .reduce((sum, item) => sum + item.amount, 0);

        const totalPending = [...receivedChecks, ...issuedChecks, ...receivedLCRs, ...issuedLCRs]
          .filter(item => ['Reçu', 'Émis', 'Déposé'].includes(item.status))
          .reduce((sum, item) => sum + item.amount, 0);

        const totalRejected = [...receivedChecks, ...issuedChecks, ...receivedLCRs, ...issuedLCRs]
          .filter(item => item.status === 'Rejeté')
          .reduce((sum, item) => sum + item.amount, 0);

        setStats({
          totalAmount: totalReceived + totalIssued,
          totalReceived,
          totalPending,
          totalRejected
        });

        // Prepare upcoming items
        const upcoming = [
          ...receivedChecks.map(check => ({
            id: check.id,
            type: 'check' as const,
            number: check.checkNumber,
            amount: check.amount,
            dueDate: check.dueDate,
            entity: check.issuerName,
            status: check.status,
            issuerName: check.issuerName,
            bankName: check.bankName,
            notes: check.notes,
            issueDate: check.issueDate
          })),
          ...issuedChecks.map(check => ({
            id: check.id,
            type: 'check' as const,
            number: check.checkNumber,
            amount: check.amount,
            dueDate: check.dueDate,
            entity: check.beneficiaryName,
            status: check.status,
            beneficiaryName: check.beneficiaryName,
            bankName: check.bankName,
            notes: check.notes,
            issueDate: check.issueDate
          })),
          ...receivedLCRs.map(lcr => ({
            id: lcr.id,
            type: 'lcr' as const,
            number: lcr.lcrNumber,
            amount: lcr.amount,
            dueDate: lcr.dueDate,
            entity: lcr.issuerName,
            status: lcr.status,
            issuerName: lcr.issuerName,
            bankName: lcr.bankName,
            notes: lcr.notes,
            issueDate: lcr.issueDate
          })),
          ...issuedLCRs.map(lcr => ({
            id: lcr.id,
            type: 'lcr' as const,
            number: lcr.lcrNumber,
            amount: lcr.amount,
            dueDate: lcr.dueDate,
            entity: lcr.beneficiaryName,
            status: lcr.status,
            beneficiaryName: lcr.beneficiaryName,
            bankName: lcr.bankName,
            notes: lcr.notes,
            issueDate: lcr.issueDate
          }))
        ]
        .filter(item => isThisWeek(parseISO(item.dueDate)))
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        setUpcomingItems(upcoming);

      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError("Une erreur s'est produite lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
      <StatsCards {...stats} />
      <DashboardCharts {...chartData} />
      <UpcomingSection items={upcomingItems} />
    </div>
  );
}