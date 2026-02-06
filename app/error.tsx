'use client';

import { useEffect } from 'react';
import { Button } from '@/components';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 라우트 세그먼트 에러 바운더리
 * 렌더링 중 발생한 에러를 처리
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 서비스에 에러 전송
    console.error('에러 발생:', error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          문제가 발생했습니다
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          페이지를 불러오는 중 오류가 발생했습니다.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-4 max-w-lg overflow-auto rounded-md bg-red-50 p-4 text-left text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
            {error.message}
          </pre>
        )}
      </div>
      <div className="flex gap-2">
        <Button onClick={() => reset()}>다시 시도</Button>
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          홈으로 이동
        </Button>
      </div>
    </div>
  );
}
