#!/bin/bash
# 라즈베리파이 초기 설정 스크립트

echo "🍓 비타민 의원 홈페이지 - 라즈베리파이 설정 시작"

# 시스템 업데이트
echo "📦 시스템 업데이트..."
sudo apt update && sudo apt upgrade -y

# Node.js 설치
echo "📥 Node.js 설치..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# PM2 설치
echo "⚙️ PM2 설치..."
sudo npm install -g pm2

# Git 설치 (보통 기본 설치되어 있음)
sudo apt install -y git

# 메모리 최적화 (스왑 메모리 증가)
echo "💾 메모리 최적화..."
sudo sed -i 's/CONF_SWAPSIZE=100/CONF_SWAPSIZE=1024/' /etc/dphys-swapfile
sudo /etc/init.d/dphys-swapfile restart

# GPU 메모리 줄이기
echo "🎮 GPU 메모리 최적화..."
echo 'gpu_mem=16' | sudo tee -a /boot/config.txt

# 로그 폴더 생성
mkdir -p /home/pi/vitamin-clinic/logs

echo "✅ 라즈베리파이 기본 설정 완료!"
echo "📝 다음 단계: 프로젝트 클론 및 배포"
