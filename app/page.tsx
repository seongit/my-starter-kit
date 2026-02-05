import Link from 'next/link';
import { Button, Card, CardHeader, CardContent } from '@/components';

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* 히어로 섹션 */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          My Starter Kit
        </h1>
        <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
          Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript 5
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/examples">
            <Button size="lg">컴포넌트 예제 보기</Button>
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              GitHub
            </Button>
          </a>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader
            title="커스텀 훅"
            description="자주 사용하는 9가지 훅"
          />
          <CardContent>
            <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• useLocalStorage</li>
              <li>• useDebounce</li>
              <li>• useToggle</li>
              <li>• useMediaQuery</li>
              <li>• useCopyToClipboard</li>
              <li>• useIsClient</li>
              <li>• useWindowSize</li>
              <li>• useOnClickOutside</li>
              <li>• useForm</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="UI 컴포넌트"
            description="재사용 가능한 기본 컴포넌트"
          />
          <CardContent>
            <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Button (4가지 variants)</li>
              <li>• Input (label, error 지원)</li>
              <li>• Card (Header, Content, Footer)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="기술 스택"
            description="최신 프론트엔드 스택"
          />
          <CardContent>
            <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Next.js 16 (App Router)</li>
              <li>• React 19</li>
              <li>• Tailwind CSS 4</li>
              <li>• TypeScript 5</li>
              <li>• ESLint 9</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
