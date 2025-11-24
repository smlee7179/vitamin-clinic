import { NextRequest, NextResponse } from 'next/server';

/**
 * 이미지 메타데이터 추출 API
 * POST /api/image-metadata
 * Body: { imageUrl: string }
 * Returns: { imageWidth, imageHeight, aspectRatio }
 */
export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'imageUrl is required' },
        { status: 400 }
      );
    }

    // 이미지 크기 추출 (서버 사이드)
    const metadata = await extractImageMetadataServer(imageUrl);

    if (!metadata) {
      return NextResponse.json(
        { error: 'Failed to extract image metadata' },
        { status: 500 }
      );
    }

    return NextResponse.json(metadata);

  } catch (error) {
    console.error('Image metadata API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * 서버 사이드 이미지 메타데이터 추출
 */
async function extractImageMetadataServer(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 이미지 타입 감지 및 크기 추출
    const { width, height } = await getImageDimensions(buffer);

    const aspectRatio = calculateAspectRatio(width, height);

    return {
      imageWidth: width,
      imageHeight: height,
      aspectRatio: aspectRatio
    };

  } catch (error) {
    console.error('Server-side metadata extraction failed:', error);
    return null;
  }
}

/**
 * Buffer로부터 이미지 크기 추출
 */
async function getImageDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
  // PNG
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }

  // JPEG
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xFF) break;

      const marker = buffer[offset + 1];
      const size = buffer.readUInt16BE(offset + 2);

      if (marker === 0xC0 || marker === 0xC2) {
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        return { width, height };
      }

      offset += size + 2;
    }
  }

  // WebP
  if (buffer.slice(8, 12).toString() === 'WEBP') {
    const width = buffer.readUInt16LE(26) + 1;
    const height = buffer.readUInt16LE(28) + 1;
    return { width, height };
  }

  // GIF
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    const width = buffer.readUInt16LE(6);
    const height = buffer.readUInt16LE(8);
    return { width, height };
  }

  throw new Error('Unsupported image format');
}

/**
 * 비율 계산
 */
function calculateAspectRatio(width: number, height: number): string {
  const ratio = width / height;

  const standardRatios: { [key: string]: number } = {
    '1:1': 1,
    '4:3': 4/3,
    '3:2': 3/2,
    '16:10': 16/10,
    '16:9': 16/9,
    '21:9': 21/9,
    '32:9': 32/9,
    '9:16': 9/16,
  };

  let closestRatio = '16:9';
  let minDiff = Infinity;

  for (const [ratioStr, ratioValue] of Object.entries(standardRatios)) {
    const diff = Math.abs(ratio - ratioValue);
    if (diff < minDiff && diff < 0.1) {
      minDiff = diff;
      closestRatio = ratioStr;
    }
  }

  if (minDiff >= 0.1) {
    const gcd = getGCD(width, height);
    return `${width / gcd}:${height / gcd}`;
  }

  return closestRatio;
}

function getGCD(a: number, b: number): number {
  return b === 0 ? a : getGCD(b, a % b);
}
