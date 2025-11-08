import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  debug: true, // 프로덕션에서도 디버그 활성화 (문제 해결 후 false로 변경)
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('존재하지 않는 사용자입니다.');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('비밀번호가 올바르지 않습니다.');
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, account }) {
      // 로그인 시 사용자 정보를 토큰에 저장
      if (user) {
        console.log('🔑 JWT callback - User login:', user.email);
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;

        // 명시적으로 만료 시간 설정
        const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
        token.exp = Math.floor(Date.now() / 1000) + maxAge;
        token.iat = Math.floor(Date.now() / 1000);
      }

      // 토큰 갱신 시에도 만료 시간 확인
      if (trigger === 'update' && token.exp && typeof token.exp === 'number') {
        const now = Math.floor(Date.now() / 1000);
        if (token.exp - now < 24 * 60 * 60) { // 24시간 이내 만료 예정
          console.log('🔄 JWT callback - Refreshing token expiration');
          const maxAge = 7 * 24 * 60 * 60;
          token.exp = now + maxAge;
        }
      }

      console.log('🔑 JWT callback - Token:', {
        hasId: !!token.id,
        hasRole: !!token.role,
        email: token.email,
        exp: token.exp && typeof token.exp === 'number' ? new Date(token.exp * 1000).toISOString() : 'not set',
      });

      return token;
    },
    async session({ session, token }) {
      // 토큰에서 세션으로 데이터 복사
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;

        console.log('👤 Session callback - User:', {
          id: session.user.id,
          email: session.user.email,
          role: session.user.role,
        });
      }

      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 세션을 24시간마다 업데이트
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? undefined : undefined,
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.callback-url'
        : 'next-auth.callback-url',
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production'
        ? '__Host-next-auth.csrf-token'
        : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === 'production',
};
