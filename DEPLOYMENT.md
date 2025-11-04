# 비타민마취통증의학과 배포 가이드

## 목차
1. [프로덕션 환경 변수 설정](#프로덕션-환경-변수-설정)
2. [Vercel Blob Storage 설정](#vercel-blob-storage-설정)
3. [데이터베이스 마이그레이션](#데이터베이스-마이그레이션)
4. [관리자 계정 설정](#관리자-계정-설정)
5. [배포 체크리스트](#배포-체크리스트)

---

## 프로덕션 환경 변수 설정

### Vercel Dashboard에서 설정해야 할 환경 변수

1. **Vercel Dashboard 접속**
   - https://vercel.com 로그인
   - 프로젝트 선택 (vitamin-clinic)
   - Settings → Environment Variables 메뉴로 이동

2. **필수 환경 변수 추가**

#### Database (Prisma)
```bash
DATABASE_URL="file:./dev.db"
# 프로덕션에서는 PostgreSQL, MySQL 등 사용 권장
# 예: postgresql://user:password@host:5432/database
```

#### NextAuth.js
```bash
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="ucxbONtzqPxGQ3P9wds030UZDXTsteIj9lRS++2tLqE="
# 새로운 시크릿 생성 방법: openssl rand -base64 32
```

#### Vercel Blob Storage
```bash
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxx"
# Vercel Dashboard → Storage → Blob에서 생성
```

#### 관리자 계정 (선택사항)
```bash
ADMIN_EMAIL="admin@vitamin-clinic.com"
ADMIN_PASSWORD="your-secure-password"
# 기본값: admin@vitamin-clinic.com / vitamin2024
```

---

## Vercel Blob Storage 설정

### 1. Blob Storage 생성

```bash
# Vercel Dashboard에서:
1. 프로젝트 선택
2. Storage 탭 클릭
3. "Create Database" 버튼 클릭
4. "Blob" 선택
5. 리전 선택 (예: Asia Pacific - Tokyo for 한국)
6. "Create" 클릭
```

### 2. Token 연결

```bash
# Storage 생성 후:
1. 생성된 Blob Storage 클릭
2. "Connect" 탭에서 프로젝트 연결
3. 환경 변수가 자동으로 추가됨
   - BLOB_READ_WRITE_TOKEN
```

### 3. 로컬 개발 환경에서 테스트

```bash
# .env.local 파일에 토큰 추가
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxx"

# 테스트
npm run dev
# 관리자 페이지에서 이미지 업로드 테스트
```

### 4. 업로드 제한 설정

```typescript
// src/app/api/upload/route.ts에서 이미 설정됨:
- 최대 파일 크기: 5MB
- 허용 파일 형식: JPG, PNG, WebP, GIF
- 자동 파일명 랜덤화 (보안)
```

---

## 데이터베이스 마이그레이션

### 1. 프로덕션 데이터베이스 설정 (권장: PostgreSQL)

```bash
# Vercel Postgres 사용 시:
1. Vercel Dashboard → Storage → Create Database
2. "Postgres" 선택
3. 리전 선택
4. DATABASE_URL 자동으로 환경 변수에 추가됨
```

### 2. Prisma 마이그레이션 실행

```bash
# 로컬에서 마이그레이션 생성
npx prisma migrate dev --name init

# 프로덕션 배포 시 자동 실행
# package.json의 postinstall 스크립트:
"postinstall": "prisma generate"

# 수동 마이그레이션 (필요시)
npx prisma migrate deploy
```

### 3. 초기 데이터 마이그레이션

```bash
# 관리자 계정 생성
npx tsx scripts/create-admin.ts

# localhost에서 기존 데이터를 DB로 마이그레이션
# /admin/new 페이지에서 각 섹션의 "저장" 버튼 클릭
# 또는 API 사용:

# 공지사항 마이그레이션
curl -X POST https://your-domain.vercel.app/api/migrate \
  -H "Content-Type: application/json" \
  -d '{"type": "marquee", "data": [...]}'

# 치료방법 마이그레이션
curl -X POST https://your-domain.vercel.app/api/migrate \
  -H "Content-Type: application/json" \
  -d '{"type": "treatments", "data": [...]}'

# FAQ 마이그레이션
curl -X POST https://your-domain.vercel.app/api/migrate \
  -H "Content-Type: application/json" \
  -d '{"type": "faqs", "data": [...]}'
```

---

## 관리자 계정 설정

### 1. 기본 관리자 계정

```
이메일: admin@vitamin-clinic.com
비밀번호: vitamin2024
```

⚠️ **보안 경고**: 프로덕션 배포 후 반드시 비밀번호를 변경하세요!

### 2. 비밀번호 변경 방법

현재는 수동으로 데이터베이스에서 변경해야 합니다:

```bash
# 1. 새 비밀번호 해시 생성
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('새비밀번호', 12));"

# 2. Prisma Studio에서 변경
npx prisma studio
# User 테이블 → admin 계정 → password 필드 업데이트

# 또는 직접 스크립트 실행
npx tsx scripts/change-password.ts
```

### 3. 추가 관리자 계정 생성

```typescript
// scripts/create-admin.ts 수정하여 실행
ADMIN_EMAIL="new-admin@vitamin-clinic.com" \
ADMIN_PASSWORD="secure-password" \
npx tsx scripts/create-admin.ts
```

---

## 배포 체크리스트

### 배포 전 확인사항

- [ ] 모든 환경 변수가 Vercel에 설정되어 있는가?
  - [ ] DATABASE_URL
  - [ ] NEXTAUTH_URL
  - [ ] NEXTAUTH_SECRET
  - [ ] BLOB_READ_WRITE_TOKEN

- [ ] Blob Storage가 생성되고 연결되어 있는가?

- [ ] 데이터베이스가 설정되어 있는가?
  - [ ] Vercel Postgres 또는 외부 DB
  - [ ] Prisma 마이그레이션 완료

- [ ] 로컬에서 테스트 완료
  - [ ] 관리자 로그인
  - [ ] 이미지 업로드
  - [ ] 데이터 저장/불러오기
  - [ ] API 엔드포인트 테스트

### 배포 후 확인사항

- [ ] 메인 페이지가 정상적으로 로드되는가?
  - [ ] https://your-domain.vercel.app

- [ ] 관리자 페이지 접근 보호가 작동하는가?
  - [ ] https://your-domain.vercel.app/admin/new
  - [ ] 로그인 리디렉션 확인

- [ ] 관리자 로그인 성공
  - [ ] NextAuth 세션 동작 확인

- [ ] 이미지 업로드 테스트
  - [ ] Vercel Blob에 정상 업로드
  - [ ] 업로드된 이미지 표시 확인

- [ ] 데이터 CRUD 테스트
  - [ ] 공지사항 추가/수정/삭제
  - [ ] 치료방법 추가/수정/삭제
  - [ ] FAQ 추가/수정/삭제
  - [ ] 병원 정보 수정

- [ ] API 엔드포인트 테스트
```bash
# 공지사항 API
curl https://your-domain.vercel.app/api/marquee

# 치료방법 API
curl https://your-domain.vercel.app/api/treatments

# FAQ API
curl https://your-domain.vercel.app/api/faqs
```

### 보안 체크

- [ ] 관리자 비밀번호 변경 완료
- [ ] NEXTAUTH_SECRET가 프로덕션용 시크릿으로 설정됨
- [ ] API 라우트가 적절히 보호되고 있음
- [ ] HTTPS 강제 적용 확인
- [ ] CSP 헤더 설정 확인 (middleware.ts)

---

## 트러블슈팅

### 이미지 업로드 실패

```bash
# 1. Blob Storage Token 확인
vercel env ls

# 2. Token 재생성
Vercel Dashboard → Storage → Blob → Settings → Tokens

# 3. 환경 변수 업데이트
vercel env add BLOB_READ_WRITE_TOKEN
```

### 데이터베이스 연결 실패

```bash
# 1. DATABASE_URL 확인
vercel env ls

# 2. Prisma Client 재생성
npm install @prisma/client
npx prisma generate

# 3. 마이그레이션 재실행
npx prisma migrate deploy
```

### 관리자 로그인 실패

```bash
# 1. NEXTAUTH_SECRET 확인
vercel env ls

# 2. NEXTAUTH_URL이 올바른 도메인인지 확인
# 예: https://your-actual-domain.vercel.app

# 3. 세션 쿠키 삭제 후 재시도
```

### 빌드 실패

```bash
# 1. 로컬에서 프로덕션 빌드 테스트
npm run build

# 2. TypeScript 오류 확인
npm run type-check

# 3. 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

---

## 유용한 명령어

```bash
# 로컬 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# Prisma Studio (DB GUI)
npx prisma studio

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 관리자 생성
npx tsx scripts/create-admin.ts

# Vercel 로그 확인
vercel logs

# 환경 변수 확인
vercel env ls

# 환경 변수 추가
vercel env add
```

---

## 참고 자료

- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Vercel Blob Storage 문서](https://vercel.com/docs/storage/vercel-blob)
- [NextAuth.js 설정](https://next-auth.js.org/configuration/options)
- [Prisma 배포 가이드](https://www.prisma.io/docs/guides/deployment)

---

## 지원

문제가 발생하면 다음을 확인하세요:
1. Vercel 배포 로그
2. 브라우저 개발자 도구 콘솔
3. API 응답 확인 (Network 탭)

추가 지원이 필요한 경우:
- GitHub Issues: [프로젝트 저장소]
- Vercel 지원: https://vercel.com/help
