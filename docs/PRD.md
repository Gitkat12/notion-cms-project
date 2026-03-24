# Notion CMS 개인 개발 블로그 - PRD (Product Requirements Document)

## 1. 개요

### 1.1 프로젝트 정보
- **프로젝트명**: 개인 개발 블로그 (Personal Tech Blog with Notion CMS)
- **버전**: MVP 1.0
- **프로젝트 기간**: 2026.03 ~ 2026.05 (목표)

### 1.2 목적
Notion을 CMS(Content Management System)로 활용하여 개인 기술 블로그 플랫폼을 구축한다. 개발자는 Notion에서 글을 작성하면 자동으로 Next.js 블로그에 반영되는 간편한 콘텐츠 관리 환경을 제공한다.

### 1.3 CMS 선택 이유
- Notion의 장점:
  - 풍부한 블록 기반 편집기 (텍스트, 코드, 이미지, 테이블 등)
  - 데이터베이스 기능 (속성, 필터, 정렬)
  - API를 통한 프로그래매틱 접근
  - 별도의 관리 UI 구축 불필요
  - 개발자 친화적인 문서화

### 1.4 타겟 사용자
- 기술 블로그를 운영하는 개발자
- Notion을 이미 사용 중인 사용자
- 간편한 콘텐츠 관리를 원하는 개발자

### 1.5 성공 지표
- Notion 데이터베이스에서 글 목록 조회 속도: < 1초
- 블로그 페이지 로딩 속도: < 2초 (LCP)
- 모바일 / 데스크톱 반응형 100% 지원
- ISR을 통한 캐싱 최적화 (revalidate: 3600)

---

## 2. 사용자 여정 (User Journey)

```
┌─────────────┐
│   블로그    │  홈 방문
│   홈 (/):   │  ├─ 최근 글 5개 목록
│  최근 글    │  ├─ 카테고리 섹션
│   표시      │  └─ [글 읽기] 클릭
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  글 목록 페이지 │  /blog 페이지
│  (/blog):       │  ├─ 전체 글 목록 (페이지네이션)
│  검색 + 필터    │  ├─ 카테고리 필터
│                 │  ├─ 검색 기능
│                 │  └─ [글 읽기] 클릭
└──────┬──────────┘
       │
       ▼
┌─────────────────────┐
│  글 상세 페이지     │  /blog/[slug]
│  (/blog/[slug]):    │  ├─ 글 제목, 작성일, 카테고리
│  본문 + 메타정보    │  ├─ Notion 블록 렌더링
│                     │  ├─ 목차 (Table of Contents)
│                     │  ├─ 관련 글 추천
│                     │  └─ SNS 공유 버튼
└─────────────────────┘

추가 경로:
카테고리 페이지: /category/[slug]
└─ 해당 카테고리의 글 목록만 표시
```

---

## 3. 기능 명세 (MVP Feature List)

### 3.1 핵심 기능 (F001 ~ F005)

| 기능 ID | 기능명 | 설명 | 관련 페이지 | 우선순위 |
|---------|--------|------|-----------|----------|
| F001 | Notion API 연동 | @notionhq/client를 이용해 Notion 데이터베이스에서 글 목록/상세 데이터 페칭 | 모든 페이지 | 필수 |
| F002 | 글 목록 표시 | 최신순(Published 내림차순) 또는 사용자 지정 정렬로 글 목록 표시 | 홈, /blog | 필수 |
| F003 | 글 상세 페이지 | Notion 블록을 HTML로 변환 렌더링, 글 메타데이터 표시 | /blog/[slug] | 필수 |
| F004 | 카테고리 필터링 | 글 목록에서 카테고리별 필터링 가능, /category/[slug] 페이지 제공 | /blog, /category | 필수 |
| F005 | 글 검색 | 제목/태그/본문 기반 검색 기능 (클라이언트 또는 서버 사이드) | /blog | 필수 |

