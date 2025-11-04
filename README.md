# 비타민마취통증의학과의원 웹사이트

병원 웹사이트 및 관리자 시스템

## 🚀 기술 스택

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Prisma ORM (SQLite dev / PostgreSQL prod)
- **Authentication:** NextAuth.js
- **Storage:** Vercel Blob Storage
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## 📋 주요 기능

### 사용자 페이지
- 🏥 병원 소개 및 정보
- 💉 치료방법 안내
- ❓ 자주 묻는 질문 (FAQ)
- 📢 실시간 공지사항 슬라이더
- 📱 반응형 디자인

### 관리자 시스템
- 🔐 NextAuth.js 기반 인증
- 📊 실시간 데이터 관리 대시보드
- 🖼️ 이미지 업로드 (Vercel Blob)
- 📝 콘텐츠 편집 (WYSIWYG)
- 🔄 실시간 미리보기

## 🛠️ 설치 및 실행

### 환경 요구사항
- Node.js 18+
- npm 또는 yarn

### 1. 클론 및 의존성 설치
```bash
git clone https://github.com/smlee7179/vitamin-clinic.git
cd vitamin-clinic
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# 데이터베이스
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# 관리자 계정
ADMIN_EMAIL="admin@vitamin-clinic.com"
ADMIN_PASSWORD="your-password-here"

# Vercel Blob Storage (선택사항)
# BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxx"
```

### 3. 데이터베이스 마이그레이션
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. 관리자 계정 생성
```bash
npx tsx scripts/create-admin.ts
```

### 5. 개발 서버 실행
```bash
npm run dev
```

웹사이트: http://localhost:3000
관리자: http://localhost:3000/admin/new

## 📁 프로젝트 구조

```
vitamin-clinic/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── marquee/       # 공지사항 API
│   │   │   ├── treatments/    # 치료방법 API
│   │   │   ├── faqs/          # FAQ API
│   │   │   ├── content/       # 콘텐츠 API
│   │   │   ├── upload/        # 이미지 업로드 API
│   │   │   └── migrate/       # 데이터 마이그레이션 API
│   │   ├── admin/             # 관리자 페이지
│   │   │   ├── login/         # 로그인
│   │   │   └── new/           # 새 관리자 대시보드
│   │   └── page.tsx           # 메인 페이지
│   ├── components/
│   │   ├── admin/             # 관리자 컴포넌트
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── MarqueeEditor.tsx
│   │   │   ├── TreatmentEditor.tsx
│   │   │   ├── FAQEditor.tsx
│   │   │   ├── HospitalInfoEditor.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── MarqueeSlider.tsx  # 공지사항 슬라이더
│   │   ├── TreatmentSection.tsx
│   │   └── FAQSection.tsx
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   └── auth-helpers.ts    # 인증 헬퍼
│   └── middleware.ts          # NextAuth 미들웨어
├── prisma/
│   └── schema.prisma          # 데이터베이스 스키마
├── scripts/
│   ├── create-admin.ts        # 관리자 생성
│   └── change-password.ts     # 비밀번호 변경
├── DEPLOYMENT.md              # 배포 가이드
└── README.md
```

## 🔐 인증 및 보안

### 관리자 인증
- NextAuth.js 기반 JWT 세션
- 비밀번호 해싱 (bcryptjs)
- 역할 기반 접근 제어 (RBAC)
- 미들웨어 보호된 관리자 라우트

### API 보안
- 모든 수정 API는 인증 필요
- CSRF 보호
- 파일 업로드 검증
- SQL Injection 방지 (Prisma)

### 보안 헤더
- X-Frame-Options
- X-Content-Type-Options
- Content-Security-Policy
- Strict-Transport-Security

## 📝 관리자 사용 가이드

### 로그인
1. `/admin/new` 접속
2. 기본 계정으로 로그인
   - 이메일: `admin@vitamin-clinic.com`
   - 비밀번호: 생성 시 설정한 비밀번호

### 콘텐츠 관리

#### 공지사항 (Marquee)
- 상단 스크롤 공지사항 관리
- 이모지와 텍스트 편집
- 순서 변경 가능

#### 치료방법 (Treatments)
- 치료 이름, 아이콘, 설명 편집
- 치료 특징 추가/삭제
- 실시간 미리보기

#### FAQ
- 질문과 답변 관리
- 순서 변경 (드래그앤드롭)
- 아코디언 UI

#### 병원 정보
- 기본 정보 (이름, 전화, 주소)
- 진료 시간
- 로고 및 히어로 이미지 업로드

### 이미지 업로드
- 지원 형식: JPG, PNG, WebP, GIF
- 최대 크기: 5MB
- Vercel Blob Storage에 저장

## 🚀 배포

자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참조하세요.

### 빠른 배포 (Vercel)

1. Vercel에 프로젝트 연결
```bash
vercel link
```

2. 환경 변수 설정
```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add BLOB_READ_WRITE_TOKEN
```

3. 배포
```bash
vercel --prod
```

## 🔧 유용한 명령어

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm start

# 타입 체크
npm run type-check

# Prisma Studio (DB GUI)
npx prisma studio

# 관리자 생성
npx tsx scripts/create-admin.ts

# 비밀번호 변경
npx tsx scripts/change-password.ts

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 프로덕션 마이그레이션
npx prisma migrate deploy
```

## 📊 데이터베이스 스키마

### User (사용자)
- id, email, password, role, createdAt, updatedAt

### MarqueeNotice (공지사항)
- id, icon, text, order, active, createdAt, updatedAt

### Treatment (치료방법)
- id, title, icon, description, features (JSON), order, active

### FAQ
- id, question, answer, order, active, createdAt, updatedAt

### HospitalContent (병원 콘텐츠)
- id, section, data (JSON), createdAt, updatedAt

## 🐛 트러블슈팅

### 빌드 오류
```bash
rm -rf .next node_modules
npm install
npm run build
```

### 데이터베이스 오류
```bash
npx prisma generate
npx prisma migrate reset
```

### 인증 오류
- NEXTAUTH_SECRET 확인
- NEXTAUTH_URL이 현재 도메인과 일치하는지 확인
- 브라우저 쿠키 삭제

## 📄 라이선스

Private - All Rights Reserved

## 👨‍💻 개발자

- GitHub: [@smlee7179](https://github.com/smlee7179)

## 🤖 기술 지원

문제 발생 시:
1. [Issues](https://github.com/smlee7179/vitamin-clinic/issues) 페이지 확인
2. 로그 확인 (`vercel logs`)
3. DEPLOYMENT.md의 트러블슈팅 섹션 참조

---

**Built with ❤️ using Next.js and Claude Code**
