import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const properties = await prisma.property.findMany({
    orderBy: { id: 'asc' },
    include: {
      rentalTransactions: true,
      maintenanceTransactions: true,
      utilityBills: true,
    },
  });

  const allProperties = properties.map((p) => ({
    id: p.id,
    title: p.title,
    address: p.address,
    monthlyRent: p.monthlyRent,
    image: p.image,
    category: p.category,
    detail: p.detail,
  }));

  const rentalTransactions: Record<number, any[]> = {};
  const maintenanceTransactions: Record<number, any[]> = {};
  const utilityBillTransactions: Record<number, any[]> = {};

  for (const p of properties) {
    rentalTransactions[p.id] = p.rentalTransactions.map((t) => ({
      invoice: t.invoice,
      month: t.month,
      bankAccount: t.bankAccount,
      totalRent: t.totalRent,
      serviceCharges: t.serviceCharges,
      deposited: t.deposited,
    }));
    maintenanceTransactions[p.id] = p.maintenanceTransactions.map((t) => ({
      invoice: t.invoice,
      month: t.month,
      description: t.description,
      workStatus: t.workStatus,
      billStatus: t.billStatus,
      billAmount: t.billAmount,
    }));
    utilityBillTransactions[p.id] = p.utilityBills.map((t) => ({
      date: t.month,
      billType: t.type,
      billStatus: t.status === 'Paid' ? 'Paid' : 'Un-Paid',
      billAmount: t.amount,
    }));
  }

  return NextResponse.json({
    allProperties,
    rentalTransactions,
    maintenanceTransactions,
    utilityBillTransactions,
  });
}
