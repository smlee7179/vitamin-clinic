# Vercel 배포 가이드

## 1단계: Vercel 프로젝트 생성

1. https://vercel.com 접속 및 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 `smlee7179/vitamin-clinic` 선택 및 Import

## 2단계: 환경 변수 설정

Vercel 프로젝트 설정 페이지에서 다음 환경 변수들을 추가하세요:

### 필수 환경 변수

```bash
# NextAuth 보안 키
NEXTAUTH_SECRET=B7gTJpf6l4lG2+j9r3bL0L4DFJ9+TYYCFJ5GMQhLCbQ=

# 관리자 계정 (배포 후 반드시 변경하세요!)
ADMIN_EMAIL=admin@vitamin-clinic.com
ADMIN_PASSWORD=change-this-password

# 병원 정보
HOSPITAL_NAME=비타민마취통증의학과
HOSPITAL_PHONE=051-123-4567
HOSPITAL_ADDRESS=부산광역시 해운대구 해운대로 123

# 프로덕션 환경
NODE_ENV=production
LOG_LEVEL=info
```

### Vercel Add-ons 추가 (자동으로 환경 변수 설정됨)

#### A. Vercel Postgres
1. Vercel 프로젝트의 Storage 탭으로 이동
2. "Create Database" 클릭
3. "Postgres" 선택
4. 데이터베이스 생성 완료
5. 자동으로 다음 환경 변수들이 추가됩니다:
   - `DATABASE_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

#### B. Vercel Blob Storage
1. Vercel 프로젝트의 Storage 탭으로 이동
2. "Create Store" 클릭
3. "Blob" 선택
4. 스토어 이름 입력 (예: vitamin-clinic-images)
5. 자동으로 다음 환경 변수가 추가됩니다:
   - `BLOB_READ_WRITE_TOKEN`

## 3단계: 빌드 설정 확인

Vercel이 자동으로 감지하지만, 확인차 설정을 체크하세요:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 4단계: 배포 시작

"Deploy" 버튼을 클릭하여 배포를 시작합니다.

## 5단계: 데이터베이스 마이그레이션

배포가 완료되면 데이터베이스를 초기화해야 합니다:

### 방법 1: Vercel CLI 사용

```bash
# Vercel 프로젝트 환경 변수 가져오기
vercel env pull .env.local

# Prisma 마이그레이션 실행
npx prisma migrate deploy

# 초기 관리자 계정 생성
npx tsx prisma/seed.ts
```

### 방법 2: Vercel 웹 콘솔에서 실행

1. Vercel 프로젝트의 Settings > Functions 탭으로 이동
2. 다음 API 엔드포인트를 브라우저에서 호출:
   ```
   https://your-project.vercel.app/api/admin
   ```
3. "Database initialized successfully" 메시지를 확인

## 6단계: 배포 확인

1. 배포된 URL로 접속 (예: https://vitamin-clinic.vercel.app)
2. 메인 페이지가 정상적으로 로드되는지 확인
3. `/admin/login`으로 이동하여 관리자 로그인 테스트
   - 이메일: admin@vitamin-clinic.com
   - 비밀번호: change-this-password

## 7단계: 보안 설정

### A. 관리자 비밀번호 변경

로그인 후 반드시 비밀번호를 변경하세요:

```bash
# 로컬에서 프로덕션 DB에 연결하여 변경
vercel env pull .env.local
npx tsx scripts/change-password.ts
```

또는 관리자 페이지에서 비밀번호 변경 기능을 사용하세요.

### B. 환경 변수 업데이트

Vercel 프로젝트 설정에서 `ADMIN_PASSWORD` 환경 변수를 새 비밀번호로 업데이트하세요.

## 8단계: 데이터 마이그레이션

기존 데이터가 있다면 마이그레이션 API를 사용하세요:

```bash
# 로컬 데이터를 프로덕션으로 마이그레이션
curl -X POST https://your-project.vercel.app/api/migrate \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d @./migration-data.json
```

## 9단계: 커스텀 도메인 설정 (선택사항)

1. Vercel 프로젝트의 Settings > Domains 탭으로 이동
2. "Add Domain" 클릭
3. 소유한 도메인 입력 (예: vitamin-clinic.com)
4. DNS 레코드 설정 안내를 따라 진행
5. SSL 인증서가 자동으로 발급됩니다

## 트러블슈팅

### 빌드 실패 시

1. Vercel 프로젝트의 Deployments 탭에서 로그 확인
2. 환경 변수가 모두 설정되었는지 확인
3. `DATABASE_URL`이 올바른 Postgres 연결 문자열인지 확인

### 데이터베이스 연결 오류

1. Vercel Postgres가 제대로 연결되었는지 확인
2. `POSTGRES_PRISMA_URL` 환경 변수가 설정되었는지 확인
3. Prisma 마이그레이션이 실행되었는지 확인

### 이미지 업로드 실패

1. Vercel Blob Storage가 연결되었는지 확인
2. `BLOB_READ_WRITE_TOKEN` 환경 변수가 설정되었는지 확인

## 모니터링

### Vercel Analytics

1. Vercel 프로젝트의 Analytics 탭에서 트래픽 모니터링
2. 성능 지표 확인 (LCP, FID, CLS)

### 로그 확인

1. Vercel 프로젝트의 Logs 탭에서 실시간 로그 확인
2. 에러 발생 시 상세 정보 확인

## 자동 배포

- GitHub의 `main` 브랜치에 push하면 자동으로 프로덕션 배포
- 다른 브랜치에 push하면 프리뷰 배포 생성
- Pull Request마다 고유한 프리뷰 URL 생성

## 롤백

문제 발생 시 이전 배포로 즉시 롤백 가능:

1. Vercel 프로젝트의 Deployments 탭으로 이동
2. 이전 성공한 배포 선택
3. "Promote to Production" 클릭

---

배포 완료 후 다음 URL들을 확인하세요:

- 메인 사이트: https://your-project.vercel.app
- 관리자 로그인: https://your-project.vercel.app/admin/login
- API 헬스체크: https://your-project.vercel.app/api/health
- 시스템 정보: https://your-project.vercel.app/api/system-info
