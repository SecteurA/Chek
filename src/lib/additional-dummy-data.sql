-- Function to generate random amounts between 10,000 and 1,000,000
CREATE OR REPLACE FUNCTION random_amount() RETURNS decimal AS $$
BEGIN
  RETURN floor(random() * (1000000 - 10000 + 1) + 10000);
END;
$$ LANGUAGE plpgsql;

-- Function to get a random company name
CREATE OR REPLACE FUNCTION random_company() RETURNS text AS $$
DECLARE
  companies text[] := ARRAY[
    'Société Al Omrane SARL', 'Marwa Textile SARL', 'Groupe Benjelloun Industries',
    'Société El Mansouri & Fils', 'Atlas Bottling Company', 'Société Tazi Import Export',
    'Maroc Distribution SARL', 'Société Alami Construction', 'Société Bennis Trading',
    'Groupe Zouiten & Associés', 'Société Bennani Import', 'Transport Al Boraq SARL',
    'Imprimerie Al Wahda', 'Bureau Al Amane SARL', 'Société Lahlou Maintenance',
    'Quincaillerie Al Amal', 'Société Tahiri Transport', 'Atlas Engineering',
    'Société El Fassi Export', 'Groupe Hassani Trading', 'Maroc Steel Industries',
    'Atlas Chemicals SARL', 'Société Tazi Construction', 'Transport Al Boraq'
  ];
BEGIN
  RETURN companies[floor(random() * array_length(companies, 1) + 1)];
END;
$$ LANGUAGE plpgsql;

-- Function to get a random bank name
CREATE OR REPLACE FUNCTION random_bank() RETURNS text AS $$
DECLARE
  banks text[] := ARRAY[
    'Attijariwafa Bank', 'BMCE Bank', 'CIH Bank', 'Bank Al-Maghrib', 'Crédit Agricole',
    'Banque Populaire', 'Société Générale', 'BMCI', 'CFG Bank', 'Al Barid Bank'
  ];
BEGIN
  RETURN banks[floor(random() * array_length(banks, 1) + 1)];
END;
$$ LANGUAGE plpgsql;

-- Generate daily entries for received checks, issued checks, received LCRs, and issued LCRs
DO $$
DECLARE
  current_check_date date := CURRENT_DATE;
  end_date date := CURRENT_DATE + INTERVAL '24 months';
  check_number text;
  lcr_number text;
  day_counter integer := 0;
BEGIN
  WHILE current_check_date <= end_date LOOP
    -- Received Checks
    FOR i IN 1..3 LOOP
      check_number := 'CHQ-' || to_char(current_check_date, 'YYYYMMDD') || '-R' || i;
      INSERT INTO received_checks (
        check_number, amount, issue_date, due_date, status, issuer_name, bank_name, notes
      ) VALUES (
        check_number,
        random_amount(),
        current_check_date - INTERVAL '30 days',
        current_check_date,
        CASE 
          WHEN current_check_date < CURRENT_DATE THEN (ARRAY['Payé', 'Rejeté', 'Annulé'])[floor(random() * 3 + 1)]
          WHEN current_check_date = CURRENT_DATE THEN 'Reçu'
          ELSE (ARRAY['Reçu', 'Déposé'])[floor(random() * 2 + 1)]
        END,
        random_company(),
        random_bank(),
        'Transaction du ' || to_char(current_check_date, 'DD/MM/YYYY')
      );
    END LOOP;

    -- Issued Checks
    FOR i IN 1..3 LOOP
      check_number := 'CHQ-' || to_char(current_check_date, 'YYYYMMDD') || '-I' || i;
      INSERT INTO issued_checks (
        check_number, amount, issue_date, due_date, status, beneficiary_name, bank_name, notes
      ) VALUES (
        check_number,
        random_amount(),
        current_check_date - INTERVAL '30 days',
        current_check_date,
        CASE 
          WHEN current_check_date < CURRENT_DATE THEN (ARRAY['Payé', 'Rejeté', 'Annulé'])[floor(random() * 3 + 1)]
          WHEN current_check_date = CURRENT_DATE THEN 'Émis'
          ELSE (ARRAY['Émis', 'Déposé'])[floor(random() * 2 + 1)]
        END,
        random_company(),
        random_bank(),
        'Paiement du ' || to_char(current_check_date, 'DD/MM/YYYY')
      );
    END LOOP;

    -- Received LCRs
    FOR i IN 1..3 LOOP
      lcr_number := 'LCR-' || to_char(current_check_date, 'YYYYMMDD') || '-R' || i;
      INSERT INTO received_lcrs (
        lcr_number, amount, issue_date, due_date, status, issuer_name, bank_name, notes
      ) VALUES (
        lcr_number,
        random_amount(),
        current_check_date - INTERVAL '30 days',
        current_check_date,
        CASE 
          WHEN current_check_date < CURRENT_DATE THEN (ARRAY['Payé', 'Rejeté', 'Annulé'])[floor(random() * 3 + 1)]
          WHEN current_check_date = CURRENT_DATE THEN 'Reçu'
          ELSE (ARRAY['Reçu', 'Déposé'])[floor(random() * 2 + 1)]
        END,
        random_company(),
        random_bank(),
        'LCR du ' || to_char(current_check_date, 'DD/MM/YYYY')
      );
    END LOOP;

    -- Issued LCRs
    FOR i IN 1..3 LOOP
      lcr_number := 'LCR-' || to_char(current_check_date, 'YYYYMMDD') || '-I' || i;
      INSERT INTO issued_lcrs (
        lcr_number, amount, issue_date, due_date, status, beneficiary_name, bank_name, notes
      ) VALUES (
        lcr_number,
        random_amount(),
        current_check_date - INTERVAL '30 days',
        current_check_date,
        CASE 
          WHEN current_check_date < CURRENT_DATE THEN (ARRAY['Payé', 'Rejeté', 'Annulé'])[floor(random() * 3 + 1)]
          WHEN current_check_date = CURRENT_DATE THEN 'Émis'
          ELSE (ARRAY['Émis', 'Déposé'])[floor(random() * 2 + 1)]
        END,
        random_company(),
        random_bank(),
        'LCR du ' || to_char(current_check_date, 'DD/MM/YYYY')
      );
    END LOOP;

    current_check_date := current_check_date + INTERVAL '1 day';
    day_counter := day_counter + 1;
  END LOOP;
END $$;