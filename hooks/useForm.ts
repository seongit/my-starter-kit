'use client';

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

type ValidationRule<T> = {
  /** 유효성 검사 함수 */
  validate: (value: T[keyof T], values: T) => boolean;
  /** 유효하지 않을 때 표시할 에러 메시지 */
  message: string;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T>[];
};

type Errors<T> = {
  [K in keyof T]?: string;
};

type Touched<T> = {
  [K in keyof T]?: boolean;
};

interface UseFormReturn<T> {
  /** 현재 폼 값 */
  values: T;
  /** 필드별 에러 메시지 */
  errors: Errors<T>;
  /** 필드별 터치 여부 */
  touched: Touched<T>;
  /** 폼 전체 유효성 여부 */
  isValid: boolean;
  /** input의 onChange 핸들러 */
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  /** input의 onBlur 핸들러 */
  handleBlur: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  /** 특정 필드 값 직접 설정 */
  setFieldValue: (field: keyof T, value: T[keyof T]) => void;
  /** 특정 필드 에러 직접 설정 */
  setFieldError: (field: keyof T, error: string) => void;
  /** 폼 제출 핸들러 생성 */
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e: FormEvent) => void;
  /** 폼 초기화 */
  reset: () => void;
}

/**
 * 폼 상태 관리를 위한 훅
 * @param initialValues 폼 초기값
 * @param validationRules 필드별 유효성 검사 규칙
 */
export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Touched<T>>({});

  // 단일 필드 유효성 검사
  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]): string | undefined => {
      const rules = validationRules?.[field];
      if (!rules) return undefined;

      for (const rule of rules) {
        if (!rule.validate(value, values)) {
          return rule.message;
        }
      }
      return undefined;
    },
    [validationRules, values]
  );

  // 전체 폼 유효성 검사
  const validateAll = useCallback((): Errors<T> => {
    const newErrors: Errors<T> = {};

    if (validationRules) {
      for (const field of Object.keys(validationRules) as (keyof T)[]) {
        const error = validateField(field, values[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    }

    return newErrors;
  }, [validateField, validationRules, values]);

  // onChange 핸들러
  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value, type } = e.target;
      const newValue =
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

      setValues((prev) => ({ ...prev, [name]: newValue }));

      // 터치된 필드만 실시간 유효성 검사
      if (touched[name as keyof T]) {
        const error = validateField(name as keyof T, newValue as T[keyof T]);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );

  // onBlur 핸들러
  const handleBlur = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;

      setTouched((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name as keyof T, value as T[keyof T]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  // 필드 값 직접 설정
  const setFieldValue = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      if (touched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [touched, validateField]
  );

  // 필드 에러 직접 설정
  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void | Promise<void>) => {
      return async (e: FormEvent) => {
        e.preventDefault();

        // 모든 필드 터치 처리
        const allTouched = Object.keys(values).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {} as Touched<T>
        );
        setTouched(allTouched);

        // 유효성 검사
        const validationErrors = validateAll();
        setErrors(validationErrors);

        // 에러가 없으면 제출
        if (Object.keys(validationErrors).length === 0) {
          await onSubmit(values);
        }
      };
    },
    [values, validateAll]
  );

  // 폼 초기화
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // 전체 유효성 여부
  const isValid = Object.keys(validateAll()).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    handleSubmit,
    reset,
  };
}
