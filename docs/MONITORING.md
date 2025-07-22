# 📊 비타민 의원 모니터링 및 성능 관리 가이드

## 📋 개요

이 문서는 비타민 의원 웹사이트의 모니터링, 성능 관리, 로깅 시스템에 대한 설정 및 관리 방법을 설명합니다.

## 🔍 구현된 모니터링 기능

### 1. 성능 모니터링
- **Core Web Vitals** 측정 (LCP, FID, CLS)
- **페이지 로드 시간** 추적
- **시스템 리소스** 모니터링 (CPU, 메모리, 업타임)
- **실시간 성능** 대시보드

### 2. 분석 및 추적
- **Google Analytics** 통합
- **사용자 행동** 추적
- **전환 이벤트** 모니터링
- **페이지별 성능** 분석

### 3. 로깅 시스템
- **구조화된 로깅** (JSON 형식)
- **로그 레벨** 관리 (DEBUG, INFO, WARN, ERROR, FATAL)
- **자동 로그 로테이션**
- **보안 이벤트** 로깅

### 4. 에러 모니터링
- **React Error Boundary** 구현
- **자동 에러 보고**
- **개발자 친화적** 에러 UI
- **에러 추적 및 분석**

## 🔧 설정 방법

### 1. 환경 변수 설정

`.env` 파일에 다음 설정을 추가하세요:

```bash
# 분석 및 모니터링
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
LOG_LEVEL="info"  # debug, info, warn, error, fatal
ALERT_EMAIL="admin@vitamin-clinic.com"

# 성능 모니터링
PERFORMANCE_MONITORING_ENABLED="true"
PERFORMANCE_ALERT_THRESHOLD="3000"  # 3초 이상 로드 시 알림
LCP_ALERT_THRESHOLD="2500"  # 2.5초 이상 LCP 시 알림

# 로깅 설정
LOG_RETENTION_DAYS="90"
LOG_ROTATION_SIZE="10MB"
```

### 2. Google Analytics 설정

1. **Google Analytics 계정 생성**
   - [Google Analytics](https://analytics.google.com/)에서 계정 생성
   - 웹사이트 속성 추가
   - 측정 ID (G-XXXXXXXXXX) 복사

2. **환경 변수 설정**
   ```bash
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
   ```

3. **이벤트 추적 설정**
   - 전화번호 클릭 추적
   - 예약 문의 추적
   - 지도 클릭 추적

### 3. 자동화 스크립트 설정

```bash
# 스크립트 실행 권한 부여
chmod +x scripts/backup.sh
chmod +x scripts/security-monitor.sh
chmod +x scripts/log-rotation.sh

# Cron 작업 등록
crontab -e

# 다음 내용 추가:
# 매일 새벽 2시 백업
0 2 * * * /path/to/vitamin-clinic/scripts/backup.sh

# 매시간 보안 모니터링
0 * * * * /path/to/vitamin-clinic/scripts/security-monitor.sh

# 매일 새벽 3시 로그 로테이션
0 3 * * * /path/to/vitamin-clinic/scripts/log-rotation.sh
```

## 📊 모니터링 대시보드

### 1. 관리자 성능 대시보드

**접속 경로**: `/admin/performance`

**주요 기능**:
- 실시간 시스템 성능 모니터링
- 메모리 및 CPU 사용량 추적
- 페이지별 성능 지표
- 성능 임계값 알림

### 2. 로그 관리

**로그 파일 위치**:
- 애플리케이션 로그: `./logs/app.log`
- 보안 로그: `./logs/security.log`
- 백업 로그: `./logs/backup.log`
- 로테이션 로그: `./logs/rotation.log`
- 에러 로그: `./logs/error.log`

**로그 레벨별 파일**:
- `./logs/debug.log`
- `./logs/info.log`
- `./logs/warn.log`
- `./logs/error.log`
- `./logs/fatal.log`

## 🎯 성능 최적화

### 1. Core Web Vitals 목표

- **LCP (Largest Contentful Paint)**: 2.5초 이하
- **FID (First Input Delay)**: 100ms 이하
- **CLS (Cumulative Layout Shift)**: 0.1 이하

### 2. 성능 최적화 방법

#### 이미지 최적화
```bash
# WebP 형식 사용
# Next.js Image 컴포넌트 활용
# 적절한 이미지 크기 설정
```

#### 코드 최적화
```bash
# 코드 분할 (Code Splitting)
# Tree Shaking
# 번들 크기 최적화
```

#### 캐싱 전략
```bash
# 브라우저 캐싱
# CDN 활용
# 서버 사이드 캐싱
```

## 📈 분석 및 리포팅

### 1. Google Analytics 대시보드

**주요 지표**:
- 페이지뷰 및 세션
- 사용자 행동 흐름
- 전환율 분석
- 실시간 사용자

**이벤트 추적**:
- 전화번호 클릭
- 예약 문의
- 지도 클릭
- 페이지 스크롤

### 2. 성능 리포트

**정기 리포트**:
- 일간 성능 요약
- 주간 트렌드 분석
- 월간 성과 리포트
- 분기별 종합 분석

## 🚨 알림 시스템

### 1. 성능 알림

**알림 조건**:
- 페이지 로드 시간 3초 초과
- LCP 2.5초 초과
- 메모리 사용량 90% 초과
- CPU 사용량 80% 초과

**알림 방법**:
- 이메일 알림
- 로그 파일 기록
- 관리자 대시보드 표시

### 2. 보안 알림

**알림 조건**:
- 로그인 실패 횟수 초과
- 의심스러운 파일 변경
- 프로세스 중단
- 디스크 공간 부족

## 🔧 유지보수

### 1. 정기 점검

#### 매일
- [ ] 로그 파일 확인
- [ ] 성능 지표 체크
- [ ] 백업 상태 확인

#### 매주
- [ ] 성능 트렌드 분석
- [ ] 에러 로그 검토
- [ ] 보안 이벤트 확인

#### 매월
- [ ] 로그 파일 정리
- [ ] 성능 최적화 검토
- [ ] 모니터링 설정 업데이트

### 2. 로그 관리

#### 로그 로테이션
- 자동 로그 파일 크기 제한
- 오래된 로그 파일 압축
- 보관 기간 관리

#### 로그 분석
- 에러 패턴 분석
- 성능 병목 지점 식별
- 사용자 행동 분석

## 🛠️ 문제 해결

### 1. 성능 문제

**느린 페이지 로드**:
```bash
# 1. 성능 모니터링 데이터 확인
# 2. 이미지 최적화 검토
# 3. 번들 크기 분석
# 4. 서버 리소스 확인
```

**높은 메모리 사용량**:
```bash
# 1. 메모리 누수 확인
# 2. 불필요한 프로세스 종료
# 3. 캐시 정리
# 4. 서버 재시작
```

### 2. 로깅 문제

**로그 파일이 너무 큼**:
```bash
# 1. 로그 로테이션 실행
# 2. 로그 레벨 조정
# 3. 불필요한 로그 제거
```

**로그 파일 권한 오류**:
```bash
# 1. 파일 권한 확인
# 2. 소유자 변경
# 3. 디렉토리 권한 설정
```

## 📞 지원 및 문의

모니터링 관련 문의사항이 있으시면 다음으로 연락해주세요:
- 이메일: monitoring@vitamin-clinic.com
- 전화: 051-123-4567

## 📚 참고 자료

- [Google Analytics](https://analytics.google.com/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Vitals](https://github.com/GoogleChrome/web-vitals) 