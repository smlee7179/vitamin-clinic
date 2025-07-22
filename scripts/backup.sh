#!/bin/bash

# 비타민 의원 백업 스크립트
# 매일 새벽 2시에 실행되도록 cron에 등록

set -e

# 환경 변수 로드
source .env

# 백업 설정
BACKUP_ENABLED=${BACKUP_ENABLED:-"true"}
BACKUP_DIR="./backups"
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="vitamin_clinic_backup_${TIMESTAMP}"

# 로그 함수
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a ./logs/backup.log
}

# 백업이 비활성화된 경우 종료
if [ "$BACKUP_ENABLED" != "true" ]; then
    log "백업이 비활성화되어 있습니다."
    exit 0
fi

# 백업 디렉토리 생성
mkdir -p "$BACKUP_DIR"
mkdir -p "./logs"

log "백업 시작: $BACKUP_NAME"

# 1. 데이터베이스 백업
log "데이터베이스 백업 중..."
if [ -f "./dev.db" ]; then
    cp "./dev.db" "$BACKUP_DIR/${BACKUP_NAME}_database.db"
    log "데이터베이스 백업 완료"
else
    log "경고: 데이터베이스 파일을 찾을 수 없습니다."
fi

# 2. 업로드된 파일 백업
log "업로드 파일 백업 중..."
if [ -d "./public/uploads" ]; then
    tar -czf "$BACKUP_DIR/${BACKUP_NAME}_uploads.tar.gz" -C "./public" uploads/
    log "업로드 파일 백업 완료"
else
    log "경고: 업로드 디렉토리를 찾을 수 없습니다."
fi

# 3. 환경 설정 백업
log "환경 설정 백업 중..."
if [ -f ".env" ]; then
    cp ".env" "$BACKUP_DIR/${BACKUP_NAME}_env.txt"
    log "환경 설정 백업 완료"
fi

# 4. 로그 파일 백업
log "로그 파일 백업 중..."
if [ -d "./logs" ]; then
    tar -czf "$BACKUP_DIR/${BACKUP_NAME}_logs.tar.gz" -C "./logs" .
    log "로그 파일 백업 완료"
fi

# 5. 전체 프로젝트 백업 (선택사항)
log "전체 프로젝트 백업 중..."
tar -czf "$BACKUP_DIR/${BACKUP_NAME}_full.tar.gz" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='backups' \
    --exclude='logs' \
    --exclude='dev.db' \
    .

log "전체 프로젝트 백업 완료"

# 6. 오래된 백업 파일 정리
log "오래된 백업 파일 정리 중..."
find "$BACKUP_DIR" -name "vitamin_clinic_backup_*" -type f -mtime +$RETENTION_DAYS -delete
log "백업 파일 정리 완료 (${RETENTION_DAYS}일 이전 파일 삭제)"

# 7. 백업 완료 요약
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "vitamin_clinic_backup_*" | wc -l)

log "백업 완료!"
log "백업 디렉토리 크기: $BACKUP_SIZE"
log "백업 파일 수: $BACKUP_COUNT"

# 8. 디스크 공간 확인
DISK_USAGE=$(df -h "$BACKUP_DIR" | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    log "경고: 디스크 사용량이 80%를 초과했습니다. ($DISK_USAGE%)"
fi

log "백업 프로세스 종료" 