### 3.2 지원 기능 (F006 ~ F008)

| 기능 ID | 기능명 | 설명 | 우선순위 |
|---------|--------|------|----------|
| F006 | 반응형 디자인 | 모바일(< 768px) / 태블릿(768px ~ 1024px) / 데스크톱(> 1024px) 지원 | 필수 |
| F007 | ISR 캐싱 | Next.js ISR(Incremental Static Regeneration)을 활용해 성능 최적화 (revalidate: 3600) | 필수 |
| F008 | SEO 메타데이터 | 글 제목, 설명, OG 이미지 등 SEO 메타데이터 동적 생성 | 필수 |

---

## 4. 메뉴 구조 (Navigation)

### 4.1 헤더 네비게이션 (모든 페이지)

```
┌────────────────────────────────────────────────────────┐
│ [로고]                                    [테마토글] [메뉴] │
│ 개인 개발 블로그  홈   블로그  카테고리   🌙/☀️      ≡  │
└────────────────────────────────────────────────────────┘

데스크톱: 상단 정렬, 텍스트 메뉴
모바일: Sheet 또는 Drawer 기반 메뉴 (반응형)
```

### 4.2 메뉴 항목

| 메뉴 | 링크 | 설명 | 관련 기능 |
|------|------|------|----------|
| 홈 | `/` | 랜딩 페이지 (최근 글 + 카테고리 섹션) | F002 |
| 블로그 | `/blog` | 전체 글 목록 (검색, 필터) | F002, F004, F005 |
| 카테고리 | 드롭다운 | /category/[slug] 링크 목록 | F004 |
| 테마토글 | - | 다크/라이트 모드 전환 | 기존 스타터킷 기능 |

---

## 5. 페이지별 상세 기능

### 5.1 홈 페이지 (`/`)

**목적**: 블로그 개요 및 최근 글 소개

**화면 구성**:
1. 히어로 섹션: 블로그 소개 문구, 배경 이미지
2. 최근 글 섹션: 최신 5개 글 카드 (제목, 요약, 작성일, 카테고리)
3. 카테고리 섹션: 인기 카테고리 바로가기
4. CTA 섹션: "전체 글 보기" 버튼 → `/blog`

**기능**:
- F002: 최근 글 5개를 최신순으로 표시
- F006: 모바일 환경에서 카드 단일 열 표시
- F007: ISR을 통한 3600초(1시간) 캐싱
- F008: 홈 페이지 OG 메타데이터 설정

---

### 5.2 블로그 목록 페이지 (`/blog`)

**목적**: 전체 글 조회, 검색, 필터링

**화면 구성**:
1. 검색 바: 제목/태그 검색 입력창
2. 필터 섹션: 카테고리 멀티셀렉트, 날짜 정렬 옵션
3. 글 목록: 썸네일, 제목, 요약, 작성일, 카테고리 배지
4. 페이지네이션: 10개 항목 단위

**기능**:
- F002: 페이지네이션과 함께 글 목록 표시
- F004: 카테고리 드롭다운으로 필터링
- F005: 제목/태그 기반 실시간 검색 (클라이언트 또는 서버)
- F006: 모바일에서 필터 Drawer, 글 리스트 카드 단일 열
- F007: ISR 캐싱
- F008: 페이지 메타데이터 ("블로그 - 기술 블로그")

---

### 5.3 글 상세 페이지 (`/blog/[slug]`)

**목적**: 개별 글의 전체 내용 표시

**화면 구성**:
1. 글 메타정보: 제목, 작성일, 수정일, 카테고리, 태그, 작성자
2. 목차 (Table of Contents): 제목(h2, h3)별 네비게이션 (사이드바 또는 상단)
3. 본문: Notion 블록 렌더링 (텍스트, 코드, 이미지, 테이블, 인용구)
4. 하단 섹션:
   - 관련 글 추천 (같은 카테고리)
   - SNS 공유 버튼 (Twitter, LinkedIn, Facebook)
   - 이전/다음 글 네비게이션

