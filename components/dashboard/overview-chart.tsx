'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { month: '1월', revenue: 4000, visitors: 2400 },
  { month: '2월', revenue: 3000, visitors: 1398 },
  { month: '3월', revenue: 2000, visitors: 9800 },
  { month: '4월', revenue: 2780, visitors: 3908 },
  { month: '5월', revenue: 1890, visitors: 4800 },
  { month: '6월', revenue: 2390, visitors: 3800 },
]

export function OverviewChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>개요</CardTitle>
        <CardDescription>최근 6개월 추세</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            <p className="font-semibold mb-2">차트 플레이스홀더</p>
            <p className="text-sm">Recharts 차트가 여기에 표시됩니다</p>
            <table className="mt-4 w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2">월</th>
                  <th className="px-4 py-2">매출</th>
                  <th className="px-4 py-2">방문자</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.month} className="border-b">
                    <td className="px-4 py-2">{row.month}</td>
                    <td className="px-4 py-2">${row.revenue.toLocaleString()}</td>
                    <td className="px-4 py-2">{row.visitors.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
