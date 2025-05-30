import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || localStorage.getItem('token')
  const protectedPaths = ['/application']

  if (protectedPaths.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/application/:path*'],
}