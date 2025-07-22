import crypto from 'crypto';

// Rate Limiting을 위한 간단한 메모리 저장소
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export class SecurityUtils {
  // Rate Limiting 체크
  static checkRateLimit(identifier: string, maxRequests: number = 100, windowMs: number = 900000): boolean {
    const now = Date.now();
    const key = `rate_limit:${identifier}`;
    const record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  // 입력값 sanitization
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // HTML 태그 제거
      .replace(/javascript:/gi, '') // JavaScript 프로토콜 제거
      .replace(/on\w+=/gi, '') // 이벤트 핸들러 제거
      .trim();
  }

  // 파일 업로드 보안 검사
  static validateFileUpload(file: any): { isValid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = parseInt(process.env.MAX_FILE_SIZE || '5242880'); // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      return { isValid: false, error: '허용되지 않는 파일 형식입니다.' };
    }

    if (file.size > maxSize) {
      return { isValid: false, error: '파일 크기가 너무 큽니다.' };
    }

    // 파일명 보안 검사
    const safeName = this.sanitizeFileName(file.originalname);
    if (safeName !== file.originalname) {
      return { isValid: false, error: '파일명에 특수문자가 포함되어 있습니다.' };
    }

    return { isValid: true };
  }

  // 파일명 sanitization
  static sanitizeFileName(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9가-힣._-]/g, '') // 안전한 문자만 허용
      .replace(/\.{2,}/g, '.') // 연속된 점 제거
      .replace(/^\.+|\.+$/g, ''); // 앞뒤 점 제거
  }

  // 비밀번호 강도 검사
  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('비밀번호는 최소 8자 이상이어야 합니다.');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('대문자가 포함되어야 합니다.');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('소문자가 포함되어야 합니다.');
    }

    if (!/\d/.test(password)) {
      errors.push('숫자가 포함되어야 합니다.');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('특수문자가 포함되어야 합니다.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // CSRF 토큰 생성
  static generateCSRFToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // 해시 생성
  static hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
  }

  // 해시 검증
  static verifyPassword(password: string, hashedPassword: string): boolean {
    const [salt, hash] = hashedPassword.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
  }

  // IP 주소 검증
  static isValidIP(ip: string): boolean {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ip === 'unknown';
  }

  // 관리자 IP 허용 여부 확인
  static isAllowedAdminIP(clientIP: string): boolean {
    const allowedIPs = process.env.ALLOWED_ADMIN_IPS?.split(',') || ['127.0.0.1', '::1'];
    return allowedIPs.includes(clientIP);
  }

  // 로그 정리 (민감한 정보 제거)
  static sanitizeLog(logData: any): any {
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization'];
    const sanitized = { ...logData };

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }
}

// API 응답 래퍼
export class SecureResponse {
  static success(data: any, message?: string) {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    };
  }

  static error(message: string, code?: string, statusCode: number = 400) {
    return {
      success: false,
      error: {
        message,
        code,
        statusCode
      },
      timestamp: new Date().toISOString()
    };
  }
} 