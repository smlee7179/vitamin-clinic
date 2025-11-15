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

    // Get total sections count
    const totalSections = await prisma.hospitalContent.count();

    // Get last updated date
    const latestContent = await prisma.hospitalContent.findFirst({
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true }
    });

    // Get images count from Vercel Blob
    let imagesCount = 0;
    try {
      const imagesResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/images`);
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        imagesCount = imagesData.images?.length || 0;
      }
    } catch (err) {
      console.error('Failed to fetch images count:', err);
    }

    // Calculate approximate storage used
    const allContent = await prisma.hospitalContent.findMany();
    let totalSize = 0;
    allContent.forEach(item => {
      totalSize += item.data.length;
    });

    return NextResponse.json({
      totalSections,
      lastUpdated: latestContent?.updatedAt.toISOString() || new Date().toISOString(),
      storageUsed: totalSize,
      imagesCount
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
