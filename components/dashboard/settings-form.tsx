'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: '웹 개발자',
    language: 'ko',
    notifications: true,
    theme: 'system',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationsChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, notifications: checked }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log('Form submitted:', formData)
      toast.success('설정이 저장되었습니다!')
    } catch (error) {
      toast.error('오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 이름 */}
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          name="name"
          placeholder="홍길동"
          value={formData.name}
          onChange={handleInputChange}
        />
        <p className="text-sm text-muted-foreground">
          프로필에 표시될 이름입니다.
        </p>
      </div>

      {/* 이메일 */}
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          value={formData.email}
          onChange={handleInputChange}
        />
        <p className="text-sm text-muted-foreground">
          계정에 연결된 이메일 주소입니다.
        </p>
      </div>

      {/* 소개 */}
      <div className="space-y-2">
        <Label htmlFor="bio">소개</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="자신을 간단히 소개해주세요."
          value={formData.bio}
          onChange={handleInputChange}
          className="resize-none"
        />
        <p className="text-sm text-muted-foreground">
          160자 이하로 작성해주세요.
        </p>
      </div>

      {/* 언어 선택 */}
      <div className="space-y-2">
        <Label htmlFor="language">언어</Label>
        <Select
          value={formData.language}
          onValueChange={(value) => handleSelectChange('language', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ko">한국어</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          인터페이스 언어를 선택해주세요.
        </p>
      </div>

      {/* 테마 선택 */}
      <div className="space-y-2">
        <Label htmlFor="theme">테마</Label>
        <Select
          value={formData.theme}
          onValueChange={(value) => handleSelectChange('theme', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">라이트</SelectItem>
            <SelectItem value="dark">다크</SelectItem>
            <SelectItem value="system">시스템 설정</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          애플리케이션 테마를 선택해주세요.
        </p>
      </div>

      {/* 알림 설정 */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label className="text-base">알림</Label>
          <p className="text-sm text-muted-foreground">
            중요한 업데이트에 대한 알림을 받으시겠습니까?
          </p>
        </div>
        <Switch
          checked={formData.notifications}
          onCheckedChange={handleNotificationsChange}
        />
      </div>

      {/* 제출 버튼 */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? '저장 중...' : '저장하기'}
      </Button>
    </form>
  )
}
