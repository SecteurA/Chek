export type ReceivedCheckStatus = 'Reçu' | 'Déposé' | 'Payé' | 'Rejeté' | 'Annulé';
export type IssuedCheckStatus = 'Émis' | 'Déposé' | 'Payé' | 'Rejeté' | 'Annulé';

interface BaseCheck {
  id: string;
  checkNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  bankName: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReceivedCheck extends BaseCheck {
  status: ReceivedCheckStatus;
  issuerName: string;
}

export interface IssuedCheck extends BaseCheck {
  status: IssuedCheckStatus;
  beneficiaryName: string;
}