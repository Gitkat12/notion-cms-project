# 모던 Next.js 웹 스타터킷

이 프로젝트는 모던 웹 애플리케이션을 빠르게 시작할 수 있도록 설계된 완성된 스타터킷입니다.

## 기술 스택

- **프레임워크**: Next.js 16.2.1 (Turbopack, PPR 제거)
- **라이브러리**: React 19
- **스타일**: Tailwind CSS v4 (oklch color system)
- **UI 컴포넌트**: shadcn/ui v4 (radix-nova style)
- **아이콘**: lucide-react
- **타입스크립트**: 전체 프로젝트

## 설치된 주요 라이브러리 (바퀴를 재발명하지 않음)

| 용도 | 라이브러리 | 이유 |
|------|-----------|------|
| 다크모드 | next-themes | Next.js 공식 추천, SSR hydration 처리 내장 |
| 폼 관리 | react-hook-form | 비제어 방식, 최소 리렌더링 |
| 스키마 검증 | zod | TypeScript-first, RHF와 완벽 통합 |
| 연결 어댑터 | @hookform/resolvers | RHF ↔ Zod 연결 공식 어댑터 |
| 토스트 | sonner | shadcn 공식 추천, 접근성·애니메이션 내장 |
| 차트 | recharts | 데이터 시각화 |
| 테이블 | @tanstack/react-table | Headless, 정렬·필터·페이지네이션 |

## 컴포넌트 계층 구조

```
Layer 1 - Foundation       : 테마(dark/light), 전역 CSS, 폰트
Layer 2 - Layout Shell     : 루트 레이아웃, 헤더, 푸터, 대시보드 레이아웃
Layer 3 - Navigation       : 데스크탑 Nav, 모바일 Drawer, Sidebar
Layer 4 - Data Entry       : Input/Label/Select/Checkbox/Switch + Form
Layer 5 - Data Display     : Card, Table, Chart, Badge, Avatar, Skeleton
Layer 6 - Feedback/Overlay : Toast(Sonner), Dialog, Alert, Tooltip
```

## 프로젝트 파일 구조

```
app/
├── layout.tsx                          # 루트 레이아웃 (ThemeProvider, Toaster 포함)
├── page.tsx                            # 랜딩 페이지 (전면 교체)
└── dashboard/
    ├── layout.tsx                      # 대시보드 레이아웃 (Sidebar 기반)
    ├── page.tsx                        # 대시보드 홈 (통계 + 차트 + 테이블)
    └── settings/
        └── page.tsx                    # 설정 페이지 (폼 예시)

components/
├── providers/
│   └── theme-provider.tsx              # next-themes 래퍼 ('use client')
├── layout/
│   ├── header.tsx                      # 반응형 헤더 (Server Component)
│   ├── footer.tsx                      # 푸터 (Server Component)
│   ├── mobile-nav.tsx                  # Sheet 기반 모바일 메뉴 ('use client')
│   └── theme-toggle.tsx                # 다크/라이트 토글 버튼 ('use client')
├── landing/
│   ├── hero-section.tsx                # 히어로 섹션 ('use client')
│   ├── features-section.tsx            # 6개 기능 카드 그리드 ('use client')
│   ├── pricing-section.tsx             # 3개 가격 플랜 ('use client')
│   └── cta-section.tsx                 # 콜투액션 섹션 ('use client')
└── dashboard/
    ├── app-sidebar.tsx                 # Sidebar 컴포넌트 ('use client')
    ├── stats-card.tsx                  # 통계 카드 ('use client')
    ├── overview-chart.tsx              # 차트/테이블 ('use client')
    ├── recent-table.tsx                # 거래 목록 테이블 ('use client')
    └── settings-form.tsx               # 설정 폼 ('use client')

hooks/
└── use-mobile.ts                       # 반응형 디자인 훅 ('use client')
```

## 주요 컴포넌트 설명

### Layer 1: Foundation

#### `app/layout.tsx`
```tsx
<html suppressHydrationWarning>
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
    <Toaster />
  </ThemeProvider>
</html>
```
- `suppressHydrationWarning`: Next.js 16에서 필수
- `ThemeProvider`: next-themes로 다크모드 구현
- `<Toaster />`: sonner 토스트 알림

### Layer 2: Layout Shell

