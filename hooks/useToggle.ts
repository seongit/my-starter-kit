'use client';

import { useState, useCallback } from 'react';

/**
 * boolean 값을 토글하는 훅
 * @param initialValue 초기값 (기본: false)
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setValueDirectly = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [value, toggle, setValueDirectly];
}
