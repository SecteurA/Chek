import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { ReceivedLCR, IssuedLCR, ReceivedLCRStatus, IssuedLCRStatus } from '../../types/lcr';

const baseLCRSchema = {
  lcrNumber: z.string().min(1, 'Numéro de LCR requis'),
  amount: z.number().min(0.01, 'Montant invalide'),
  issueDate: z.string().min(1, 'Date d\'émission requise'),
  dueDate: z.string().min(1, 'Date d\'échéance requise'),
  bankName: z.string().min(1, 'Nom de la banque requis'),
  notes: z.string().optional(),
};

const receivedLCRSchema = z.object({
  ...baseLCRSchema,
  status: z.enum(['Reçu', 'Déposé', 'Payé', 'Rejeté', 'Annulé'] as const),
  issuerName: z.string().min(1, { message: 'Nom de l\'émetteur requis' }),
});

const issuedLCRSchema = z.object({
  ...baseLCRSchema,
  status: z.enum(['Émis', 'Déposé', 'Payé', 'Rejeté', 'Annulé'] as const),
  beneficiaryName: z.string().min(1, { message: 'Nom du bénéficiaire requis' }),
});

type ReceivedLCRFormData = z.infer<typeof receivedLCRSchema>;
type IssuedLCRFormData = z.infer<typeof issuedLCRSchema>;

interface LCRFormProps {
  type: 'received' | 'issued';
  onSubmit: (data: ReceivedLCRFormData | IssuedLCRFormData) => Promise<void>;
  initialData?: Partial<ReceivedLCR | IssuedLCR>;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function LCRForm({ type, onSubmit, initialData, isLoading, onCancel }: LCRFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(type === 'received' ? receivedLCRSchema : issuedLCRSchema),
    defaultValues: initialData
  });

  const currentStatus = watch('status');

  const statusOptions: (ReceivedLCRStatus | IssuedLCRStatus)[] = 
    type === 'received' 
      ? ['Reçu', 'Déposé', 'Payé', 'Rejeté', 'Annulé']
      : ['Émis', 'Déposé', 'Payé', 'Rejeté', 'Annulé'];

  const getStatusColor = (status: string) => {
    const colors = {
      'Reçu': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'Émis': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'Déposé': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      'Payé': 'bg-green-100 text-green-800 hover:bg-green-200',
      'Rejeté': 'bg-red-100 text-red-800 hover:bg-red-200',
      'Annulé': 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Numéro de LCR"
          {...register('lcrNumber')}
          error={errors.lcrNumber?.message}
        />
        <Input
          label="Montant (DH)"
          type="number"
          step="0.01"
          {...register('amount', { valueAsNumber: true })}
          error={errors.amount?.message}
        />
        <Input
          label="Date d'émission"
          type="date"
          {...register('issueDate')}
          error={errors.issueDate?.message}
        />
        <Input
          label="Date d'échéance"
          type="date"
          {...register('dueDate')}
          error={errors.dueDate?.message}
        />
        <Input
          label={type === 'received' ? 'Émetteur' : 'Bénéficiaire'}
          {...register(type === 'received' ? 'issuerName' : 'beneficiaryName')}
          error={
            type === 'received'
              ? errors.issuerName?.message
              : errors.beneficiaryName?.message
          }
        />
        <Input
          label="Banque"
          {...register('bankName')}
          error={errors.bankName?.message}
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setValue('status', status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentStatus === status 
                    ? `${getStatusColor(status)} ring-2 ring-offset-2 ring-primary`
                    : `${getStatusColor(status)} opacity-60`
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <Input
            label="Notes (optionnel)"
            {...register('notes')}
            error={errors.notes?.message}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Enregistrer
        </Button>
      </div>
    </form>
  );
}