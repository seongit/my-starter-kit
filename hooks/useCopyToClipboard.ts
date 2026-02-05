'use client';

import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  /** 복사된 텍스트 (복사 실패 시 null) */
  copiedText: string | null;
  /** 텍스트를 클립보드에 복사하는 함수 */
  copy: (text: string) => Promise<boolean>;
  /** 복사 상태 초기화 */
  reset: () => void;
}

/**
 * 클립보드에 텍스트를 복사하는 훅
 */
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn('클립보드 API를 사용할 수 없습니다.');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('클립보드 복사 실패:', error);
      setCopiedText(null);
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setCopiedText(null);
  }, []);

  return { copiedText, copy, reset };
}
