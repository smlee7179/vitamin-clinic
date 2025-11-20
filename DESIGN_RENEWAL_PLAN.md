# 디자인 리뉴얼 계획서

> 작성일: 2025-11-20
> 작성자: Claude Code
> 브랜치: `design-renewal-2025`

## 📋 목차

1. [개요](#개요)
2. [현재 상태](#현재-상태)
3. [리뉴얼 목표](#리뉴얼-목표)
4. [변경 범위](#변경-범위)
5. [일정 계획](#일정-계획)
6. [기술적 고려사항](#기술적-고려사항)
7. [테스트 계획](#테스트-계획)
8. [롤백 계획](#롤백-계획)
9. [배포 전략](#배포-전략)

---

## 개요

### 프로젝트 정보
- **프로젝트명**: 비타민마취통증의학과의원 웹사이트
- **리뉴얼 유형**: 디자인 및 UX 개선
- **목표**: 사용자 경험 향상 및 최신 디자인 트렌드 반영

### 배경
현재 웹사이트는 Apple + Toss 스타일의 모던 디자인을 적용하고 있으나, 추가적인 개선이 필요한 영역이 존재합니다.

---

## 현재 상태

### 기술 스택
- **프레임워크**: Next.js 14.2.18 (App Router)
- **스타일링**: Tailwind CSS 3.4.1
- **애니메이션**: Framer Motion 12.23.24, Lenis 1.3.14
- **데이터베이스**: Prisma + PostgreSQL
- **배포**: Vercel

### 성능 메트릭 (기준선)
- **First Load JS**: 87.2 kB
- **빌드 시간**: ~45초
- **정적 페이지**: 26개
- **동적 라우트**: 4개

### 주요 컴포넌트 (9개)
1. ModernHeader
2. ModernHero
3. ModernMarquee
4. ModernFeatures
5. ModernServices
6. ModernTreatments
7. ModernGallery
8. ModernFAQ
9. ModernFooter

자세한 내용: [PRE_REDESIGN_BASELINE.md](./docs/PRE_REDESIGN_BASELINE.md)

---

## 리뉴얼 목표

### 주요 목표

#### 1. 사용자 경험 (UX) 개선
- ✅ 페이지 로딩 속도 향상 (First Load JS < 80kB)
- ✅ 모바일 사용성 강화
- ✅ 접근성(Accessibility) 개선
- ✅ 직관적인 네비게이션

#### 2. 시각적 디자인 향상
- ✅ 최신 디자인 트렌드 반영
- ✅ 일관된 디자인 시스템 구축
- ✅ 브랜드 아이덴티티 강화
- ✅ 이미지 및 그래픽 최적화

#### 3. 성능 최적화
- ✅ Core Web Vitals 개선
  - LCP < 2.5초
  - FID < 100ms
  - CLS < 0.1
- ✅ 이미지 최적화 (WebP, lazy loading)
- ✅ 번들 크기 감소

#### 4. 관리 편의성
- ✅ 관리자 대시보드 UX 개선
- ✅ 콘텐츠 편집 효율성 향상
- ✅ 이미지 관리 개선

### 성공 지표 (KPI)

| 항목 | 현재 | 목표 |
|------|------|------|
| First Load JS | 87.2 kB | < 80 kB |
| Lighthouse Performance | - | > 90 |
| Lighthouse Accessibility | - | > 95 |
| 모바일 로딩 시간 | - | < 3초 |
| 관리자 작업 시간 | - | 30% 단축 |

---

## 변경 범위

### Phase 1: 디자인 시스템 구축 (1주)
- [ ] 색상 팔레트 정의
- [ ] 타이포그래피 시스템
- [ ] 간격(Spacing) 시스템
- [ ] 컴포넌트 라이브러리 기획
- [ ] 반응형 브레이크포인트 정의

### Phase 2: 메인 페이지 리뉴얼 (2주)
- [ ] Header 재디자인
- [ ] Hero 섹션 개선
- [ ] Features 섹션 재구성
- [ ] Services 섹션 개선
- [ ] Treatments 섹션 재디자인
- [ ] Gallery 레이아웃 개선
- [ ] FAQ 인터랙션 향상
- [ ] Footer 재구성

### Phase 3: 서브 페이지 리뉴얼 (1주)
- [ ] About 페이지
- [ ] Contact 페이지
- [ ] Services 상세 페이지
- [ ] Notices 페이지
- [ ] Health Info 페이지

### Phase 4: 관리자 페이지 개선 (1주)
- [ ] 대시보드 UX 개선
- [ ] 콘텐츠 에디터 개선
- [ ] 이미지 관리 강화
- [ ] 통계 및 분석 기능

### Phase 5: 성능 최적화 (3일)
- [ ] 이미지 최적화 (WebP 변환)
- [ ] 코드 스플리팅
- [ ] 번들 크기 분석 및 최적화
- [ ] 캐싱 전략 개선
- [ ] Lazy loading 적용

### Phase 6: 테스트 및 QA (3일)
- [ ] 기능 테스트
- [ ] 성능 테스트
- [ ] 접근성 테스트
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 테스트

---

## 일정 계획

### 전체 일정: 5-6주

```
Week 1: 디자인 시스템 구축
  Day 1-2: 색상, 타이포그래피, 간격 정의
  Day 3-5: 컴포넌트 라이브러리 기획 및 프로토타입

Week 2-3: 메인 페이지 리뉴얼
  Day 1-3: Header, Hero, Marquee
  Day 4-6: Features, Services
  Day 7-9: Treatments, Gallery
  Day 10-12: FAQ, Footer

Week 4: 서브 페이지 리뉴얼
  Day 1-2: About, Contact
  Day 3-4: Services, Notices
  Day 5: Health Info, 기타 페이지

Week 5: 관리자 페이지 + 최적화
  Day 1-3: 관리자 페이지 개선
  Day 4-5: 성능 최적화

Week 6: 테스트 및 배포 준비
  Day 1-3: QA 및 버그 수정
  Day 4-5: 최종 검수 및 배포 준비
```

### 마일스톤

| 날짜 | 마일스톤 | 체크포인트 |
|------|----------|------------|
| Week 1 끝 | 디자인 시스템 완성 | 디자인 가이드 문서 |
| Week 3 끝 | 메인 페이지 완성 | 스테이징 배포 |
| Week 4 끝 | 서브 페이지 완성 | 전체 페이지 리뷰 |
| Week 5 끝 | 최적화 완료 | 성능 테스트 통과 |
| Week 6 끝 | 배포 준비 완료 | 프로덕션 배포 |

---

## 기술적 고려사항

### 유지할 기술
- ✅ Next.js 14 App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Prisma ORM
- ✅ Framer Motion
- ✅ Vercel 배포

### 업그레이드 고려
- ⚠️ Prisma 6.19 → 7.0 (Major 업데이트)
  - 리뉴얼 후 별도 작업으로 진행
- ⚠️ React 18.2 → 18.3 (Minor 업데이트)
  - 필요시 진행

### 새로 도입 검토
- 🆕 shadcn/ui - UI 컴포넌트 라이브러리
- 🆕 next/image 최적화 강화
- 🆕 Intersection Observer API 활용
- 🆕 CSS Container Queries

### 제거 검토
- ❌ 사용하지 않는 의존성
- ❌ 중복 컴포넌트
- ❌ Legacy 코드

---

## 테스트 계획

### 기능 테스트
- [ ] 모든 페이지 정상 렌더링
- [ ] 네비게이션 동작
- [ ] 폼 제출 기능
- [ ] 이미지 업로드
- [ ] 관리자 CRUD 작업

### 성능 테스트
- [ ] Lighthouse 점수 측정
  - Performance > 90
  - Accessibility > 95
  - Best Practices > 90
  - SEO > 90
- [ ] Core Web Vitals 측정
- [ ] 번들 크기 분석
- [ ] 페이지 로드 시간 측정

### 접근성 테스트
- [ ] 스크린 리더 호환성
- [ ] 키보드 네비게이션
- [ ] WCAG 2.1 AA 준수
- [ ] Color contrast 검사

### 크로스 브라우저 테스트
- [ ] Chrome (최신)
- [ ] Safari (최신)
- [ ] Firefox (최신)
- [ ] Edge (최신)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 반응형 테스트
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large Desktop (1440px+)

---

## 롤백 계획

### 준비 사항
✅ **완료됨**
- [x] 백업 브랜치 생성: `backup-before-redesign`
- [x] 데이터베이스 백업: `backups/dev.db.backup-20251120_135201`
- [x] Git 커밋: 모든 변경사항 커밋 완료
- [x] 기준선 문서: `docs/PRE_REDESIGN_BASELINE.md`

### 롤백 절차

#### 긴급 롤백 (프로덕션 이슈 발생 시)
```bash
# 1. Vercel에서 이전 배포로 롤백
# Vercel Dashboard → Deployments → 이전 배포 선택 → "Promote to Production"

# 2. 또는 Git으로 롤백
git checkout backup-before-redesign
git push origin backup-before-redesign:main --force
```

#### 데이터베이스 롤백 (필요 시)
```bash
# 로컬
cp backups/dev.db.backup-20251120_135201 prisma/dev.db
npx prisma generate

# 프로덕션
# Vercel Dashboard → Storage → Postgres → Backups → Restore
```

### 롤백 트리거 조건
- 🔴 **즉시 롤백**
  - 치명적인 버그 (사이트 다운, 데이터 손실)
  - 보안 취약점 발견
  - 성능 50% 이상 저하

- 🟡 **검토 후 롤백**
  - 주요 기능 장애
  - 성능 20-50% 저하
  - 다수의 사용자 불편 신고

---

## 배포 전략

### 단계별 배포

#### Stage 1: 개발 환경 테스트
```bash
# 로컬 개발 서버
npm run dev

# 빌드 테스트
npm run build
npm start
```

#### Stage 2: 스테이징 배포
```bash
# Vercel 미리보기 배포
git push origin design-renewal-2025
# → 자동으로 미리보기 URL 생성
```

#### Stage 3: 카나리 배포 (선택사항)
- Feature flag를 사용한 점진적 배포
- 10% → 50% → 100% 사용자 대상

#### Stage 4: 프로덕션 배포
```bash
# main 브랜치로 병합
git checkout main
git merge design-renewal-2025

# 배포
git push origin main
# → Vercel 자동 배포
```

### 배포 체크리스트

#### 배포 전
- [ ] 모든 테스트 통과
- [ ] 코드 리뷰 완료
- [ ] 성능 메트릭 확인
- [ ] 환경 변수 확인
- [ ] 데이터베이스 마이그레이션 (필요시)
- [ ] 백업 확인

#### 배포 중
- [ ] 배포 로그 모니터링
- [ ] 빌드 성공 확인
- [ ] Health check 통과

#### 배포 후
- [ ] 메인 페이지 접속 테스트
- [ ] 관리자 페이지 로그인 테스트
- [ ] 주요 기능 smoke test
- [ ] 에러 로그 모니터링 (1시간)
- [ ] 성능 메트릭 확인

### 모니터링

#### 배포 후 24시간
- Vercel Analytics 모니터링
- 에러 로그 체크
- 사용자 피드백 수집

#### 배포 후 1주일
- 성능 지표 분석
- 사용자 행동 분석
- 개선사항 도출

---

## 위험 관리

### 예상 위험 요소

| 위험 | 가능성 | 영향도 | 대응 방안 |
|------|--------|--------|-----------|
| 빌드 실패 | 낮음 | 높음 | CI/CD 파이프라인 강화 |
| 성능 저하 | 중간 | 높음 | 성능 모니터링 및 최적화 |
| 디자인 불일치 | 중간 | 중간 | 디자인 시스템 문서화 |
| 일정 지연 | 중간 | 중간 | 버퍼 기간 확보 |
| 데이터 손실 | 낮음 | 매우 높음 | 정기 백업 + 테스트 |

### 리스크 완화 전략
1. **백업 및 롤백 계획** - 완료 ✅
2. **점진적 배포** - Feature flag 활용
3. **충분한 테스트** - 자동화 + 수동 테스트
4. **모니터링** - Vercel Analytics + 에러 추적
5. **문서화** - 모든 변경사항 기록

---

## 커뮤니케이션 계획

### 이해관계자
- 병원 관리자
- 개발팀 (Claude Code)
- 사용자 (환자)

### 진행 상황 공유
- **주간 리포트**: 매주 금요일
- **마일스톤 달성 시**: 즉시 공유
- **이슈 발생 시**: 즉시 보고

### 문서 업데이트
- README.md
- PROJECT_DOCUMENTATION.md
- 변경 로그 (CHANGELOG.md)

---

## 다음 단계

### 즉시 시작
1. ✅ 디자인 시스템 기획
2. ✅ 와이어프레임 작성
3. ✅ 프로토타입 개발

### 준비 완료 사항
- ✅ Git 브랜치: `design-renewal-2025`
- ✅ 백업: 코드 + 데이터베이스
- ✅ 기준선 문서
- ✅ 환경 변수 점검
- ✅ 리뉴얼 계획 수립

---

## 참고 문서

- [PRE_REDESIGN_BASELINE.md](./docs/PRE_REDESIGN_BASELINE.md) - 현재 상태 기준선
- [ENV_CHECKLIST.md](./docs/ENV_CHECKLIST.md) - 환경 변수 체크리스트
- [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) - 전체 프로젝트 문서
- [backups/README.md](./backups/README.md) - 백업 가이드

---

**작성자**: Claude Code
**최종 업데이트**: 2025-11-20
**버전**: 1.0

**승인 대기 중** - 리뉴얼 작업 시작 전 검토 필요
