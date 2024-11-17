-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.checks;
DROP TABLE IF EXISTS public.received_checks;
DROP TABLE IF EXISTS public.issued_checks;
DROP TABLE IF EXISTS public.received_lcrs;
DROP TABLE IF EXISTS public.issued_lcrs;

-- Create received_checks table
CREATE TABLE public.received_checks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    check_number VARCHAR NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR NOT NULL CHECK (status IN ('Reçu', 'Déposé', 'Payé', 'Rejeté', 'Annulé')),
    issuer_name VARCHAR NOT NULL,
    bank_name VARCHAR NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create issued_checks table
CREATE TABLE public.issued_checks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    check_number VARCHAR NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR NOT NULL CHECK (status IN ('Émis', 'Déposé', 'Payé', 'Rejeté', 'Annulé')),
    beneficiary_name VARCHAR NOT NULL,
    bank_name VARCHAR NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create received_lcrs table
CREATE TABLE public.received_lcrs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lcr_number VARCHAR NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR NOT NULL CHECK (status IN ('Reçu', 'Déposé', 'Payé', 'Rejeté', 'Annulé')),
    issuer_name VARCHAR NOT NULL,
    bank_name VARCHAR NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create issued_lcrs table
CREATE TABLE public.issued_lcrs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lcr_number VARCHAR NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR NOT NULL CHECK (status IN ('Émis', 'Déposé', 'Payé', 'Rejeté', 'Annulé')),
    beneficiary_name VARCHAR NOT NULL,
    bank_name VARCHAR NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create update triggers for all tables
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_received_checks_timestamp
    BEFORE UPDATE ON received_checks
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_issued_checks_timestamp
    BEFORE UPDATE ON issued_checks
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_received_lcrs_timestamp
    BEFORE UPDATE ON received_lcrs
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_issued_lcrs_timestamp
    BEFORE UPDATE ON issued_lcrs
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();