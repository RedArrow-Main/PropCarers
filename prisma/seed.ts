import { PrismaClient } from '@prisma/client';
import {
  allProperties,
  rentalTransactions,
  maintenanceTransactions,
  utilityBillTransactions,
} from '../src/lib/properties';

const prisma = new PrismaClient();

const mapWork = (s?: string): 'Completed' | 'UnComplete' | 'InProgress' => {
  if (s === 'Completed') return 'Completed';
  if (s === 'Un-Complete') return 'UnComplete';
  return 'InProgress';
};
const mapBill = (s?: string): 'Paid' | 'UnPaid' => (s === 'Paid' ? 'Paid' : 'UnPaid');

async function main() {
  const email = 'alikhan23@gmail.com';
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        username: 'Alikhan23',
        passwordHash: 'seeded-placeholder',
        firstName: 'Ali',
        lastName: 'Ahmed Khan',
      },
    });
  }

  // Clear previous seeded data for idempotency
  await prisma.property.deleteMany({});

  for (const p of allProperties) {
    const created = await prisma.property.create({
      data: {
        title: p.title,
        address: p.address,
        monthlyRent: p.monthlyRent,
        image: p.image,
        category: p.category,
        status: (p.detail?.status as any) ?? 'VACANT',
        ownerId: user.id,
        detail: p.detail as any,
      },
    });
    const rid = created.id;

    const rts = rentalTransactions[p.id] ?? [];
    if (rts.length) {
      await prisma.rentalTransaction.createMany({
        data: rts.map((r) => ({ ...r, propertyId: rid })),
      });
    }

    const mts = maintenanceTransactions[p.id] ?? [];
    if (mts.length) {
      await prisma.maintenanceTransaction.createMany({
        data: mts.map((m) => ({
          propertyId: rid,
          invoice: m.invoice,
          month: m.month,
          description: m.description,
          workStatus: mapWork(m.workStatus),
          billStatus: mapBill(m.billStatus),
          billAmount: m.billAmount,
        })),
      });
    }

    const uts = utilityBillTransactions[p.id] ?? [];
    if (uts.length) {
      await prisma.utilityBill.createMany({
        data: uts.map((u, i) => ({
          propertyId: rid,
          invoice: `UB-${rid}-${i}`,
          month: u.date,
          type: u.billType,
          amount: u.billAmount,
          status: mapBill(u.billStatus),
        })),
      });
    }
  }

  console.log(`Seeded ${allProperties.length} properties for user ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
