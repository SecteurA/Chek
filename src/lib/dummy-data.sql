-- Dummy data for received_lcrs
INSERT INTO public.received_lcrs (lcr_number, amount, issue_date, due_date, status, issuer_name, bank_name, notes) VALUES
('LCR001245', 35000.00, '2024-02-15', '2024-03-15', 'Reçu', 'Société El Amrani Import Export', 'Attijariwafa Bank', 'Paiement facture F-2024-125'),
('LCR005632', 52000.00, '2024-02-10', '2024-04-10', 'Déposé', 'Bennani & Fils SARL', 'Bank Al-Maghrib', 'Règlement commande C-2024-089'),
('LCR008974', 28500.00, '2024-01-20', '2024-03-20', 'Payé', 'Tazi Commerce International', 'BMCE Bank', 'Acompte projet P-2024-015'),
('LCR003215', 43000.00, '2024-02-01', '2024-03-01', 'Rejeté', 'Société Alaoui Distribution', 'CIH Bank', 'Provision insuffisante'),
('LCR007841', 65000.00, '2024-02-05', '2024-04-05', 'Déposé', 'Bouzidi Frères Trading', 'Crédit Agricole', 'Facture F-2024-156');

-- Dummy data for issued_lcrs
INSERT INTO public.issued_lcrs (lcr_number, amount, issue_date, due_date, status, beneficiary_name, bank_name, notes) VALUES
('LCR100245', 45000.00, '2024-02-14', '2024-03-14', 'Émis', 'Société Bennis Fournitures', 'Attijariwafa Bank', 'Achat matériel bureau'),
('LCR100632', 58000.00, '2024-02-09', '2024-04-09', 'Déposé', 'Entreprise Tahiri Transport', 'Bank Al-Maghrib', 'Services logistiques février'),
('LCR100897', 32500.00, '2024-01-19', '2024-03-19', 'Payé', 'Société Lahlou Maintenance', 'BMCE Bank', 'Maintenance mensuelle'),
('LCR100321', 51000.00, '2024-01-31', '2024-03-31', 'Rejeté', 'Groupe Hassani Services', 'CIH Bank', 'Erreur montant'),
('LCR100784', 68000.00, '2024-02-04', '2024-04-04', 'Déposé', 'Société Ouazzani Consulting', 'Crédit Agricole', 'Services conseil Q1 2024');