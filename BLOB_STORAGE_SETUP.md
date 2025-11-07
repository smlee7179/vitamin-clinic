# Vercel Blob Storage 설정 가이드

## 문제 상황
이미지 업로드 시 "Vercel Blob Storage is not configured" 오류가 발생하는 경우

## 해결 방법

### 1. Vercel 대시보드에서 Blob Storage 연결

1. **Vercel 대시보드 접속**
   - https://vercel.com 로그인
   - `vitamin-clinic` 프로젝트 선택

2. **Storage 탭으로 이동**
   - 상단 메뉴에서 `Storage` 클릭
   - 또는 https://vercel.com/smlee7179s-projects/vitamin-clinic/stores

3. **Blob Storage 생성**
   - `Create Database` 또는 `Connect Store` 버튼 클릭
   - `Blob` 선택
   - 이름 입력 (예: `vitamin-clinic-images`)
   - `Create` 클릭

4. **프로젝트에 연결**
   - 생성된 Blob Store 선택
   - `Connect Project` 클릭
   - `vitamin-clinic` 프로젝트 선택
   - 환경 선택 (Production, Preview, Development 모두 선택)
   - `Connect` 클릭

### 2. 환경 변수 자동 설정 확인

Blob Storage를 연결하면 다음 환경 변수가 자동으로 추가됩니다:
- `BLOB_READ_WRITE_TOKEN`

### 3. 재배포

```bash
# 변경사항 커밋 없이 재배포
vercel --prod --yes
```

## 확인 방법

1. **환경 변수 확인**
```bash
vercel env ls
```

`BLOB_READ_WRITE_TOKEN`이 목록에 있는지 확인

2. **관리자 페이지에서 테스트**
   - 로그인: https://vitamin-clinic.vercel.app/admin/login
   - Hero 또는 Services 섹션에서 이미지 업로드 시도
   - 성공 시 이미지 URL이 `https://[random].public.blob.vercel-storage.com/...` 형식

## 문제 해결

### Blob Storage가 없는 경우
Vercel의 무료 플랜에서는 Blob Storage가 제한될 수 있습니다.
- Hobby 플랜: 무료 (제한적)
- Pro 플랜: 더 많은 용량과 전송량

### 대체 방법
Blob Storage를 사용할 수 없는 경우:
1. Cloudinary
2. AWS S3
3. Google Cloud Storage
4. 기타 이미지 호스팅 서비스

## 참고 자료
- Vercel Blob Documentation: https://vercel.com/docs/storage/vercel-blob
- Pricing: https://vercel.com/docs/storage/vercel-blob/usage-and-pricing
