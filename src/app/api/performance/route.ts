import { NextRequest, NextResponse } from 'next/server';
import { SecurityUtils, SecureResponse } from '../../../lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting 체크
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW || '900000');
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');
    
    if (!SecurityUtils.checkRateLimit(clientIP, maxRequests, rateLimitWindow)) {
      return NextResponse.json(
        SecureResponse.error('요청이 너무 많습니다.', 'RATE_LIMIT_EXCEEDED', 429),
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // 성능 데이터 검증
    const { url, loadTime, domContentLoaded, firstContentfulPaint, largestContentfulPaint } = body;
    
    if (!url || typeof loadTime !== 'number') {
      return NextResponse.json(
        SecureResponse.error('잘못된 성능 데이터입니다.', 'INVALID_DATA', 400),
        { status: 400 }
      );
    }

    // 성능 데이터 로깅 (실제로는 데이터베이스에 저장)
    const performanceData = {
      url: SecurityUtils.sanitizeInput(url),
      loadTime,
      domContentLoaded,
      firstContentfulPaint,
      largestContentfulPaint,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: clientIP
    };

    console.log('Performance Data:', SecurityUtils.sanitizeLog(performanceData));

    // 성능 임계값 체크 및 알림
    if (loadTime > 3000) { // 3초 이상
      console.warn(`Slow page load detected: ${url} (${loadTime}ms)`);
    }

    if (largestContentfulPaint > 2500) { // 2.5초 이상
      console.warn(`Poor LCP detected: ${url} (${largestContentfulPaint}ms)`);
    }

    return NextResponse.json(SecureResponse.success(performanceData, '성능 데이터가 기록되었습니다.'));
  } catch (error) {
    console.error('Performance API Error:', SecurityUtils.sanitizeLog(error));
    return NextResponse.json(
      SecureResponse.error('서버 오류가 발생했습니다.', 'INTERNAL_ERROR', 500),
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // IP 주소 확인
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!SecurityUtils.isAllowedAdminIP(clientIP)) {
      return NextResponse.json(
        SecureResponse.error('접근이 거부되었습니다.', 'ACCESS_DENIED', 403),
        { status: 403 }
      );
    }

    // 시스템 성능 정보 반환
    const performanceInfo = {
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      cpu: process.cpuUsage(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0'
    };

    return NextResponse.json(SecureResponse.success(performanceInfo));
  } catch (error) {
    console.error('Performance API Error:', SecurityUtils.sanitizeLog(error));
    return NextResponse.json(
      SecureResponse.error('서버 오류가 발생했습니다.', 'INTERNAL_ERROR', 500),
      { status: 500 }
    );
  }
} 