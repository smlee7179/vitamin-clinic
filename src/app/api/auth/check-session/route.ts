import { NextResponse } from 'next/server';
import { getSession } from '@/lib/simple-auth';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.userId,
        email: session.email,
        role: session.role
      }
    });
  } catch (error) {
    console.error('Error checking session:', error);
    return NextResponse.json({ error: 'Session check failed' }, { status: 401 });
  }
}
