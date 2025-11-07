import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getAuditLogs, getRecentActivity, getUserActivityStats } from '@/lib/auditLog';

// Edge runtime은 Prisma를 지원하지 않으므로 Node.js runtime 사용
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId');
    const entityType = searchParams.get('entityType');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Handle different actions
    if (action === 'recent') {
      const logs = await getRecentActivity(limit);
      return NextResponse.json({ logs });
    }

    if (action === 'stats' && userId) {
      const stats = await getUserActivityStats(userId);
      return NextResponse.json({ stats });
    }

    // Default: get audit logs with filters
    const result = await getAuditLogs({
      userId: userId || undefined,
      entityType: entityType || undefined,
      limit,
      offset,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
