import { NextRequest, NextResponse } from 'next/server';
import { SecurityUtils, SecureResponse } from '../../../lib/security';

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

    // Rate Limiting 체크
    const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW || '900000');
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');
    
    if (!SecurityUtils.checkRateLimit(clientIP, maxRequests, rateLimitWindow)) {
      return NextResponse.json(
        SecureResponse.error('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.', 'RATE_LIMIT_EXCEEDED', 429),
        { status: 429 }
      );
    }

    // 시스템 정보 반환 (보안을 위해 제한된 정보만)
    const systemInfo = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV
    };

    return NextResponse.json(SecureResponse.success(systemInfo));
  } catch (error) {
    console.error('Admin API Error:', SecurityUtils.sanitizeLog(error));
    return NextResponse.json(
      SecureResponse.error('서버 오류가 발생했습니다.', 'INTERNAL_ERROR', 500),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // IP 주소 확인
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!SecurityUtils.isAllowedAdminIP(clientIP)) {
      return NextResponse.json(
        SecureResponse.error('접근이 거부되었습니다.', 'ACCESS_DENIED', 403),
        { status: 403 }
      );
    }

    // Rate Limiting 체크
    const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW || '900000');
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');
    
    if (!SecurityUtils.checkRateLimit(clientIP, maxRequests, rateLimitWindow)) {
      return NextResponse.json(
        SecureResponse.error('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.', 'RATE_LIMIT_EXCEEDED', 429),
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // 입력값 sanitization
    const sanitizedBody = Object.keys(body).reduce((acc, key) => {
      if (typeof body[key] === 'string') {
        acc[key] = SecurityUtils.sanitizeInput(body[key]);
      } else {
        acc[key] = body[key];
      }
      return acc;
    }, {} as any);

    // 여기에 실제 관리자 기능 구현
    return NextResponse.json(SecureResponse.success(sanitizedBody, '처리되었습니다.'));
  } catch (error) {
    console.error('Admin API Error:', SecurityUtils.sanitizeLog(error));
    return NextResponse.json(
      SecureResponse.error('서버 오류가 발생했습니다.', 'INTERNAL_ERROR', 500),
      { status: 500 }
    );
  }
} 