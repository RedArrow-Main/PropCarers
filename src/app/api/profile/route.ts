import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, hashPassword } from '@/lib/auth';

type BankInput = {
  id?: string;
  bank?: string;
  branchCode?: string;
  accountNumber?: string;
  iban?: string;
  status?: string;
};

async function handleUpdate(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const data: any = {};
  for (const key of ['firstName', 'lastName', 'contact', 'cnic', 'address', 'avatarUrl', 'email', 'username'] as const) {
    if (body[key] !== undefined) data[key] = body[key];
  }

  if (body.password !== undefined && body.password) {
    if (String(body.password).length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    data.passwordHash = await hashPassword(String(body.password));
  }

  // Email/username uniqueness guard
  const orConditions: any[] = [];
  if (data.email) orConditions.push({ email: data.email });
  if (data.username) orConditions.push({ username: data.username });
  if (orConditions.length > 0) {
    const clash = await prisma.user.findFirst({
      where: { AND: [{ id: { not: session.userId } }, { OR: orConditions }] },
    });
    if (clash) {
      const field = clash.email === data.email ? 'email' : 'username';
      return NextResponse.json({ error: `A user with this ${field} already exists` }, { status: 409 });
    }
  }

  await prisma.user.update({
    where: { id: session.userId },
    data,
  });

  // Nominee: null => remove, object => upsert
  if (body.nominee === null) {
    await prisma.nominee.deleteMany({ where: { userId: session.userId } });
  } else if (body.nominee) {
    const n = body.nominee;
    await prisma.nominee.upsert({
      where: { userId: session.userId },
      create: {
        userId: session.userId,
        name: n.name ?? null,
        fatherName: n.fatherName ?? null,
        relation: n.relation ?? null,
        nationality: n.nationality ?? null,
        idCard: n.idCard ?? null,
        contact: n.contact ?? null,
        email: n.email ?? null,
        address: n.address ?? null,
      },
      update: {
        name: n.name ?? null,
        fatherName: n.fatherName ?? null,
        relation: n.relation ?? null,
        nationality: n.nationality ?? null,
        idCard: n.idCard ?? null,
        contact: n.contact ?? null,
        email: n.email ?? null,
        address: n.address ?? null,
      },
    });
  }

  // Bank accounts replace
  if (Array.isArray(body.bankAccounts)) {
    const accounts: BankInput[] = body.bankAccounts;
    await prisma.bankAccount.deleteMany({ where: { userId: session.userId } });
    if (accounts.length > 0) {
      await prisma.bankAccount.createMany({
        data: accounts.map((a) => ({
          userId: session.userId,
          bank: a.bank ?? null,
          branchCode: a.branchCode ?? null,
          accountNumber: a.accountNumber ?? null,
          iban: a.iban ?? null,
          status: a.status ?? 'Active',
        })),
      });
    }
  }

  const updated = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { nominee: true, bankAccounts: true },
  });
  const { passwordHash, ...safe } = updated!;
  return NextResponse.json({ user: safe });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { nominee: true, bankAccounts: true },
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { passwordHash, ...safe } = user;
  return NextResponse.json({ user: safe });
}

export const PUT = handleUpdate;
export const PATCH = handleUpdate;
