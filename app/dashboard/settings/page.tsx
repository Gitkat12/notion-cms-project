'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsForm } from '@/components/dashboard/settings-form'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* 제목 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">설정</h1>
        <p className="text-muted-foreground">
          프로필 설정을 관리하세요.
        </p>
      </div>

      {/* 프로필 설정 카드 */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>프로필</CardTitle>
          <CardDescription>
            계정 정보를 업데이트하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm />
        </CardContent>
      </Card>
    </div>
  )
}
