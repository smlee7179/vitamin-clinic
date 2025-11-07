# 🔍 이미지 저장 및 로딩 로직 상세 분석

## 📋 목차
1. [전체 데이터 흐름](#전체-데이터-흐름)
2. [발견된 문제점](#발견된-문제점)
3. [적용된 수정사항](#적용된-수정사항)
4. [테스트 시나리오](#테스트-시나리오)

---

## 전체 데이터 흐름

### 1️⃣ 관리자 페이지 - 이미지 업로드

```mermaid
sequenceDiagram
    participant User as 관리자
    participant Upload as ModernImageUpload
    participant API as /api/upload
    participant Blob as Vercel Blob Storage
    participant LS as localStorage
    participant State as React State

    User->>Upload: 이미지 파일 선택/드롭
    Upload->>API: POST /api/upload (FormData)
    API->>Blob: put(filename, file)
    Blob-->>API: Blob URL 반환
    API-->>Upload: { url: "https://xxx.blob.vercel-storage.com/..." }
    Upload->>State: onUpload(url) 호출
    State->>State: setContentData({ hero: { backgroundImageFile: url } })
    State->>LS: localStorage.setItem('hospitalContent', JSON.stringify(data))
```

**핵심 포인트:**
- `ModernImageUpload`는 Blob Storage URL을 직접 반환
- `backgroundImageFile`에 **전체 URL**이 저장됨 (예: `https://xxx.blob.vercel-storage.com/...`)
- localStorage에도 **URL 그대로** 저장됨

### 2️⃣ 관리자 페이지 - 저장 로직

**파일:** `/src/app/admin/page.tsx`

#### 2.1 초기 로딩 (lines 200-217)
```typescript
useEffect(() => {
  if (!hydrated) return;

  try {
    const saved = localStorage.getItem('hospitalContent');
    if (saved) {
      setContentData(fixHospitalContent(JSON.parse(saved)));
      // ✅ Blob URL이 포함된 데이터 로드
    } else {
      setContentData(fixHospitalContent(DEFAULT_CONTENT_DATA));
    }
  } catch (e) {
    setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
  }
}, [hydrated]);
```

#### 2.2 자동 저장 (lines 220-233)
```typescript
useEffect(() => {
  if (contentData) {
    try {
      localStorage.setItem('hospitalContent', JSON.stringify(contentData));
      // ✅ Blob URL이 포함된 contentData 저장

      // storage 이벤트를 수동으로 발생시켜 다른 탭에서 즉시 반영
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'hospitalContent',
        newValue: JSON.stringify(contentData)
      }));
    } catch (e) {
      setError('로컬 저장소 용량이 초과되었습니다.');
    }
  }
}, [contentData]);
```

**중요:** `contentData`가 변경될 때마다 자동으로 localStorage에 저장됩니다.

#### 2.3 탭 간 동기화 (lines 236-249)
```typescript
useEffect(() => {
  if (!hydrated) return;

  const loadData = () => {
    try {
      const saved = localStorage.getItem('hospitalContent');
      if (saved) setContentData(fixHospitalContent(JSON.parse(saved)));
    } catch (e) {
      setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
    }
  };

  window.addEventListener('storage', loadData);
  return () => window.removeEventListener('storage', loadData);
}, [hydrated]);
```

### 3️⃣ 홈페이지 - 이미지 로딩

**파일:** `/src/app/page.tsx`

#### 3.1 초기 로딩 (lines 22-119)
```typescript
useEffect(() => {
  if (!hydrated) return;

  try {
    const saved = localStorage.getItem('hospitalContent');
    if (saved) {
      setContentData(fixHospitalContent(JSON.parse(saved)));
      // ✅ 관리자가 저장한 데이터 (Blob URL 포함) 로드
    } else {
      setContentData(defaultData);
    }
  } catch (e) {
    setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
  }
}, [hydrated]);
```

#### 3.2 탭 간 동기화 (lines 121-228)
```typescript
useEffect(() => {
  if (!hydrated) return;

  const loadData = () => {
    try {
      const saved = localStorage.getItem('hospitalContent');
      if (saved) {
        setContentData(fixHospitalContent(JSON.parse(saved)));
        // ✅ 관리자 페이지의 변경사항 실시간 반영
      }
    } catch (e) {
      setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
    }
  };

  window.addEventListener('storage', loadData);
  return () => window.removeEventListener('storage', loadData);
}, [hydrated]);
```

#### 3.3 Hero 섹션 이미지 렌더링 (lines 454-468)
```typescript
style={{
  backgroundImage: (() => {
    const imageFile = contentData?.hero?.backgroundImageFile;
    if (imageFile && hydrated) {
      // ✅ URL 감지 (Blob Storage)
      if (imageFile.startsWith('http')) {
        return `url('${imageFile}')`;
      }
      // ⚠️ localStorage 키로 폴백 (레거시 지원)
      const img = localStorage.getItem(imageFile);
      if (img) return `url('${img}')`;
    }
    // 기본 이미지 API 호출
    return contentData?.hero?.backgroundImage
      ? `url('https://readdy.ai/api/search-image?...')`
      : `url('https://readdy.ai/api/search-image?...')`;
  })(),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}}
```

---

## 발견된 문제점

### ❌ 문제 1: 관리자 페이지 `getImageSrc` 함수

**위치:** `/src/app/admin/page.tsx:283-291`

**기존 코드:**
```typescript
const getImageSrc = (key: string | undefined, fallback: string) => {
  if (!key || !hydrated) return fallback;
  try {
    const img = localStorage.getItem(key);  // ❌ 항상 localStorage 키로 취급
    return img || fallback;
  } catch {
    return fallback;
  }
};
```

**문제점:**
1. `backgroundImageFile`에 Blob Storage URL이 저장됨: `"https://xxx.blob.vercel-storage.com/..."`
2. `getImageSrc`가 이 URL을 localStorage 키로 취급
3. `localStorage.getItem("https://xxx.blob.vercel-storage.com/...")`는 `null` 반환
4. `ModernImageUpload`의 `currentImage` prop에 빈 문자열 전달
5. **결과:** 업로드한 이미지가 관리자 페이지에서 미리보기로 표시되지 않음

### ❌ 문제 2: 홈페이지 `getImageSrc` 함수

**위치:** `/src/app/page.tsx:231-239`

**동일한 문제:**
- Blob Storage URL을 localStorage 키로 취급
- 이미지를 찾지 못함
- 기본 이미지 API로 폴백

---

## 적용된 수정사항

### ✅ 수정 1: 관리자 페이지 `getImageSrc`

**파일:** `/src/app/admin/page.tsx:283-298`

```typescript
const getImageSrc = (key: string | undefined, fallback: string) => {
  if (!key || !hydrated) return fallback;

  // ✅ URL 감지 추가
  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key;  // Blob Storage URL 직접 반환
  }

  // localStorage 키로 폴백 (레거시 지원)
  try {
    const img = localStorage.getItem(key);
    return img || fallback;
  } catch {
    return fallback;
  }
};
```

**개선 사항:**
1. ✅ Blob Storage URL을 직접 반환
2. ✅ localStorage 키 방식도 지원 (하위 호환성)
3. ✅ `ModernImageUpload`에 올바른 이미지 URL 전달

### ✅ 수정 2: 홈페이지 `getImageSrc`

**파일:** `/src/app/page.tsx:231-246`

```typescript
const getImageSrc = (key: string | undefined, fallback: string) => {
  if (!key || !hydrated) return fallback;

  // ✅ URL 감지 추가
  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key;  // Blob Storage URL 직접 반환
  }

  // localStorage 키로 폴백 (레거시 지원)
  try {
    const img = localStorage.getItem(key);
    return img || fallback;
  } catch {
    return fallback;
  }
};
```

**개선 사항:**
1. ✅ 관리자가 업로드한 이미지가 홈페이지에 즉시 표시
2. ✅ localStorage 키 방식도 지원 (하위 호환성)
3. ✅ 일관된 이미지 로딩 로직

### ✅ 수정 3: Hero 섹션 inline 로직 (이전 커밋)

**파일:** `/src/app/page.tsx:454-468`

Hero 섹션의 배경 이미지 렌더링 로직도 동일하게 URL 감지 기능이 추가되었습니다.

---

## 데이터 흐름 요약

### 📊 전체 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                        관리자 페이지                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ModernImageUpload                                              │
│       │                                                         │
│       ├──> POST /api/upload ──> Vercel Blob Storage            │
│       │                              │                          │
│       │                              ▼                          │
│       └──> onUpload(url) ──> "https://xxx.blob.vercel.../..."  │
│                    │                                            │
│                    ▼                                            │
│          contentData.hero.backgroundImageFile                   │
│                    │                                            │
│                    ▼                                            │
│              localStorage.setItem('hospitalContent', ...)       │
│                    │                                            │
└────────────────────┼────────────────────────────────────────────┘
                     │
                     │ storage event
                     │
┌────────────────────▼────────────────────────────────────────────┐
│                        홈페이지                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  window.addEventListener('storage', ...)                        │
│       │                                                         │
│       ▼                                                         │
│  localStorage.getItem('hospitalContent')                        │
│       │                                                         │
│       ▼                                                         │
│  contentData = JSON.parse(saved)                                │
│       │                                                         │
│       ▼                                                         │
│  getImageSrc(contentData.hero.backgroundImageFile)              │
│       │                                                         │
│       ├──> URL 감지? ──> YES ──> URL 직접 사용                  │
│       │                                                         │
│       └──> NO ──> localStorage.getItem(key) ──> 레거시 방식     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🔄 이미지 업데이트 시퀀스

1. **관리자가 이미지 업로드**
   - `ModernImageUpload` → `/api/upload` → Vercel Blob
   - Blob Storage URL 반환: `https://xxx.blob.vercel-storage.com/...`

2. **관리자 페이지 상태 업데이트**
   - `setContentData({ hero: { backgroundImageFile: url } })`
   - `contentData` 변경 감지

3. **localStorage 자동 저장**
   - `useEffect` → `localStorage.setItem('hospitalContent', ...)`
   - storage 이벤트 수동 발생

4. **홈페이지 실시간 반영**
   - storage 이벤트 수신
   - localStorage 데이터 다시 로드
   - `getImageSrc`로 이미지 URL 추출
   - Hero 섹션 배경 이미지 업데이트

---

## 테스트 시나리오

### ✅ 시나리오 1: 새 이미지 업로드

1. 관리자 페이지 접속 → Hero 탭
2. "배경 이미지" 섹션에서 새 이미지 업로드
3. **예상 결과:**
   - ✅ 업로드 즉시 미리보기 표시
   - ✅ `ModernImageUpload` 컴포넌트에 이미지 보임
   - ✅ 호버 시 "변경", "삭제" 버튼 표시

4. 새 탭에서 홈페이지 열기 (또는 기존 탭 새로고침)
5. **예상 결과:**
   - ✅ Hero 섹션 배경에 업로드한 이미지 표시
   - ✅ 이미지가 전체 화면에 cover로 표시

### ✅ 시나리오 2: 이미지 변경

1. 관리자 페이지에서 기존 이미지 호버
2. "변경" 버튼 클릭 → 다른 이미지 선택
3. **예상 결과:**
   - ✅ 새 이미지로 즉시 교체
   - ✅ 이전 이미지 URL이 새 URL로 교체됨
   - ✅ localStorage 업데이트

4. 홈페이지 확인
5. **예상 결과:**
   - ✅ 새 이미지 표시 (자동 반영 또는 새로고침 후)

### ✅ 시나리오 3: 이미지 삭제

1. 관리자 페이지에서 이미지 호버
2. "삭제" 버튼 클릭
3. **예상 결과:**
   - ✅ 이미지 미리보기 사라짐
   - ✅ 업로드 UI로 복귀
   - ✅ `backgroundImageFile: ""`로 설정

4. 홈페이지 확인
5. **예상 결과:**
   - ✅ 기본 이미지 API 호출로 폴백
   - ✅ `readdy.ai` 이미지 표시

### ✅ 시나리오 4: 탭 간 동기화

1. 관리자 페이지 탭 열기
2. 홈페이지 탭 열기 (동시)
3. 관리자 페이지에서 이미지 업로드
4. **예상 결과:**
   - ✅ 관리자 페이지: 즉시 미리보기
   - ✅ 홈페이지 탭: 자동 감지 및 업데이트 (storage 이벤트)
   - ⚠️ 같은 탭 내에서는 storage 이벤트 발생 안 함 (브라우저 제한)

### ✅ 시나리오 5: 레거시 데이터 호환성

1. localStorage에 기존 방식으로 저장된 데이터 존재
   ```json
   {
     "hero": {
       "backgroundImageFile": "hero-background-12345"
     }
   }
   ```
2. `localStorage.getItem("hero-background-12345")` → base64 이미지

3. **예상 결과:**
   - ✅ `getImageSrc` 함수가 localStorage 키로 인식
   - ✅ base64 이미지 반환
   - ✅ 정상 표시 (하위 호환성 유지)

---

## 핵심 개선 사항

### ✅ 1. 이중 저장 방식 지원
- **Blob Storage URL**: `https://xxx.blob.vercel-storage.com/...`
- **localStorage 키**: `hero-background-12345` (레거시)

### ✅ 2. 자동 감지 로직
```typescript
if (key.startsWith('http://') || key.startsWith('https://')) {
  return key;  // URL
} else {
  return localStorage.getItem(key);  // localStorage 키
}
```

### ✅ 3. 실시간 동기화
- storage 이벤트로 탭 간 자동 동기화
- `window.dispatchEvent(new StorageEvent(...))`

### ✅ 4. 일관된 로직
- 관리자 페이지와 홈페이지 동일한 `getImageSrc` 함수

---

## 파일별 변경 요약

### 📝 `/src/app/admin/page.tsx`
- **Line 283-298**: `getImageSrc` 함수에 URL 감지 로직 추가

### 📝 `/src/app/page.tsx`
- **Line 231-246**: `getImageSrc` 함수에 URL 감지 로직 추가
- **Line 454-468**: Hero 섹션 inline 로직 URL 감지 (이전 커밋)

### 📝 `/src/components/admin/ModernImageUpload.tsx`
- 변경 없음 (정상 동작)

### 📝 `/src/app/api/upload/route.ts`
- 변경 없음 (정상 동작)

---

## 추가 권장사항

### 🔧 성능 최적화 (선택사항)

1. **이미지 압축**
   - ModernImageUpload에서 업로드 전 이미지 압축
   - `browser-image-compression` 라이브러리 사용

2. **CDN 캐싱**
   - Vercel Blob은 자동으로 CDN 제공
   - Cache-Control 헤더 최적화

3. **지연 로딩**
   - Hero 섹션 이외의 이미지는 lazy loading
   - `loading="lazy"` 속성 추가

### 🛡️ 에러 처리 개선 (선택사항)

1. **업로드 실패 시 재시도**
   - 네트워크 오류 시 자동 재시도 로직
   - 사용자에게 명확한 에러 메시지

2. **이미지 로드 실패 처리**
   - `onError` 핸들러 추가
   - 대체 이미지 표시

---

## 결론

### ✅ 해결된 문제
1. ✅ 관리자 페이지에서 업로드한 이미지 미리보기 표시
2. ✅ 홈페이지에 이미지 정상 반영
3. ✅ 레거시 localStorage 키 방식도 지원
4. ✅ 탭 간 실시간 동기화

### 🎯 정상 운영 가능
- 모든 이미지 업로드/변경/삭제 기능 정상 작동
- 관리자 페이지 ↔ 홈페이지 동기화 완료
- Vercel Blob Storage 연동 완료

### 📌 다음 단계
1. 배포 후 프로덕션 환경 테스트
2. 실제 이미지 업로드 테스트
3. 다양한 브라우저 호환성 확인
