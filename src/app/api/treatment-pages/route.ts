import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch treatment pages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const treatmentType = searchParams.get('treatmentType');

    if (treatmentType) {
      // Get specific treatment page
      const treatmentPage = await prisma.treatmentPage.findUnique({
        where: { treatmentType }
      });
      return NextResponse.json(treatmentPage || null);
    }

    // Get all treatment pages
    const treatmentPages = await prisma.treatmentPage.findMany({
      orderBy: { treatmentType: 'asc' }
    });
    return NextResponse.json(treatmentPages);
  } catch (error) {
    console.error('Error fetching treatment pages:', error);
    return NextResponse.json({ error: 'Failed to fetch treatment pages' }, { status: 500 });
  }
}

// POST - Create new treatment page
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const treatmentPage = await prisma.treatmentPage.create({
      data: {
        treatmentType: data.treatmentType,
        heroImageUrl: data.heroImageUrl,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        description: data.description,
        treatmentPrograms: data.treatmentPrograms, // JSON string
        advantages: data.advantages // JSON string
      }
    });

    return NextResponse.json(treatmentPage);
  } catch (error) {
    console.error('Error creating treatment page:', error);
    return NextResponse.json({ error: 'Failed to create treatment page' }, { status: 500 });
  }
}

// PUT - Update treatment page
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    const treatmentPage = await prisma.treatmentPage.update({
      where: { treatmentType: data.treatmentType },
      data: {
        heroImageUrl: data.heroImageUrl,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        description: data.description,
        treatmentPrograms: data.treatmentPrograms,
        advantages: data.advantages
      }
    });

    return NextResponse.json(treatmentPage);
  } catch (error) {
    console.error('Error updating treatment page:', error);
    return NextResponse.json({ error: 'Failed to update treatment page' }, { status: 500 });
  }
}

// DELETE - Delete treatment page
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const treatmentType = searchParams.get('treatmentType');

    if (!treatmentType) {
      return NextResponse.json({ error: 'Treatment type required' }, { status: 400 });
    }

    await prisma.treatmentPage.delete({
      where: { treatmentType }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting treatment page:', error);
    return NextResponse.json({ error: 'Failed to delete treatment page' }, { status: 500 });
  }
}
