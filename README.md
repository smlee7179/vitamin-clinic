# 🏥 비타민 의원 홈페이지

> 노인 친화적 정형외과 병원 홈페이지 (Next.js 14 + 라즈베리파이)

## 🎯 프로젝트 특징

- **노인 친화적 설계**: 큰 글자, 높은 대비, 단순한 구조
- **접근성 최우선**: WCAG 2.1 AAA 기준 준수
- **라즈베리파이 최적화**: 저사양 환경에서도 원활한 동작
- **시그니처 컬러**: 주황색 (#ff6b35) 기반 따뜻한 디자인

## 🚀 빠른 시작

### 개발 환경 (로컬)
```bash
npm install
npm run dev
```

### 라즈베리파이 배포
```bash
# 1. 초기 설정
chmod +x deploy/raspberry-pi-setup.sh
./deploy/raspberry-pi-setup.sh

# 2. 프로젝트 클론
git clone https://github.com/your-username/vitamin-clinic.git
cd vitamin-clinic

# 3. 환경 설정
cp .env.example .env.local
nano .env.local

# 4. 의존성 설치 및 빌드
npm ci --only=production
npx prisma generate
npx prisma db push
npm run build

# 5. 서비스 시작
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📱 주요 페이지

- **메인 페이지** (`/`): 병원 소개, 주요 진료과목
- **병원 소개** (`/about`): 원장님 소개, 시설 안내
- **진료과목** (`/services`): 관절염, 척추 질환 등
- **건강 정보** (`/health-info`): 관절 관리법, 운동법
- **공지사항** (`/notices`): 휴진 안내, 병원 소식
- **오시는 길** (`/contact`): 위치, 교통편, 주차 안내

## 🔧 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Next.js API Routes, Prisma ORM, SQLite
- **배포**: PM2, Nginx, 라즈베리파이
- **접근성**: ARIA, 키보드 네비게이션, 스크린 리더 지원

## 📊 성능 최적화

- 이미지 최적화 (WebP, Next.js Image)
- 코드 분할 (Dynamic Imports)
- 라즈베리파이 메모리 최적화
- 캐싱 전략

## 🔄 업데이트 방법

```bash
# 간단한 업데이트
./deploy/update.sh

# 또는 수동 업데이트
git pull origin main
npm run build
pm2 reload all
```

## 📞 접속 정보

- **로컬**: http://localhost:3000
- **라즈베리파이**: http://[라즈베리파이IP]:3000
- **관리자**: http://[주소]/admin

## �� 체크리스트

- [ ] 접근성 테스트 (키보드, 스크린 리더)
- [ ] 모바일 반응형 확인
- [ ] 성능 테스트 (라즈베리파이)
- [ ] 백업 설정
- [ ] 모니터링 설정

