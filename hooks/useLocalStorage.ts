'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * 로컬 스토리지와 동기화되는 상태를 관리하는 훅
 * @param key 로컬 스토리지 키
 * @param initialValue 초기값
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // 초기값 가져오기 (SSR 대응)
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`로컬 스토리지에서 "${key}" 읽기 실패:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 클라이언트에서 초기값 로드
  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  // 값 설정
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new Event('local-storage'));
        }
      } catch (error) {
        console.warn(`로컬 스토리지에 "${key}" 저장 실패:`, error);
      }
    },
    [key, storedValue]
  );

  // 값 삭제
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        window.dispatchEvent(new Event('local-storage'));
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`로컬 스토리지에서 "${key}" 삭제 실패:`, error);
    }
  }, [key, initialValue]);

  // 다른 탭/창에서의 변경 감지
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        setStoredValue(JSON.parse(event.newValue) as T);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', () => setStoredValue(readValue()));

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', () =>
        setStoredValue(readValue())
      );
    };
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}
