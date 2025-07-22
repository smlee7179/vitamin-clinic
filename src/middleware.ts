import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // 보안 헤더 설정
  const securityHeaders = {
    // XSS 방지
    'X-XSS-Protection': '1; mode=block',
    // MIME 타입 스니핑 방지
    'X-Content-Type-Options': 'nosniff',
    // 클릭재킹 방지
    'X-Frame-Options': 'DENY',
    // HTTPS 강제
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    // 리퍼러 정책
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // 권한 정책
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    // 콘텐츠 보안 정책
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self'",
      "connect-src 'self' https://www.google-analytics.com",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; '),
  }

  // 헤더 추가
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // 관리자 페이지 접근 제한 (IP 화이트리스트)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const allowedIPs = process.env.ALLOWED_ADMIN_IPS?.split(',') || ['127.0.0.1', '::1']
    
    if (!allowedIPs.includes(clientIP)) {
      return new NextResponse('Access Denied', { status: 403 })
    }
  }

  // API 요청 제한 (Rate Limiting)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitKey = `rate_limit:${clientIP}`
    
    // 간단한 메모리 기반 rate limiting (실제로는 Redis 사용 권장)
    // 여기서는 예시로만 구현
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 