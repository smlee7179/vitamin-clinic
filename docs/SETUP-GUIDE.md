# 🚀 비타민 의원 웹사이트 완전 설정 가이드

## 📋 개요

이 가이드는 비타민 의원 웹사이트의 모든 기능을 설정하고 최적화하는 방법을 단계별로 설명합니다.

## 🎯 설정 목표

- ✅ SEO 최적화 완료
- ✅ 보안 강화 완료
- ✅ 성능 모니터링 완료
- ✅ 자동화 시스템 구축
- ✅ 성능 최적화 적용

## 🔧 1단계: 기본 환경 설정

### 1.1 환경 변수 설정

```bash
# .env 파일 생성
cp .env.example .env

# 필수 환경 변수 설정
nano .env
```

**필수 설정 항목:**
```bash
# 데이터베이스
DATABASE_URL="file:./dev.db"

# 관리자 계정
ADMIN_EMAIL="admin@vitamin-clinic.com"
ADMIN_PASSWORD="강력한_비밀번호_설정"

# 병원 정보
HOSPITAL_NAME="비타민 의원"
HOSPITAL_PHONE="051-123-4567"
HOSPITAL_ADDRESS="부산광역시 해운대구 해운대로 123"

# 보안 설정
ALLOWED_ADMIN_IPS="127.0.0.1,::1,192.168.1.100"
SESSION_SECRET="32자_랜덤_문자열_생성"
ENCRYPTION_KEY="32자_랜덤_문자열_생성"

# 분석 및 모니터링
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
LOG_LEVEL="info"
ALERT_EMAIL="admin@vitamin-clinic.com"
```

### 1.2 의존성 설치

```bash
# 패키지 설치
npm install

# 개발 의존성 설치
npm install --save-dev webpack-bundle-analyzer
```

## 📊 2단계: Google Analytics 설정

### 2.1 자동 설정 스크립트 실행

```bash
# Google Analytics 설정 자동화
./scripts/setup-analytics.sh
```

