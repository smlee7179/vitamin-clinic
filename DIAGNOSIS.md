# 🔍 이미지 반영 문제 진단 결과

## 📋 문제 요약

**증상**: 관리자 페이지에서 이미지를 업로드하고 저장했지만, 홈페이지에 이미지가 표시되지 않음

## 🔬 코드 분석 결과

### 1. 데이터 흐름

```
관리자 페이지 (/admin)
  ↓
ModernImageUpload → Blob Storage → URL 반환
  ↓
setContentData → contentData.hero.backgroundImageFile = "https://..."
  ↓
useEffect → localStorage.setItem('hospitalContent', JSON.stringify(contentData))
  ↓
localStorage 저장 완료 ✅
```

```
홈페이지 (/)
  ↓
useEffect → localStorage.getItem('hospitalContent')
  ↓
fixHospitalContent(parsed) ← **여기서 문제 발생 가능성**
  ↓
setContentData
  ↓
getImageSrc(contentData.hero.backgroundImageFile)
```

### 2. 발견된 잠재적 문제들

#### 문제 A: `fixHospitalContent`의 spread 순서

**파일**: `/src/lib/fixHospitalContent.ts:172`

```typescript
export function fixHospitalContent(content: any): HospitalContent {
  return {
    hero: { ...DEFAULT.hero, ...(content.hero || {}) },
    // ...
  };
}
```

**분석**:
- `DEFAULT.hero`가 먼저 spread: `{ backgroundImageFile: '' }`
- `content.hero`가 나중에 spread: `{ backgroundImageFile: 'https://...' }`
- **JavaScript의 spread는 나중 값이 우선**이므로 이론적으로 문제 없음

**하지만**, 다음 경우에 문제 발생:
- `content.hero`가 `undefined`이거나 `null`인 경우
- `content.hero.backgroundImageFile`이 명시적으로 존재하지 않는 경우

#### 문제 B: 홈페이지의 중복된 기본값

**파일**: `/src/app/page.tsx:32-140`

홈페이지에 두 곳에 하드코딩된 기본값이 있습니다:
1. Line 32-114: 초기 로딩 시
2. Line 132-211: storage 이벤트 리스너에서

**문제점**:
```typescript
const defaultData = fixHospitalContent({
  hero: {
    // ...
    backgroundImageFile: ''  // ← 빈 문자열로 하드코딩
  },
  // ...
});
```

이 기본값들이 `fixHospitalContent` 함수를 거치면서 **빈 문자열**로 초기화될 수 있습니다.

#### 문제 C: `getImageSrc` 함수의 조건

**파일**: `/src/app/page.tsx:231-261`

```typescript
const getImageSrc = (key: string | undefined, fallback: string) => {
  if (!hydrated) return fallback;
  if (!key || key.trim() === '') return fallback;  // ← 빈 문자열 체크

  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key;  // ✅ 정상
  }
  // ...
};
```

**분석**:
- `key`가 빈 문자열이면 fallback 반환
- 문제: localStorage에 저장된 URL이 어딘가에서 빈 문자열로 변경되었을 수 있음

### 3. 근본 원인 추정

#### 시나리오 1: localStorage에 올바르게 저장되지 않음

```
관리자 페이지에서 이미지 업로드
  ↓
contentData.hero.backgroundImageFile = "https://..."
  ↓
localStorage.setItem(...) 호출
  ↓
하지만 실제 저장된 값: { backgroundImageFile: "" }  ❌
```

**가능한 원인**:
- `setContentData` 호출 후 즉시 `localStorage.setItem` 호출 시 state 업데이트가 완료되지 않았을 수 있음
- React의 state 업데이트는 비동기적

#### 시나리오 2: 홈페이지에서 로드 시 덮어씀

```
localStorage.getItem → { hero: { backgroundImageFile: "https://..." } }
  ↓
fixHospitalContent 호출
  ↓
DEFAULT.hero와 merge
  ↓
결과: { hero: { backgroundImageFile: "https://..." } }  ← 이론상 정상
  ↓
하지만 실제로는 빈 문자열로 덮어써질 가능성
```

#### 시나리오 3: 타이밍 이슈

```
관리자 페이지: 이미지 업로드 → localStorage 저장
  ↓ (탭 전환)
홈페이지: localStorage 로드 시도
  ↓
하지만 storage 이벤트가 발생하면서 기본값으로 리셋
```

### 4. 진단 방법

#### 브라우저 콘솔에서 실행할 명령어:

```javascript
// 1. localStorage 확인
const data = localStorage.getItem('hospitalContent');
console.log('📦 Raw localStorage:', data);

if (data) {
  const parsed = JSON.parse(data);
  console.log('🔍 Parsed data:', {
    heroBackgroundImageFile: parsed.hero?.backgroundImageFile,
    orthopedicImageFile: parsed.services?.orthopedic?.imageFile,
    anesthesiaImageFile: parsed.services?.anesthesia?.imageFile,
    rehabilitationImageFile: parsed.services?.rehabilitation?.imageFile
  });
}

// 2. localStorage 크기 확인
let total = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    total += localStorage[key].length + key.length;
  }
}
console.log('💾 Total localStorage size:', (total / 1024).toFixed(2), 'KB');

// 3. Blob URLs 확인
if (data) {
  const parsed = JSON.parse(data);
  const allImageFiles = [
    parsed.hero?.backgroundImageFile,
    parsed.services?.orthopedic?.imageFile,
    parsed.services?.anesthesia?.imageFile,
    parsed.services?.rehabilitation?.imageFile
  ].filter(Boolean);

  console.log('🖼️ All image files:', allImageFiles);
  console.log('✅ URLs starting with http:', allImageFiles.filter(url => url.startsWith('http')));
}
```

