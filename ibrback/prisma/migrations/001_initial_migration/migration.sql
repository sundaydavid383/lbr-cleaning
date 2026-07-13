// filepath: ibrback/prisma/migrations/001_initial_migration/migration.sql
-- ============================================
-- LBR Cleaning PostgreSQL Migration
-- Run this after setting up Prisma
-- ============================================

-- Create Subscriber table
CREATE TABLE "Subscriber" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "subscribedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Order table
CREATE TABLE "Order" (
    "id" SERIAL PRIMARY KEY,
    "customerName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "service" VARCHAR(255) NOT NULL,
    "paymentOption" VARCHAR(50) NOT NULL DEFAULT 'PAY_AFTER',
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "paymentStatus" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "paymentId" VARCHAR(255),
    "amount" DECIMAL(10, 2),
    "notes" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Payment table
CREATE TABLE "Payment" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "Order"("id") ON DELETE CASCADE,
    "amount" DECIMAL(10, 2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'NGN',
    "paymentMethod" VARCHAR(50) NOT NULL DEFAULT 'CARD',
    "paymentGateway" VARCHAR(50) NOT NULL DEFAULT 'PAYSTACK',
    "gatewayTransactionId" VARCHAR(255),
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "paymentDate" TIMESTAMP,
    "metadata" JSONB,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for Subscriber
CREATE INDEX "Subscriber_email_idx" ON "Subscriber"("email");
CREATE INDEX "Subscriber_isActive_idx" ON "Subscriber"("isActive");

-- Create indexes for Order
CREATE INDEX "Order_email_idx" ON "Order"("email");
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_paymentStatus_idx" ON "Order"("paymentStatus");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt" DESC);

-- Create indexes for Payment
CREATE INDEX "Payment_orderId_idx" ON "Payment"("orderId");
CREATE INDEX "Payment_status_idx" ON "Payment"("status");
CREATE INDEX "Payment_paymentGateway_idx" ON "Payment"("paymentGateway");
CREATE INDEX "Payment_createdAt_idx" ON "Payment"("createdAt" DESC);

-- Insert sample data (optional)
-- INSERT INTO "Subscriber" (email) VALUES ('test@example.com');