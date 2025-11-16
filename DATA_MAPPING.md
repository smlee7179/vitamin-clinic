# 데이터 맵핑 문서 (Data Mapping Documentation)

관리자 페이지에서 수정한 데이터가 홈페이지에 어떻게 반영되는지 상세하게 설명합니다.

## 데이터 흐름 (Data Flow)

```
관리자 페이지 (/admin/new)
    ↓ 데이터 수정/저장
데이터베이스 (PostgreSQL via Prisma)
    ↓ API 요청
홈페이지 (/)
```

---

## 섹션별 데이터 맵핑

### 1. Hero 섹션 (메인 히어로)

**관리자 페이지:**
- 경로: `/admin/new` → 콘텐츠 관리 → Hero 섹션
- 수정 가능 필드:
  - `title`: 메인 제목
  - `subtitle`: 부제목
  - `description`: 설명 텍스트
  - `imageUrl`: 배경 이미지 URL
  - `ctaText`: CTA 버튼 텍스트
  - `ctaPhone`: 전화번호

**데이터베이스:**
- 테이블: `HospitalContent`
- section: `'hero'`
- data 필드 구조:
```json
{
  "title": "통증 없는 일상을 위한",
  "subtitle": "비타민마취통증의학과",
  "description": "환자 한 분 한 분의 통증을 정확히 진단하고...",
  "imageUrl": "https://blob.vercel-storage.com/...",
  "ctaText": "진료 예약하기",
  "ctaPhone": "051-469-7581"
}
```

**홈페이지 컴포넌트:**
- 파일: `src/components/modern/ModernHero.tsx`
- API 엔드포인트: `GET /api/content?section=hero`
- 렌더링:
  - `title` → 메인 타이틀
  - `subtitle` → 서브 타이틀
  - `description` → 설명 문구
  - `imageUrl` → 배경 이미지
  - `ctaText` + `ctaPhone` → CTA 버튼

---

### 2. Marquee 섹션 (공지사항 슬라이더)

**관리자 페이지:**
- 경로: `/admin/new` → 콘텐츠 관리 → Marquee 섹션
- 수정 가능 필드: 배열 형태로 여러 공지사항
  - `icon`: Remix Icon 클래스명
  - `text`: 공지사항 텍스트

**데이터베이스:**
- section: `'marquee'`
- data 필드 구조:
```json
[
  { "icon": "ri-time-line", "text": "평일 09:00 - 18:00..." },
  { "icon": "ri-phone-line", "text": "전화: 051-469-7581" },
  { "icon": "ri-map-pin-line", "text": "부산 동구 중앙대로 375" }
]
```

**홈페이지 컴포넌트:**
- 파일: `src/components/modern/ModernMarquee.tsx`
- API 엔드포인트: `GET /api/content?section=marquee`
- 렌더링: 무한 스크롤 애니메이션으로 표시

---

### 3. Features 섹션 (주요 특징)

**관리자 페이지:**
- 경로: `/admin/new` → 콘텐츠 관리 → Features 섹션
- 수정 가능 필드: 3개 특징 카드
  - `icon`: 아이콘 클래스
  - `title`: 제목
  - `description`: 설명

**데이터베이스:**
- section: `'features'`
- data 필드 구조:
```json
{
  "features": [
    {
      "icon": "ri-user-heart-line",
      "title": "노인 전문 진료",
      "description": "노인 환자분들을 위한 맞춤 진료..."
    },
    // ... 2개 더
  ]
}
```

**홈페이지 컴포넌트:**
- 파일: `src/components/modern/ModernFeatures.tsx`
- API 엔드포인트: `GET /api/content?section=features`
- 렌더링: 3열 그리드 카드

---

### 4. Services 섹션 (진료 서비스)

**관리자 페이지:**
- 경로: `/admin/new` → 콘텐츠 관리 → Services 섹션
- 수정 가능 필드: 여러 서비스 카드
  - `id`: 고유 ID
  - `title`: 서비스 제목
  - `description`: 서비스 설명
  - `icon`: 아이콘
  - `image`: 이미지 URL (선택)

