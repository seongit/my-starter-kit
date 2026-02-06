import { z } from 'zod';

/**
 * 서버 환경 변수 스키마
 * 서버에서만 사용 가능한 민감한 환경 변수들
 */
const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  // 데이터베이스
  DATABASE_URL: z.string().url().optional(),
  // 인증
  AUTH_SECRET: z.string().min(32).optional(),
  // API 키
  API_SECRET_KEY: z.string().optional(),
});

/**
 * 클라이언트 환경 변수 스키마
 * NEXT_PUBLIC_ 접두사가 붙은 공개 환경 변수들
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
});

/**
 * 서버 환경 변수 타입
 */
export type ServerEnv = z.infer<typeof serverEnvSchema>;

/**
 * 클라이언트 환경 변수 타입
 */
export type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * 서버 환경 변수 검증 및 파싱
 */
function validateServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
  });

  if (!parsed.success) {
    console.error('❌ 서버 환경 변수 검증 실패:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('서버 환경 변수 검증에 실패했습니다.');
  }

  return parsed.data;
}

/**
 * 클라이언트 환경 변수 검증 및 파싱
 */
function validateClientEnv(): ClientEnv {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (!parsed.success) {
    console.error('❌ 클라이언트 환경 변수 검증 실패:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('클라이언트 환경 변수 검증에 실패했습니다.');
  }

  return parsed.data;
}

/**
 * 검증된 서버 환경 변수
 * 서버 컴포넌트나 API 라우트에서만 사용
 */
export const serverEnv = validateServerEnv();

/**
 * 검증된 클라이언트 환경 변수
 * 클라이언트와 서버 모두에서 사용 가능
 */
export const clientEnv = validateClientEnv();

/**
 * 개발 환경인지 확인
 */
export function isDevelopment(): boolean {
  return serverEnv.NODE_ENV === 'development';
}

/**
 * 프로덕션 환경인지 확인
 */
export function isProduction(): boolean {
  return serverEnv.NODE_ENV === 'production';
}

/**
 * 테스트 환경인지 확인
 */
export function isTest(): boolean {
  return serverEnv.NODE_ENV === 'test';
}
