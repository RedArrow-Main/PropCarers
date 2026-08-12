import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, signSession, AUTH_COOKIE } from '@/lib/auth';

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const identifier = String(body?.email ?? body?.identifier ?? '').trim().toLowerCase();
  const password = String(body?.password ?? '');

  if (!identifier || !password) {
    return NextResponse.json({ error: 'Email/username and password are required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: identifier }, { username: identifier }] },
    });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signSession({ userId: user.id, email: user.email });
    const res = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    console.error('LOGIN ROUTE ERROR:', e);
    const message = e instanceof Error ? e.message : 'Unknown server error';
    return NextResponse.json({ error: `Server error: ${message}` }, { status: 500 });
  }
}
