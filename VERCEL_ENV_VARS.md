# Vercel 환경 변수 설정 가이드

## 🔧 필수 환경 변수

Vercel 프로젝트 설정 페이지에서 다음 환경 변수들을 추가하세요:
https://vercel.com/smlee7179s-projects/vitamin-clinic/settings/environment-variables

### 1. NextAuth 설정

**Key:** `NEXTAUTH_SECRET`
**Value:** `B7gTJpf6l4lG2+j9r3bL0L4DFJ9+TYYCFJ5GMQhLCbQ=`
**Environment:** Production, Preview, Development (모두 선택)

### 2. 관리자 계정 (배포 후 반드시 변경!)

**Key:** `ADMIN_EMAIL`
**Value:** `admin@vitamin-clinic.com`
**Environment:** Production, Preview, Development

**Key:** `ADMIN_PASSWORD`
**Value:** `change-this-password`
**Environment:** Production, Preview, Development

⚠️ **중요:** 첫 로그인 후 반드시 비밀번호를 변경하세요!

### 3. 병원 정보

**Key:** `HOSPITAL_NAME`
**Value:** `비타민마취통증의학과`
**Environment:** Production, Preview, Development

**Key:** `HOSPITAL_PHONE`
**Value:** `051-123-4567`
**Environment:** Production, Preview, Development

**Key:** `HOSPITAL_ADDRESS`
**Value:** `부산광역시 해운대구 해운대로 123`
**Environment:** Production, Preview, Development

### 4. 기타 설정

**Key:** `NODE_ENV`
**Value:** `production`
**Environment:** Production

**Key:** `LOG_LEVEL`
**Value:** `info`
**Environment:** Production, Preview, Development

---

## 🗄️ Vercel Add-ons (필수)

### A. Vercel Postgres (데이터베이스)

1. Vercel 프로젝트의 **Storage** 탭으로 이동
2. **Create Database** 클릭
3. **Postgres** 선택
4. 데이터베이스 이름 입력 (예: `vitamin-clinic-db`)
5. Region: **US East (iad1)** 또는 가장 가까운 리전 선택
6. Create 클릭

자동으로 설정되는 환경 변수:
- `DATABASE_URL`
- `POSTGRES_PRISMA_URL` ✅ (Prisma가 사용)
- `POSTGRES_URL_NON_POOLING`

### B. Vercel Blob Storage (이미지 저장소)

1. Vercel 프로젝트의 **Storage** 탭으로 이동
2. **Create Store** 클릭
3. **Blob** 선택
4. 스토어 이름 입력 (예: `vitamin-clinic-images`)
5. Create 클릭

자동으로 설정되는 환경 변수:
- `BLOB_READ_WRITE_TOKEN` ✅

---

## ✅ 환경 변수 설정 체크리스트

환경 변수 설정 후 다음을 확인하세요:

- [ ] NEXTAUTH_SECRET 설정됨
- [ ] ADMIN_EMAIL 설정됨
- [ ] ADMIN_PASSWORD 설정됨
- [ ] HOSPITAL_NAME, PHONE, ADDRESS 설정됨
- [ ] NODE_ENV=production 설정됨
- [ ] Vercel Postgres 연결됨 (DATABASE_URL 자동 생성)
- [ ] Vercel Blob 연결됨 (BLOB_READ_WRITE_TOKEN 자동 생성)

---

## 🔄 환경 변수 설정 후 재배포

환경 변수를 추가/수정한 후에는 **재배포**가 필요합니다:

### 방법 1: Vercel 웹사이트에서
1. Deployments 탭으로 이동
2. 최신 배포의 "..." 메뉴 클릭
3. "Redeploy" 선택

### 방법 2: CLI로 재배포
```bash
vercel --token YOUR_TOKEN --prod --yes
```

---

## 🗄️ 데이터베이스 초기화

배포 완료 후 데이터베이스를 초기화해야 합니다:

### 방법 1: API 엔드포인트 호출
브라우저에서 접속 (Vercel 로그인 필요):
```
https://vitamin-clinic-smlee7179s-projects.vercel.app/api/admin
```

성공 시 "Database initialized successfully" 메시지 확인

### 방법 2: 로컬에서 프로덕션 DB에 마이그레이션
```bash
# 프로덕션 환경 변수 가져오기
vercel env pull .env.production.local --token YOUR_TOKEN

# Prisma 마이그레이션 실행
DATABASE_URL=$(grep POSTGRES_PRISMA_URL .env.production.local | cut -d '=' -f2-) npx prisma migrate deploy

# 초기 데이터 시드
DATABASE_URL=$(grep POSTGRES_PRISMA_URL .env.production.local | cut -d '=' -f2-) npx tsx prisma/seed.ts
```

---

## 🔒 보안 체크리스트

배포 후 반드시 확인하세요:

1. [ ] 관리자 비밀번호 변경
2. [ ] Vercel Protection 설정 확인
3. [ ] 환경 변수에 민감한 정보 노출 확인
4. [ ] HTTPS 강제 적용 확인
5. [ ] 관리자 페이지 접근 제한 확인

---

## 📱 배포 확인

배포가 완료되면 다음 페이지들을 확인하세요:

- 메인 페이지: https://vitamin-clinic-smlee7179s-projects.vercel.app
- 관리자 로그인: https://vitamin-clinic-smlee7179s-projects.vercel.app/admin/login
- API Health Check: https://vitamin-clinic-smlee7179s-projects.vercel.app/api/health
- 시스템 정보: https://vitamin-clinic-smlee7179s-projects.vercel.app/api/system-info

---

## 🔧 트러블슈팅

### 빌드 실패
- Vercel 프로젝트의 Deployments 탭에서 빌드 로그 확인
- 환경 변수가 모두 설정되었는지 확인

### 데이터베이스 연결 오류
- Postgres가 제대로 연결되었는지 확인
- `POSTGRES_PRISMA_URL` 환경 변수 확인

### 이미지 업로드 실패
- Blob Storage가 연결되었는지 확인
- `BLOB_READ_WRITE_TOKEN` 환경 변수 확인

### 로그인 실패
- 데이터베이스가 초기화되었는지 확인 (`/api/admin` 호출)
- NEXTAUTH_SECRET이 설정되었는지 확인
