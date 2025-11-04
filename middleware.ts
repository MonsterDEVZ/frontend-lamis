/**
 * Next.js Middleware
 * Protects routes by checking authentication status
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get auth data from cookies or localStorage simulation
  // Since middleware runs on server, we check cookies
  const authCookie = request.cookies.get('auth-storage');

  let isAuthenticated = false;

  // Parse the cookie if it exists
  if (authCookie) {
    try {
      const authData = JSON.parse(authCookie.value);
      isAuthenticated = authData?.state?.isAuthenticated && authData?.state?.accessToken;
    } catch (e) {
      isAuthenticated = false;
    }
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which routes should be protected
export const config = {
  matcher: [
    '/profile/:path*',
    '/dashboard/:path*',
    // Add more protected routes here
  ],
};
