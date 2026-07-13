# LBR Cleaning - MongoDB to PostgreSQL Migration

## Overview

This project has been migrated from **MongoDB (Mongoose)** to **PostgreSQL (Prisma ORM)**.

## Changes Made

### 1. Removed MongoDB Dependencies
- Removed `mongoose` and `mongodb` packages
- Removed MongoDB connection from `app.js`
- Deleted old Mongoose models in `/models` folder

### 2. Added PostgreSQL with Prisma
- Added `@prisma/client` and `prisma` packages
- Created Prisma schema at `prisma/schema.prisma`
- Created database connection at `src/config/database.js`

### 3. Converted Models
| MongoDB (Mongoose) | PostgreSQL (Prisma) |
|-------------------|---------------------|
| `models/subscriber.js` | `src/models/subscriber.js` |
| `models/order.js` | `src/models/order.js` |
| `models/payment.js` | `src/models/payment.js` |

### 4. Converted Controllers
| Old (MongoDB) | New (PostgreSQL) |
|---------------|------------------|
| `controllers/contactController.js` | `src/controllers/contactController.js` |
| `controllers/notifyController.js` | `src/controllers/notifyController.js` |
| `controllers/paymentController.js` | `src/controllers/paymentController.js` |
| `controllers/subsrciberController.js` | `src/controllers/subscriberController.js` |

### 5. Updated Routes
All routes remain unchanged - API endpoints are fully compatible.

## New Folder Structure

```
ibrback/
├── app.js                    # Main Express app (updated)
├── package.json              # Updated dependencies
├── .env                      # Updated environment variables
├── prisma/
│   ├── schema.prisma         # Prisma schema definition
│   └── migrations/
│       └── 001_initial_migration/
│           └── migration.sql # SQL migration script
└── src/
    ├── config/
    │   └── database.js       # Prisma client instance
    ├── models/
    │   ├── subscriber.js    # Subscriber model
    │   ├── order.js         # Order model
    │   └── payment.js      # Payment model
    ├── controllers/
    │   ├── contactController.js
    │   ├── notifyController.js
    │   ├── paymentController.js
    │   └── subscriberController.js
    └── routes/
        ├── contact.js
        ├── notify.js
        ├── payment.js
        └── subscribe.js
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd ibrback
npm install
```

### 2. Configure Database
Update the `.env` file with your PostgreSQL credentials:

```env
# Server Configuration
PORT=5100

# PostgreSQL Database (replace with your actual credentials)
DATABASE_URL="postgresql://postgres:password@localhost:5432/ibr_cleaning?schema=public"

# Email Configuration
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
APPPASSWORD=your_app_password

# Admin Configuration
ADMIN_PASSWORD=your_admin_password
```

### 3. Generate Prisma Client
```bash
npm run prisma:generate
```

### 4. Run Migration
**Option A: Using Prisma (recommended)**
```bash
npm run prisma:migrate
```

**Option B: Using SQL directly**
```bash
psql -U postgres -d ibr_cleaning -f prisma/migrations/001_initial_migration/migration.sql
```

### 5. Start the Server
```bash
npm run dev
```

## API Endpoints (Unchanged)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/welcome` | Welcome message |
| POST | `/appointments/book` | Book an appointment |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/subscribe` | Subscribe to newsletter |
| GET | `/api/subscribe` | Get all subscribers |
| POST | `/api/admin-login` | Admin authentication |
| POST | `/api/send-message` | Send message to subscribers |
| POST | `/api/unsubscribe` | Unsubscribe |
| DELETE | `/api/delete/subscribe` | Delete all subscribers |
| POST | `/api/notify-subscribers` | Send notification |
| POST | `/api/payment/initialize` | Initialize payment |
| POST | `/api/payment/verify` | Verify payment |
| GET | `/api/payment/:paymentId/status` | Get payment status |
| GET | `/api/payment/order/:orderId` | Get order payments |

## Query Conversion Examples

### MongoDB → Prisma/PostgreSQL

| MongoDB | PostgreSQL (Prisma) |
|--------|---------------------|
| `Model.find()` | `prisma.model.findMany()` |
| `Model.findById(id)` | `prisma.model.findUnique({ where: { id } })` |
| `Model.findOne({ email })` | `prisma.model.findUnique({ where: { email } })` |
| `Model.create(data)` | `prisma.model.create({ data })` |
| `Model.findByIdAndUpdate(id, data)` | `prisma.model.update({ where: { id }, data })` |
| `Model.findByIdAndDelete(id)` | `prisma.model.delete({ where: { id } })` |
| `Model.populate()` | Use `include` in Prisma queries |

## Enums in Prisma Schema

```prisma
enum PaymentOption {
  PAY_BEFORE
  PAY_AFTER
}

enum OrderStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum Currency {
  NGN
  USD
  EUR
}

enum PaymentMethod {
  CARD
  BANK_TRANSFER
  CASH
  WALLET
}

enum PaymentGateway {
  STRIPE
  PAYSTACK
  FLUTTERWAVE
  MANUAL
}
```

## Troubleshooting

### Common Issues

1. **Database connection error**
   - Verify `DATABASE_URL` in `.env` is correct
   - Ensure PostgreSQL is running

2. **Prisma client not generated**
   - Run `npm run prisma:generate`

3. **Table already exists**
   - Drop existing tables or use a new database

## Notes

- The old `models/`, `controllers/`, and `routes/` folders can be deleted after migration
- All API endpoints remain unchanged for backward compatibility
- Prisma handles relationships via foreign keys automatically