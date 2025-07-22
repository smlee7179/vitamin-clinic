#!/bin/bash

# Google Analytics 설정 자동화 스크립트

set -e

echo "🔍 Google Analytics 설정을 시작합니다..."

# 환경 변수 파일 확인
if [ ! -f ".env" ]; then
    echo "❌ .env 파일을 찾을 수 없습니다."
    echo "📝 .env.example을 복사하여 .env 파일을 생성하세요."
    exit 1
fi

# Google Analytics ID 입력 받기
echo ""
echo "📊 Google Analytics 설정"
echo "=========================="
echo "1. https://analytics.google.com/ 에 접속"
echo "2. 계정 생성 또는 기존 계정 선택"
echo "3. 속성 생성 (웹사이트)"
echo "4. 측정 ID (G-XXXXXXXXXX) 복사"
echo ""

read -p "Google Analytics 측정 ID를 입력하세요 (G-XXXXXXXXXX): " GA_ID

# 입력값 검증
if [[ ! $GA_ID =~ ^G-[A-Z0-9]{10}$ ]]; then
    echo "❌ 잘못된 Google Analytics ID 형식입니다."
    echo "올바른 형식: G-XXXXXXXXXX"
    exit 1
fi

# .env 파일 업데이트
echo "📝 .env 파일을 업데이트합니다..."

# 기존 GA ID가 있으면 교체, 없으면 추가
if grep -q "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID" .env; then
    sed -i.bak "s/NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=.*/NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=\"$GA_ID\"/" .env
    echo "✅ 기존 Google Analytics ID를 업데이트했습니다."
else
    echo "" >> .env
    echo "# Google Analytics" >> .env
    echo "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=\"$GA_ID\"" >> .env
    echo "✅ Google Analytics ID를 추가했습니다."
fi

# Google Search Console 설정
echo ""
echo "🔍 Google Search Console 설정"
echo "=============================="
echo "1. https://search.google.com/search-console 에 접속"
echo "2. 속성 추가 (도메인 또는 URL 접두어)"
echo "3. 소유권 확인 (HTML 태그 방식 권장)"
echo ""

read -p "Google Search Console 확인 코드를 입력하세요 (선택사항): " GSC_CODE

if [ ! -z "$GSC_CODE" ]; then
    # layout.tsx 파일에서 확인 코드 업데이트
    if [ -f "src/app/layout.tsx" ]; then
        sed -i.bak "s/your-google-verification-code/$GSC_CODE/" src/app/layout.tsx
        echo "✅ Google Search Console 확인 코드를 업데이트했습니다."
    fi
    
    # .env 파일에 추가
    if ! grep -q "GOOGLE_SEARCH_CONSOLE_VERIFICATION" .env; then
        echo "GOOGLE_SEARCH_CONSOLE_VERIFICATION=\"$GSC_CODE\"" >> .env
        echo "✅ Google Search Console 확인 코드를 .env에 추가했습니다."
    fi
fi

# 설정 확인
echo ""
echo "✅ 설정 완료!"
echo "=========================="
echo "Google Analytics ID: $GA_ID"
if [ ! -z "$GSC_CODE" ]; then
    echo "Search Console 코드: $GSC_CODE"
fi

# 다음 단계 안내
echo ""
echo "📋 다음 단계:"
echo "1. npm run build (프로젝트 빌드)"
echo "2. npm start (개발 서버 시작)"
echo "3. 브라우저에서 Google Analytics 실시간 보고서 확인"
echo "4. 페이지 방문하여 이벤트 추적 확인"

# 백업 파일 정리
rm -f .env.bak src/app/layout.tsx.bak 2>/dev/null || true

echo ""
echo "🎉 Google Analytics 설정이 완료되었습니다!" 