# 🔒 비타민 의원 보안 설정 가이드

## 📋 개요

이 문서는 비타민 의원 웹사이트의 보안 설정 및 모니터링 방법을 설명합니다.

## 🛡️ 구현된 보안 기능

### 1. 보안 헤더
- **X-Frame-Options**: 클릭재킹 방지
- **X-Content-Type-Options**: MIME 타입 스니핑 방지
- **X-XSS-Protection**: XSS 공격 방지
- **Strict-Transport-Security**: HTTPS 강제
- **Content-Security-Policy**: 리소스 로딩 제한
- **Referrer-Policy**: 리퍼러 정보 제한
- **Permissions-Policy**: 브라우저 기능 제한

### 2. 인증 및 권한 관리
- IP 기반 관리자 접근 제한
- Rate Limiting (API 요청 제한)
- 비밀번호 강도 검증
- 세션 관리

### 3. 입력값 검증
- XSS 방지 입력값 sanitization
- 파일 업로드 보안 검사
- SQL Injection 방지 (Prisma ORM 사용)

### 4. 모니터링 및 로깅
- 보안 이벤트 로깅
- 실시간 모니터링
- 자동 백업 시스템

## 🔧 설정 방법

### 1. 환경 변수 설정

`.env` 파일에 다음 설정을 추가하세요:

```bash
# 보안 설정
ALLOWED_ADMIN_IPS="127.0.0.1,::1,192.168.1.100"
RATE_LIMIT_WINDOW="900000"  # 15분 (밀리초)
RATE_LIMIT_MAX_REQUESTS="100"  # 15분당 최대 요청 수
SESSION_SECRET="your-super-secret-session-key-here"
ENCRYPTION_KEY="your-32-character-encryption-key"

# 백업 설정
BACKUP_ENABLED="true"
BACKUP_SCHEDULE="0 2 * * *"  # 매일 새벽 2시
BACKUP_RETENTION_DAYS="30"
```

### 2. SSL 인증서 설정

```bash
# Let's Encrypt 인증서 발급
sudo certbot --nginx -d vitamin-clinic.com -d www.vitamin-clinic.com

# 또는 자체 서명 인증서 생성
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/vitamin-clinic.key \
  -out /etc/ssl/certs/vitamin-clinic.crt
```

### 3. Nginx 설정 적용

```bash
# 설정 파일 복사
sudo cp deploy/nginx.conf /etc/nginx/sites-available/vitamin-clinic

# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/vitamin-clinic /etc/nginx/sites-enabled/

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

### 4. 자동화 스크립트 설정

```bash
# 백업 스크립트 실행 권한 부여
chmod +x scripts/backup.sh
chmod +x scripts/security-monitor.sh

# Cron 작업 등록
crontab -e

# 다음 내용 추가:
# 매일 새벽 2시 백업
0 2 * * * /path/to/vitamin-clinic/scripts/backup.sh

# 매시간 보안 모니터링
0 * * * * /path/to/vitamin-clinic/scripts/security-monitor.sh
```

## 📊 모니터링

### 1. 로그 파일 위치
- 애플리케이션 로그: `./logs/app.log`
- 보안 로그: `./logs/security.log`
- 백업 로그: `./logs/backup.log`
- Nginx 로그: `/var/log/nginx/`

### 2. 모니터링 항목
- 로그인 실패 횟수
- 파일 변경 감지
- 프로세스 상태
- 디스크/메모리 사용량
- 네트워크 연결 상태
- SSL 인증서 만료일
- 백업 상태

### 3. 알림 설정
보안 이벤트 발생 시 이메일이나 슬랙으로 알림을 받을 수 있습니다.

## 🔍 보안 점검 체크리스트

### 정기 점검 (매주)
- [ ] 로그 파일 검토
- [ ] 백업 상태 확인
- [ ] SSL 인증서 만료일 확인
- [ ] 시스템 업데이트 확인

### 월간 점검
- [ ] 보안 헤더 테스트
- [ ] Rate Limiting 테스트
- [ ] 파일 권한 확인
- [ ] 불필요한 파일 정리

### 분기별 점검
- [ ] 보안 취약점 스캔
- [ ] 백업 복구 테스트
- [ ] 접근 권한 재검토
- [ ] 보안 정책 업데이트

## 🚨 응급 상황 대응

### 1. 해킹 의심 시
```bash
# 즉시 서비스 중단
pm2 stop all

# 로그 분석
tail -f logs/security.log

# 백업에서 복구
./scripts/backup.sh restore

# 보안 패치 적용 후 재시작
pm2 start all
```

### 2. 데이터 손실 시
```bash
# 최신 백업 확인
ls -la backups/

# 백업에서 복구
cp backups/vitamin_clinic_backup_YYYYMMDD_database.db ./dev.db

# 데이터베이스 재시작
npx prisma db push
```

## 📞 지원 및 문의

보안 관련 문의사항이 있으시면 다음으로 연락해주세요:
- 이메일: security@vitamin-clinic.com
- 전화: 051-123-4567

## 📚 참고 자료

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js 보안 가이드](https://nextjs.org/docs/advanced-features/security-headers)
- [Nginx 보안 설정](https://nginx.org/en/docs/http/ngx_http_headers_module.html) 