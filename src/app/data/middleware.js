// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   const url = new URL(request.url);
//   const oldPath = url.pathname.substr(1);
//   return NextResponse.redirect(new URL(`/?coin=${'bitcoin'}`, request.url))
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }