import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/simple-auth'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public API endpoints (GET only for displaying content on homepage)
  const publicAPIs = [
    '/api/content',
    '/api/treatments',
    '/api/faqs',
    '/api/marquee',
    '/api/health',
    '/api/system-info',
    '/api/doctors',         // Public doctors list
    '/api/hero-slides',     // Public hero slides
    '/api/popups',          // Public popups
    '/api/notices',         // Public notices
    '/api/hospital-info',   // Public hospital info (header/footer)
    '/api/greeting',        // Public greeting message (doctors page)
    '/api/services',        // Public services/clinics info
    '/api/clinic-pages',    // Public clinic pages content
    '/api/treatment-pages', // Public treatment pages content
    '/api/page-hero',       // Public page hero sections
    '/api/equipment',       // Public equipment info
    '/api/hospital-tour',   // Public hospital tour images (about page)
    '/api/doctor-schedule', // Public doctor schedules (doctors page)
    '/api/unified-schedule', // Public unified schedule (hours page)
    '/manifest.json',       // PWA manifest
  ];

  // Check if this is a public API GET request
  const isPublicAPIGet = publicAPIs.some(api => path.startsWith(api)) && request.method === 'GET';

  // Check if this is admin login endpoint
  const isAuthEndpoint = path.startsWith('/api/auth/');

  // 관리자 페이지 및 API 인증 체크
  const needsAuth = (path.startsWith('/admin') || path.startsWith('/api/')) &&
                    !isPublicAPIGet &&
                    !isAuthEndpoint;

  if (needsAuth) {
    // 로그인 페이지는 인증 불필요
    if (path === '/admin/login') {
      return NextResponse.next()
    }

    // JWT 토큰 확인
    const token = request.cookies.get('admin-session')?.value;

    if (!token) {
      // 인증되지 않은 경우 로그인 페이지로 리디렉션 (admin) 또는 401 (API)
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return new NextResponse('Unauthorized', { status: 401 })
      }
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // 토큰 검증
    const session = await verifyToken(token);

    if (!session) {
      // 유효하지 않은 토큰
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return new NextResponse('Unauthorized', { status: 401 })
      }
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // 관리자 권한 체크
    if (session.role !== 'ADMIN' && session.role !== 'admin') {
      return new NextResponse('Access Denied', { status: 403 })
    }
  }

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
      "connect-src 'self' https://www.google-analytics.com https://vercel.com https://*.blob.vercel-storage.com",
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

  // 관리자 페이지 접근 제한 (IP 화이트리스트) - 임시 비활성화
  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  //   const allowedIPs = process.env.ALLOWED_ADMIN_IPS?.split(',') || ['127.0.0.1', '::1']
  //   
  //   if (!allowedIPs.includes(clientIP)) {
  //     return new NextResponse('Access Denied', { status: 403 })
  //   }
  // }

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
     * Only match admin pages and API routes
     * Explicitly exclude static assets and public pages
     */
    '/admin/:path*',
    '/api/:path*',
  ],
} 