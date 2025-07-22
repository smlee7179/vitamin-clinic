#!/bin/bash

# Cron 작업 자동 설정 스크립트

set -e

echo "⏰ Cron 작업 설정을 시작합니다..."

# 현재 디렉토리 확인
PROJECT_DIR=$(pwd)
echo "📁 프로젝트 디렉토리: $PROJECT_DIR"

# 스크립트 실행 권한 확인 및 설정
echo "🔧 스크립트 실행 권한을 설정합니다..."

chmod +x "$PROJECT_DIR/scripts/backup.sh"
chmod +x "$PROJECT_DIR/scripts/security-monitor.sh"
chmod +x "$PROJECT_DIR/scripts/log-rotation.sh"

echo "✅ 스크립트 실행 권한 설정 완료"

# 기존 cron 작업 확인
echo "🔍 기존 cron 작업을 확인합니다..."
EXISTING_CRON=$(crontab -l 2>/dev/null || echo "")

# 새로운 cron 작업 생성
echo "📝 새로운 cron 작업을 생성합니다..."

# 임시 cron 파일 생성
TEMP_CRON=$(mktemp)

# 기존 cron 작업 복사
if [ ! -z "$EXISTING_CRON" ]; then
    echo "$EXISTING_CRON" > "$TEMP_CRON"
    echo "" >> "$TEMP_CRON"
fi

# 프로젝트 관련 cron 작업 추가
cat >> "$TEMP_CRON" << EOF
# ========================================
# 비타민 의원 웹사이트 자동화 작업
# ========================================

# 매일 새벽 2시 백업
0 2 * * * $PROJECT_DIR/scripts/backup.sh >> $PROJECT_DIR/logs/cron.log 2>&1

# 매시간 보안 모니터링
0 * * * * $PROJECT_DIR/scripts/security-monitor.sh >> $PROJECT_DIR/logs/cron.log 2>&1

# 매일 새벽 3시 로그 로테이션
0 3 * * * $PROJECT_DIR/scripts/log-rotation.sh >> $PROJECT_DIR/logs/cron.log 2>&1

# 매주 일요일 새벽 4시 시스템 정리
0 4 * * 0 $PROJECT_DIR/scripts/system-cleanup.sh >> $PROJECT_DIR/logs/cron.log 2>&1

EOF

# cron 작업 설치
echo "💾 Cron 작업을 설치합니다..."
crontab "$TEMP_CRON"

# 임시 파일 정리
rm "$TEMP_CRON"

# 설치된 cron 작업 확인
echo ""
echo "✅ Cron 작업 설치 완료!"
echo "=========================="
echo "설치된 작업:"
echo "• 매일 새벽 2시: 데이터베이스 및 파일 백업"
echo "• 매시간: 보안 모니터링"
echo "• 매일 새벽 3시: 로그 로테이션"
echo "• 매주 일요일 새벽 4시: 시스템 정리"
echo ""

# 로그 디렉토리 생성
mkdir -p "$PROJECT_DIR/logs"

# cron 작업 상태 확인
echo "🔍 Cron 작업 상태를 확인합니다..."
crontab -l | grep -E "(backup|security|log-rotation|system-cleanup)" || echo "경고: cron 작업이 설치되지 않았습니다."

echo ""
echo "📋 관리 명령어:"
echo "• cron 작업 확인: crontab -l"
echo "• cron 작업 편집: crontab -e"
echo "• cron 작업 삭제: crontab -r"
echo "• cron 로그 확인: tail -f $PROJECT_DIR/logs/cron.log"

echo ""
echo "🎉 Cron 작업 설정이 완료되었습니다!" 