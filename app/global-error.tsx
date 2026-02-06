'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 루트 레이아웃 에러 바운더리
 * 레이아웃 자체에서 발생한 에러를 처리
 * 자체 html/body 태그를 포함해야 함
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // 에러 로깅 서비스에 에러 전송
    console.error('치명적 에러 발생:', error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '1rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
              }}
            >
              심각한 오류가 발생했습니다
            </h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              애플리케이션에 문제가 발생했습니다.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <pre
                style={{
                  maxWidth: '500px',
                  overflow: 'auto',
                  padding: '1rem',
                  backgroundColor: '#fef2f2',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#991b1b',
                  textAlign: 'left',
                  marginBottom: '1rem',
                }}
              >
                {error.message}
              </pre>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => reset()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#171717',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              다시 시도
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                border: '1px solid #d4d4d4',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              홈으로 이동
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
