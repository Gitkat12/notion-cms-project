import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { MobileNav } from './mobile-nav'

interface HeaderProps {
  variant?: 'default' | 'dashboard'
}

const navLinks = [
  { label: '기능', href: '#features' },
  { label: '가격', href: '#pricing' },
  { label: '문서', href: '#docs' },
]

export function Header({ variant = 'default' }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/80 backdrop-blur ${
        variant === 'dashboard' ? 'shadow-sm' : ''
      }`}
    >
      <nav className="h-16 max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="font-bold text-lg font-geist-sans">
          StarterKit
        </Link>

        {/* 데스크탑 네비게이션 */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 우측: 테마 토글 + 모바일 메뉴 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  )
}
