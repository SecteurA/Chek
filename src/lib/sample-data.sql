-- Sample data for received_checks
INSERT INTO public.received_checks (check_number, amount, issue_date, due_date, status, issuer_name, bank_name, notes) VALUES
-- Mars 2024
('CHQ123456', 125000.00, '2024-03-01', '2024-04-01', 'Reçu', 'Société Al Omrane SARL', 'Attijariwafa Bank', 'Paiement facture F-2024-089'),
('CHQ123457', 85000.00, '2024-03-02', '2024-04-15', 'Déposé', 'Marwa Textile SARL', 'BMCE Bank', 'Commande C-2024-156'),
('CHQ123458', 250000.00, '2024-03-05', '2024-05-05', 'Reçu', 'Groupe Benjelloun Industries', 'CIH Bank', 'Acompte projet P-2024-023'),
('CHQ123459', 45000.00, '2024-03-08', '2024-04-08', 'Reçu', 'Société El Mansouri & Fils', 'Bank Al-Maghrib', 'Facture F-2024-178'),
('CHQ123460', 180000.00, '2024-03-10', '2024-05-10', 'Déposé', 'Atlas Bottling Company', 'Crédit Agricole', 'Contrat annuel'),

-- Février 2024
('CHQ123461', 95000.00, '2024-02-01', '2024-03-01', 'Payé', 'Société Tazi Import Export', 'Attijariwafa Bank', 'Facture F-2024-045'),
('CHQ123462', 145000.00, '2024-02-05', '2024-03-05', 'Payé', 'Maroc Distribution SARL', 'BMCE Bank', 'Commande C-2024-089'),
('CHQ123463', 75000.00, '2024-02-10', '2024-03-10', 'Rejeté', 'Boulangerie Al Baraka', 'CIH Bank', 'Provision insuffisante'),
('CHQ123464', 320000.00, '2024-02-15', '2024-03-15', 'Payé', 'Société Alami Construction', 'Bank Al-Maghrib', 'Projet P-2024-012'),
('CHQ123465', 65000.00, '2024-02-20', '2024-03-20', 'Annulé', 'Pharmacie Ibn Sina', 'Crédit Agricole', 'Annulation commande'),

-- Janvier 2024
('CHQ123466', 155000.00, '2024-01-05', '2024-02-05', 'Payé', 'Société Bennis Trading', 'Attijariwafa Bank', 'Facture F-2024-012'),
('CHQ123467', 230000.00, '2024-01-10', '2024-02-10', 'Payé', 'Groupe Zouiten & Associés', 'BMCE Bank', 'Projet P-2024-005'),
('CHQ123468', 88000.00, '2024-01-15', '2024-02-15', 'Rejeté', 'Café Al Andalous SARL', 'CIH Bank', 'Chèque sans provision'),
('CHQ123469', 175000.00, '2024-01-20', '2024-02-20', 'Payé', 'Société Bennani Import', 'Bank Al-Maghrib', 'Commande C-2024-023'),
('CHQ123470', 92000.00, '2024-01-25', '2024-02-25', 'Payé', 'Librairie Al Maarifa', 'Crédit Agricole', 'Facture F-2024-034');

-- Sample data for issued_checks
INSERT INTO public.issued_checks (check_number, amount, issue_date, due_date, status, beneficiary_name, bank_name, notes) VALUES
-- Mars 2024
('CHQ987654', 185000.00, '2024-03-01', '2024-04-01', 'Émis', 'Société El Idrissi Fournitures', 'Attijariwafa Bank', 'Achat matériel'),
('CHQ987653', 95000.00, '2024-03-05', '2024-04-05', 'Déposé', 'Transport Al Boraq SARL', 'BMCE Bank', 'Services logistiques mars'),
('CHQ987652', 275000.00, '2024-03-08', '2024-04-08', 'Émis', 'Imprimerie Al Wahda', 'CIH Bank', 'Commande marketing'),
('CHQ987651', 145000.00, '2024-03-10', '2024-04-10', 'Déposé', 'Bureau Al Amane SARL', 'Bank Al-Maghrib', 'Mobilier bureau'),
('CHQ987650', 220000.00, '2024-03-15', '2024-04-15', 'Émis', 'Société Lahlou Maintenance', 'Crédit Agricole', 'Contrat maintenance'),

