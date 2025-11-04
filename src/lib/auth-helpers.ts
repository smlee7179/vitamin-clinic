import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { NextResponse } from 'next/server';

/**
 * Check if the current user is authenticated as an admin
 * Returns the session if authenticated, otherwise returns an error response
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      error: NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      ),
      session: null,
    };
  }

  if (session.user.role !== 'admin') {
    return {
      error: NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      ),
      session: null,
    };
  }

  return { error: null, session };
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
