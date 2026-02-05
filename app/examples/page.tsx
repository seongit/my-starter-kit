'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components';
import { useToggle, useCopyToClipboard, useDebounce } from '@/hooks';

export default function ExamplesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        컴포넌트 예제
      </h1>

      <div className="space-y-16">
        <ButtonExamples />
        <InputExamples />
        <CardExamples />
        <HooksExamples />
      </div>
    </div>
  );
}

/** Button 컴포넌트 예제 */
function ButtonExamples() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Button
      </h2>

      {/* Variants */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium text-neutral-700 dark:text-neutral-300">
          Variants
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium text-neutral-700 dark:text-neutral-300">
          Sizes
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* States */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium text-neutral-700 dark:text-neutral-300">
          States
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button loading={loading} onClick={handleLoadingClick}>
            {loading ? '처리 중...' : '클릭하여 로딩 테스트'}
          </Button>
        </div>
      </div>

      {/* Full Width */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-neutral-700 dark:text-neutral-300">
          Full Width
        </h3>
        <div className="max-w-md">
          <Button fullWidth>전체 너비 버튼</Button>
        </div>
      </div>
    </section>
  );
}

/** Input 컴포넌트 예제 */
function InputExamples() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Input
      </h2>

      <div className="grid max-w-md gap-6">
        {/* 기본 */}
        <Input
          label="이름"
          placeholder="이름을 입력하세요"
          helperText="실명을 입력해주세요"
        />

        {/* 이메일 */}
        <Input
          type="email"
          label="이메일"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 비밀번호 */}
        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 에러 상태 */}
        <Input
          label="에러 상태"
          placeholder="에러가 있는 입력"
          error="이 필드는 필수입니다"
          defaultValue="잘못된 값"
        />

        {/* 비활성화 */}
        <Input
          label="비활성화"
          placeholder="비활성화된 입력"
          disabled
          defaultValue="수정 불가"
        />
      </div>
    </section>
  );
}

/** Card 컴포넌트 예제 */
function CardExamples() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Card
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* 기본 카드 */}
        <Card>
          <CardHeader
            title="기본 카드"
            description="제목과 설명이 있는 카드입니다"
          />
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              카드 내용이 여기에 들어갑니다. 다양한 콘텐츠를 포함할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        {/* 액션이 있는 카드 */}
        <Card>
          <CardHeader
            title="액션 카드"
            description="우측에 액션 버튼이 있습니다"
            action={<Button size="sm">액션</Button>}
          />
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              헤더에 액션 버튼을 추가할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        {/* 푸터가 있는 카드 */}
        <Card>
          <CardHeader title="푸터 카드" description="하단에 푸터가 있습니다" />
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              푸터에는 주로 버튼이나 액션을 배치합니다.
            </p>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="ghost" size="sm">
              취소
            </Button>
            <Button size="sm">저장</Button>
          </CardFooter>
        </Card>

        {/* 호버 효과 카드 */}
        <Card hoverable>
          <CardHeader
            title="호버 효과"
            description="마우스를 올려보세요"
          />
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              hoverable prop을 사용하면 호버 시 그림자 효과가 나타납니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/** Hooks 예제 */
function HooksExamples() {
  // useToggle
  const [isOpen, toggle] = useToggle(false);

  // useCopyToClipboard
  const { copiedText, copy } = useCopyToClipboard();

  // useDebounce
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Hooks 예제
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* useToggle */}
        <Card>
          <CardHeader title="useToggle" description="boolean 토글" />
          <CardContent className="space-y-4">
            <p className="text-sm">
              상태:{' '}
              <span className="font-mono font-semibold">
                {isOpen ? 'true' : 'false'}
              </span>
            </p>
            <Button onClick={toggle} size="sm">
              토글
            </Button>
          </CardContent>
        </Card>

        {/* useCopyToClipboard */}
        <Card>
          <CardHeader title="useCopyToClipboard" description="클립보드 복사" />
          <CardContent className="space-y-4">
            <p className="text-sm">
              복사됨:{' '}
              <span className="font-mono">
                {copiedText || '(없음)'}
              </span>
            </p>
            <Button onClick={() => copy('Hello, World!')} size="sm">
              &quot;Hello, World!&quot; 복사
            </Button>
          </CardContent>
        </Card>

        {/* useDebounce */}
        <Card>
          <CardHeader title="useDebounce" description="입력 디바운스 (500ms)" />
          <CardContent className="space-y-4">
            <Input
              placeholder="검색어 입력..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="text-sm">
              <p>
                입력값:{' '}
                <span className="font-mono">{searchTerm || '(없음)'}</span>
              </p>
              <p>
                디바운스:{' '}
                <span className="font-mono font-semibold">
                  {debouncedSearchTerm || '(없음)'}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