**수동 설정 방법:**
1. [Google Analytics](https://analytics.google.com/) 접속
2. 계정 생성 또는 기존 계정 선택
3. 속성 생성 (웹사이트)
4. 측정 ID (G-XXXXXXXXXX) 복사
5. `.env` 파일에 `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` 설정

### 2.2 Google Search Console 설정

1. [Google Search Console](https://search.google.com/search-console) 접속
2. 속성 추가 (도메인 또는 URL 접두어)
3. 소유권 확인 (HTML 태그 방식)
4. 확인 코드를 `src/app/layout.tsx`에 설정

## ⏰ 3단계: 자동화 시스템 설정

### 3.1 Cron 작업 설정

```bash
# 자동화 스크립트 실행
./scripts/setup-cron.sh
```

**설치되는 자동화 작업:**
- 매일 새벽 2시: 데이터베이스 및 파일 백업
- 매시간: 보안 모니터링
- 매일 새벽 3시: 로그 로테이션
- 매주 일요일 새벽 4시: 시스템 정리

### 3.2 수동 Cron 설정

```bash
# Cron 작업 편집
crontab -e

# 다음 내용 추가:
0 2 * * * /path/to/vitamin-clinic/scripts/backup.sh >> /path/to/vitamin-clinic/logs/cron.log 2>&1
0 * * * * /path/to/vitamin-clinic/scripts/security-monitor.sh >> /path/to/vitamin-clinic/logs/cron.log 2>&1
0 3 * * * /path/to/vitamin-clinic/scripts/log-rotation.sh >> /path/to/vitamin-clinic/logs/cron.log 2>&1
0 4 * * 0 /path/to/vitamin-clinic/scripts/system-cleanup.sh >> /path/to/vitamin-clinic/logs/cron.log 2>&1
```

## 🚀 4단계: 성능 최적화

### 4.1 성능 최적화 스크립트 실행

```bash
# 성능 최적화 실행
./scripts/optimize-performance.sh
```

**최적화 항목:**
- 번들 크기 분석
- 이미지 최적화 (WebP 변환)
- 캐시 정리
- 의존성 최적화
- 코드 품질 검사

### 4.2 이미지 최적화 도구 설치

```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# CentOS/RHEL
sudo yum install ImageMagick
```

### 4.3 번들 분석 확인

```bash
# 빌드 후 번들 분석 리포트 확인
npm run build
open bundle-analysis.html
```

## 🔍 5단계: 모니터링 설정

### 5.1 관리자 대시보드 접속

**접속 경로:**
- 성능 모니터링: `/admin/performance`
- 관리자 가이드: `/admin/guide`

### 5.2 로그 파일 모니터링

```bash
# 실시간 로그 확인
tail -f logs/app.log
tail -f logs/security.log
tail -f logs/cron.log

# 로그 디렉토리 구조
logs/
├── app.log              # 애플리케이션 로그
├── security.log         # 보안 로그
├── backup.log          # 백업 로그
├── rotation.log        # 로그 로테이션 로그
├── cleanup.log         # 시스템 정리 로그
├── cron.log            # Cron 작업 로그
├── error.log           # 에러 로그
├── warn.log            # 경고 로그
└── info.log            # 정보 로그
```

## 🛡️ 6단계: 보안 설정 확인

### 6.1 보안 헤더 확인

```bash
# 보안 헤더 테스트
curl -I http://localhost:3000

# 확인할 헤더:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# Strict-Transport-Security: max-age=31536000
```

### 6.2 IP 화이트리스트 설정

```bash
# .env 파일에서 관리자 IP 설정
ALLOWED_ADMIN_IPS="127.0.0.1,::1,192.168.1.100"

# 실제 IP 주소 확인
curl ifconfig.me
```

### 6.3 SSL 인증서 설정 (프로덕션)

```bash
# Let's Encrypt 인증서 발급
sudo certbot --nginx -d vitamin-clinic.com

# Nginx SSL 설정 확인
sudo nginx -t
sudo systemctl reload nginx
```

## 📈 7단계: SEO 최적화 확인

### 7.1 메타데이터 확인

**확인 항목:**
- [ ] 페이지 제목 (title)
- [ ] 메타 설명 (description)
- [ ] Open Graph 태그
- [ ] Twitter Card 태그
- [ ] 구조화된 데이터 (JSON-LD)

### 7.2 사이트맵 및 robots.txt 확인

```bash
# 사이트맵 확인
curl http://localhost:3000/sitemap.xml

# robots.txt 확인
curl http://localhost:3000/robots.txt
```

### 7.3 Google Search Console 등록

1. Google Search Console에서 사이트맵 제출
2. 색인 생성 요청
3. 검색 성능 모니터링

## 🔧 8단계: 테스트 및 검증

### 8.1 기능 테스트

```bash
# 개발 서버 시작
npm run dev

# 빌드 테스트
npm run build

# 프로덕션 서버 시작
npm start
```

### 8.2 성능 테스트

```bash
# Lighthouse 성능 테스트
npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Core Web Vitals 확인
# LCP: 2.5초 이하
# FID: 100ms 이하
# CLS: 0.1 이하
```

### 8.3 보안 테스트

```bash
# 보안 취약점 스캔
npm audit

# 취약점 수정
npm audit fix
```

## 📊 9단계: 모니터링 및 유지보수

### 9.1 정기 점검 체크리스트

#### 매일
- [ ] 로그 파일 확인
- [ ] 성능 지표 체크
- [ ] 백업 상태 확인
- [ ] Google Analytics 데이터 확인

#### 매주
- [ ] 성능 트렌드 분석
- [ ] 에러 로그 검토
- [ ] 보안 이벤트 확인
- [ ] 백업 파일 정리

#### 매월
- [ ] 로그 파일 정리
- [ ] 성능 최적화 검토
- [ ] 모니터링 설정 업데이트
- [ ] 보안 업데이트 적용

### 9.2 알림 설정

**알림 조건:**
- 성능 지표 임계값 초과
- 보안 이벤트 발생
- 시스템 리소스 부족
- 백업 실패

## 🚨 10단계: 문제 해결

### 10.1 일반적인 문제

#### 빌드 오류
```bash
# 캐시 정리
rm -rf .next
rm -rf node_modules/.cache
npm run build
```

#### 성능 문제
```bash
# 성능 최적화 실행
./scripts/optimize-performance.sh

# 번들 분석
npm run build
open bundle-analysis.html
```

#### 로그 문제
```bash
# 로그 로테이션 수동 실행
./scripts/log-rotation.sh

# 로그 파일 권한 확인
ls -la logs/
```

### 10.2 지원 및 문의

**문의 방법:**
- 이메일: support@vitamin-clinic.com
- 전화: 051-123-4567
- 문서: `docs/` 디렉토리

## 🎉 설정 완료!

### ✅ 완료된 기능들

1. **SEO 최적화**
   - 메타데이터 완전 설정
   - 구조화된 데이터 (JSON-LD)
   - 사이트맵 및 robots.txt
   - Open Graph 및 Twitter Cards

2. **보안 강화**
   - 보안 헤더 설정
   - IP 화이트리스트
   - Rate Limiting
   - 입력값 검증
   - CSRF 보호

3. **성능 모니터링**
   - Google Analytics 통합
   - 실시간 성능 추적
   - Core Web Vitals 모니터링
   - 에러 추적 및 로깅

4. **자동화 시스템**
   - 자동 백업
   - 보안 모니터링
   - 로그 로테이션
   - 시스템 정리

5. **성능 최적화**
   - 이미지 최적화
   - 번들 크기 최적화
   - 코드 분할
   - 캐싱 전략

### 🚀 다음 단계

1. **정기 모니터링**: 성능 및 보안 지표 정기 확인
2. **콘텐츠 업데이트**: 병원 정보 및 건강 정보 정기 업데이트
3. **사용자 피드백**: 방문자 피드백 수집 및 개선
4. **기술 업데이트**: 정기적인 기술 스택 업데이트

**축하합니다! 🎉 비타민 의원 웹사이트가 완전히 설정되었습니다!** 