-- Février 2024
('CHQ987649', 165000.00, '2024-02-01', '2024-03-01', 'Payé', 'Quincaillerie Al Amal', 'Attijariwafa Bank', 'Fournitures chantier'),
('CHQ987648', 195000.00, '2024-02-05', '2024-03-05', 'Payé', 'Société Tahiri Transport', 'BMCE Bank', 'Services février'),
('CHQ987647', 85000.00, '2024-02-10', '2024-03-10', 'Rejeté', 'Café Al Madina SARL', 'CIH Bank', 'Erreur montant'),
('CHQ987646', 350000.00, '2024-02-15', '2024-03-15', 'Payé', 'Société Ziani Construction', 'Bank Al-Maghrib', 'Travaux bâtiment'),
('CHQ987645', 125000.00, '2024-02-20', '2024-03-20', 'Annulé', 'Librairie Al Qalam', 'Crédit Agricole', 'Commande annulée'),

-- Janvier 2024
('CHQ987644', 245000.00, '2024-01-05', '2024-02-05', 'Payé', 'Société Hassani Services', 'Attijariwafa Bank', 'Services janvier'),
('CHQ987643', 180000.00, '2024-01-10', '2024-02-10', 'Payé', 'Groupe Alaoui Consulting', 'BMCE Bank', 'Conseil stratégique'),
('CHQ987642', 95000.00, '2024-01-15', '2024-02-15', 'Rejeté', 'Restaurant Al Fassi', 'CIH Bank', 'Erreur signature'),
('CHQ987641', 285000.00, '2024-01-20', '2024-02-20', 'Payé', 'Société Benjelloun Export', 'Bank Al-Maghrib', 'Marchandises export'),
('CHQ987640', 155000.00, '2024-01-25', '2024-02-25', 'Payé', 'Imprimerie Al Maghrib', 'Crédit Agricole', 'Impression catalogues');

-- Sample data for received_lcrs
INSERT INTO public.received_lcrs (lcr_number, amount, issue_date, due_date, status, issuer_name, bank_name, notes) VALUES
-- Mars 2024
('LCR123456', 450000.00, '2024-03-01', '2024-04-01', 'Reçu', 'Société El Amrani Import Export', 'Attijariwafa Bank', 'Contrat distribution'),
('LCR123457', 325000.00, '2024-03-05', '2024-04-05', 'Déposé', 'Groupe Tazi Industries', 'BMCE Bank', 'Projet P-2024-078'),
('LCR123458', 580000.00, '2024-03-08', '2024-04-08', 'Reçu', 'Atlas Food Processing', 'CIH Bank', 'Commande C-2024-156'),
('LCR123459', 275000.00, '2024-03-10', '2024-04-10', 'Déposé', 'Société Bennis Trading', 'Bank Al-Maghrib', 'Facture F-2024-189'),
('LCR123460', 420000.00, '2024-03-15', '2024-04-15', 'Reçu', 'Maroc Textile SARL', 'Crédit Agricole', 'Commande annuelle'),

-- Février 2024
('LCR123461', 385000.00, '2024-02-01', '2024-03-01', 'Payé', 'Société Alaoui Distribution', 'Attijariwafa Bank', 'Contrat 2024-045'),
('LCR123462', 295000.00, '2024-02-05', '2024-03-05', 'Payé', 'Groupe Mansouri & Fils', 'BMCE Bank', 'Projet P-2024-034'),
('LCR123463', 520000.00, '2024-02-10', '2024-03-10', 'Rejeté', 'Atlas Packaging SARL', 'CIH Bank', 'Provision insuffisante'),
('LCR123464', 680000.00, '2024-02-15', '2024-03-15', 'Payé', 'Société Zouiten Export', 'Bank Al-Maghrib', 'Commande C-2024-089'),
('LCR123465', 345000.00, '2024-02-20', '2024-03-20', 'Annulé', 'Maroc Distribution SA', 'Crédit Agricole', 'Annulation contrat'),

