# 🚀 빠른 Blob Storage 설정 (5분)

## 현재 상태
✅ Prisma Postgres: 설정 완료
❌ Blob Storage: **설정 필요**

## 설정 방법

### 1️⃣ Vercel Storage 페이지 열기
URL: https://vercel.com/smlee7179s-projects/vitamin-clinic/stores

### 2️⃣ Blob Store 생성
1. 페이지 상단의 **"Create Database"** 또는 **"Create"** 버튼 클릭
2. 스토리지 타입 선택 화면에서 **"Blob"** 선택
3. 스토어 이름 입력: `vitamin-clinic-images` (또는 원하는 이름)
4. **"Create"** 버튼 클릭

### 3️⃣ 프로젝트에 연결
1. 생성된 Blob Store의 설정 페이지로 자동 이동
2. **"Connect Project"** 또는 **".env.local"** 탭 선택
3. 프로젝트 선택: `vitamin-clinic`
4. 환경 선택:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. **"Connect"** 버튼 클릭

### 4️⃣ 자동 재배포 대기
- Vercel이 자동으로 프로젝트를 재배포합니다 (1-2분 소요)
- 또는 수동 재배포: `vercel --prod --yes`

## ✅ 확인 방법

### 환경 변수 확인
```bash
vercel env ls
```

다음 변수가 목록에 나타나야 합니다:
- `BLOB_READ_WRITE_TOKEN`

### 이미지 업로드 테스트
1. https://vitamin-clinic.vercel.app/admin/login 로그인
2. Hero 또는 Services 섹션 이동
3. 이미지 업로드 시도
4. ✅ 성공: 이미지가 표시되고 URL이 `https://[random].public.blob.vercel-storage.com/...` 형식

## 💰 요금
- **Free Plan**: 1GB storage, 1GB bandwidth/month
- 의료 웹사이트 이미지에 충분함
- 초과 시 Pro 플랜 업그레이드 필요

## ❓ 문제 해결

### "Create" 버튼이 안 보이는 경우
- 로그인 계정 확인
- 프로젝트 권한 확인
- 브라우저 새로고침

### 환경 변수가 안 보이는 경우
- 연결 단계를 다시 확인
- 프로젝트가 올바르게 선택되었는지 확인
- 1-2분 후 다시 확인

### 여전히 업로드가 안 되는 경우
1. 재배포 완료 확인
2. 브라우저 캐시 삭제
3. 로그아웃 후 다시 로그인
4. 개발자 도구 콘솔에서 에러 메시지 확인

## 📞 도움이 필요하신가요?
스크린샷과 함께 문의해주세요!
