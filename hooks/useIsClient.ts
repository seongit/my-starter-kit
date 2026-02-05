'use client';

import { useSyncExternalStore } from 'react';

/**
 * 클라이언트 사이드인지 확인하는 훅
 * SSR/SSG 환경에서 클라이언트 전용 코드 실행 시 사용
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    // subscribe - 빈 함수 (상태가 변경되지 않음)
    () => () => {},
    // getSnapshot (클라이언트)
    () => true,
    // getServerSnapshot (서버)
    () => false
  );
}
