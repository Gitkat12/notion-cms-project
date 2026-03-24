'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import Link from 'next/link'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: '기능', href: '#features' },
  { label: '가격', href: '#pricing' },
  { label: '문서', href: '#docs' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="메뉴 열기"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <nav className="flex flex-col gap-4 mt-8">
          {navLinks.map((link) => (
            <SheetClose key={link.href} asChild>
              <Link
                href={link.href}
                className="text-base hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link
              href="/dashboard"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mt-4 text-center"
            >
              시작하기
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