-- Janvier 2024
('LCR123466', 475000.00, '2024-01-05', '2024-02-05', 'Payé', 'Société Idrissi Trading', 'Attijariwafa Bank', 'Facture F-2024-012'),
('LCR123467', 620000.00, '2024-01-10', '2024-02-10', 'Payé', 'Groupe Bennani Industries', 'BMCE Bank', 'Projet P-2024-005'),
('LCR123468', 285000.00, '2024-01-15', '2024-02-15', 'Rejeté', 'Atlas Chemical SARL', 'CIH Bank', 'Erreur montant'),
('LCR123469', 540000.00, '2024-01-20', '2024-02-20', 'Payé', 'Société Tahiri Import', 'Bank Al-Maghrib', 'Commande C-2024-023'),
('LCR123470', 395000.00, '2024-01-25', '2024-02-25', 'Payé', 'Maroc Logistics SA', 'Crédit Agricole', 'Services logistiques');

-- Sample data for issued_lcrs
INSERT INTO public.issued_lcrs (lcr_number, amount, issue_date, due_date, status, beneficiary_name, bank_name, notes) VALUES
-- Mars 2024
('LCR987654', 520000.00, '2024-03-01', '2024-04-01', 'Émis', 'Société Lahlou Industries', 'Attijariwafa Bank', 'Équipement industriel'),
('LCR987653', 385000.00, '2024-03-05', '2024-04-05', 'Déposé', 'Transport Al Maghrib SARL', 'BMCE Bank', 'Services logistiques Q1'),
('LCR987652', 640000.00, '2024-03-08', '2024-04-08', 'Émis', 'Atlas Engineering', 'CIH Bank', 'Projet construction'),
('LCR987651', 420000.00, '2024-03-10', '2024-04-10', 'Déposé', 'Société El Fassi Export', 'Bank Al-Maghrib', 'Commande internationale'),
('LCR987650', 575000.00, '2024-03-15', '2024-04-15', 'Émis', 'Groupe Hassani Trading', 'Crédit Agricole', 'Contrat distribution'),

-- Février 2024
('LCR987649', 495000.00, '2024-02-01', '2024-03-01', 'Payé', 'Société Benjelloun Services', 'Attijariwafa Bank', 'Services février'),
('LCR987648', 620000.00, '2024-02-05', '2024-03-05', 'Payé', 'Maroc Steel Industries', 'BMCE Bank', 'Matières premières'),
('LCR987647', 345000.00, '2024-02-10', '2024-03-10', 'Rejeté', 'Atlas Chemicals SARL', 'CIH Bank', 'Erreur bancaire'),
('LCR987646', 780000.00, '2024-02-15', '2024-03-15', 'Payé', 'Société Tazi Construction', 'Bank Al-Maghrib', 'Projet immobilier'),
('LCR987645', 425000.00, '2024-02-20', '2024-03-20', 'Annulé', 'Transport Al Boraq', 'Crédit Agricole', 'Service annulé'),

-- Janvier 2024
('LCR987644', 585000.00, '2024-01-05', '2024-02-05', 'Payé', 'Groupe Alami Industries', 'Attijariwafa Bank', 'Équipement usine'),
('LCR987643', 470000.00, '2024-01-10', '2024-02-10', 'Payé', 'Société Mansouri Trading', 'BMCE Bank', 'Marchandises import'),
('LCR987642', 320000.00, '2024-01-15', '2024-02-15', 'Rejeté', 'Atlas Food SARL', 'CIH Bank', 'Erreur montant'),
('LCR987641', 695000.00, '2024-01-20', '2024-02-20', 'Payé', 'Maroc Packaging SA', 'Bank Al-Maghrib', 'Matériel emballage'),
('LCR987640', 445000.00, '2024-01-25', '2024-02-25', 'Payé', 'Société Ziani Export', 'Crédit Agricole', 'Services export');