import { NextResponse } from 'next/server';
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.rewrite(new URL('/', request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|placeholder*|favicon*|).*)',
  ],
};
