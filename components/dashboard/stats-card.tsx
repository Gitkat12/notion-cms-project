'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
}

export function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon,
}: StatsCardProps) {
  const isPositive = (change ?? 0) >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-2 mt-2">
            {isPositive ? (
              <TrendingUp className="size-4 text-green-600" />
            ) : (
              <TrendingDown className="size-4 text-red-600" />
            )}
            <Badge
              variant={isPositive ? 'default' : 'secondary'}
              className={isPositive ? 'bg-green-600' : ''}
            >
              {isPositive ? '+' : ''}{change}%
            </Badge>
            <span className="text-sm text-muted-foreground">
              {changeLabel || 'from last month'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
