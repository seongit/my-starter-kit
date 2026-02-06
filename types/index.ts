import { ReactNode } from 'react';

/**
 * children prop을 가진 컴포넌트의 기본 Props 타입
 */
export interface PropsWithChildren {
  children: ReactNode;
}

/**
 * 선택적 children prop을 가진 컴포넌트의 Props 타입
 */
export interface PropsWithOptionalChildren {
  children?: ReactNode;
}

/**
 * className prop을 가진 컴포넌트의 Props 타입
 */
export interface PropsWithClassName {
  className?: string;
}

/**
 * API 성공 응답
 */
export interface ApiSuccessResponse<T> {
  data: T;
  success: true;
  message?: string;
}

/**
 * API 에러 정보
 */
export interface ApiErrorInfo {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

/**
 * API 에러 응답
 */
export interface ApiErrorResponse {
  success: false;
  error: ApiErrorInfo;
}

/**
 * API 응답 유니온 타입
 * 성공/실패를 명확히 구분
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * API 성공 응답 타입 가드
 */
export function isApiSuccess<T>(
  response: ApiResponse<T>
): response is ApiSuccessResponse<T> {
  return response.success === true;
}

/**
 * API 에러 응답 타입 가드
 */
export function isApiError<T>(
  response: ApiResponse<T>
): response is ApiErrorResponse {
  return response.success === false;
}

/**
 * 페이지네이션 정보
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * 페이지네이션이 포함된 API 성공 응답
 */
export interface PaginatedResponse<T> extends ApiSuccessResponse<T[]> {
  pagination: Pagination;
}

/**
 * @deprecated ApiErrorInfo를 사용하세요
 */
export type ApiError = ApiErrorInfo;

/**
 * 비동기 상태 관리 타입
 */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * 비동기 데이터 상태
 */
export interface AsyncState<T> {
  data: T | null;
  status: AsyncStatus;
  error: ApiError | null;
}

/**
 * 정렬 방향
 */
export type SortDirection = 'asc' | 'desc';

/**
 * 정렬 설정
 */
export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

/**
 * 선택 가능한 옵션 (Select, Radio 등에서 사용)
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * ID를 가진 기본 엔티티 타입
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Nullable 타입 헬퍼
 */
export type Nullable<T> = T | null;

/**
 * 부분적으로 필수인 타입 헬퍼
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * 특정 키를 제외한 타입 헬퍼
 */
export type ExcludeKeys<T, K extends keyof T> = Omit<T, K>;
