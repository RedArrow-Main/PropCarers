import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signSession, AUTH_COOKIE } from '@/lib/auth';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = String(body?.email ?? '').trim().toLowerCase();
  const password = String(body?.password ?? '');
  let username = String(body?.username ?? '').trim();
  const firstName = body?.firstName ? String(body.firstName) : null;
  const lastName = body?.lastName ? String(body.lastName) : null;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }
  if (!password || password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  }

  // Derive a username from the email if one wasn't supplied
  if (!username) {
    const base = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');
    username = base.length >= 3 ? base : base + Math.random().toString(36).slice(2, 6);
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  if (existing) {
    const field = existing.email === email ? 'email' : 'username';
    return NextResponse.json({ error: `A user with this ${field} already exists` }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, username, passwordHash, firstName, lastName },
  });

  const token = await signSession({ userId: user.id, email: user.email });
  const res = NextResponse.json(
    {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
    { status: 201 }
  );
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
