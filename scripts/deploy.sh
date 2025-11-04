#!/bin/bash

# Vercel 자동 배포 스크립트

echo "🚀 Vercel 배포를 시작합니다..."

# Vercel 토큰이 설정되어 있는지 확인
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ VERCEL_TOKEN 환경 변수가 설정되지 않았습니다."
    echo ""
    echo "토큰 설정 방법:"
    echo "1. https://vercel.com/account/tokens 에서 토큰 생성"
    echo "2. export VERCEL_TOKEN='your-token-here' 실행"
    echo "3. 이 스크립트를 다시 실행"
    exit 1
fi

# 프로젝트 디렉토리로 이동
cd "$(dirname "$0")/.." || exit 1

# Git 상태 확인
echo "📋 Git 상태 확인 중..."
if [[ -n $(git status -s) ]]; then
    echo "⚠️  커밋되지 않은 변경사항이 있습니다:"
    git status -s
    echo ""
    read -p "계속 진행하시겠습니까? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 최신 코드 push 확인
echo "📤 GitHub에 push 여부 확인 중..."
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "⚠️  로컬 커밋이 원격 저장소와 다릅니다."
    read -p "GitHub에 push하시겠습니까? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push
    fi
fi

# 빌드 테스트
echo "🔨 프로덕션 빌드 테스트 중..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 빌드 실패! 배포를 중단합니다."
    exit 1
fi

echo "✅ 빌드 성공!"

# Vercel 배포
echo "🚀 Vercel에 배포 중..."
vercel --token "$VERCEL_TOKEN" --prod --yes

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 배포 완료!"
    echo "🔗 배포된 사이트를 확인하세요."

    # 배포 URL 가져오기
    DEPLOY_URL=$(vercel --token "$VERCEL_TOKEN" ls --prod | grep vitamin-clinic | head -1 | awk '{print $2}')
    if [ -n "$DEPLOY_URL" ]; then
        echo "📱 URL: https://$DEPLOY_URL"
    fi
else
    echo "❌ 배포 실패!"
    exit 1
fi
