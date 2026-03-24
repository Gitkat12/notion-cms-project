'use client'

import { StatsCard } from '@/components/dashboard/stats-card'
import { OverviewChart } from '@/components/dashboard/overview-chart'
import { RecentTable } from '@/components/dashboard/recent-table'
import { Users, CreditCard, Activity, TrendingUp } from 'lucide-react'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>
}) {
  const { period = '7d' } = await searchParams

  return (
    <div className="space-y-8">
      {/* 제목 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground">
          지난 {period === '7d' ? '7일간의' : period === '30d' ? '30일간의' : '전체'} 통계를 확인하세요.
        </p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="총 매출"
          value="$12,234.50"
          change={20.1}
          changeLabel="지난달 대비"
          icon={<CreditCard className="size-4" />}
        />
        <StatsCard
          title="총 방문자"
          value="45,231"
          change={13.2}
          changeLabel="지난달 대비"
          icon={<Users className="size-4" />}
        />
        <StatsCard
          title="활성 사용자"
          value="7,241"
          change={4.3}
          changeLabel="지난주 대비"
          icon={<Activity className="size-4" />}
        />
        <StatsCard
          title="전환율"
          value="12.5%"
          change={-2.4}
          changeLabel="지난달 대비"
          icon={<TrendingUp className="size-4" />}
        />
      </div>

      {/* 차트 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <OverviewChart />
      </div>

      {/* 최근 거래 */}
      <div className="grid gap-4">
        <RecentTable />
      </div>
    </div>
  )
}
