 -- Tabloları oluştur ve örnek verilerle doldur
BEGIN TRANSACTION;

-- Users tablosu
CREATE TABLE IF NOT EXISTS Users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL
);

INSERT INTO Users (id, email, name, mobile) VALUES
('usr_001', 'ali.veli@example.com', 'Ali Veli', '+905551234567'),
('usr_002', 'ayse.fatma@example.com', 'Ayşe Fatma', '+905552345678'),
('usr_003', 'mehmet.akif@example.com', 'Mehmet Akif', '+905553456789');

-- Partners tablosu
CREATE TABLE IF NOT EXISTS Partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    fiscal_id TEXT NOT NULL
);

INSERT INTO Partners (id, name, fiscal_id) VALUES
('prt_001', 'Kültür A.Ş.', '1234567890'),
('prt_002', 'Sanat Ltd.', '0987654321'),
('prt_003', 'Etkinlik Yapım', '1122334455');

-- Venues tablosu
CREATE TABLE IF NOT EXISTS Venues (
    id TEXT PRIMARY KEY,
    partner_id TEXT,
    name TEXT NOT NULL,
    FOREIGN KEY (partner_id) REFERENCES Partners(id)
);

INSERT INTO Venues (id, partner_id, name) VALUES
('ven_001', 'prt_001', 'Şehir Kültür Merkezi'),
('ven_002', 'prt_002', 'Sanat Galerisi'),
('ven_003', 'prt_001', 'Açık Hava Tiyatrosu'),
('ven_004', 'prt_003', 'Kongre Salonu');

-- Discounts tablosu
CREATE TABLE IF NOT EXISTS Discounts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    percent_off INTEGER NOT NULL,
    max_uses INTEGER NOT NULL DEFAULT 0,
    venue_id TEXT,
    FOREIGN KEY (venue_id) REFERENCES Venues(id)
);

INSERT INTO Discounts (id, name, percent_off, max_uses, venue_id) VALUES
('dis_001', 'Erken Rezervasyon', 15, 100, 'ven_001'),
('dis_002', 'Öğrenci İndirimi', 20, 200, 'ven_002'),
('dis_003', 'Hafta Sonu Özel', 10, 50, 'ven_003'),
('dis_004', 'Grup İndirimi', 25, 30, 'ven_004');

-- Tickets tablosu
CREATE TABLE IF NOT EXISTS Tickets (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    user_id TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Tickets (id, code, user_id) VALUES
('tkt_001', 'TICKET123', 'usr_001'),
('tkt_002', 'TICKET456', 'usr_002'),
('tkt_003', 'TICKET789', 'usr_003'),
('tkt_004', 'TICKET012', 'usr_001');

-- TicketUses tablosu
CREATE TABLE IF NOT EXISTS TicketUses (
    id TEXT PRIMARY KEY,
    ticket_id TEXT,
    discount_id TEXT,
    created_at INT,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(id),
    FOREIGN KEY (discount_id) REFERENCES Discounts(id)
);

INSERT INTO TicketUses (id, ticket_id, discount_id, created_at) VALUES
('tus_001', 'tkt_001', 'dis_001', 1672531200),
('tus_002', 'tkt_002', 'dis_002', 1672617600),
('tus_003', 'tkt_003', 'dis_003', 1672704000),
('tus_004', 'tkt_004', 'dis_004', 1672790400);

COMMIT;
/*

-- Sorguları ayrı ayrı çalıştırmanız gerekiyor
-- Aşağıdaki sorguları tek tek çalıştırın:

-- SELECT * FROM Users;
-- SELECT * FROM Partners;
-- SELECT * FROM Venues;
-- SELECT * FROM Discounts;
-- SELECT * FROM Tickets;
-- SELECT * FROM TicketUses;
-- Tabloları oluştur ve örnek verilerle doldur 

*/
