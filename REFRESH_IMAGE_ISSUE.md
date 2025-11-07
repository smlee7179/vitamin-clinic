# 🔍 새로고침 시 이미지 사라지는 문제 분석 및 해결

## 📋 문제 상황

### 사용자 리포트
> "관리자 페이지에 이미지 업로드 후 저장을 하고 페이지 새로고침을 하면 이미지가 사라져"

### 재현 단계
1. 관리자 페이지 접속 (`/admin`)
2. Hero 섹션에서 이미지 업로드
3. 이미지가 업로드됨 (Blob Storage URL 반환)
4. `ModernImageUpload` 컴포넌트에 미리보기 표시됨
5. **페이지 새로고침 (F5 또는 Cmd+R)**
6. ❌ **이미지가 사라짐**

---

## 🔬 상세 분석

### 1. 데이터 흐름 확인

#### A. 이미지 업로드 시 (`ModernImageUpload`)

```javascript
// ModernImageUpload.tsx:75-91
const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
setPreview(data.url);  // 로컬 상태 업데이트
onUpload(data.url);    // ✅ 부모 컴포넌트로 URL 전달
```

**결과:** `data.url = "https://xxx.blob.vercel-storage.com/..."`

#### B. 관리자 페이지 상태 업데이트

```javascript
// admin/page.tsx:642-650
onUpload={(url) => {
  setContentData(prev => {
    const base = prev ?? DEFAULT_CONTENT_DATA;
    return {
      ...base,
      hero: { ...base.hero, backgroundImageFile: url }  // ✅ URL 저장
    };
  });
}}
```

**결과:** `contentData.hero.backgroundImageFile = "https://xxx.blob.vercel-storage.com/..."`

#### C. localStorage 자동 저장

```javascript
// admin/page.tsx:220-241
useEffect(() => {
  if (contentData) {
    try {
      localStorage.setItem('hospitalContent', JSON.stringify(contentData));
      // ✅ contentData가 localStorage에 저장됨
      window.dispatchEvent(new StorageEvent('storage', { ... }));
    } catch (e) {
      setError('로컬 저장소 용량이 초과되었습니다.');
    }
  }
}, [contentData]);
```

**결과:** localStorage에 Blob URL 포함된 데이터 저장됨

---

### 2. 새로고침 시 데이터 로드

#### A. 초기 로딩

```javascript
// admin/page.tsx:200-231
useEffect(() => {
  if (!hydrated) return;

  try {
    const saved = localStorage.getItem('hospitalContent');
    if (saved) {
      const parsed = JSON.parse(saved);  // ✅ localStorage에서 파싱
      const fixed = fixHospitalContent(parsed);  // ⚠️ 이 단계가 의심됨
      setContentData(fixed);
    }
  } catch (e) {
    setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
  }
}, [hydrated]);
```

#### B. `fixHospitalContent` 함수 분석

```javascript
// lib/fixHospitalContent.ts:170-172
export function fixHospitalContent(content: any): HospitalContent {
  return {
    hero: { ...DEFAULT.hero, ...(content.hero || {}) },
    // ...
  };
}
```

**분석:**
1. `DEFAULT.hero`를 먼저 spread: `{ backgroundImageFile: '' }`
2. `content.hero`를 나중에 spread: `{ backgroundImageFile: 'https://...' }`
3. JavaScript의 spread 연산자는 나중의 값이 이전 값을 덮어씀
4. **이론적으로는 문제 없음!**

---

## 🎯 문제의 실제 원인 (추정)

### 가설 1: localStorage 저장 실패 ⭐ **가능성 높음**

`contentData`가 변경될 때마다 `useEffect`가 실행되어 localStorage에 저장되는데, 만약:

1. **Blob Storage URL이 긴 문자열이라 용량 문제 발생**
   - localStorage는 브라우저마다 다르지만 보통 5-10MB 제한
   - 여러 이미지 URL이 쌓이면 용량 초과 가능

2. **저장 중 에러 발생**
   ```javascript
   try {
     localStorage.setItem('hospitalContent', JSON.stringify(contentData));
   } catch (e) {
     setError('로컬 저장소 용량이 초과되었습니다.');  // ⚠️ 사용자가 못 봤을 수도
   }
   ```

3. **저장 실패 시 이전 데이터 유지**
   - localStorage.setItem이 실패하면 이전 값 유지
   - 하지만 화면에는 새 이미지가 표시됨 (React state)
   - 새로고침 시 localStorage의 이전 값(빈 문자열) 로드

### 가설 2: contentData 초기화 경쟁 상태

```javascript
// admin/page.tsx:195-197
const [contentData, setContentData] = useState<ContentData | null>(null);
```

초기값이 `null`인 상태에서:
1. hydrated가 false → true로 변경
2. localStorage 로드 시작
3. **하지만 다른 useEffect가 먼저 실행되어 contentData를 DEFAULT로 설정?**

