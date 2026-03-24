'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const recentSales = [
  {
    id: '1',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    status: 'completed',
    avatar: 'https://github.com/oliviamartin.png',
  },
  {
    id: '2',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$1,899.00',
    status: 'processing',
    avatar: 'https://github.com/jacksonlee.png',
  },
  {
    id: '3',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$1,399.00',
    status: 'pending',
    avatar: 'https://github.com/isabellangu.png',
  },
  {
    id: '4',
    name: 'William Kim',
    email: 'william.kim@email.com',
    amount: '+$1,299.00',
    status: 'completed',
    avatar: 'https://github.com/williamkim.png',
  },
  {
    id: '5',
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$999.00',
    status: 'completed',
    avatar: 'https://github.com/sofiadavis.png',
  },
]

const statusConfig = {
  completed: { label: '완료', variant: 'default' as const },
  processing: { label: '처리중', variant: 'secondary' as const },
  pending: { label: '대기중', variant: 'outline' as const },
}

export function RecentTable() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>최근 거래</CardTitle>
        <CardDescription>
          최근 5개 거래 내역
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>고객</TableHead>
              <TableHead className="hidden sm:table-cell">이메일</TableHead>
              <TableHead className="text-right">금액</TableHead>
              <TableHead className="text-right">상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSales.map((sale) => {
              const statusConfig_ = statusConfig[sale.status as keyof typeof statusConfig]
              return (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={sale.avatar} alt={sale.name} />
                        <AvatarFallback>
                          {sale.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{sale.name}</p>
                        <p className="hidden md:block text-sm text-muted-foreground">
                          {sale.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {sale.email}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {sale.amount}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusConfig_.variant}>
                      {statusConfig_.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
