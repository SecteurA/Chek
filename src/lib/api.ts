import { supabase } from './supabase';
import type { Database } from './database.types';
import type { ReceivedCheck, IssuedCheck } from '../types/check';
import type { ReceivedLCR, IssuedLCR } from '../types/lcr';

function mapDbReceivedCheckToCheck(dbCheck: Database['public']['Tables']['received_checks']['Row']): ReceivedCheck {
  return {
    id: dbCheck.id,
    checkNumber: dbCheck.check_number,
    amount: dbCheck.amount,
    issueDate: dbCheck.issue_date,
    dueDate: dbCheck.due_date,
    status: dbCheck.status,
    issuerName: dbCheck.issuer_name,
    bankName: dbCheck.bank_name,
    notes: dbCheck.notes || undefined,
    createdAt: dbCheck.created_at,
    updatedAt: dbCheck.updated_at
  };
}

function mapDbIssuedCheckToCheck(dbCheck: Database['public']['Tables']['issued_checks']['Row']): IssuedCheck {
  return {
    id: dbCheck.id,
    checkNumber: dbCheck.check_number,
    amount: dbCheck.amount,
    issueDate: dbCheck.issue_date,
    dueDate: dbCheck.due_date,
    status: dbCheck.status,
    beneficiaryName: dbCheck.beneficiary_name,
    bankName: dbCheck.bank_name,
    notes: dbCheck.notes || undefined,
    createdAt: dbCheck.created_at,
    updatedAt: dbCheck.updated_at
  };
}

function mapDbReceivedLCRToLCR(dbLCR: Database['public']['Tables']['received_lcrs']['Row']): ReceivedLCR {
  return {
    id: dbLCR.id,
    lcrNumber: dbLCR.lcr_number,
    amount: dbLCR.amount,
    issueDate: dbLCR.issue_date,
    dueDate: dbLCR.due_date,
    status: dbLCR.status,
    issuerName: dbLCR.issuer_name,
    bankName: dbLCR.bank_name,
    notes: dbLCR.notes || undefined,
    createdAt: dbLCR.created_at,
    updatedAt: dbLCR.updated_at
  };
}

function mapDbIssuedLCRToLCR(dbLCR: Database['public']['Tables']['issued_lcrs']['Row']): IssuedLCR {
  return {
    id: dbLCR.id,
    lcrNumber: dbLCR.lcr_number,
    amount: dbLCR.amount,
    issueDate: dbLCR.issue_date,
    dueDate: dbLCR.due_date,
    status: dbLCR.status,
    beneficiaryName: dbLCR.beneficiary_name,
    bankName: dbLCR.bank_name,
    notes: dbLCR.notes || undefined,
    createdAt: dbLCR.created_at,
    updatedAt: dbLCR.updated_at
  };
}

