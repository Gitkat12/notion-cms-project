'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Zap,
  Shield,
  Globe,
  Smartphone,
  Code,
  Palette,
} from 'lucide-react'

const features = [
  {
    title: '초고속 성능',
    description: 'Turbopack 기반 번들링으로 극도로 빠른 개발 환경과 빌드 시간',
    icon: Zap,
  },
  {
    title: '보안 우선',
    description: 'Next.js 16의 최신 보안 기능과 Best Practice 적용',
    icon: Shield,
  },
  {
    title: '글로벌 준비',
    description: 'i18n 지원으로 다국어 웹사이트 구축 가능',
    icon: Globe,
  },
  {
    title: '반응형 디자인',
    description: 'Tailwind CSS로 모든 디바이스에서 완벽한 반응형 UI',
    icon: Smartphone,
  },
  {
    title: 'TypeScript',
    description: '타입 안정성으로 런타임 에러를 사전에 방지',
    icon: Code,
  },
  {
    title: '테마 시스템',
    description: '다크/라이트 모드 자동 전환 및 CSS 변수 기반 커스터마이징',
    icon: Palette,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            강력한 기능들
          </h2>
          <p className="text-muted-foreground text-lg mt-4">
            모든 프로젝트에 필요한 기능들이 준비되어 있습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    <Icon className="size-5 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
