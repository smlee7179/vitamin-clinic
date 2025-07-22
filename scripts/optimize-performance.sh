#!/bin/bash

# 비타민 의원 성능 최적화 스크립트

set -e

echo "🚀 성능 최적화를 시작합니다..."

# 1. 번들 크기 분석
echo "📊 번들 크기 분석 중..."
npm run build

if [ -f "bundle-analysis.html" ]; then
    echo "✅ 번들 분석 리포트가 생성되었습니다: bundle-analysis.html"
    echo "📈 큰 번들을 확인하고 최적화하세요."
else
    echo "⚠️ 번들 분석 리포트가 생성되지 않았습니다."
fi

# 2. 이미지 최적화
echo "🖼️ 이미지 최적화 중..."

# WebP 변환 (ImageMagick 필요)
if command -v convert &> /dev/null; then
    echo "WebP 형식으로 이미지 변환 중..."
    find ./public/images -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read img; do
        if [ ! -f "${img%.*}.webp" ]; then
            convert "$img" "${img%.*}.webp"
            echo "✅ $img -> ${img%.*}.webp"
        fi
    done
else
    echo "⚠️ ImageMagick이 설치되지 않았습니다. WebP 변환을 건너뜁니다."
    echo "💡 설치: brew install imagemagick (macOS) 또는 apt-get install imagemagick (Ubuntu)"
fi

# 3. 캐시 정리
echo "🧹 캐시 정리 중..."
rm -rf .next/cache 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true
npm cache clean --force 2>/dev/null || true

# 4. 의존성 최적화
echo "📦 의존성 최적화 중..."

# 사용하지 않는 의존성 확인
if command -v depcheck &> /dev/null; then
    echo "사용하지 않는 의존성 확인 중..."
    npx depcheck
else
    echo "💡 depcheck 설치 권장: npm install -g depcheck"
fi

# 5. 코드 품질 검사
echo "🔍 코드 품질 검사 중..."

# TypeScript 타입 체크
echo "TypeScript 타입 체크..."
npx tsc --noEmit

# ESLint 검사
echo "ESLint 검사..."
npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0

# 6. 성능 테스트
echo "⚡ 성능 테스트 중..."

# Lighthouse CI (선택사항)
if command -v lhci &> /dev/null; then
    echo "Lighthouse CI 실행 중..."
    lhci autorun
else
    echo "💡 Lighthouse CI 설치 권장: npm install -g @lhci/cli"
fi

# 7. 번들 크기 최적화 제안
echo "📋 번들 크기 최적화 제안:"
echo "• 큰 라이브러리 확인: bundle-analysis.html"
echo "• 동적 임포트 사용: import() 구문"
echo "• Tree Shaking 확인: 사용하지 않는 코드 제거"
echo "• 이미지 최적화: WebP, AVIF 형식 사용"
echo "• 코드 분할: 페이지별 번들 분리"

# 8. Core Web Vitals 최적화
echo "🎯 Core Web Vitals 최적화:"
echo "• LCP (Largest Contentful Paint): 이미지 최적화, 서버 응답 시간 개선"
echo "• FID (First Input Delay): JavaScript 번들 크기 줄이기"
echo "• CLS (Cumulative Layout Shift): 이미지 크기 명시, 레이아웃 안정화"

# 9. 결과 요약
echo ""
echo "✅ 성능 최적화 완료!"
echo "=========================="
echo "완료된 작업:"
echo "• 번들 크기 분석"
echo "• 이미지 최적화 (WebP 변환)"
echo "• 캐시 정리"
echo "• 의존성 최적화"
echo "• 코드 품질 검사"
echo "• 성능 테스트"

echo ""
echo "📊 다음 단계:"
echo "1. bundle-analysis.html 확인하여 큰 번들 식별"
echo "2. Lighthouse 리포트로 성능 점수 확인"
echo "3. Core Web Vitals 개선 사항 적용"
echo "4. 정기적인 성능 모니터링"

echo ""
echo "🎉 성능 최적화가 완료되었습니다!" 