**기능**:
- F001: Notion API에서 해당 글의 블록 데이터 페칭
- F003: Notion 블록을 HTML로 변환 렌더링
- F006: 모바일에서 목차를 Drawer로 표시, 본문 텍스트 반응형 크기 조정
- F007: ISR 캐싱 (기본 3600초, 선택사항: 더 짧은 주기)
- F008: 글 제목, 설명, OG 이미지 메타데이터 동적 생성

---

### 5.4 카테고리 페이지 (`/category/[slug]`)

**목적**: 카테고리별 글 필터링 조회

**화면 구성**:
1. 카테고리 헤더: 카테고리명, 글 개수
2. 글 목록: /blog와 동일한 레이아웃 (필터링됨)

**기능**:
- F002: 해당 카테고리의 글만 표시
- F004: URL 기반 카테고리 필터링
- F006: 반응형 디자인
- F007: ISR 캐싱
- F008: 카테고리별 메타데이터 생성

---

## 6. Notion 데이터베이스 구조

### 6.1 데이터베이스 스키마

Notion 데이터베이스 이름: `Blog Posts` (또는 사용자 정의 이름)

| 속성명 | 속성 타입 | 설명 | 필수여부 | 예시 |
|--------|----------|------|---------|------|
| Title | title | 글 제목 (Primary) | ✓ 필수 | "Next.js 성능 최적화 팁" |
| Slug | text | URL 슬러그 (유일한 값) | ✓ 필수 | "nextjs-optimization-tips" |
| Category | select | 글 분류 | ✓ 필수 | "Performance", "Next.js", "TypeScript" |
| Tags | multi_select | 상세 태그 | ✗ 선택 | ["optimization", "frontend", "best-practice"] |
| Published | date | 발행 날짜 | ✓ 필수 | 2026-03-24 |
| Status | select | 글 상태 | ✓ 필수 | "Draft" / "Published" |
| Featured | checkbox | 홈페이지 주요 글 표시 | ✗ 선택 | true / false |
| Content | page | 글 본문 (Notion 블록) | ✓ 필수 | [여러 블록] |

### 6.2 카테고리 예시
- Performance (성능 최적화)
- Next.js (Next.js 관련)
- TypeScript (타입스크립트)
- React (리액트)
- Tools (개발 도구)
- Learning (학습 정보)

---

## 7. 데이터 모델 (TypeScript)

### 7.1 BlogPost 타입

```typescript
interface BlogPost {
  id: string;                    // Notion 페이지 ID
  title: string;                 // 글 제목
  slug: string;                  // URL 슬러그
  category: string;              // 카테고리
  tags: string[];                // 태그 배열
  published: Date;               // 발행 날짜
  status: 'Draft' | 'Published'; // 상태
  featured?: boolean;            // 주요 글 여부
  content: NotionBlock[];        // Notion 블록 배열
  summary?: string;              // 요약 (자동 생성 또는 수동입력)
  coverImage?: string;           // 커버 이미지 URL
}
```

### 7.2 NotionBlock 타입

```typescript
interface NotionBlock {
  id: string;
  type: string; // 'paragraph', 'heading_1', 'heading_2', 'code', 'image', 'table', etc.
  content: any; // Notion API 응답 구조
}
```

### 7.3 Category 타입

```typescript
interface Category {
  id: string;      // 카테고리 ID (URL slug)
  name: string;    // 카테고리명
  count: number;   // 글 개수
}
```

---

## 8. 기술 스택

### 8.1 프레임워크 및 라이브러리