#### `components/layout/header.tsx`
- sticky, z-50 positioning
- 좌: 로고 / 중: 데스크탑 네비 (hidden md:flex) / 우: ThemeToggle + MobileNav

#### `components/layout/footer.tsx`
- 그리드 레이아웃으로 여러 섹션 구성
- copyright 표시

### Layer 3: Navigation

#### `components/dashboard/app-sidebar.tsx`
- shadcn Sidebar 컴포넌트 활용
- 네비게이션 항목: 개요, 분석, 사용자, 설정
- 하단 사용자 프로필 드롭다운

#### `components/layout/mobile-nav.tsx`
- Sheet 컴포넌트로 모바일 메뉴 구현
- `useState`로 열림/닫힘 상태 관리

### Layer 5: Data Display

#### `components/dashboard/stats-card.tsx`
- Card에 통계 정보 표시
- Trend 인디케이터 (TrendingUp/Down)
- 변화율 배지 표시

#### `components/dashboard/overview-chart.tsx`
- 6개월 데이터를 HTML 테이블로 표시
- 월별 매출, 방문자 수 포함

#### `components/dashboard/recent-table.tsx`
- shadcn Table 컴포넌트 활용
- Avatar, Badge 포함된 거래 목록
- 5개 샘플 데이터

### Layer 4: Data Entry

#### `components/dashboard/settings-form.tsx`
- 프로필 정보 입력 폼
- Select 드롭다운: 언어(ko/en/ja), 테마(light/dark/system)
- Switch: 알림 켜기/끄기
- Input/Textarea: 이름, 이메일, 소개
- Sonner 토스트로 저장 완료 피드백

## 개발 가이드

### 코딩 스타일

- **들여쓰기**: 2칸 (이미 설정됨)
- **TypeScript**: 전체 프로젝트에서 사용
- **Tailwind CSS**: utility-first 접근
- **주석**: 한국어로 작성 (코드 로직 설명이 필요할 때만)

### 'use client' 지침

다음 경우에 `'use client'` 지시자를 파일 최상단에 추가:
- `useEffect`, `useState`, `useContext` 등 React hooks 사용
- 이벤트 핸들러 (`onClick`, `onChange` 등) 사용
- 브라우저 API 접근 (예: `useTheme()`)

Server Component를 기본값으로 사용하고, Client Component가 필요한 경우에만 표시.

### 라우팅

Next.js 16 변경사항:
- `searchParams`: Promise 타입 → `await` 필수
- `params`: Promise 타입 → `await` 필수
- 미들웨어: 제거됨 → proxy 사용

```tsx
// 올바른 예시
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>
}) {
  const { period = '7d' } = await searchParams
  // ...
}
```

### 테마 토글

```tsx
'use client'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  // mounted 체크로 hydration 오류 방지
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
    </Button>
  )
}
```

## 커밋 규칙

```
feat: 새 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
style: 코드 포맷팅 (기능 변화 없음)
test: 테스트 추가/수정
chore: 빌드, 의존성 업데이트
```

**협업 시**: 커밋 메시지 끝에 아래 trailers 추가
```
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

## MCP 설정

### Playwright MCP

`.mcp.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

`~/.claude/settings.json`:
```json
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["playwright"]
}
```

Playwright는 브라우저 자동화 및 E2E 테스트에 사용 가능.

## 빌드 및 배포

### 로컬 개발
```bash
npm run dev
# http://localhost:3000 - 랜딩 페이지
# http://localhost:3000/dashboard - 대시보드
# http://localhost:3000/dashboard/settings - 설정
```

### 프로덕션 빌드
```bash
npm run build
npm run start
```

### 린팅 및 포맷팅
```bash
npm run lint
npm run format  # prettier 실행 (설정되어 있으면)
```

## 주의사항

1. **SSR Hydration**: 클라이언트 전용 API는 항상 `mounted` 상태 체크 후 사용
2. **Image 컴포넌트**: Next.js Image 최적화 사용 필수
3. **API Routes**: `/api` 디렉토리에서 Route Handlers 사용 (app router)
4. **환경 변수**: `.env.local`에서 `NEXT_PUBLIC_*` 접두사로 클라이언트 노출

## 추가 리소스

- [Next.js 16 마이그레이션 가이드](https://nextjs.org/docs/app)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com)
- [Sonner 토스트](https://sonner.emilkowal.ski/)
