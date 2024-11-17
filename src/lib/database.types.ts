export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ReceivedCheckStatus = 'Reçu' | 'Déposé' | 'Payé' | 'Rejeté' | 'Annulé';
export type IssuedCheckStatus = 'Émis' | 'Déposé' | 'Payé' | 'Rejeté' | 'Annulé';
export type ReceivedLCRStatus = 'Reçu' | 'Déposé' | 'Payé' | 'Rejeté' | 'Annulé';
export type IssuedLCRStatus = 'Émis' | 'Déposé' | 'Payé' | 'Rejeté' | 'Annulé';

export interface Database {
  public: {
    Tables: {
      received_checks: {
        Row: {
          id: string
          check_number: string
          amount: number
          issue_date: string
          due_date: string
          status: ReceivedCheckStatus
          issuer_name: string
          bank_name: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['received_checks']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['received_checks']['Insert']>
      }
      issued_checks: {
        Row: {
          id: string
          check_number: string
          amount: number
          issue_date: string
          due_date: string
          status: IssuedCheckStatus
          beneficiary_name: string
          bank_name: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['issued_checks']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['issued_checks']['Insert']>
      }
      received_lcrs: {
        Row: {
          id: string
          lcr_number: string
          amount: number
          issue_date: string
          due_date: string
          status: ReceivedLCRStatus
          issuer_name: string
          bank_name: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['received_lcrs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['received_lcrs']['Insert']>
      }
      issued_lcrs: {
        Row: {
          id: string
          lcr_number: string
          amount: number
          issue_date: string
          due_date: string
          status: IssuedLCRStatus
          beneficiary_name: string
          bank_name: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['issued_lcrs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['issued_lcrs']['Insert']>
      }
    }
  }
}