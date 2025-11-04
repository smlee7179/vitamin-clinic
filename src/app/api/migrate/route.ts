import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { type, data } = body;

    switch (type) {
      case 'marquee':
        await migrateMarqueeData(data);
        break;
      case 'treatments':
        await migrateTreatmentsData(data);
        break;
      case 'faqs':
        await migrateFAQsData(data);
        break;
      case 'content':
        await migrateContentData(data);
        break;
      default:
        return NextResponse.json({ error: 'Invalid migration type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: `${type} migrated successfully` });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}

async function migrateMarqueeData(data: any[]) {
  await prisma.marqueeNotice.deleteMany();
  await prisma.marqueeNotice.createMany({
    data: data.map((item, index) => ({
      icon: item.icon,
      text: item.text,
      order: index,
      active: true,
    })),
  });
}

async function migrateTreatmentsData(data: any[]) {
  await prisma.treatment.deleteMany();
  await prisma.treatment.createMany({
    data: data.map((item, index) => ({
      title: item.title,
      icon: item.icon,
      description: item.description,
      features: JSON.stringify(item.features),
      order: index,
      active: true,
    })),
  });
}

async function migrateFAQsData(data: any[]) {
  await prisma.fAQ.deleteMany();
  await prisma.fAQ.createMany({
    data: data.map((item, index) => ({
      question: item.question,
      answer: item.answer,
      order: index,
      active: true,
    })),
  });
}

async function migrateContentData(data: any) {
  const sections = Object.keys(data);

  for (const section of sections) {
    await prisma.hospitalContent.upsert({
      where: { section },
      update: { data: JSON.stringify(data[section]) },
      create: {
        section,
        data: JSON.stringify(data[section]),
      },
    });
  }
}
