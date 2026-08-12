import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const AUTH_COOKIE = 'pc_token';

const PUBLIC_PATHS = [
  '/',
  '/register',
  '/forgot-password',
  '/new-password',
  '/verify-email',
  '/submit-issue',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let API routes and static assets pass through (API handles its own auth)
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  let valid = false;
  if (token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'propcarers-dev-secret-change-me-in-production-0123456789abcdef'
      );
      await jwtVerify(token, secret);
      valid = true;
    } catch {
      valid = false;
    }
  }

  if (!valid && !isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (valid && (pathname === '/' || pathname === '/register')) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