| 항목 | 패키지 | 버전 | 역할 |
|------|--------|------|------|
| 프레임워크 | next | 16.2.1 | 메인 웹 프레임워크 (서버/클라이언트 렌더링) |
| 라이브러리 | react | 19.2.4 | UI 컴포넌트 |
| CMS API | @notionhq/client | ^최신 | Notion API 공식 클라이언트 |
| 스타일 | tailwindcss | 4.x | 유틸리티 기반 CSS |
| UI 컴포넌트 | shadcn/ui | 최신 | 재사용 가능한 UI 컴포넌트 (Button, Card, Input 등) |
| 아이콘 | lucide-react | 최신 | 아이콘 라이브러리 |
| 폼 관리 | react-hook-form | 최신 | 비제어 폼 입력 (검색 바 등) |
| 검증 | zod | 최신 | 스키마 기반 데이터 검증 |
| 테마 | next-themes | 최신 | 다크/라이트 모드 관리 |
| 토스트 | sonner | 최신 | 알림 토스트 UI |

### 8.2 개발 도구

| 항목 | 패키지 | 역할 |
|------|--------|------|
| 언어 | TypeScript | 타입 안정성 |
| 린터 | ESLint | 코드 품질 |
| 포매터 | Prettier (설정 시) | 코드 스타일 |
| 테스트 | Jest (선택사항) | 단위 테스트 |

### 8.3 배포

| 항목 | 설정 |
|------|------|
| 호스팅 | Vercel |
| CDN | Vercel Edge Network |
| 환경 변수 | .env.local (로컬), Vercel 대시보드 (프로덕션) |

---

## 9. 환경 변수 (.env.local)

```bash
# Notion API 설정
NOTION_API_KEY=<Notion Integration Token>
NOTION_DATABASE_ID=<Notion Database ID>

# (선택) 기타 설정
NEXT_PUBLIC_BLOG_TITLE=개인 개발 블로그
NEXT_PUBLIC_BLOG_DESCRIPTION=개발자의 기술 이야기
```

**주의사항**:
- `NOTION_API_KEY`는 절대 공개하지 않을 것 (private)
- `NOTION_DATABASE_ID`는 공개 가능 (구조는 변경 불가)
- Vercel에서도 동일한 환경 변수 설정 필요

---

## 10. 구현 로드맵 (Roadmap)

### Phase 1: Notion API 설정 및 기초 페칭 (1주)
- [ ] Notion Integration 생성 및 API 키 획득
- [ ] Notion 데이터베이스 구조 설계 및 테스트 데이터 입력
- [ ] @notionhq/client 패키지 설치 및 초기 연동
- [ ] TypeScript 타입 정의 (BlogPost, NotionBlock 등)
- [ ] Notion 데이터베이스에서 글 목록 페칭 함수 구현
- [ ] 환경 변수 설정 (.env.local)

### Phase 2: 글 목록 및 상세 페이지 구현 (1주)
- [ ] /blog 페이지 구현 (글 목록 표시)
- [ ] /blog/[slug] 페이지 구현 (글 상세)
- [ ] Notion 블록을 HTML로 변환하는 렌더러 구현
- [ ] 기본 스타일링 (Tailwind CSS)
- [ ] 홈 페이지 수정 (최근 글 섹션 추가)

### Phase 3: 카테고리 필터 및 검색 기능 (1주)
- [ ] /category/[slug] 페이지 구현
- [ ] 글 목록 검색 기능 (제목/태그)
- [ ] 카테고리 필터 UI 구현
- [ ] 검색 결과 페이지네이션

### Phase 4: 스타일링 최적화 및 SEO (1주)
- [ ] 반응형 디자인 최적화 (모바일/태블릿/데스크톱)
- [ ] SEO 메타데이터 동적 생성 (og:title, og:description, og:image)
- [ ] 목차(Table of Contents) 구현
- [ ] 관련 글 추천 기능
- [ ] 다크 모드 지원 확인

### Phase 5: 성능 최적화 및 배포 (1주)
- [ ] ISR(Incremental Static Regeneration) 설정 (revalidate: 3600)
- [ ] 이미지 최적화 (next/image)
- [ ] 빌드 크기 및 성능 측정
- [ ] Vercel 배포 설정
- [ ] 프로덕션 환경 테스트
- [ ] 문서화 및 배포

