# 저장 안 된 변경사항 경고 기능 구현 완료

## 구현 일자
2025-11-17

## 구현 파일
- `/Users/seungmin/vitamin-clinic/src/components/admin/CompleteUnifiedContentManager.tsx`

## 구현 내용

### 1. 변경사항 추적 State 추가
```typescript
const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
```
- 데이터가 로드될 때 `false`로 설정
- 데이터가 변경될 때 `true`로 설정
- 저장 성공 시 `false`로 설정

### 2. beforeunload 이벤트 리스너
```typescript
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, [hasUnsavedChanges]);
```
- 브라우저 탭/창을 닫을 때 경고 표시
- `hasUnsavedChanges`가 `true`일 때만 작동
- 컴포넌트 언마운트 시 리스너 제거

### 3. 섹션 전환 시 경고
```typescript
const handleSectionChange = (newSection: string) => {
  if (hasUnsavedChanges) {
    const confirmed = window.confirm('저장하지 않은 변경사항이 있습니다. 계속하시겠습니까?');
    if (!confirmed) {
      return;
    }
  }
  setActiveSection(newSection);
};
```
- 섹션 변경 시 저장 안 된 변경사항 체크
- 사용자에게 확인 다이얼로그 표시
- 사용자가 취소하면 섹션 변경 중단

### 4. 변경사항 감지
모든 입력 필드의 `onChange` 핸들러에 `setHasUnsavedChanges(true)` 추가:
- **총 54개의 onChange 핸들러 업데이트**
- Header 섹션: 8개 핸들러
- Hero 섹션: 16개 핸들러
- Marquee 섹션: 4개 핸들러
- Features 섹션: 3개 핸들러
- Services 섹션: 4개 핸들러
- Gallery 섹션: 3개 핸들러
- Treatments 섹션: 3개 핸들러
- FAQ 섹션: 3개 핸들러
- Footer 섹션: 8개 핸들러
- 이미지 업로드: 2개 핸들러

### 5. 시각적 피드백
#### 경고 배너
```typescript
{hasUnsavedChanges && (
  <div className="mb-4 px-4 py-3 bg-amber-50 border-2 border-amber-400 rounded-xl flex items-center justify-center gap-2">
    <span className="text-amber-600 text-xl">⚠️</span>
    <span className="text-amber-800 font-semibold">저장되지 않은 변경사항이 있습니다</span>
  </div>
)}
```

#### 저장 버튼 강조
```typescript
className={`... ${hasUnsavedChanges ? 'ring-4 ring-amber-400 ring-opacity-50 animate-pulse' : ''}`}
```
- 저장 안 된 변경사항이 있을 때 저장 버튼에 애니메이션 효과
- 버튼 텍스트에 "(변경됨)" 표시 추가

### 6. 저장 완료 시 플래그 리셋
```typescript
// handleSave 함수 내부
setSaveStatus('success');
setHasUnsavedChanges(false);  // 저장 성공 시 플래그 리셋
```

```typescript
// loadSectionData 함수 내부
} finally {
  setLoading(false);
  setHasUnsavedChanges(false);  // 데이터 로드 시 플래그 리셋
}
```

## 테스트 결과
- ✅ 빌드 성공
- ✅ TypeScript 타입 체크 통과
- ✅ 모든 onChange 핸들러 업데이트 완료
- ✅ beforeunload 이벤트 리스너 작동
- ✅ 섹션 전환 시 경고 작동
- ✅ 시각적 피드백 구현 완료

## 사용자 경험 개선 효과
1. **데이터 손실 방지**: 사용자가 실수로 페이지를 나가거나 브라우저를 닫을 때 경고
2. **명확한 피드백**: 저장 안 된 변경사항을 시각적으로 표시
3. **섹션 이동 안전**: 다른 섹션으로 이동하기 전 저장 여부 확인
4. **직관적인 UI**: 애니메이션과 색상으로 주의 필요한 상태를 명확히 전달

## 향후 개선 사항 (선택사항)
- [ ] Ctrl+S 저장 시 hasUnsavedChanges 체크하여 변경사항 없으면 알림
- [ ] 자동 저장 기능 추가 (예: 30초마다)
- [ ] 변경사항 히스토리 관리
- [ ] 실행 취소(Undo) 기능
