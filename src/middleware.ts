import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Super admin routes
    if (path.startsWith('/superadmin')) {
      if (token?.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    // SACCO admin routes
    if (path.startsWith('/admin')) {
      if (token?.role !== 'admin' && token?.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    // Owner routes
    if (path.startsWith('/owner')) {
      if (token?.role !== 'owner' && token?.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    // Driver and Conductor routes
    if (path.startsWith('/driver')) {
      if (token?.role !== 'driver' && token?.role !== 'conductor' && token?.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/superadmin/:path*',
    '/admin/:path*',
    '/owner/:path*',
    '/driver/:path*',
    '/dashboard/:path*',
    '/api/saccos/:path*',
    '/api/vehicles/:path*',
    '/api/trips/:path*',
    '/api/users/:path*',
    '/api/stats/:path*',
  ],
};
