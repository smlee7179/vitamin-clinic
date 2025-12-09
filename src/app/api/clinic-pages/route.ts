import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch clinic pages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clinicType = searchParams.get('clinicType');

    if (clinicType) {
      // Get specific clinic page
      const clinicPage = await prisma.clinicPage.findUnique({
        where: { clinicType }
      });
      return NextResponse.json(clinicPage || null);
    }

    // Get all clinic pages
    const clinicPages = await prisma.clinicPage.findMany({
      orderBy: { clinicType: 'asc' }
    });
    return NextResponse.json(clinicPages);
  } catch (error) {
    console.error('Error fetching clinic pages:', error);
    return NextResponse.json({ error: 'Failed to fetch clinic pages' }, { status: 500 });
  }
}

// POST - Create new clinic page
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const clinicPage = await prisma.clinicPage.create({
      data: {
        clinicType: data.clinicType,
        heroImageUrl: data.heroImageUrl,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        description: data.description,
        features: data.features, // JSON string
        targetPatients: data.targetPatients, // JSON string
        symptoms: data.symptoms, // JSON string
        treatmentMethods: data.treatmentMethods // JSON string
      }
    });

    return NextResponse.json(clinicPage);
  } catch (error) {
    console.error('Error creating clinic page:', error);
    return NextResponse.json({ error: 'Failed to create clinic page' }, { status: 500 });
  }
}

// PUT - Update clinic page
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    const clinicPage = await prisma.clinicPage.update({
      where: { clinicType: data.clinicType },
      data: {
        heroImageUrl: data.heroImageUrl,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        description: data.description,
        features: data.features,
        targetPatients: data.targetPatients,
        symptoms: data.symptoms,
        treatmentMethods: data.treatmentMethods
      }
    });

    return NextResponse.json(clinicPage);
  } catch (error) {
    console.error('Error updating clinic page:', error);
    return NextResponse.json({ error: 'Failed to update clinic page' }, { status: 500 });
  }
}

// DELETE - Delete clinic page
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clinicType = searchParams.get('clinicType');

    if (!clinicType) {
      return NextResponse.json({ error: 'Clinic type required' }, { status: 400 });
    }

    await prisma.clinicPage.delete({
      where: { clinicType }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting clinic page:', error);
    return NextResponse.json({ error: 'Failed to delete clinic page' }, { status: 500 });
  }
}
