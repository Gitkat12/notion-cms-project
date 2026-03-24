'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-24 px-4 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          지금 시작하세요
        </h2>
        <p className="text-primary-foreground/80 text-lg mt-6 max-w-2xl mx-auto">
          완성된 스타터킷으로 즉시 프로젝트를 시작하고, 핵심 기능 개발에만 집중하세요.
          복잡한 초기 설정은 우리가 해결해드렸습니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="gap-2"
          >
            <Link href="/dashboard">
              대시보드 확인하기 <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="https://github.com" target="_blank">
              소스 보기
            </Link>
          </Button>
        </div>

        <p className="text-sm text-primary-foreground/60 mt-8">
          라이센스: MIT • 완전 오픈소스 • 무제한 사용
        </p>
      </div>
    </section>
  )
}
