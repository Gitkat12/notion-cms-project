'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    description: '개인 프로젝트 및 소규모 팀',
    price: '$29',
    period: '/월',
    features: [
      'React Server Components',
      'Tailwind CSS v4',
      '기본 shadcn/ui 컴포넌트',
      '커뮤니티 지원',
      '월간 업데이트',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    description: '성장하는 스타트업 및 회사',
    price: '$99',
    period: '/월',
    features: [
      'Starter 플랜의 모든 기능',
      '고급 폼 시스템 (RHF + Zod)',
      '데이터 시각화 (Recharts)',
      '우선 지원',
      '주간 업데이트',
      '커스텀 컴포넌트',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: '대규모 조직 및 엔터프라이즈',
    price: '$299',
    period: '/월',
    features: [
      'Professional 플랜의 모든 기능',
      'Advanced 테이블 (TanStack Table)',
      '분석 대시보드',
      '24/7 지원',
      '일일 업데이트',
      'API 접근',
      '전담 지원팀',
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-24 px-4" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            투명한 가격
          </h2>
          <p className="text-muted-foreground text-lg mt-4">
            모든 규모의 프로젝트에 맞는 요금제를 선택하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.highlighted ? 'border-primary shadow-xl scale-105 lg:scale-100' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge>인기 상품</Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* 가격 */}
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                {/* 기능 목록 */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="size-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA 버튼 */}
                <Button
                  className="w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  시작하기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