export const api = {
  receivedChecks: {
    async list(): Promise<ReceivedCheck[]> {
      const { data, error } = await supabase
        .from('received_checks')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      return (data || []).map(mapDbReceivedCheckToCheck);
    },

    async create(check: Omit<ReceivedCheck, 'id' | 'createdAt' | 'updatedAt'>): Promise<ReceivedCheck> {
      const { data, error } = await supabase
        .from('received_checks')
        .insert({
          check_number: check.checkNumber,
          amount: check.amount,
          issue_date: check.issueDate,
          due_date: check.dueDate,
          status: check.status,
          issuer_name: check.issuerName,
          bank_name: check.bankName,
          notes: check.notes || null
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from insert');
      return mapDbReceivedCheckToCheck(data);
    },

    async update(id: string, check: Partial<ReceivedCheck>): Promise<ReceivedCheck> {
      const updateData: any = {};
      if (check.checkNumber) updateData.check_number = check.checkNumber;
      if (check.amount) updateData.amount = check.amount;
      if (check.issueDate) updateData.issue_date = check.issueDate;
      if (check.dueDate) updateData.due_date = check.dueDate;
      if (check.status) updateData.status = check.status;
      if (check.issuerName) updateData.issuer_name = check.issuerName;
      if (check.bankName) updateData.bank_name = check.bankName;
      if ('notes' in check) updateData.notes = check.notes || null;

      const { data, error } = await supabase
        .from('received_checks')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Item not found or no changes applied');
      return mapDbReceivedCheckToCheck(data);
    }
  },

  issuedChecks: {
    async list(): Promise<IssuedCheck[]> {
      const { data, error } = await supabase
        .from('issued_checks')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      return (data || []).map(mapDbIssuedCheckToCheck);
    },

    async create(check: Omit<IssuedCheck, 'id' | 'createdAt' | 'updatedAt'>): Promise<IssuedCheck> {
      const { data, error } = await supabase
        .from('issued_checks')
        .insert({
          check_number: check.checkNumber,
          amount: check.amount,
          issue_date: check.issueDate,
          due_date: check.dueDate,
          status: check.status,
          beneficiary_name: check.beneficiaryName,
          bank_name: check.bankName,
          notes: check.notes || null
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from insert');
      return mapDbIssuedCheckToCheck(data);
    },

    async update(id: string, check: Partial<IssuedCheck>): Promise<IssuedCheck> {
      const updateData: any = {};
      if (check.checkNumber) updateData.check_number = check.checkNumber;
      if (check.amount) updateData.amount = check.amount;
      if (check.issueDate) updateData.issue_date = check.issueDate;
      if (check.dueDate) updateData.due_date = check.dueDate;
      if (check.status) updateData.status = check.status;
      if (check.beneficiaryName) updateData.beneficiary_name = check.beneficiaryName;
      if (check.bankName) updateData.bank_name = check.bankName;
      if ('notes' in check) updateData.notes = check.notes || null;

      const { data, error } = await supabase
        .from('issued_checks')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Item not found or no changes applied');
      return mapDbIssuedCheckToCheck(data);
    }
  },

  receivedLCRs: {
    async list(): Promise<ReceivedLCR[]> {
      const { data, error } = await supabase
        .from('received_lcrs')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      return (data || []).map(mapDbReceivedLCRToLCR);
    },

    async create(lcr: Omit<ReceivedLCR, 'id' | 'createdAt' | 'updatedAt'>): Promise<ReceivedLCR> {
      const { data, error } = await supabase
        .from('received_lcrs')
        .insert({
          lcr_number: lcr.lcrNumber,
          amount: lcr.amount,
          issue_date: lcr.issueDate,
          due_date: lcr.dueDate,
          status: lcr.status,
          issuer_name: lcr.issuerName,
          bank_name: lcr.bankName,
          notes: lcr.notes || null
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from insert');
      return mapDbReceivedLCRToLCR(data);
    },

    async update(id: string, lcr: Partial<ReceivedLCR>): Promise<ReceivedLCR> {
      const updateData: any = {};
      if (lcr.lcrNumber) updateData.lcr_number = lcr.lcrNumber;
      if (lcr.amount) updateData.amount = lcr.amount;
      if (lcr.issueDate) updateData.issue_date = lcr.issueDate;
      if (lcr.dueDate) updateData.due_date = lcr.dueDate;
      if (lcr.status) updateData.status = lcr.status;
      if (lcr.issuerName) updateData.issuer_name = lcr.issuerName;
      if (lcr.bankName) updateData.bank_name = lcr.bankName;
      if ('notes' in lcr) updateData.notes = lcr.notes || null;

      const { data, error } = await supabase
        .from('received_lcrs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Item not found or no changes applied');
      return mapDbReceivedLCRToLCR(data);
    }
  },

  issuedLCRs: {
    async list(): Promise<IssuedLCR[]> {
      const { data, error } = await supabase
        .from('issued_lcrs')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      return (data || []).map(mapDbIssuedLCRToLCR);
    },

    async create(lcr: Omit<IssuedLCR, 'id' | 'createdAt' | 'updatedAt'>): Promise<IssuedLCR> {
      const { data, error } = await supabase
        .from('issued_lcrs')
        .insert({
          lcr_number: lcr.lcrNumber,
          amount: lcr.amount,
          issue_date: lcr.issueDate,
          due_date: lcr.dueDate,
          status: lcr.status,
          beneficiary_name: lcr.beneficiaryName,
          bank_name: lcr.bankName,
          notes: lcr.notes || null
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from insert');
      return mapDbIssuedLCRToLCR(data);
    },

    async update(id: string, lcr: Partial<IssuedLCR>): Promise<IssuedLCR> {
      const updateData: any = {};
      if (lcr.lcrNumber) updateData.lcr_number = lcr.lcrNumber;
      if (lcr.amount) updateData.amount = lcr.amount;
      if (lcr.issueDate) updateData.issue_date = lcr.issueDate;
      if (lcr.dueDate) updateData.due_date = lcr.dueDate;
      if (lcr.status) updateData.status = lcr.status;
      if (lcr.beneficiaryName) updateData.beneficiary_name = lcr.beneficiaryName;
      if (lcr.bankName) updateData.bank_name = lcr.bankName;
      if ('notes' in lcr) updateData.notes = lcr.notes || null;

      const { data, error } = await supabase
        .from('issued_lcrs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Item not found or no changes applied');
      return mapDbIssuedLCRToLCR(data);
    }
  }
};