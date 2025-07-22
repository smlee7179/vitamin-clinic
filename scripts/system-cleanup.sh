#!/bin/bash

# 비타민 의원 시스템 정리 스크립트
# 매주 일요일 새벽 4시에 실행

set -e

# 환경 변수 로드
source .env

# 설정
LOG_DIR="./logs"
BACKUP_DIR="./backups"
NODE_MODULES="./node_modules"
NEXT_CACHE="./.next"
RETENTION_DAYS=${LOG_RETENTION_DAYS:-90}
BACKUP_RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}

# 로그 함수
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_DIR/cleanup.log
}

# 로그 디렉토리 확인
if [ ! -d "$LOG_DIR" ]; then
    mkdir -p "$LOG_DIR"
fi

log "시스템 정리 시작"

# 1. 오래된 로그 파일 정리
log "오래된 로그 파일 정리 중..."
find "$LOG_DIR" -name "*.log.*" -type f -mtime +$RETENTION_DAYS -delete 2>/dev/null || true
find "$LOG_DIR" -name "*.gz" -type f -mtime +$RETENTION_DAYS -delete 2>/dev/null || true
find "$LOG_DIR" -name "rotation_summary_*.txt" -type f -mtime +30 -delete 2>/dev/null || true

# 2. 오래된 백업 파일 정리
log "오래된 백업 파일 정리 중..."
if [ -d "$BACKUP_DIR" ]; then
    find "$BACKUP_DIR" -name "vitamin_clinic_backup_*" -type f -mtime +$BACKUP_RETENTION_DAYS -delete 2>/dev/null || true
fi

# 3. Node.js 캐시 정리
log "Node.js 캐시 정리 중..."
if [ -d "$NEXT_CACHE" ]; then
    rm -rf "$NEXT_CACHE/cache" 2>/dev/null || true
    log "Next.js 캐시 정리 완료"
fi

# 4. npm 캐시 정리 (선택사항)
if command -v npm &> /dev/null; then
    log "npm 캐시 정리 중..."
    npm cache clean --force 2>/dev/null || true
    log "npm 캐시 정리 완료"
fi

# 5. 임시 파일 정리
log "임시 파일 정리 중..."
find . -name "*.tmp" -type f -delete 2>/dev/null || true
find . -name "*.temp" -type f -delete 2>/dev/null || true
find . -name "*~" -type f -delete 2>/dev/null || true
find . -name ".DS_Store" -type f -delete 2>/dev/null || true

# 6. 빈 디렉토리 정리
log "빈 디렉토리 정리 중..."
find . -type d -empty -delete 2>/dev/null || true

# 7. 디스크 공간 확인
log "디스크 공간 확인 중..."
disk_usage=$(df -h . | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$disk_usage" -gt 85 ]; then
    log "경고: 디스크 사용량이 85%를 초과했습니다. ($disk_usage%)"
    
    # 추가 정리 작업
    log "추가 정리 작업 실행 중..."
    
    # 더 오래된 로그 파일 삭제
    find "$LOG_DIR" -name "*.gz" -type f -mtime +15 -delete 2>/dev/null || true
    
    # 더 오래된 백업 파일 삭제
    if [ -d "$BACKUP_DIR" ]; then
        find "$BACKUP_DIR" -name "vitamin_clinic_backup_*" -type f -mtime +7 -delete 2>/dev/null || true
    fi
fi

# 8. 시스템 상태 확인
log "시스템 상태 확인 중..."

# 메모리 사용량
memory_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
log "메모리 사용량: ${memory_usage}%"

# 디스크 사용량
disk_usage=$(df -h . | tail -1 | awk '{print $5}' | sed 's/%//')
log "디스크 사용량: ${disk_usage}%"

# 프로세스 상태
if pgrep -f "next" > /dev/null; then
    log "Next.js 프로세스: 실행 중"
else
    log "경고: Next.js 프로세스가 실행되지 않고 있습니다."
fi

# 9. 정리 결과 요약
log "정리 결과 요약:"
log "  - 로그 파일: $(find $LOG_DIR -name "*.log" -type f | wc -l)개"
log "  - 보관된 로그: $(find $LOG_DIR -name "*.gz" -type f | wc -l)개"
if [ -d "$BACKUP_DIR" ]; then
    log "  - 백업 파일: $(find $BACKUP_DIR -name "vitamin_clinic_backup_*" -type f | wc -l)개"
fi
log "  - 디스크 사용량: ${disk_usage}%"
log "  - 메모리 사용량: ${memory_usage}%"

# 10. 정리 완료 알림
log "시스템 정리 완료"

# 정리 리포트 생성
summary_file="$LOG_DIR/cleanup_summary_$(date +%Y%m%d).txt"
{
    echo "=== 시스템 정리 요약 $(date) ==="
    echo "로그 파일: $(find $LOG_DIR -name "*.log" -type f | wc -l)개"
    echo "보관된 로그: $(find $LOG_DIR -name "*.gz" -type f | wc -l)개"
    if [ -d "$BACKUP_DIR" ]; then
        echo "백업 파일: $(find $BACKUP_DIR -name "vitamin_clinic_backup_*" -type f | wc -l)개"
    fi
    echo "디스크 사용량: ${disk_usage}%"
    echo "메모리 사용량: ${memory_usage}%"
    echo ""
    echo "=== 정리된 항목 ==="
    echo "• 오래된 로그 파일"
    echo "• 오래된 백업 파일"
    echo "• Next.js 캐시"
    echo "• npm 캐시"
    echo "• 임시 파일"
    echo "• 빈 디렉토리"
} > "$summary_file"

log "정리 리포트: $summary_file" 