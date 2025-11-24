/**
 * 이미지 메타데이터 추출 유틸리티
 * 이미지 URL로부터 너비, 높이, 비율을 자동으로 추출합니다.
 */

interface ImageMetadata {
  imageWidth: number;
  imageHeight: number;
  aspectRatio: string;
}

/**
 * 이미지 URL로부터 메타데이터를 추출합니다.
 * @param imageUrl - 이미지 URL
 * @returns 이미지 메타데이터 (너비, 높이, 비율)
 */
export async function extractImageMetadata(imageUrl: string): Promise<ImageMetadata | null> {
  try {
    // 브라우저 환경에서 Image 객체를 사용하여 크기 추출
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const aspectRatio = calculateAspectRatio(width, height);

        resolve({
          imageWidth: width,
          imageHeight: height,
          aspectRatio: aspectRatio
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      // CORS 이슈 방지
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
    });

  } catch (error) {
    console.error('Image metadata extraction failed:', error);
    return null;
  }
}

/**
 * 너비와 높이로부터 표준 비율을 계산합니다.
 * @param width - 이미지 너비
 * @param height - 이미지 높이
 * @returns 비율 문자열 (예: "16:9", "21:9")
 */
export function calculateAspectRatio(width: number, height: number): string {
  const ratio = width / height;

  // 일반적인 표준 비율과 매칭 (오차범위 10%)
  const standardRatios: { [key: string]: number } = {
    '1:1': 1,
    '4:3': 4/3,
    '3:2': 3/2,
    '16:10': 16/10,
    '16:9': 16/9,
    '21:9': 21/9,
    '32:9': 32/9,
    '9:16': 9/16,  // 세로형
  };

  // 가장 가까운 표준 비율 찾기
  let closestRatio = '16:9';  // 기본값
  let minDiff = Infinity;

  for (const [ratioStr, ratioValue] of Object.entries(standardRatios)) {
    const diff = Math.abs(ratio - ratioValue);
    if (diff < minDiff && diff < 0.1) {  // 10% 오차 범위
      minDiff = diff;
      closestRatio = ratioStr;
    }
  }

  // 표준 비율에 맞지 않으면 정확한 비율 반환
  if (minDiff >= 0.1) {
    // 최대공약수로 간단한 비율 계산
    const gcd = getGCD(width, height);
    const simplifiedWidth = width / gcd;
    const simplifiedHeight = height / gcd;

    // 비율이 너무 복잡하면 소수점으로 표현
    if (simplifiedWidth > 50 || simplifiedHeight > 50) {
      return `${ratio.toFixed(2)}:1`;
    }

    return `${simplifiedWidth}:${simplifiedHeight}`;
  }

  return closestRatio;
}

/**
 * 최대공약수 계산 (유클리드 호제법)
 */
function getGCD(a: number, b: number): number {
  return b === 0 ? a : getGCD(b, a % b);
}

/**
 * 비율 문자열을 숫자로 변환 (CSS aspect-ratio용)
 * @param aspectRatio - 비율 문자열 (예: "16:9")
 * @returns 숫자 비율 (예: 1.778)
 */
export function parseAspectRatioToNumber(aspectRatio: string): number {
  const [width, height] = aspectRatio.split(':').map(Number);
  return width / height;
}

/**
 * 이미지 비율에 따라 최적의 표시 비율 반환 (극단적 비율 보정)
 * @param aspectRatio - 원본 비율
 * @returns 최적 표시 비율
 */
export function getOptimalDisplayRatio(aspectRatio: string): string {
  const ratio = parseAspectRatioToNumber(aspectRatio);

  // 너무 넓은 이미지 (파노라마) - 21:9로 제한
  if (ratio > 3) {
    return '21:9';
  }

  // 너무 좁은 이미지 (세로형) - 9:16으로 제한
  if (ratio < 0.5) {
    return '9:16';
  }

  // 정상 범위는 원본 비율 사용
  return aspectRatio;
}
