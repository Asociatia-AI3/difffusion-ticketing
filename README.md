# 🎟️ difffusion-ticketing

**A NestJS application for managing festival tickets and partner discounts.**

## 📖 Overview

The `difffusion-ticketing` app facilitates the distribution and validation of digital tickets for the `difffusion` festival. Attendees can obtain multiple free tickets, each granting a limited number of discounts at participating partners. Partner employees can authenticate using BasicAuth to scan and validate ticket QR codes, ensuring a seamless and secure discount redemption process.

## 🚀 Features

- **User Ticketing**: Attendees can generate multiple free tickets without authentication.
- **Discount Management**: Each ticket allows up to `maxUses` discounts at partner venues.
- **Partner Access**: Partners authenticate via BasicAuth to validate tickets.
- **QR Code Scanning**: Efficient ticket validation through QR code scanning.
- **Responsive Design**: Optimized for various devices to ensure usability on-the-go.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Asociatia-AI3/difffusion-ticketing.git
   cd difffusion-ticketing
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and configure the following variables:

   ```env
   NODE_ENV=development
   PORT=3000
   ```

4. **Run the Application**

   ```bash
   npm run start:dev
   ```

   The application will be accessible at `http://localhost:3000`.

## 🧾 Database Schema

The application uses SQLite as its database. Below is the schema resulting from the initial migration:

### Users Table

| Column | Type    | Constraints           |
|--------|---------|-----------------------|
| id     | TEXT    | Primary Key           |
| email  | TEXT    | Not Null, Unique      |
| name   | TEXT    | Not Null              |
| mobile | TEXT    | Not Null              |

### Partners Table

| Column    | Type | Constraints  |
|-----------|------|--------------|
| id        | TEXT | Primary Key  |
| name      | TEXT | Not Null     |
| fiscal_id | TEXT | Not Null     |

### Venues Table

| Column     | Type | Constraints                        |
|------------|------|------------------------------------|
| id         | TEXT | Primary Key                        |
| partner_id | TEXT | Foreign Key (References Partners)  |
| name       | TEXT | Not Null                           |

### Discounts Table

| Column      | Type    | Constraints                        |
|-------------|---------|------------------------------------|
| id          | TEXT    | Primary Key                        |
| name        | TEXT    | Not Null                           |
| percent_off | INTEGER | Not Null                           |
| max_uses    | INTEGER | Not Null, Default: 0               |
| venue_id    | TEXT    | Foreign Key (References Venues)    |

### Tickets Table

| Column  | Type | Constraints                        |
|---------|------|------------------------------------|
| id      | TEXT | Primary Key                        |
| code    | TEXT | Not Null                           |
| user_id | TEXT | Foreign Key (References Users)     |

### TicketUses Table

| Column      | Type | Constraints                          |
|-------------|------|--------------------------------------|
| id          | TEXT | Primary Key                          |
| ticket_id   | TEXT | Foreign Key (References Tickets)     |
| discount_id | TEXT | Foreign Key (References Discounts)   |
| created_at  | INT  | Timestamp                            |

## 🔐 Authentication

- **Attendees**: No authentication required to generate tickets.
- **Partners**: Authenticate using BasicAuth. Credentials are stored securely in an encrypted array within a TypeScript file, not in environment variables.

## 📱 QR Code Scanning

Partners can scan attendee tickets using the built-in QR code scanner. Upon scanning:

1. The application decodes the ticket information.
2. Validates the ticket's authenticity and usage count.
3. Registers the usage if valid, decrementing the remaining discounts.

## 📄 License

This project is licensed under the MIT License.
