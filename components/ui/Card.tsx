import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 그림자 적용 여부 */
  shadow?: boolean;
  /** 호버 효과 적용 여부 */
  hoverable?: boolean;
}

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 카드 제목 */
  title?: ReactNode;
  /** 카드 부제목 */
  description?: ReactNode;
  /** 우측 액션 영역 */
  action?: ReactNode;
}

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * 카드 컨테이너 컴포넌트
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, shadow = true, hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            // 기본 스타일
            'rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950',
            // 그림자
            shadow && 'shadow-sm',
            // 호버 효과
            hoverable &&
              'transition-shadow hover:shadow-md dark:hover:shadow-neutral-800/50',
            // 사용자 정의 클래스
            className
          )
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

/**
 * 카드 헤더 컴포넌트
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx('flex flex-col space-y-1.5 p-6', className)
        )}
        {...props}
      >
        {(title || description || action) ? (
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col space-y-1.5">
              {title && (
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * 카드 콘텐츠 컴포넌트
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(clsx('p-6 pt-0', className))}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * 카드 푸터 컴포넌트
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx('flex items-center p-6 pt-0', className)
        )}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';