**데이터베이스:**
- section: `'services'`
- data 필드 구조:
```json
{
  "services": [
    {
      "id": "1",
      "title": "통증 치료",
      "description": "만성 통증을 효과적으로 치료합니다",
      "icon": "ri-heart-pulse-line",
      "image": ""
    }
  ]
}
```

**홈페이지 컴포넌트:**
- 파일: `src/components/modern/ModernServices.tsx`
- API 엔드포인트: `GET /api/content?section=services`
- 렌더링: 반응형 그리드 (3열)

---

### 5. Treatments 섹션 (치료 방법)

**관리자 페이지:**
- 경로: `/admin/new` → 콘텐츠 관리 → Treatments 섹션
- 수정 가능 필드: 여러 치료 방법
  - `id`: 고유 ID
  - `title`: 치료명
  - `description`: 설명
  - `icon`: 아이콘

**데이터베이스:**
- section: `'treatments'`
- data 필드 구조:
```json
[
  {
    "id": "1",
    "title": "신경차단술",
    "description": "통증을 유발하는 신경에 직접...",
    "icon": "ri-syringe-line"
  }
]
```

**홈페이지 컴포넌트:**
- 파일: `src/components/modern/ModernTreatments.tsx`
- API 엔드포인트: `GET /api/content?section=treatments`
- 렌더링: 번호 뱃지가 있는 3열 카드

---

### 6. Gallery 섹션 (이미지 갤러리)

**관리자 페이지:**
- 경로: `/admin/new` → 콘텐츠 관리 → Gallery 섹션
- 수정 가능: 이미지 업로드/삭제
  - `url`: 이미지 URL (Vercel Blob Storage)
  - `caption`: 이미지 설명 (선택)

**데이터베이스:**
- section: `'gallery'`
- data 필드 구조:
```json
{
  "images": [
    {
      "url": "https://blob.vercel-storage.com/...",
      "caption": "병원 외관"
    }
  ]
}
```

**홈페이지 컴포넌트:**
- 파일: `src/components/modern/ModernGallery.tsx`
- API 엔드포인트: `GET /api/content?section=gallery`
- 렌더링: 반응형 그리드 (2/3/4열)

---

### 7. FAQ 섹션 (자주 묻는 질문)

**관리자 페이지:**
- 경로: `/admin/new` → 콘텐츠 관리 → FAQ 섹션
- 수정 가능 필드: 여러 FAQ 항목
  - `id`: 고유 ID
  - `category`: 카테고리 (예: 진료, 치료)
  - `question`: 질문
  - `answer`: 답변

**데이터베이스:**
- section: `'faq'`
- data 필드 구조:
```json
[
  {
    "id": "1",
    "category": "진료",
    "question": "예약은 어떻게 하나요?",
    "answer": "전화(051-469-7581)로..."
  }
]
```

**홈페이지 컴포넌트:**
- 파일: `src/components/modern/ModernFAQ.tsx`
- API 엔드포인트: `GET /api/content?section=faq`
- 렌더링: 아코디언 스타일

---

### 8. Footer 섹션 (푸터 정보)

**관리자 페이지:**
- 경로: `/admin/new` → 콘텐츠 관리 → Footer 섹션
- 수정 가능 필드:
  - `name`: 병원명
  - `address`: 주소
  - `phone`: 전화번호
  - `email`: 이메일
  - `hours`: 진료시간 (객체)
  - `social`: 소셜 링크 (객체)

**데이터베이스:**
- section: `'footer'`
- data 필드 구조:
```json
{
  "name": "비타민마취통증의학과",
  "address": "부산 동구 중앙대로 375",
  "phone": "051-469-7581",
  "email": "info@vitamin-clinic.com",
  "hours": {
    "weekday": "평일 09:00 - 18:00",
    "saturday": "토요일 09:00 - 13:00",
    "closed": "일요일/공휴일 휴진"
  },
  "social": {
    "facebook": "",
    "instagram": "",
    "naver": ""
  }
}
```

