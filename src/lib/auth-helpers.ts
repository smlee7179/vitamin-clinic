import { NextResponse } from 'next/server';
import { getSession } from '@/lib/simple-auth';

/**
 * Check if the current user is authenticated as an admin
 * Returns the session if authenticated, otherwise returns an error response
 */
export async function requireAdmin() {
  try {
    // 세션 가져오기
    const session = await getSession();

    console.log('🔐 requireAdmin - Session check:', {
      hasSession: !!session,
      userEmail: session?.email,
      userRole: session?.role,
    });

    if (!session) {
      console.error('❌ No session found');
      return {
        error: NextResponse.json(
          { error: 'Unauthorized - Please login' },
          { status: 401 }
        ),
        session: null,
      };
    }

    if (session.role !== 'admin' && session.role !== 'ADMIN') {
      console.error('❌ User is not admin:', session.role);
      return {
        error: NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        ),
        session: null,
      };
    }

    console.log('✅ Admin authentication successful');
    return { error: null, session };
  } catch (error) {
    console.error('❌ Error in requireAdmin:', error);
    return {
      error: NextResponse.json(
        { error: 'Authentication error', details: error instanceof Error ? error.message : 'Unknown' },
        { status: 500 }
      ),
      session: null,
    };
  }
}

/**
 * Wrapper function to protect API routes
 * Usage:
 * export const POST = withAuth(async (request, session) => {
 *   // Your handler code here
 * });
 */
export function withAuth(
  handler: (request: Request, session: any) => Promise<Response>
) {
  return async (request: Request) => {
    const { error, session } = await requireAdmin();

    if (error) {
      return error;
    }

    return handler(request, session);
  };
}
