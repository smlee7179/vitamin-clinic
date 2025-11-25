import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch contact info
export async function GET() {
  try {
    const info = await prisma.hospitalInfo.findFirst();
    return NextResponse.json(info);
  } catch (error) {
    console.error('GET /api/contact-info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    );
  }
}

// POST: Create new contact info
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      hospitalName,
      address,
      phone,
      fax,
      email,
      mapImageUrl,
      busInfo,
      subwayInfo
    } = body;

    // Since HospitalInfo should be a singleton, check if one exists
    const existing = await prisma.hospitalInfo.findFirst();
    if (existing) {
      return NextResponse.json(
        { error: 'Contact info already exists. Use PUT to update.' },
        { status: 400 }
      );
    }

    const info = await prisma.hospitalInfo.create({
      data: {
        hospitalName: hospitalName || '',
        address,
        phone,
        fax: fax || null,
        email: email || null,
        mapImageUrl: mapImageUrl || null,
        busInfo: busInfo || null,
        subwayInfo: subwayInfo || null
      }
    });

    return NextResponse.json(info);
  } catch (error) {
    console.error('POST /api/contact-info error:', error);
    return NextResponse.json(
      { error: 'Failed to create contact info' },
      { status: 500 }
    );
  }
}

// PUT: Update existing contact info
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      hospitalName,
      address,
      phone,
      fax,
      email,
      mapImageUrl,
      busInfo,
      subwayInfo
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Info ID is required' },
        { status: 400 }
      );
    }

    const info = await prisma.hospitalInfo.update({
      where: { id },
      data: {
        hospitalName: hospitalName || '',
        address,
        phone,
        fax: fax || null,
        email: email || null,
        mapImageUrl: mapImageUrl || null,
        busInfo: busInfo || null,
        subwayInfo: subwayInfo || null
      }
    });

    return NextResponse.json(info);
  } catch (error) {
    console.error('PUT /api/contact-info error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    );
  }
}