### 가설 3: `fixHospitalContent`의 버그

실제 저장된 데이터 구조와 `fixHospitalContent`가 기대하는 구조가 다를 수 있음:

```javascript
// 저장된 데이터
{
  hero: {
    backgroundImageFile: "https://xxx.blob.vercel-storage.com/..."
  }
}

// fixHospitalContent 실행 후
{
  hero: {
    ...DEFAULT.hero,  // backgroundImageFile: ''
    ...content.hero   // backgroundImageFile: "https://..." ✅ 덮어씀
  }
}
```

이론적으로 문제 없음. **하지만 실제로 어떻게 동작하는지 확인 필요!**

---

## 🔧 적용된 디버깅 코드

### 저장 시점 로깅

```javascript
useEffect(() => {
  if (contentData) {
    try {
      console.log('💾 Saving to localStorage:', {
        backgroundImageFile: contentData.hero.backgroundImageFile,
        orthopedicImageFile: contentData.services.orthopedic.imageFile,
        anesthesiaImageFile: contentData.services.anesthesia.imageFile,
        rehabilitationImageFile: contentData.services.rehabilitation.imageFile
      });
      localStorage.setItem('hospitalContent', JSON.stringify(contentData));
      console.log('✅ Saved successfully');
    } catch (e) {
      console.error('❌ Save failed:', e);
      setError('로컬 저장소 용량이 초과되었습니다.');
    }
  }
}, [contentData]);
```

### 로드 시점 로깅

```javascript
useEffect(() => {
  if (!hydrated) return;

  try {
    const saved = localStorage.getItem('hospitalContent');
    console.log('📂 Loading from localStorage...');
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('📥 Loaded data:', {
        backgroundImageFile: parsed.hero?.backgroundImageFile,
        // ...
      });
      const fixed = fixHospitalContent(parsed);
      console.log('🔧 After fixHospitalContent:', {
        backgroundImageFile: fixed.hero.backgroundImageFile,
        // ...
      });
      setContentData(fixed);
      console.log('✅ setContentData: loaded from localStorage');
    }
  } catch (e) {
    console.error('❌ Load error:', e);
  }
}, [hydrated]);
```

---

## 🧪 테스트 방법

### 1. 개발자 도구 콘솔 확인

1. 관리자 페이지 접속
2. F12 → Console 탭 열기
3. 이미지 업로드
4. 콘솔에서 다음 메시지 확인:
   ```
   💾 Saving to localStorage: { backgroundImageFile: "https://..." }
   ✅ Saved successfully
   ```

5. 페이지 새로고침 (F5)
6. 콘솔에서 다음 메시지 확인:
   ```
   📂 Loading from localStorage...
   📥 Loaded data: { backgroundImageFile: "https://..." }
   🔧 After fixHospitalContent: { backgroundImageFile: "https://..." }
   ✅ setContentData: loaded from localStorage
   ```

### 2. localStorage 직접 확인

개발자 도구 콘솔에서 실행:

```javascript
// 저장된 데이터 확인
const data = JSON.parse(localStorage.getItem('hospitalContent'));
console.log('Hero background:', data.hero.backgroundImageFile);

// localStorage 용량 확인
let total = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    total += localStorage[key].length + key.length;
  }
}
console.log('Total localStorage size:', (total / 1024).toFixed(2), 'KB');
```

### 3. 예상되는 결과

#### ✅ 정상 동작 시:
```
💾 Saving to localStorage: { backgroundImageFile: "https://wnfsvqbhcwypdzwhxyfv.supabase.co/..." }
✅ Saved successfully
[새로고침]
📂 Loading from localStorage...
📥 Loaded data: { backgroundImageFile: "https://wnfsvqbhcwypdzwhxyfv.supabase.co/..." }
🔧 After fixHospitalContent: { backgroundImageFile: "https://wnfsvqbhcwypdzwhxyfv.supabase.co/..." }
✅ setContentData: loaded from localStorage
```

#### ❌ 문제 발생 시 (가설 1 - 저장 실패):
```
💾 Saving to localStorage: { backgroundImageFile: "https://..." }
❌ Save failed: QuotaExceededError
[새로고침]
📂 Loading from localStorage...
📥 Loaded data: { backgroundImageFile: "" }  // ⚠️ 빈 문자열!
🔧 After fixHospitalContent: { backgroundImageFile: "" }
✅ setContentData: loaded from localStorage
```

#### ❌ 문제 발생 시 (가설 3 - fixHospitalContent 버그):
```
💾 Saving to localStorage: { backgroundImageFile: "https://..." }
✅ Saved successfully
[새로고침]
📂 Loading from localStorage...
📥 Loaded data: { backgroundImageFile: "https://..." }  // ✅ 저장됨
🔧 After fixHospitalContent: { backgroundImageFile: "" }  // ❌ 여기서 사라짐!
✅ setContentData: loaded from localStorage
```

