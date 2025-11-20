# 비타민마취통증의학과의원 프로젝트 통합 문서

> 마지막 업데이트: 2025-01-19
>
> 이 문서는 프로젝트의 모든 설명서와 가이드를 통합한 종합 문서입니다.

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [설치 및 실행](#3-설치-및-실행)
4. [프로젝트 구조](#4-프로젝트-구조)
5. [배포 가이드](#5-배포-가이드)
6. [보안 설정](#6-보안-설정)
7. [SEO 최적화](#7-seo-최적화)
8. [성능 모니터링](#8-성능-모니터링)
9. [관리자 가이드](#9-관리자-가이드)
10. [스크립트 및 자동화](#10-스크립트-및-자동화)
11. [트러블슈팅](#11-트러블슈팅)

---

## 1. 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: 비타민마취통증의학과의원 웹사이트
- **설명**: 병원 웹사이트 및 관리자 시스템
- **개발자**: [@smlee7179](https://github.com/smlee7179)
- **저장소**: https://github.com/smlee7179/vitamin-clinic

### 주요 기능

#### 사용자 페이지
- 병원 소개 및 정보
- 치료방법 안내
- 자주 묻는 질문 (FAQ)
- 실시간 공지사항 슬라이더
- 반응형 디자인

#### 관리자 시스템
- NextAuth.js 기반 인증
- 실시간 데이터 관리 대시보드
- 이미지 업로드 (Vercel Blob)
- 콘텐츠 편집
- 실시간 미리보기

---

## 2. 기술 스택

### 프론트엔드
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React 18

### 백엔드
- **Database**: Prisma ORM
  - Development: SQLite
  - Production: PostgreSQL (Vercel Postgres)
- **Authentication**: NextAuth.js
- **Storage**: Vercel Blob Storage

### 배포
- **Platform**: Vercel
- **CI/CD**: GitHub Actions (자동 배포)

---

## 3. 설치 및 실행

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
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxx"

# 병원 정보
HOSPITAL_NAME="비타민 의원"
HOSPITAL_PHONE="051-469-7581"
HOSPITAL_ADDRESS="부산광역시 동구 중앙대로 375"
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

- 웹사이트: http://localhost:3000
- 관리자: http://localhost:3000/admin/login

### 유용한 명령어

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm start

# Prisma Studio (DB GUI)
npx prisma studio

# 관리자 생성
npx tsx scripts/create-admin.ts

# 비밀번호 변경
npx tsx scripts/change-password.ts
```

---

## 4. 프로젝트 구조

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
│   │   │   └── upload/        # 이미지 업로드 API
│   │   ├── admin/             # 관리자 페이지
│   │   └── page.tsx           # 메인 페이지
│   ├── components/
│   │   ├── admin/             # 관리자 컴포넌트
│   │   ├── modern/            # 메인 페이지 컴포넌트
│   │   └── seo/               # SEO 컴포넌트
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       └── auth-helpers.ts    # 인증 헬퍼
├── prisma/
│   └── schema.prisma          # 데이터베이스 스키마
├── scripts/                   # 유틸리티 스크립트
├── docs/                      # 상세 문서
└── public/                    # 정적 파일
```

### 데이터베이스 스키마

#### User (사용자)
- id, email, password, role, createdAt, updatedAt

#### MarqueeNotice (공지사항)
- id, icon, text, order, active, createdAt, updatedAt

#### Treatment (치료방법)
- id, title, icon, description, features (JSON), order, active

#### FAQ
- id, question, answer, order, active, createdAt, updatedAt

#### HospitalContent (병원 콘텐츠)
- id, section, data (JSON), createdAt, updatedAt

#### Gallery (갤러리)
- id, imageUrl, caption, order, active

---

## 5. 배포 가이드

### Vercel 배포

#### 1단계: Vercel 프로젝트 생성
1. https://vercel.com 접속 및 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 `smlee7179/vitamin-clinic` 선택 및 Import

#### 2단계: 환경 변수 설정

Vercel 프로젝트 설정 페이지에서 다음 환경 변수들을 추가:

```bash
# NextAuth 보안 키
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="https://your-domain.vercel.app"

# 관리자 계정
ADMIN_EMAIL="admin@vitamin-clinic.com"
ADMIN_PASSWORD="change-this-password"

# 병원 정보
HOSPITAL_NAME="비타민마취통증의학과"
HOSPITAL_PHONE="051-469-7581"
HOSPITAL_ADDRESS="부산광역시 동구 중앙대로 375"
```

#### 3단계: Vercel Add-ons 추가

**A. Vercel Postgres**
1. Vercel 프로젝트의 Storage 탭으로 이동
2. "Create Database" 클릭
3. "Postgres" 선택
4. 자동으로 환경 변수 추가됨: `DATABASE_URL`

**B. Vercel Blob Storage**
1. Vercel 프로젝트의 Storage 탭으로 이동
2. "Create Store" 클릭
3. "Blob" 선택
4. 자동으로 환경 변수 추가됨: `BLOB_READ_WRITE_TOKEN`

#### 4단계: 배포 시작
"Deploy" 버튼을 클릭하여 배포 시작

#### 5단계: 데이터베이스 초기화

배포 후 다음 URL을 브라우저에서 호출:
```
https://your-project.vercel.app/api/admin
```

#### 6단계: 배포 확인
1. 배포된 URL로 접속
2. `/admin/login`으로 이동하여 관리자 로그인 테스트

### 배포 체크리스트

**배포 전**
- [ ] 모든 환경 변수가 Vercel에 설정되어 있음
- [ ] Blob Storage가 생성되고 연결되어 있음
- [ ] 데이터베이스가 설정되어 있음
- [ ] 로컬에서 테스트 완료

**배포 후**
- [ ] 메인 페이지가 정상적으로 로드됨
- [ ] 관리자 로그인 성공
- [ ] 이미지 업로드 테스트 성공
- [ ] 데이터 CRUD 테스트 성공

### 커스텀 도메인 설정

1. Vercel 프로젝트의 Settings > Domains 탭으로 이동
2. "Add Domain" 클릭
3. 소유한 도메인 입력
4. DNS 레코드 설정 안내를 따라 진행
5. SSL 인증서가 자동으로 발급됨

---

## 6. 보안 설정

### 구현된 보안 기능

#### 보안 헤더
- **X-Frame-Options**: 클릭재킹 방지
- **X-Content-Type-Options**: MIME 타입 스니핑 방지
- **X-XSS-Protection**: XSS 공격 방지
- **Strict-Transport-Security**: HTTPS 강제
- **Content-Security-Policy**: 리소스 로딩 제한
- **Referrer-Policy**: 리퍼러 정보 제한
- **Permissions-Policy**: 브라우저 기능 제한

#### 인증 및 권한 관리
- NextAuth.js 기반 JWT 세션
- 비밀번호 해싱 (bcryptjs)
- 역할 기반 접근 제어 (RBAC)
- 미들웨어 보호된 관리자 라우트

#### 입력값 검증
- XSS 방지 입력값 sanitization
- 파일 업로드 보안 검사
- SQL Injection 방지 (Prisma ORM)

### 환경 변수 설정

```bash
# 보안 설정
ALLOWED_ADMIN_IPS="127.0.0.1,::1,192.168.1.100"
SESSION_SECRET="your-super-secret-session-key"
ENCRYPTION_KEY="your-32-character-encryption-key"
```

### 보안 점검 체크리스트

**정기 점검 (매주)**
- [ ] 로그 파일 검토
- [ ] 백업 상태 확인
- [ ] SSL 인증서 만료일 확인
- [ ] 시스템 업데이트 확인

**월간 점검**
- [ ] 보안 헤더 테스트
- [ ] 파일 권한 확인
- [ ] 불필요한 파일 정리

---

## 7. SEO 최적화

### 구현된 SEO 기능

#### 메타데이터 최적화
- 동적 페이지 제목 (title template)
- 상세한 메타 설명
- 키워드 최적화
- Open Graph 및 Twitter 카드
- 지역 정보 메타데이터

#### 구조화된 데이터 (Schema.org)
- **MedicalOrganization**: 병원 정보
- **MedicalClinic**: 진료소 정보
- **BreadcrumbList**: 네비게이션 구조
- **FAQPage**: 자주 묻는 질문

#### 기술적 SEO
- XML Sitemap 자동 생성 (`/sitemap.xml`)
- Robots.txt 설정 (`/robots.txt`)
- PWA 지원 (manifest.json)
- 이미지 최적화
- 페이지 로딩 속도 최적화

### Google Search Console 설정

1. **사이트 등록**
   ```typescript
   // src/app/layout.tsx
   verification: {
     google: 'your-google-verification-code',
   }
   ```

2. **Sitemap 제출**
   - Google Search Console에서 `https://your-domain.com/sitemap.xml` 제출

### 키워드 전략

**주요 키워드**
- 1차: 부산 마취통증의학과, 동구 통증클리닉
- 2차: 통증 치료, 신경 차단술
- 3차: 노인 친화적 병원, 통증관리 전문의

### Core Web Vitals 목표
- **LCP (Largest Contentful Paint)**: 2.5초 이하
- **FID (First Input Delay)**: 100ms 이하
- **CLS (Cumulative Layout Shift)**: 0.1 이하

---

## 8. 성능 모니터링

### 구현된 모니터링 기능

#### 성능 모니터링
- Core Web Vitals 측정 (LCP, FID, CLS)
- 페이지 로드 시간 추적
- 시스템 리소스 모니터링
- 실시간 성능 대시보드

#### 분석 및 추적
- Google Analytics 통합
- 사용자 행동 추적
- 전환 이벤트 모니터링
- 페이지별 성능 분석

#### 로깅 시스템
- 구조화된 로깅 (JSON 형식)
- 로그 레벨 관리 (DEBUG, INFO, WARN, ERROR, FATAL)
- 자동 로그 로테이션
- 보안 이벤트 로깅

### Google Analytics 설정

```bash
# .env 파일
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

### 모니터링 대시보드

**접속 경로**: `/admin/performance`

**주요 기능**:
- 실시간 시스템 성능 모니터링
- 메모리 및 CPU 사용량 추적
- 페이지별 성능 지표
- 성능 임계값 알림

### 로그 파일 위치

```
logs/
├── app.log              # 애플리케이션 로그
├── security.log         # 보안 로그
├── backup.log          # 백업 로그
├── rotation.log        # 로그 로테이션 로그
├── error.log           # 에러 로그
└── info.log            # 정보 로그
```

---

## 9. 관리자 가이드

### 로그인

**접속 경로**: `/admin/login`

**기본 계정**:
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
- 순서 변경
- 아코디언 UI

#### 병원 정보
- 기본 정보 (이름, 전화, 주소)
- 진료 시간
- 로고 및 히어로 이미지 업로드

### 이미지 업로드

**지원 형식**: JPG, PNG, WebP, GIF
**최대 크기**: 5MB
**저장 위치**: Vercel Blob Storage

---

## 10. 스크립트 및 자동화

### 유틸리티 스크립트

#### 관리자 계정 관리

**관리자 생성**
```bash
npx tsx scripts/create-admin.ts
```

**비밀번호 변경**
```bash
npx tsx scripts/change-password.ts
```

#### 데이터베이스 관리

**데이터 확인 스크립트**
```bash
# Hero 데이터 확인
npx tsx scripts/debug-hero-data.ts

# 모든 섹션 확인
npx tsx scripts/check-sections.ts

# 누락된 섹션 초기화
npx tsx scripts/init-missing-sections.ts

# 완전한 데이터 매핑
npx tsx scripts/complete-mapping.ts
```

### 자동화 시스템 (선택사항)

프로젝트에는 다음 자동화 스크립트가 포함되어 있습니다:

```bash
scripts/
├── backup.sh              # 데이터베이스 및 파일 백업
├── security-monitor.sh    # 보안 모니터링
├── log-rotation.sh        # 로그 로테이션
├── system-cleanup.sh      # 시스템 정리
├── setup-analytics.sh     # Google Analytics 설정 자동화
├── setup-cron.sh          # Cron 작업 설정
└── optimize-performance.sh # 성능 최적화
```

#### Cron 작업 설정 (옵션)

```bash
# Cron 작업 편집
crontab -e

# 다음 내용 추가:
0 2 * * * /path/to/vitamin-clinic/scripts/backup.sh
0 * * * * /path/to/vitamin-clinic/scripts/security-monitor.sh
0 3 * * * /path/to/vitamin-clinic/scripts/log-rotation.sh
0 4 * * 0 /path/to/vitamin-clinic/scripts/system-cleanup.sh
```

---

## 11. 트러블슈팅

### 빌드 오류

```bash
# 캐시 정리
rm -rf .next node_modules
npm install
npm run build
```

### 데이터베이스 오류

```bash
# Prisma 재생성
npx prisma generate
npx prisma migrate reset
```

### 인증 오류

**확인 사항**:
- `NEXTAUTH_SECRET` 확인
- `NEXTAUTH_URL`이 현재 도메인과 일치하는지 확인
- 브라우저 쿠키 삭제

### 이미지 업로드 실패

```bash
# 1. Blob Storage Token 확인
vercel env ls

# 2. 환경 변수 업데이트
vercel env add BLOB_READ_WRITE_TOKEN
```

### Vercel 배포 이슈

**빌드 실패 시**:
1. Vercel 프로젝트의 Deployments 탭에서 로그 확인
2. 환경 변수가 모두 설정되었는지 확인
3. `DATABASE_URL`이 올바른 연결 문자열인지 확인

**롤백**:
1. Vercel 프로젝트의 Deployments 탭으로 이동
2. 이전 성공한 배포 선택
3. "Promote to Production" 클릭

---

## 지원 및 문의

### 문제 발생 시

1. [GitHub Issues](https://github.com/smlee7179/vitamin-clinic/issues) 페이지 확인
2. Vercel 로그 확인 (`vercel logs`)
3. 이 문서의 트러블슈팅 섹션 참조

### 연락처

- **개발자**: [@smlee7179](https://github.com/smlee7179)
- **이메일**: info@vitamin-clinic.com
- **전화**: 051-469-7581

---

## 참고 자료

### 공식 문서
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### 추가 가이드
- [Google Analytics](https://analytics.google.com/)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org/)
- [Core Web Vitals](https://web.dev/vitals/)

---

## 라이선스

Private - All Rights Reserved

---

**Built with ❤️ using Next.js and Claude Code**

*최종 업데이트: 2025-01-19*
