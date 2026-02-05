'use client';

import { useEffect, RefObject } from 'react';

type EventType = MouseEvent | TouchEvent;

/**
 * 요소 외부 클릭을 감지하는 훅
 * @param ref 감지할 요소의 ref
 * @param handler 외부 클릭 시 실행할 핸들러
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: EventType) => void
): void {
  useEffect(() => {
    const listener = (event: EventType) => {
      const el = ref.current;

      // ref 요소가 없거나, 클릭이 요소 내부에서 발생한 경우 무시
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
