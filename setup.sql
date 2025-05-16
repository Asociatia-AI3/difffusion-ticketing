-- USERS TABLE
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL
);

INSERT INTO users (id, email, name, mobile)
VALUES ('u1', 'ademKacar@iesu.com', 'Adem Kacar', '3131313131');

-- PARTNERS TABLE
CREATE TABLE partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    fiscal_id TEXT NOT NULL
);

INSERT INTO partners (id, name, fiscal_id)
VALUES ('p1', 'UAB Company', '32323232');

-- VENUES TABLE
CREATE TABLE venues (
    id TEXT PRIMARY KEY,
    partner_id TEXT NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (partner_id) REFERENCES partners(id)
);

INSERT INTO venues (id, partner_id, name)
VALUES ('v1', 'p1', 'Bla bla Venue');

-- DISCOUNTS TABLE
CREATE TABLE discounts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    percent_off INTEGER NOT NULL,
    max_uses INTEGER NOT NULL DEFAULT 0,
    venue_id TEXT NOT NULL,
    FOREIGN KEY (venue_id) REFERENCES venues(id)
);

INSERT INTO discounts (id, name, percent_off, max_uses, venue_id)
VALUES ('d1', 'Student Discount', 20, 100, 'v1');

-- TICKETS TABLE
CREATE TABLE tickets (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO tickets (id, code, user_id)
VALUES ('t1', 'TICKET TRY', 'u1');

-- TICKET_USES TABLE
CREATE TABLE ticket_uses (
    id TEXT PRIMARY KEY,
    ticket_id TEXT NOT NULL,
    discount_id TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    FOREIGN KEY (discount_id) REFERENCES discounts(id)
);

INSERT INTO ticket_uses (id, ticket_id, discount_id)
VALUES ('tu1', 't1', 'd1');
