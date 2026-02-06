import { ApiSuccessResponse, ApiErrorResponse, isApiError } from '@/types';

/**
 * API 클라이언트 설정
 */
export interface ApiClientConfig {
  /** API 기본 URL */
  baseUrl: string;
  /** 요청 타임아웃 (ms) */
  timeout?: number;
  /** 기본 헤더 */
  headers?: HeadersInit;
}

/**
 * 요청 옵션
 */
export interface RequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  /** 요청 타임아웃 (ms) */
  timeout?: number;
}

/**
 * API 클라이언트 에러
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * API 클라이언트 인터페이스
 */
export interface ApiClient {
  get<T>(path: string, options?: RequestOptions): Promise<T>;
  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;
  put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;
  patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;
  delete<T>(path: string, options?: RequestOptions): Promise<T>;
}

/**
 * API 클라이언트 생성 팩토리
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  const { baseUrl, timeout = 30000, headers: defaultHeaders = {} } = config;

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { timeout: requestTimeout = timeout, headers, ...restOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), requestTimeout);

    try {
      const url = `${baseUrl}${path}`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...defaultHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        ...restOptions,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorResponse = data as ApiErrorResponse;
        if (isApiError(errorResponse)) {
          throw new ApiClientError(
            errorResponse.error.message,
            response.status,
            errorResponse.error.code,
            errorResponse.error.details
          );
        }
        throw new ApiClientError(
          '알 수 없는 에러가 발생했습니다.',
          response.status,
          'UNKNOWN_ERROR'
        );
      }

      // 성공 응답에서 data 추출
      const successResponse = data as ApiSuccessResponse<T>;
      return successResponse.data;
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiClientError(
            '요청 시간이 초과되었습니다.',
            408,
            'TIMEOUT_ERROR'
          );
        }
        throw new ApiClientError(error.message, 0, 'NETWORK_ERROR');
      }
      throw new ApiClientError('알 수 없는 에러가 발생했습니다.', 0, 'UNKNOWN_ERROR');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return {
    get<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>('GET', path, undefined, options);
    },
    post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>('POST', path, body, options);
    },
    put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>('PUT', path, body, options);
    },
    patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>('PATCH', path, body, options);
    },
    delete<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>('DELETE', path, undefined, options);
    },
  };
}

/**
 * 기본 API 클라이언트 인스턴스
 * 환경 변수에서 API URL을 가져오거나 기본값 사용
 */
export const apiClient = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
});
