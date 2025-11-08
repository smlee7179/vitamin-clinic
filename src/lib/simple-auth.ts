import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-this'
);

const COOKIE_NAME = 'admin-session';

export interface SessionData {
  userId: string;
  email: string;
  role: string;
}

/**
 * JWT 토큰 생성
 */
export async function createToken(data: SessionData): Promise<string> {
  const token = await new SignJWT(data as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(SECRET);

  return token;
}

/**
 * JWT 토큰 검증
 */
export async function verifyToken(token: string): Promise<SessionData | null> {
  try {
    const verified = await jwtVerify(token, SECRET);
    const payload = verified.payload;

    // Validate payload structure
    if (
      typeof payload.userId === 'string' &&
      typeof payload.email === 'string' &&
      typeof payload.role === 'string'
    ) {
      return {
        userId: payload.userId,
        email: payload.email,
        role: payload.role
      };
    }

    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * 쿠키에서 세션 가져오기
 */
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * 세션 설정 (쿠키에 저장)
 */
export async function setSession(data: SessionData): Promise<string> {
  const token = await createToken(data);

  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  return token;
}

/**
 * 세션 삭제
 */
export async function deleteSession() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * 관리자 권한 확인
 */
export async function requireAdmin(): Promise<SessionData> {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  if (session.role !== 'admin' && session.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }

  return session;
}
