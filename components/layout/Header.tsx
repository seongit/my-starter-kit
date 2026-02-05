'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/', label: '홈' },
  { href: '/examples', label: '컴포넌트 예제' },
];

/**
 * 헤더 네비게이션 컴포넌트
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        {/* 로고 */}
        <Link
          href="/"
          className="text-xl font-bold text-neutral-900 dark:text-neutral-100"
        >
          My Starter Kit
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-neutral-100',
                pathname === item.href
                  ? 'text-neutral-900 dark:text-neutral-100'
                  : 'text-neutral-500 dark:text-neutral-400'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
