# 스크립트 디렉토리

이 디렉토리에는 프로젝트 관리를 위한 유틸리티 스크립트가 포함되어 있습니다.

## 관리자 계정 관리

### create-admin.ts
관리자 계정을 생성합니다.

```bash
# 기본 사용
npx tsx scripts/create-admin.ts

# 환경 변수로 계정 정보 지정
ADMIN_EMAIL="admin@hospital.com" ADMIN_PASSWORD="password" npx tsx scripts/create-admin.ts
```

### change-password.ts
기존 관리자 계정의 비밀번호를 변경합니다.

```bash
npx tsx scripts/change-password.ts
```

## 데이터베이스 관리

### debug-hero-data.ts
Hero 섹션 데이터를 확인합니다.

```bash
npx tsx scripts/debug-hero-data.ts
```

### check-sections.ts
모든 HospitalContent 섹션의 데이터를 확인합니다.

```bash
npx tsx scripts/check-sections.ts
```

### init-missing-sections.ts
누락된 섹션을 초기화합니다.

```bash
npx tsx scripts/init-missing-sections.ts
```

### complete-mapping.ts
모든 섹션에 대한 완전한 데이터 매핑을 수행합니다.

```bash
npx tsx scripts/complete-mapping.ts
```

## 자동화 스크립트 (선택사항)

다음 스크립트들은 프로덕션 환경에서 사용할 수 있는 자동화 도구입니다.

### backup.sh
데이터베이스 및 파일을 백업합니다.

```bash
./scripts/backup.sh
```

### security-monitor.sh
보안 이벤트를 모니터링합니다.

```bash
./scripts/security-monitor.sh
```

### log-rotation.sh
로그 파일을 로테이션합니다.

```bash
./scripts/log-rotation.sh
```

### system-cleanup.sh
불필요한 파일과 캐시를 정리합니다.

```bash
./scripts/system-cleanup.sh
```

### setup-analytics.sh
Google Analytics 설정을 자동화합니다.

```bash
./scripts/setup-analytics.sh
```

### setup-cron.sh
Cron 작업을 설정합니다.

```bash
./scripts/setup-cron.sh
```

### optimize-performance.sh
성능 최적화를 실행합니다.

```bash
./scripts/optimize-performance.sh
```

### deploy.sh
배포 프로세스를 자동화합니다.

```bash
./scripts/deploy.sh
```

## 주의사항

- TypeScript 스크립트 (.ts)는 `npx tsx`를 사용하여 실행합니다.
- Bash 스크립트 (.sh)는 실행 권한이 필요합니다: `chmod +x scripts/*.sh`
- 프로덕션 환경 변수가 설정되어 있어야 일부 스크립트가 정상 작동합니다.
- 자동화 스크립트는 선택사항이며, Vercel 배포 환경에서는 필요하지 않을 수 있습니다.

## 자세한 정보

전체 프로젝트 문서는 [PROJECT_DOCUMENTATION.md](../PROJECT_DOCUMENTATION.md)를 참조하세요.
