'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 py-20">
      {/* Badge */}
      <Badge variant="outline" className="mb-4">
        ✨ 최신 기술 스택 활용
      </Badge>

      {/* 제목 */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-6 max-w-4xl">
        모던 웹 개발을
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
          빠르게 시작하세요
        </span>
      </h1>

      {/* 설명 */}
      <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl">
        Next.js 16, React 19, Tailwind CSS v4, shadcn/ui로 구성된 완성형 스타터킷.
        반응형, 다크모드, 폼 시스템까지 모두 준비되어 있습니다.
      </p>

      {/* CTA 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <Button size="lg" asChild>
          <Link href="/dashboard" className="gap-2">
            시작하기 <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="https://github.com" target="_blank">
            GitHub에서 보기
          </Link>
        </Button>
      </div>

      {/* 스크린샷 플레이스홀더 */}
      <div className="mt-16 w-full max-w-4xl">
        <div className="aspect-video bg-muted border border-border rounded-lg flex items-center justify-center">
          <div className="text-muted-foreground text-sm">
            대시보드 스크린샷 이곳에 위치
          </div>
        </div>
      </div>
    </section>
  )
}
