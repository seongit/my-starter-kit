import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 라벨 */
  label?: string;
  /** 에러 메시지 */
  error?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}

/**
 * 입력 필드 컴포넌트
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = false,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              'text-sm font-medium',
              disabled
                ? 'text-neutral-400 dark:text-neutral-600'
                : 'text-neutral-700 dark:text-neutral-300'
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={twMerge(
            clsx(
              // 기본 스타일
              'h-10 rounded-md border px-3 py-2 text-sm',
              'transition-colors',
              'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              // 기본 상태
              !error &&
                'border-neutral-300 bg-white focus-visible:ring-neutral-950 dark:border-neutral-700 dark:bg-neutral-950',
              // 에러 상태
              error &&
                'border-red-500 focus-visible:ring-red-500 dark:border-red-500',
              // 비활성화 상태
              disabled && 'cursor-not-allowed opacity-50',
              // 전체 너비
              fullWidth && 'w-full',
              // 사용자 정의 클래스
              className
            )
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-neutral-500 dark:text-neutral-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
