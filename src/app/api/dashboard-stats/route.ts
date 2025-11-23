import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check admin authentication
    const { error } = await requireAdmin();
    if (error) return error;

    // Get notices count and recent count
    const noticesCount = await prisma.notice.count();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentNoticesCount = await prisma.notice.count({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    });

    // Get treatments count
    const treatmentsCount = await prisma.treatment.count({
      where: { active: true },
    });
    const recentTreatmentsCount = await prisma.treatment.count({
      where: {
        active: true,
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    });

    // Get hospital content sections count (services)
    const servicesCount = await prisma.hospitalContent.count();

    // For visitors, we'll use a placeholder since we don't have analytics tracking yet
    // In production, this would connect to Google Analytics or similar
    const visitorsCount = 0;

    return NextResponse.json({
      notices: {
        total: noticesCount,
        recent: recentNoticesCount,
      },
      treatments: {
        total: treatmentsCount,
        recent: recentTreatmentsCount,
      },
      services: {
        total: servicesCount,
        recent: 0,
      },
      visitors: {
        total: visitorsCount,
        recent: 0,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
