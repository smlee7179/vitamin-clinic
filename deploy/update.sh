#!/bin/bash
# 홈페이지 업데이트 스크립트

echo "🔄 비타민 의원 홈페이지 업데이트 시작..."

cd /home/pi/vitamin-clinic

# 현재 실행 중인 서비스 중지
echo "⏹️ 서비스 중지..."
pm2 stop vitamin-clinic

# 최신 코드 가져오기
echo "📥 최신 코드 다운로드..."
git pull origin main

# 의존성 업데이트
echo "📦 패키지 업데이트..."
npm ci --only=production

# 데이터베이스 마이그레이션
echo "🗄️ 데이터베이스 업데이트..."
npx prisma generate
npx prisma db push

# 프로덕션 빌드
echo "🔨 빌드 중..."
npm run build

# 서비스 재시작
echo "🚀 서비스 재시작..."
pm2 start ecosystem.config.js
pm2 save

echo "✅ 업데이트 완료!"
echo "🌐 웹사이트: http://$(hostname -I | awk '{print $1}'):3000"

# 상태 확인
pm2 status