**홈페이지 컴포넌트:**
- 파일: `src/components/modern/ModernFooter.tsx`
- API 엔드포인트: `GET /api/content?section=footer`
- 렌더링: 종합 푸터 + 빠른 연락 버튼

---

## 이미지 업로드 및 관리

### 이미지 저장 위치
- **저장소**: Vercel Blob Storage
- **API 엔드포인트**: `/api/upload`
- **접근 방식**:
  1. 관리자가 이미지 업로드
  2. Vercel Blob Storage에 저장
  3. 반환된 URL을 데이터베이스에 저장
  4. 홈페이지에서 URL로 이미지 로드

### 이미지 URL 형식
```
https://[blob-id].public.blob.vercel-storage.com/[file-name]-[hash].jpg
```

---

## API 엔드포인트

### 데이터 조회 (GET)
- **엔드포인트**: `/api/content?section={section_name}`
- **인증**: 불필요 (public)
- **응답**: JSON 형식의 섹션 데이터

### 데이터 수정 (POST/PUT)
- **엔드포인트**: `/api/content`
- **인증**: 필요 (관리자 세션)
- **요청 body**:
```json
{
  "section": "hero",
  "data": { ... }
}
```

---

## 데이터 동기화 흐름

1. **관리자가 데이터 수정**
   - `/admin/new` 페이지에서 섹션 선택
   - 텍스트/이미지 수정
   - "저장" 버튼 클릭

2. **API로 데이터 전송**
   - `POST /api/content`
   - 인증 확인 (admin-session cookie)
   - Prisma를 통해 PostgreSQL 업데이트

3. **홈페이지에서 데이터 로드**
   - 페이지 로드 시 `useEffect` 실행
   - `GET /api/content?section={name}` 호출
   - 받은 데이터로 state 업데이트
   - 컴포넌트 리렌더링

4. **즉시 반영**
   - 캐시 없음 (no-cache)
   - 새로고침 시 최신 데이터 반영
   - SSR이 아닌 CSR로 동적 로딩

---

## 문제 해결 가이드

### 이미지가 표시되지 않을 때
1. Vercel Blob Storage URL 확인
2. 이미지가 실제로 업로드되었는지 확인
3. CORS 설정 확인
4. 브라우저 개발자 도구에서 네트워크 탭 확인

### 데이터가 업데이트되지 않을 때
1. 브라우저 캐시 삭제
2. 페이지 새로고침 (Ctrl+F5)
3. 데이터베이스 직접 확인 (Prisma Studio)
4. API 응답 확인 (Network 탭)

### 404 에러가 발생할 때
1. 해당 섹션이 데이터베이스에 존재하는지 확인
2. `scripts/check-sections.ts` 실행
3. 누락된 섹션은 `scripts/init-missing-sections.ts`로 초기화

---

## 데이터 백업

모든 데이터는 PostgreSQL 데이터베이스에 저장되어 있습니다:
- **호스트**: Prisma Accelerate (db.prisma.io)
- **백업**: 자동 백업 (Prisma 제공)
- **복원**: Prisma Studio에서 수동 복원 가능

---

## 개발자 참고사항

### 새로운 섹션 추가 시
1. Prisma Studio에서 `HospitalContent` 테이블에 레코드 추가
2. 관리자 페이지 컴포넌트에 섹션 추가
3. 홈페이지 컴포넌트 생성
4. API 연동

### 데이터 구조 변경 시
1. 마이그레이션 스크립트 작성
2. 기존 데이터 백업
3. 스키마 변경 적용
4. 관리자 UI 업데이트
5. 홈페이지 컴포넌트 업데이트

---

마지막 업데이트: 2025-11-16