---

## 💡 해결 방안

### 방안 1: localStorage 용량 문제 해결

Blob Storage URL만 저장하고, base64 데이터는 저장하지 않기:

**현재 상태:**
- ✅ `ModernImageUpload`는 이미 Blob Storage URL만 저장
- ✅ 용량 효율적

**추가 개선:**
localStorage 용량 모니터링 추가

```javascript
useEffect(() => {
  if (contentData) {
    try {
      const dataStr = JSON.stringify(contentData);
      const sizeKB = (dataStr.length / 1024).toFixed(2);
      console.log(`💾 Saving ${sizeKB} KB to localStorage`);

      // 5MB 경고
      if (dataStr.length > 5 * 1024 * 1024) {
        console.warn('⚠️ Data size exceeds 5MB!');
      }

      localStorage.setItem('hospitalContent', dataStr);
      console.log('✅ Saved successfully');
    } catch (e) {
      console.error('❌ Save failed:', e);
      setError('로컬 저장소 용량이 초과되었습니다. 이미지를 줄여주세요.');
    }
  }
}, [contentData]);
```

### 방안 2: `fixHospitalContent` 함수 개선

명시적으로 `backgroundImageFile` 보존:

```javascript
export function fixHospitalContent(content: any): HospitalContent {
  return {
    hero: {
      ...DEFAULT.hero,
      ...(content.hero || {}),
      // 명시적으로 보존
      backgroundImageFile: content.hero?.backgroundImageFile || DEFAULT.hero.backgroundImageFile
    },
    // ...
  };
}
```

**하지만:** spread 연산자가 이미 올바르게 동작하므로 불필요할 수 있음.

### 방안 3: 에러 시각화 개선

저장 실패 시 사용자에게 명확한 알림:

```javascript
catch (e) {
  console.error('❌ Save failed:', e);
  setError('로컬 저장소 용량이 초과되었습니다. 이미지를 줄여주세요.');

  // Toast notification 추가
  alert('⚠️ 저장 실패: localStorage 용량이 초과되었습니다. 이미지를 줄여주세요.');
}
```

### 방안 4: 서버 기반 저장 (장기 계획)

localStorage 대신 데이터베이스 사용:

1. **Prisma DB에 content 테이블 생성**
   ```prisma
   model Content {
     id        String   @id @default(cuid())
     type      String   // 'hero', 'services', etc.
     data      Json
     updatedAt DateTime @updatedAt
   }
   ```

2. **API 엔드포인트 생성**
   - `POST /api/content` - 저장
   - `GET /api/content` - 로드

3. **장점:**
   - ✅ 용량 제한 없음
   - ✅ 여러 디바이스에서 동기화
   - ✅ 버전 관리 가능
   - ✅ 백업 자동화

---

## 📊 현재 상황 요약

### ✅ 확인된 사항
1. `ModernImageUpload`는 Blob Storage URL을 올바르게 반환
2. `onUpload` 콜백이 올바르게 `setContentData` 호출
3. `useEffect`로 `contentData` 변경 시 localStorage에 자동 저장
4. `fixHospitalContent` 로직은 이론적으로 올바름

### ❓ 불확실한 사항
1. localStorage 저장이 실제로 성공하는가?
2. 저장 실패 시 에러가 발생하는가?
3. `fixHospitalContent`가 실제로 URL을 보존하는가?

### 🔍 다음 단계
1. **디버깅 코드로 실제 동작 확인** (콘솔 로그 분석)
2. localStorage 용량 확인
3. 문제 원인 특정 후 적절한 해결 방안 적용

---

## 🎯 즉시 적용 가능한 임시 해결책

### 사용자 안내 메시지 추가

```javascript
// admin/page.tsx
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
  <div className="flex items-start gap-3">
    <i className="ri-information-line text-yellow-600 text-xl mt-0.5"></i>
    <div>
      <h3 className="font-semibold text-yellow-800 mb-1">💡 저장 안내</h3>
      <p className="text-sm text-yellow-700">
        이미지 업로드 후 자동으로 저장됩니다.
        만약 새로고침 후 이미지가 사라진다면, 브라우저 콘솔(F12)에서
        에러 메시지를 확인해주세요.
      </p>
    </div>
  </div>
</div>
```

---

## 📝 결론

현재 코드는 **이론적으로 올바르게 동작**해야 합니다. 하지만 실제로 이미지가 사라진다는 것은:

1. **localStorage 저장 실패** (가장 가능성 높음)
2. **브라우저 특정 문제** (Safari의 Private Mode 등)
3. **예상치 못한 버그**

추가된 디버깅 코드로 실제 동작을 확인하면 정확한 원인을 파악할 수 있습니다.

**다음 커밋에서는:**
- 디버깅 결과 분석
- 근본 원인 수정
- 영구적 해결책 적용
