# 환경 변수 체크리스트

> 작성일: 2025-11-20
> 목적: 디자인 리뉴얼 전후 환경 설정 확인

## ✅ 필수 환경 변수

### 데이터베이스
- [x] `DATABASE_URL` - 데이터베이스 연결 문자열
  - 로컬: `file:./dev.db` (SQLite)
  - 프로덕션: `postgresql://...` (Vercel Postgres)

### 인증 (NextAuth.js)
- [x] `NEXTAUTH_SECRET` - JWT 서명용 비밀키
- [x] `NEXTAUTH_URL` - 앱 URL
- [x] `NEXTAUTH_URL_INTERNAL` - 내부 URL (Docker/Vercel용)
- [x] `AUTH_TRUST_HOST` - 호스트 신뢰 설정

### 관리자 계정
- [x] `ADMIN_EMAIL` - 초기 관리자 이메일
- [x] `ADMIN_PASSWORD` - 초기 관리자 비밀번호

### 병원 정보
- [x] `HOSPITAL_NAME` - 병원 이름
- [x] `HOSPITAL_PHONE` - 병원 전화번호
- [x] `HOSPITAL_ADDRESS` - 병원 주소

### 파일 업로드
- [x] `UPLOAD_DIR` - 파일 업로드 경로
- [x] `MAX_FILE_SIZE` - 최대 파일 크기 (바이트)

### 개발 환경
- [x] `NODE_ENV` - development/production

## 🔵 선택적 환경 변수

### 이미지 스토리지 (프로덕션)
- [ ] `BLOB_READ_WRITE_TOKEN` - Vercel Blob Storage 토큰
  - 프로덕션 배포 시 필수
  - Vercel Dashboard에서 자동 설정 가능

### 보안 설정
- [ ] `ALLOWED_ADMIN_IPS` - 관리자 IP 화이트리스트
- [ ] `RATE_LIMIT_WINDOW` - Rate limit 시간 창
- [ ] `RATE_LIMIT_MAX_REQUESTS` - 최대 요청 수
- [ ] `SESSION_SECRET` - 세션 암호화 키
- [ ] `ENCRYPTION_KEY` - 데이터 암호화 키

### 분석 및 모니터링
- [ ] `GOOGLE_ANALYTICS_ID` - GA 추적 ID
- [ ] `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` - 클라이언트용 GA ID
- [ ] `GOOGLE_SEARCH_CONSOLE_VERIFICATION` - 검색 콘솔 확인 코드
- [ ] `LOG_LEVEL` - 로깅 레벨 (debug/info/warn/error)
- [ ] `ALERT_EMAIL` - 알림 받을 이메일

### 성능 모니터링
- [ ] `PERFORMANCE_MONITORING_ENABLED` - 성능 모니터링 활성화
- [ ] `PERFORMANCE_ALERT_THRESHOLD` - 성능 알림 임계값 (ms)
- [ ] `LCP_ALERT_THRESHOLD` - LCP 알림 임계값 (ms)

### 백업 설정
- [ ] `BACKUP_ENABLED` - 자동 백업 활성화
- [ ] `BACKUP_SCHEDULE` - 백업 스케줄 (cron)
- [ ] `BACKUP_RETENTION_DAYS` - 백업 보관 일수

### 로깅
- [ ] `LOG_RETENTION_DAYS` - 로그 보관 일수
- [ ] `LOG_ROTATION_SIZE` - 로그 로테이션 크기

## 🚀 환경별 설정 현황

### 로컬 개발 환경 (.env)
```bash
✓ DATABASE_URL (SQLite)
✓ NEXTAUTH_SECRET
✓ NEXTAUTH_URL (localhost:3000)
✓ NEXTAUTH_URL_INTERNAL
✓ AUTH_TRUST_HOST
✓ ADMIN_EMAIL
✓ ADMIN_PASSWORD
✓ HOSPITAL_* (3개)
✓ UPLOAD_DIR
✓ MAX_FILE_SIZE
✓ NODE_ENV
```

### 프로덕션 환경 (Vercel)
확인 필요 항목:
1. Vercel Dashboard → Settings → Environment Variables
2. 필수 변수 모두 설정되었는지 확인
3. BLOB_READ_WRITE_TOKEN 자동 설정 확인
4. DATABASE_URL (Postgres) 자동 설정 확인

## 📝 환경 변수 설정 방법

### 로컬 개발
```bash
# 1. .env.example을 복사
cp .env.example .env

# 2. .env 파일 수정
nano .env  # 또는 원하는 에디터 사용

# 3. 필수 값 설정
# - NEXTAUTH_SECRET: openssl rand -base64 32
# - ADMIN_PASSWORD: 강력한 비밀번호
```

### Vercel 배포
```bash
# CLI로 환경 변수 추가
vercel env add NEXTAUTH_SECRET
vercel env add ADMIN_EMAIL
vercel env add ADMIN_PASSWORD

# 또는 Dashboard에서 직접 추가
# 1. Vercel 프로젝트 → Settings → Environment Variables
# 2. Add New 클릭
# 3. 변수명과 값 입력
```

## ⚠️ 보안 주의사항

### 절대 공개하면 안 되는 값
- ❌ NEXTAUTH_SECRET
- ❌ ADMIN_PASSWORD
- ❌ SESSION_SECRET
- ❌ ENCRYPTION_KEY
- ❌ BLOB_READ_WRITE_TOKEN
- ❌ DATABASE_URL (프로덕션)

### Git 커밋 전 확인
```bash
# .gitignore에 환경 파일이 포함되었는지 확인
cat .gitignore | grep ".env"

# 결과:
# .env*  ← 이것이 있어야 함
```

## 🔧 문제 해결

### NEXTAUTH_SECRET 생성
```bash
# macOS/Linux
openssl rand -base64 32

# 또는 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### DATABASE_URL 형식
```bash
# SQLite (로컬)
file:./dev.db

# PostgreSQL (프로덕션)
postgresql://username:password@host:5432/database?schema=public
```

### Vercel Blob Token 확인
```bash
# Vercel CLI로 확인
vercel env ls

# 또는 Dashboard
# Storage → Blob → Settings → Token
```

## 📊 현재 상태 점검 결과

### ✅ 정상
- 로컬 개발 환경 필수 변수 모두 설정
- .env.example 업데이트 완료
- .gitignore에 환경 파일 제외 설정 확인

### ⚠️ 확인 필요
- Vercel 프로덕션 환경 변수 점검 필요
- BLOB_READ_WRITE_TOKEN 설정 확인 필요

### 🔄 리뉴얼 후 업데이트
- 새로운 기능에 필요한 환경 변수 추가
- 불필요한 환경 변수 제거
- 문서 업데이트

---

**다음 단계**: 리뉴얼 계획 문서 작성
