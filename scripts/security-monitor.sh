#!/bin/bash

# 비타민 의원 보안 모니터링 스크립트
# 매시간 실행되도록 cron에 등록

set -e

# 환경 변수 로드
source .env

# 설정
LOG_FILE="./logs/security.log"
ALERT_EMAIL="admin@vitamin-clinic.com"
MAX_FAILED_LOGINS=5
MAX_FILE_CHANGES=10

# 로그 함수
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 알림 함수
send_alert() {
    local message="$1"
    log "보안 알림: $message"
    # 실제 환경에서는 이메일이나 슬랙으로 알림 전송
    # echo "$message" | mail -s "보안 알림 - 비타민 의원" "$ALERT_EMAIL"
}

# 로그 디렉토리 생성
mkdir -p "./logs"

log "보안 모니터링 시작"

# 1. 로그인 시도 모니터링
log "로그인 시도 분석 중..."
FAILED_LOGINS=$(grep -c "Failed login attempt" ./logs/app.log 2>/dev/null || echo "0")
if [ "$FAILED_LOGINS" -gt "$MAX_FAILED_LOGINS" ]; then
    send_alert "로그인 실패 횟수가 임계값을 초과했습니다: $FAILED_LOGINS"
fi

# 2. 파일 변경 모니터링
log "파일 변경 감지 중..."
if [ -f "./.file_hashes" ]; then
    CHANGED_FILES=$(find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs md5sum 2>/dev/null | diff ./.file_hashes - | grep -c "^[<>]" || echo "0")
    if [ "$CHANGED_FILES" -gt "$MAX_FILE_CHANGES" ]; then
        send_alert "의심스러운 파일 변경이 감지되었습니다: $CHANGED_FILES개 파일"
    fi
fi

# 3. 프로세스 모니터링
log "프로세스 상태 확인 중..."
if ! pgrep -f "next" > /dev/null; then
    send_alert "Next.js 프로세스가 실행되지 않고 있습니다."
fi

if ! pgrep -f "pm2" > /dev/null; then
    send_alert "PM2 프로세스가 실행되지 않고 있습니다."
fi

# 4. 포트 스캔 감지
log "포트 스캔 감지 중..."
SSH_FAILED=$(grep -c "Failed password" /var/log/auth.log 2>/dev/null || echo "0")
if [ "$SSH_FAILED" -gt 10 ]; then
    send_alert "SSH 무차별 대입 공격이 감지되었습니다: $SSH_FAILED회 실패"
fi

# 5. 디스크 공간 확인
log "디스크 공간 확인 중..."
DISK_USAGE=$(df -h . | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 90 ]; then
    send_alert "디스크 공간이 부족합니다: ${DISK_USAGE}% 사용"
fi

# 6. 메모리 사용량 확인
log "메모리 사용량 확인 중..."
MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
if [ "$MEMORY_USAGE" -gt 90 ]; then
    send_alert "메모리 사용량이 높습니다: ${MEMORY_USAGE}% 사용"
fi

# 7. 네트워크 연결 확인
log "네트워크 연결 확인 중..."
if ! ping -c 1 8.8.8.8 > /dev/null 2>&1; then
    send_alert "인터넷 연결이 끊어졌습니다."
fi

# 8. SSL 인증서 만료 확인
log "SSL 인증서 확인 중..."
if [ -f "/etc/ssl/certs/vitamin-clinic.crt" ]; then
    CERT_EXPIRY=$(openssl x509 -enddate -noout -in /etc/ssl/certs/vitamin-clinic.crt | cut -d= -f2)
    EXPIRY_DATE=$(date -d "$CERT_EXPIRY" +%s)
    CURRENT_DATE=$(date +%s)
    DAYS_LEFT=$(( (EXPIRY_DATE - CURRENT_DATE) / 86400 ))
    
    if [ "$DAYS_LEFT" -lt 30 ]; then
        send_alert "SSL 인증서가 곧 만료됩니다: ${DAYS_LEFT}일 남음"
    fi
fi

# 9. 백업 상태 확인
log "백업 상태 확인 중..."
LAST_BACKUP=$(find ./backups -name "vitamin_clinic_backup_*" -type f -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -d' ' -f1)
if [ -n "$LAST_BACKUP" ]; then
    BACKUP_AGE=$(( $(date +%s) - ${LAST_BACKUP%.*} ))
    BACKUP_AGE_DAYS=$(( BACKUP_AGE / 86400 ))
    
    if [ "$BACKUP_AGE_DAYS" -gt 2 ]; then
        send_alert "최근 백업이 오래되었습니다: ${BACKUP_AGE_DAYS}일 전"
    fi
else
    send_alert "백업 파일을 찾을 수 없습니다."
fi

# 10. 보안 헤더 확인
log "보안 헤더 확인 중..."
if command -v curl > /dev/null; then
    SECURITY_HEADERS=$(curl -s -I https://vitamin-clinic.com 2>/dev/null | grep -E "(X-Frame-Options|X-Content-Type-Options|X-XSS-Protection|Strict-Transport-Security)" | wc -l)
    if [ "$SECURITY_HEADERS" -lt 4 ]; then
        send_alert "일부 보안 헤더가 누락되었습니다."
    fi
fi

log "보안 모니터링 완료"

# 11. 요약 리포트 생성
SUMMARY_FILE="./logs/security_summary_$(date +%Y%m%d).txt"
{
    echo "=== 보안 모니터링 요약 $(date) ==="
    echo "로그인 실패: $FAILED_LOGINS"
    echo "파일 변경: $CHANGED_FILES"
    echo "디스크 사용량: ${DISK_USAGE}%"
    echo "메모리 사용량: ${MEMORY_USAGE}%"
    echo "SSH 실패: $SSH_FAILED"
    echo "보안 헤더: $SECURITY_HEADERS/4"
} > "$SUMMARY_FILE"

log "보안 모니터링 요약이 $SUMMARY_FILE에 저장되었습니다." 