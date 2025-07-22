#!/bin/bash

# 비타민 의원 로그 로테이션 스크립트
# 매일 새벽 3시에 실행되도록 cron에 등록

set -e

# 환경 변수 로드
source .env

# 설정
LOG_DIR="./logs"
RETENTION_DAYS=${LOG_RETENTION_DAYS:-90}
ROTATION_SIZE=${LOG_ROTATION_SIZE:-"10MB"}
MAX_SIZE_BYTES=$(numfmt --from=iec $ROTATION_SIZE)

# 로그 함수
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_DIR/rotation.log
}

# 로그 디렉토리 확인
if [ ! -d "$LOG_DIR" ]; then
    log "로그 디렉토리가 존재하지 않습니다. 생성합니다."
    mkdir -p "$LOG_DIR"
fi

log "로그 로테이션 시작"

# 1. 로그 파일 크기 체크 및 로테이션
for logfile in $LOG_DIR/*.log; do
    if [ -f "$logfile" ]; then
        file_size=$(stat -c%s "$logfile" 2>/dev/null || stat -f%z "$logfile" 2>/dev/null)
        
        if [ "$file_size" -gt "$MAX_SIZE_BYTES" ]; then
            timestamp=$(date +%Y%m%d_%H%M%S)
            rotated_file="${logfile}.${timestamp}"
            
            log "로그 파일 로테이션: $(basename $logfile) -> $(basename $rotated_file)"
            mv "$logfile" "$rotated_file"
            
            # 압축
            gzip "$rotated_file"
            log "로그 파일 압축 완료: $(basename $rotated_file).gz"
        fi
    fi
done

# 2. 오래된 로그 파일 정리
log "오래된 로그 파일 정리 중..."
find "$LOG_DIR" -name "*.log.*" -type f -mtime +$RETENTION_DAYS -delete
find "$LOG_DIR" -name "*.gz" -type f -mtime +$RETENTION_DAYS -delete

# 3. 로그 파일 통계
total_logs=$(find "$LOG_DIR" -name "*.log" -type f | wc -l)
total_archived=$(find "$LOG_DIR" -name "*.gz" -type f | wc -l)
total_size=$(du -sh "$LOG_DIR" | cut -f1)

log "로그 통계:"
log "  - 활성 로그 파일: $total_logs개"
log "  - 보관된 로그 파일: $total_archived개"
log "  - 총 로그 디렉토리 크기: $total_size"

# 4. 디스크 공간 확인
disk_usage=$(df -h "$LOG_DIR" | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$disk_usage" -gt 80 ]; then
    log "경고: 로그 디렉토리 디스크 사용량이 80%를 초과했습니다. ($disk_usage%)"
    
    # 가장 오래된 로그 파일들 삭제
    log "디스크 공간 확보를 위해 오래된 로그 파일들을 삭제합니다."
    find "$LOG_DIR" -name "*.gz" -type f -mtime +30 -delete
fi

# 5. 로그 파일 권한 설정
log "로그 파일 권한 설정 중..."
find "$LOG_DIR" -name "*.log" -type f -exec chmod 644 {} \;
find "$LOG_DIR" -name "*.gz" -type f -exec chmod 644 {} \;

# 6. 로그 요약 리포트 생성
summary_file="$LOG_DIR/rotation_summary_$(date +%Y%m%d).txt"
{
    echo "=== 로그 로테이션 요약 $(date) ==="
    echo "활성 로그 파일: $total_logs개"
    echo "보관된 로그 파일: $total_archived개"
    echo "총 크기: $total_size"
    echo "디스크 사용량: ${disk_usage}%"
    echo ""
    echo "=== 로그 파일 목록 ==="
    ls -la "$LOG_DIR"/*.log 2>/dev/null || echo "활성 로그 파일 없음"
    echo ""
    echo "=== 보관된 로그 파일 ==="
    ls -la "$LOG_DIR"/*.gz 2>/dev/null || echo "보관된 로그 파일 없음"
} > "$summary_file"

log "로그 로테이션 완료"
log "요약 리포트: $summary_file" 