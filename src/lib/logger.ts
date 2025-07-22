import { SecurityUtils } from './security';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: Error;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  url?: string;
  userAgent?: string;
  ip?: string;
}

class Logger {
  private logLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO;
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, context, error, url, ip } = entry;
    
    let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (url) logMessage += ` | URL: ${url}`;
    if (ip) logMessage += ` | IP: ${ip}`;
    if (context && Object.keys(context).length > 0) {
      logMessage += ` | Context: ${JSON.stringify(SecurityUtils.sanitizeLog(context))}`;
    }
    if (error) {
      logMessage += ` | Error: ${error.message}`;
      if (this.isDevelopment) {
        logMessage += ` | Stack: ${error.stack}`;
      }
    }
    
    return logMessage;
  }

  private writeLog(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return;

    const formattedLog = this.formatLog(entry);
    
    // 개발 환경에서는 콘솔에 출력
    if (this.isDevelopment) {
      switch (entry.level) {
        case LogLevel.DEBUG:
          console.debug(formattedLog);
          break;
        case LogLevel.INFO:
          console.info(formattedLog);
          break;
        case LogLevel.WARN:
          console.warn(formattedLog);
          break;
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          console.error(formattedLog);
          break;
      }
    } else {
      // 프로덕션 환경에서는 파일에 로깅
      this.writeToFile(entry);
    }

    // 에러나 치명적 오류는 추가 알림
    if (entry.level === LogLevel.ERROR || entry.level === LogLevel.FATAL) {
      this.sendAlert(entry);
    }
  }

  private writeToFile(entry: LogEntry): void {
    // 실제 구현에서는 파일 시스템이나 로깅 서비스 사용
    // 여기서는 간단한 예시
    const fs = require('fs');
    const path = require('path');
    
    const logDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logDir, `${entry.level}.log`);
    
    try {
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      
      const logEntry = this.formatLog(entry) + '\n';
      fs.appendFileSync(logFile, logEntry);
    } catch (error) {
      console.error('Failed to write log to file:', error);
    }
  }

  private sendAlert(entry: LogEntry): void {
    // 실제 구현에서는 이메일, 슬랙, SMS 등으로 알림 전송
    if (process.env.ALERT_EMAIL) {
      console.warn(`ALERT: ${entry.message} - ${entry.timestamp}`);
      // 여기에 실제 알림 로직 구현
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      message,
      context
    });
  }

  info(message: string, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      context
    });
  }

  warn(message: string, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message,
      context
    });
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      error,
      context
    });
  }

  fatal(message: string, error?: Error, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.FATAL,
      message,
      error,
      context
    });
  }

  // HTTP 요청 로깅
  logRequest(req: any, res: any, duration: number): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message: `HTTP ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`,
      context: {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration,
        userAgent: req.headers['user-agent'],
        ip: req.ip || req.headers['x-forwarded-for']
      }
    };

    this.writeLog(entry);
  }

  // 사용자 활동 로깅
  logUserActivity(userId: string, action: string, context?: Record<string, any>): void {
    this.info(`User activity: ${action}`, {
      userId,
      action,
      ...context
    });
  }

  // 보안 이벤트 로깅
  logSecurityEvent(event: string, context?: Record<string, any>): void {
    this.warn(`Security event: ${event}`, {
      event,
      ...context
    });
  }
}

export const logger = new Logger(); 