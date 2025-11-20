# 디자인 리뉴얼 전 기준선 (Baseline)

> 작성일: 2025-11-20
> 목적: 디자인 리뉴얼 작업의 성과 측정을 위한 현재 상태 기록

## 📊 빌드 성능

### 빌드 결과 (Production)
```
First Load JS shared by all: 87.2 kB
Total Routes: 30
Build Time: ~45초 (Prisma generate 포함)
```

### 페이지별 번들 크기

| 페이지 | 크기 | First Load JS |
|--------|------|---------------|
| `/` (홈) | 479 B | 112 kB |
| `/about` | 2.1 kB | 101 kB |
| `/contact` | 2.65 kB | 101 kB |
| `/admin/new` | 13.2 kB | 109 kB |
| `/admin/gallery` | 3.76 kB | 99.7 kB |
| `/admin/guide` | 12.7 kB | 100 kB |

### Core Metrics
- **Total JavaScript**: ~87.2 kB (shared)
- **Largest Page Bundle**: 13.2 kB (admin/new)
- **Static Pages**: 26개
- **Dynamic Routes**: 4개

## 🎨 현재 디자인 시스템

### 디자인 컨셉
- **스타일**: Apple + Toss 모던 디자인
- **색상**: Vitamin 브랜드 컬러 (오렌지/비타민 계열)
- **레이아웃**: 섹션 기반 스크롤 디자인

### 주요 컴포넌트
1. **ModernHeader** - 고정 헤더, 스크롤 감지
2. **ModernHero** - 히어로 섹션
3. **ModernMarquee** - 공지사항 슬라이더
4. **ModernFeatures** - 주요 특징
5. **ModernServices** - 서비스 소개
6. **ModernTreatments** - 치료방법
7. **ModernGallery** - 갤러리
8. **ModernFAQ** - FAQ 아코디언
9. **ModernFooter** - 푸터

### 애니메이션 라이브러리
- **Framer Motion**: v12.23.24
- **Lenis**: v1.3.14 (스무스 스크롤)
- **react-intersection-observer**: v10.0.0

## 🏗️ 현재 기술 스택

### 프론트엔드
```json
{
  "next": "14.2.18",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "typescript": "5.4.2",
  "tailwindcss": "3.4.1",
  "framer-motion": "12.23.24"
}
```

### 백엔드
```json
{
  "@prisma/client": "6.12.0",
  "prisma": "6.12.0",
  "@vercel/blob": "2.0.0"
}
```

## 📱 페이지 구성

### 사용자 페이지
- `/` - 메인 홈페이지 (모던 디자인)
- `/about` - 병원 소개
- `/contact` - 오시는 길
- `/services` - 서비스 안내
- `/notices` - 공지사항
- `/health-info` - 건강정보
- `/privacy` - 개인정보처리방침
- `/terms` - 이용약관

### 관리자 페이지
- `/admin/login` - 로그인
- `/admin/new` - 통합 관리 대시보드
- `/admin/gallery` - 이미지 자료실
- `/admin/guide` - 사용 가이드

### API 엔드포인트 (15개)
- 인증: `/api/auth/*`
- 콘텐츠: `/api/content`, `/api/marquee`, `/api/treatments`, `/api/faqs`
- 이미지: `/api/images`, `/api/upload`
- 시스템: `/api/health`, `/api/system-info`, `/api/performance`
- 감사: `/api/audit-logs`

## 🎯 현재 기능

### 관리자 기능
- ✅ 실시간 콘텐츠 편집
- ✅ 이미지 업로드 (Vercel Blob)
- ✅ 저장 안 된 변경사항 경고
- ✅ 섹션별 관리 (9개 섹션)
- ✅ 감사 로그
- ✅ 대시보드 통계

### 사용자 경험
- ✅ 반응형 디자인
- ✅ 스무스 스크롤
- ✅ 애니메이션 효과
- ✅ 이미지 최적화
- ✅ SEO 최적화

## 🐛 알려진 이슈

### 빌드 경고
```
⚠️ Using edge runtime on a page currently disables static generation
❌ Dynamic server usage: Route /api/auth/check-session
```
→ 정상적인 동작 (인증 API는 동적 렌더링 필요)

### Prisma 업데이트 알림
```
Update available: 6.19.0 -> 7.0.0 (Major update)
```
→ 리뉴얼 후 업데이트 고려

## 📈 개선 목표 (리뉴얼 후)

### 성능
- [ ] First Load JS 80kB 이하로 감소
- [ ] Lighthouse Performance 90+ 달성
- [ ] 이미지 최적화 개선 (WebP)

### 사용자 경험
- [ ] 페이지 로딩 속도 개선
- [ ] 애니메이션 최적화
- [ ] 모바일 UX 개선

### 코드 품질
- [ ] 컴포넌트 재사용성 증대
- [ ] TypeScript 타입 안정성 강화
- [ ] 테스트 커버리지 추가

## 🖼️ 스크린샷 촬영 위치

리뉴얼 전 스크린샷은 다음 위치에 저장:
```
/Users/seungmin/vitamin-clinic/docs/screenshots/before-redesign/
```

### 촬영 대상
1. 홈페이지 전체 (데스크톱)
2. 홈페이지 전체 (모바일)
3. 관리자 대시보드
4. 콘텐츠 관리 화면
5. 각 섹션별 상세

**참고**: 실제 스크린샷은 개발 서버 실행 후 수동으로 촬영 필요

## 📊 데이터베이스 상태

### 모델 수: 10개
- User, Content, Notice, HealthInfo, Gallery
- MarqueeNotice, Treatment, FAQ, HospitalContent, AuditLog

### 데이터 백업
```
파일: backups/dev.db.backup-20251120_135201
크기: 100KB
날짜: 2025-11-20 13:52:01
```

## 🔧 환경 변수 (필수)

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://..."
BLOB_READ_WRITE_TOKEN="..."
ADMIN_EMAIL="admin@..."
ADMIN_PASSWORD="..."
HOSPITAL_NAME="비타민마취통증의학과"
HOSPITAL_PHONE="051-469-7581"
HOSPITAL_ADDRESS="부산광역시 동구 중앙대로 375"
```

---

## 📝 참고 문서

- [PROJECT_DOCUMENTATION.md](../PROJECT_DOCUMENTATION.md) - 전체 프로젝트 문서
- [README.md](../README.md) - 빠른 시작 가이드
- [scripts/README.md](../scripts/README.md) - 유틸리티 스크립트

---

**다음 단계**: 이 문서를 기준으로 리뉴얼 후 성과를 측정하고 비교합니다.
