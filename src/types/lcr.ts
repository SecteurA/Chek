export type ReceivedLCRStatus = 'Reçu' | 'Déposé' | 'Payé' | 'Rejeté' | 'Annulé';
export type IssuedLCRStatus = 'Émis' | 'Déposé' | 'Payé' | 'Rejeté' | 'Annulé';

interface BaseLCR {
  id: string;
  lcrNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  bankName: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReceivedLCR extends BaseLCR {
  status: ReceivedLCRStatus;
  issuerName: string;
}

export interface IssuedLCR extends BaseLCR {
  status: IssuedLCRStatus;
  beneficiaryName: string;
}