## 🎯 해결 방안

### 해결 방안 1: `fixHospitalContent` 함수 개선

**문제**: DEFAULT 값이 실제 값을 덮어쓸 가능성

**해결책**: 명시적으로 imageFile 필드 보존

```typescript
export function fixHospitalContent(content: any): HospitalContent {
  return {
    hero: {
      ...DEFAULT.hero,
      ...(content.hero || {}),
      // 명시적으로 imageFile 보존
      backgroundImageFile: content.hero?.backgroundImageFile || DEFAULT.hero.backgroundImageFile
    },
    services: {
      ...DEFAULT.services,
      ...(content.services || {}),
      orthopedic: {
        ...DEFAULT.services.orthopedic,
        ...((content.services && content.services.orthopedic) || {}),
        imageFile: content.services?.orthopedic?.imageFile || DEFAULT.services.orthopedic.imageFile
      },
      // ... 다른 서비스도 동일하게
    },
    // ...
  };
}
```

### 해결 방안 2: 관리자 페이지의 저장 로직 개선

**문제**: state 업데이트와 localStorage 저장의 타이밍 이슈

**해결책**: useEffect의 의존성 배열에 contentData 추가 (이미 되어 있음)

현재 코드 (정상):
```typescript
useEffect(() => {
  if (contentData) {
    localStorage.setItem('hospitalContent', JSON.stringify(contentData));
  }
}, [contentData]);  // ✅ 의존성 배열에 contentData 포함
```

### 해결 방안 3: 홈페이지의 기본값 제거

**문제**: 홈페이지에 하드코딩된 기본값이 localStorage 값을 덮어쓸 가능성

**해결책**: localStorage가 비어있을 때만 기본값 사용

```typescript
useEffect(() => {
  if (!hydrated) return;

  try {
    const saved = localStorage.getItem('hospitalContent');
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('📥 Loaded from localStorage:', {
        backgroundImageFile: parsed.hero?.backgroundImageFile
      });
      setContentData(fixHospitalContent(parsed));
    }
    // else는 제거 - 기본값을 강제로 설정하지 않음
  } catch (e) {
    console.error('❌ Load error:', e);
    setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
  }
}, [hydrated]);
```

### 해결 방안 4: 디버깅 로그 강화

현재 코드에 이미 로그가 있지만, 더 상세한 로그 추가:

```typescript
export function fixHospitalContent(content: any): HospitalContent {
  console.log('🔧 fixHospitalContent input:', {
    heroBackgroundImageFile: content.hero?.backgroundImageFile,
  });

  const result = {
    hero: { ...DEFAULT.hero, ...(content.hero || {}) },
    // ...
  };

  console.log('🔧 fixHospitalContent output:', {
    heroBackgroundImageFile: result.hero.backgroundImageFile,
  });

  return result;
}
```

## 🧪 테스트 계획

### 1. 관리자 페이지 테스트

1. 관리자 페이지 접속
2. F12 → Console 열기
3. 이미지 업로드
4. 콘솔에서 다음 확인:
   ```
   📤 Hero onUpload called with URL: https://...
   💾 Updated contentData.hero.backgroundImageFile: https://...
   💾 Saving to localStorage: { backgroundImageFile: "https://..." }
   ✅ Saved successfully
   ```
5. localStorage 직접 확인:
   ```javascript
   JSON.parse(localStorage.getItem('hospitalContent')).hero.backgroundImageFile
   ```

### 2. 홈페이지 테스트

1. 홈페이지 접속
2. F12 → Console 열기
3. 콘솔에서 다음 확인:
   ```
   📂 Loading from localStorage...
   📥 Loaded data: { backgroundImageFile: "https://..." }
   🔧 fixHospitalContent output: { backgroundImageFile: "https://..." }
   ✅ Using Blob Storage URL: https://...
   ```
4. 이미지가 표시되는지 확인

### 3. 크로스 탭 테스트

1. 관리자 페이지에서 이미지 업로드
2. 다른 탭에서 홈페이지 열기
3. 홈페이지에서 이미지가 즉시 반영되는지 확인
4. storage 이벤트가 올바르게 발생하는지 확인

## 📊 현재 상태 요약

### ✅ 정상 작동하는 부분
- ModernImageUpload: Blob Storage에 업로드 후 URL 반환
- 관리자 페이지 useEffect: contentData 변경 시 localStorage 자동 저장
- getImageSrc: HTTP/HTTPS URL 자동 감지

### ❓ 의심되는 부분
- fixHospitalContent: DEFAULT 값과 merge 시 실제 URL이 보존되는가?
- 홈페이지 기본값: localStorage가 비어있을 때 설정하는 기본값이 문제인가?
- 타이밍: state 업데이트와 localStorage 저장의 타이밍이 맞는가?

### ❌ 확인된 문제
- (테스트 후 업데이트 예정)

## 🔜 다음 단계

1. `fixHospitalContent` 함수 개선 적용
2. 홈페이지 기본값 로직 개선
3. 디버깅 로그 추가
4. 실제 브라우저에서 테스트
5. localStorage 내용 확인
6. 문제 원인 특정 및 수정