---

## 11. 예상 파일 구조 (최종)

```
app/
├── layout.tsx                    # 루트 레이아웃 (기존 유지)
├── page.tsx                      # 홈 페이지 (수정)
├── blog/
│   ├── page.tsx                  # 글 목록 페이지 (F002, F005)
│   └── [slug]/
│       └── page.tsx              # 글 상세 페이지 (F001, F003)
└── category/
    └── [slug]/
        └── page.tsx              # 카테고리 페이지 (F004)

components/
├── blog/
│   ├── blog-card.tsx             # 글 카드 (목록용)
│   ├── blog-header.tsx           # 글 메타정보
│   ├── notion-renderer.tsx       # Notion 블록 렌더러 (F003)
│   ├── search-bar.tsx            # 검색 바 (F005)
│   ├── category-filter.tsx       # 카테고리 필터 (F004)
│   └── related-posts.tsx         # 관련 글 추천
└── (기존 컴포넌트 유지)

lib/
├── notion.ts                     # Notion API 클라이언트 래퍼
├── notion-types.ts               # TypeScript 타입 정의
└── utils.ts                      # 유틸리티 함수 (기존)

docs/
└── PRD.md                        # 이 파일

public/
└── (기존 에셋 유지)
```

---

## 12. 성공 기준 및 테스트

### 12.1 기능 테스트

| 기능 | 테스트 시나리오 |
|------|-----------------|
| F001 | Notion 데이터베이스에서 글 목록 성공적으로 페칭 |
| F002 | 홈과 /blog에서 글 목록이 최신순으로 표시됨 |
| F003 | /blog/[slug]에서 글 본문이 완전히 렌더링됨 |
| F004 | /category/[slug]에서 필터링된 글만 표시됨 |
| F005 | 검색 바에서 제목/태그로 실시간 필터링됨 |
| F006 | 모바일 (375px)에서 레이아웃이 깨지지 않음 |
| F007 | ISR 설정 후 배포 시 캐싱 동작 확인 |
| F008 | 페이지별 OG 메타데이터가 올바르게 설정됨 |

### 12.2 성능 목표

- Notion API 응답 시간: < 1초
- 페이지 로딩 시간 (LCP): < 2초
- 검색 결과 응답: < 500ms (클라이언트 사이드)
- Core Web Vitals: Good 등급

### 12.3 배포 검수

- [ ] 로컬 개발 환경에서 모든 기능 동작 확인
- [ ] npm run build 성공 (빌드 오류 없음)
- [ ] Vercel 배포 성공
- [ ] 프로덕션 환경에서 모든 기능 재확인
- [ ] 모바일 디바이스에서 실제 테스트 (iOS Safari, Android Chrome)

---

## 13. 향후 확장 기능 (Out of Scope - MVP 이후)

이 항목들은 MVP 완성 후 추가 개발 고려 사항입니다.

- [ ] 댓글 시스템 (Disqus 또는 커스텀)
- [ ] 뉴스레터 구독 기능
- [ ] 글 추천 알고리즘
- [ ] 글 조회 수 추적 (Analytics)
- [ ] 다국어 지원 (i18n)
- [ ] 광고 (Google AdSense 등)
- [ ] 블로그 통계 대시보드
- [ ] Webhook을 통한 자동 배포 (Notion 업데이트 시)

---

## 14. 문서 및 참고 자료

### 공식 문서
- [Notion API Documentation](https://developers.notion.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### 참고 자료
- [@notionhq/client NPM](https://www.npmjs.com/package/@notionhq/client)
- [Notion Block Types](https://developers.notion.com/reference/block)

---

**문서 작성일**: 2026-03-24
**마지막 업데이트**: 2026-03-24
**상태**: MVP 1.0 계획 중
