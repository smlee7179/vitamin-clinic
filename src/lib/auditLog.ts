import { prisma } from './prisma';

export interface AuditLogData {
  userId: string;
  userEmail: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT';
  entityType: string;
  entityId?: string;
  entityName?: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * 변경 이력을 데이터베이스에 저장
 */
export async function createAuditLog(data: AuditLogData) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        userEmail: data.userEmail,
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        entityName: data.entityName,
        changes: data.changes ? JSON.stringify(data.changes) : null,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // 감사 로그 실패는 주 작업을 방해하지 않아야 함
  }
}

/**
 * 변경 이력 조회
 */
export async function getAuditLogs(options: {
  userId?: string;
  entityType?: string;
  limit?: number;
  offset?: number;
}) {
  const { userId, entityType, limit = 50, offset = 0 } = options;

  const where: any = {};
  if (userId) where.userId = userId;
  if (entityType) where.entityType = entityType;

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    logs: logs.map((log) => ({
      ...log,
      changes: log.changes ? JSON.parse(log.changes) : null,
    })),
    total,
    hasMore: offset + logs.length < total,
  };
}

/**
 * 최근 활동 가져오기 (대시보드용)
 */
export async function getRecentActivity(limit = 10) {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return logs.map((log) => ({
    ...log,
    changes: log.changes ? JSON.parse(log.changes) : null,
  }));
}

/**
 * 사용자별 활동 통계
 */
export async function getUserActivityStats(userId: string) {
  const logs = await prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: logs.length,
    byAction: {} as Record<string, number>,
    byEntityType: {} as Record<string, number>,
    lastActivity: logs[0]?.createdAt || null,
  };

  logs.forEach((log) => {
    stats.byAction[log.action] = (stats.byAction[log.action] || 0) + 1;
    stats.byEntityType[log.entityType] =
      (stats.byEntityType[log.entityType] || 0) + 1;
  });

  return stats;
}
