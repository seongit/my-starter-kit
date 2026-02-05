'use client';

import { useSyncExternalStore, useCallback } from 'react';

/**
 * 미디어 쿼리 일치 여부를 감지하는 훅
 * @param query 미디어 쿼리 문자열 (예: '(min-width: 768px)')
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', callback);
      return () => {
        mediaQuery.removeEventListener('change', callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
