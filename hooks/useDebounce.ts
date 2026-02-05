'use client';

import { useState, useEffect } from 'react';

/**
 * 값의 디바운스 처리를 위한 훅
 * @param value 디바운스할 값
 * @param delay 지연 시간 (ms)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
