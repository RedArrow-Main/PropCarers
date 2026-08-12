-- Clean slate (safe to re-run)
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "Property" CASCADE;
DROP TABLE IF EXISTS "RentalTransaction" CASCADE;
DROP TABLE IF EXISTS "MaintenanceTransaction" CASCADE;
DROP TABLE IF EXISTS "UtilityBill" CASCADE;
DROP TABLE IF EXISTS "Agreement" CASCADE;
DROP TABLE IF EXISTS "Nominee" CASCADE;
DROP TABLE IF EXISTS "BankAccount" CASCADE;
DROP TABLE IF EXISTS "Issue" CASCADE;
DROP TABLE IF EXISTS "FinanceRecord" CASCADE;
DROP TYPE IF EXISTS "Role" CASCADE;
DROP TYPE IF EXISTS "RentalStatus" CASCADE;
DROP TYPE IF EXISTS "WorkStatus" CASCADE;
DROP TYPE IF EXISTS "BillStatus" CASCADE;

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE IF NOT EXISTS "Role" AS ENUM ('OWNER', 'TENANT', 'ADMIN');

-- CreateEnum
CREATE TYPE IF NOT EXISTS "RentalStatus" AS ENUM ('RENTED', 'VACANT', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE IF NOT EXISTS "WorkStatus" AS ENUM ('Completed', 'UnComplete', 'InProgress');

-- CreateEnum
CREATE TYPE IF NOT EXISTS "BillStatus" AS ENUM ('Paid', 'UnPaid');

-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "contact" TEXT,
    "cnic" TEXT,
    "address" TEXT,
    "avatarUrl" TEXT,
    "country" TEXT,
    "dob" TEXT,
    "role" "Role" DEFAULT 'OWNER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Nominee" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "fatherName" TEXT,
    "relation" TEXT,
    "nationality" TEXT,
    "idCard" TEXT,
    "contact" TEXT,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "Nominee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "BankAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bank" TEXT,
    "branchCode" TEXT,
    "accountNumber" TEXT,
    "iban" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Property" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "monthlyRent" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "status" "RentalStatus" NOT NULL DEFAULT 'VACANT',
    "ownerId" TEXT,
    "detail" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "RentalTransaction" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "invoice" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "bankAccount" TEXT,
    "totalRent" INTEGER NOT NULL,
    "serviceCharges" INTEGER NOT NULL,
    "deposited" INTEGER NOT NULL,

    CONSTRAINT "RentalTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "MaintenanceTransaction" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "invoice" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "description" TEXT,
    "workStatus" "WorkStatus" NOT NULL DEFAULT 'InProgress',
    "billStatus" "BillStatus" NOT NULL DEFAULT 'UnPaid',
    "billAmount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MaintenanceTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "UtilityBill" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "invoice" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "type" TEXT,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "status" "BillStatus" NOT NULL DEFAULT 'UnPaid',

    CONSTRAINT "UtilityBill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Agreement" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "partyName" TEXT,
    "type" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "status" TEXT,
    "rent" INTEGER,
    "documentUrl" TEXT,

    CONSTRAINT "Agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "FinanceRecord" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "FinanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Issue" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "subject" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Nominee_userId_key" ON "Nominee"("userId");

-- AddForeignKey
ALTER TABLE "Nominee" ADD CONSTRAINT "Nominee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalTransaction" ADD CONSTRAINT "RentalTransaction_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceTransaction" ADD CONSTRAINT "MaintenanceTransaction_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilityBill" ADD CONSTRAINT "UtilityBill_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agreement" ADD CONSTRAINT "Agreement_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceRecord" ADD CONSTRAINT "FinanceRecord_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

