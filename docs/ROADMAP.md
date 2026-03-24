# Notion CMS 개인 개발 블로그 - 개발 로드맵

Notion을 CMS로 활용하여 Next.js 기반 개인 기술 블로그를 구축하는 프로젝트의 개발 로드맵

## 개요

Notion CMS 블로그는 개발자를 위한 기술 블로그 플랫폼으로 다음 기능을 제공합니다:

- **Notion API 연동 (F001)**: Notion 데이터베이스에서 글 목록과 상세 데이터를 자동으로 페칭
- **글 목록/상세 (F002, F003)**: 최신순 글 목록 표시 및 Notion 블록을 HTML로 변환 렌더링
- **카테고리 필터링 (F004)**: 카테고리별 글 분류 및 필터링
- **검색 (F005)**: 제목/태그/본문 기반 검색 기능
- **반응형 디자인 (F006)**: 모바일/태블릿/데스크톱 완전 지원
- **ISR 캐싱 (F007)**: Incremental Static Regeneration으로 성능 최적화
- **SEO 메타데이터 (F008)**: 동적 OG 메타데이터 생성

## 기능-Task 매핑 테이블

| 기능 ID | 기능명 | 관련 Task |
|---------|--------|-----------|
| F001 | Notion API 연동 | Task 002, Task 005, Task 006 |
| F002 | 글 목록 표시 | Task 005, Task 007 |
| F003 | 글 상세 페이지 | Task 006, Task 008 |
| F004 | 카테고리 필터링 | Task 009, Task 010 |
| F005 | 글 검색 | Task 011 |
| F006 | 반응형 디자인 | Task 004, Task 007, Task 015 |
| F007 | ISR 캐싱 | Task 014 |
| F008 | SEO 메타데이터 | Task 013 |

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 완료로 표시

---

## 개발 단계

### Phase 1: 프로젝트 초기 설정

> 예상 소요 시간: 약 3-4일
>
> 목표: Next.js 프로젝트 구조를 블로그에 맞게 재구성하고, Notion API 연동 환경을 구축하며, 전체 라우트 골격을 생성한다.
>
> 완료 기준:
> - 모든 페이지 라우트(`/`, `/blog`, `/blog/[slug]`, `/category/[slug]`)가 빈 껍데기로 존재
> - Notion API 키가 환경 변수로 설정되고 연결 테스트 통과
> - TypeScript 타입 정의 파일이 완성되어 import 가능
> - `npm run build` 오류 없이 통과

- **Task 001: 프로젝트 구조 및 라우팅 설정** - 우선순위
  - 의존성: 없음
  - 관련 기능: 전체 프로젝트 기반
  - 기존 스타터킷의 대시보드 관련 라우트를 블로그 구조로 재편성
  - `app/blog/page.tsx` (글 목록), `app/blog/[slug]/page.tsx` (글 상세) 빈 페이지 생성
  - `app/category/[slug]/page.tsx` (카테고리별 목록) 빈 페이지 생성
  - 홈 페이지(`app/page.tsx`)를 블로그 랜딩 페이지 구조로 변경 준비
  - 헤더 네비게이션을 블로그 메뉴 구조(홈, 블로그, 카테고리)로 수정
  - `lib/` 디렉토리에 `notion.ts`, `notion-types.ts` 빈 파일 생성
  - `components/blog/` 디렉토리 구조 생성 (빈 컴포넌트 파일들)

- **Task 002: Notion API 연동 환경 구축**
  - 의존성: Task 001
  - 관련 기능: F001
  - `@notionhq/client` 패키지 설치
  - `.env.local` 파일에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 환경 변수 설정
  - `.env.example` 파일 생성 (환경 변수 템플릿)
  - `lib/notion.ts`에 Notion 클라이언트 초기화 코드 작성
  - Notion API 연결 테스트 (데이터베이스 접근 확인)
  - Playwright MCP를 활용한 API 연결 상태 검증 테스트

- **Task 003: 타입 정의 및 인터페이스 설계**
  - 의존성: Task 001
  - 관련 기능: F001, F002, F003, F004
  - `lib/notion-types.ts`에 `BlogPost`, `NotionBlock`, `Category` 인터페이스 정의
  - Notion API 응답 타입 매핑 (Notion 속성 -> BlogPost 변환 타입)
  - API 함수 시그니처 타입 정의 (페이지네이션, 필터링 파라미터 포함)
  - 컴포넌트 Props 타입 정의 (BlogCard, BlogHeader, NotionRenderer 등)
  - 유틸리티 타입 정의 (PaginationResult, FilterOptions, SearchParams)

---

### Phase 2: 공통 모듈 개발

> 예상 소요 시간: 약 4-5일
>
> 목표: 모든 페이지에서 재사용되는 Notion API 공통 함수, 공통 UI 컴포넌트, 더미 데이터를 구현하여 중복 개발을 방지한다.
>
> 완료 기준:
> - `fetchPages()`, `fetchPageContent()` 함수가 Notion API에서 데이터를 정상 반환
> - 공통 컴포넌트(BlogCard, BlogHeader, CategoryFilter)가 더미 데이터로 렌더링
> - 모든 공통 컴포넌트에 대한 Playwright MCP 렌더링 테스트 통과
> - 헤더/푸터가 블로그 구조에 맞게 수정 완료

- **Task 004: 공통 레이아웃 컴포넌트 수정**
  - 의존성: Task 001
  - 관련 기능: F006
  - `components/layout/header.tsx` 수정: 블로그 메뉴 구조(홈, 블로그, 카테고리 드롭다운) 적용
  - `components/layout/mobile-nav.tsx` 수정: 블로그 네비게이션에 맞는 모바일 메뉴
  - `components/layout/footer.tsx` 수정: 블로그 푸터 구조(소셜 링크, 저작권 등)
  - 기존 대시보드 관련 레이아웃/사이드바 컴포넌트 정리 (사용하지 않는 파일 제거 또는 보관)

- **Task 005: Notion API 공통 함수 구현** - 우선순위
  - 의존성: Task 002, Task 003
  - 관련 기능: F001, F002
  - `lib/notion.ts`에 `fetchPages()` 함수 구현: 글 목록 페칭 (정렬, 필터, 페이지네이션)
  - `lib/notion.ts`에 `fetchPageBySlug()` 함수 구현: 슬러그로 단일 글 조회
  - `lib/notion.ts`에 `fetchPageContent()` 함수 구현: 글 본문 블록 데이터 페칭
  - `lib/notion.ts`에 `fetchCategories()` 함수 구현: 카테고리 목록 조회
  - Notion 속성을 `BlogPost` 타입으로 변환하는 매퍼 함수 구현
  - 에러 핸들링 및 재시도 로직 구현
  - Playwright MCP를 활용한 API 응답 구조 검증 테스트

- **Task 006: 블로그 공통 컴포넌트 구현**
  - 의존성: Task 003, Task 004
  - 관련 기능: F001, F002, F003, F006
  - `components/blog/blog-card.tsx`: 글 카드 컴포넌트 (썸네일, 제목, 요약, 날짜, 카테고리 배지)
  - `components/blog/blog-header.tsx`: 글 메타정보 컴포넌트 (제목, 날짜, 카테고리, 태그)
  - `components/blog/search-bar.tsx`: 검색 입력 컴포넌트 (react-hook-form 기반)
  - `components/blog/category-filter.tsx`: 카테고리 필터 드롭다운 컴포넌트
  - `components/blog/related-posts.tsx`: 관련 글 추천 컴포넌트
  - `components/blog/pagination.tsx`: 페이지네이션 컴포넌트
  - 더미 데이터로 모든 컴포넌트 렌더링 확인
  - Playwright MCP를 활용한 컴포넌트 렌더링 테스트

---

### Phase 3: 핵심 기능 개발

> 예상 소요 시간: 약 5-7일
>
> 목표: 블로그의 가장 기본이 되는 기능인 글 목록 페이지, 글 상세 페이지, Notion 컨텐츠 렌더링을 완성한다. 더미 데이터를 실제 Notion API 데이터로 교체한다.
>
> 완료 기준:
> - `/blog` 페이지에서 Notion 데이터베이스의 글 목록이 표시됨
> - `/blog/[slug]` 페이지에서 Notion 블록이 HTML로 렌더링됨
> - 홈 페이지에서 최근 글 5개가 표시됨
> - 코드 블록, 이미지, 테이블, 인용구 등 주요 Notion 블록 타입이 렌더링됨
> - Playwright MCP E2E 테스트 전체 통과

- **Task 007: 블로그 글 목록 페이지 구현** - 우선순위
  - 의존성: Task 005, Task 006
  - 관련 기능: F002, F006
  - `app/blog/page.tsx` 구현: 전체 글 목록 페이지 (Server Component)
  - `fetchPages()` 함수를 활용하여 Notion에서 Published 상태의 글 목록 페칭
  - 글 목록을 `BlogCard` 컴포넌트로 그리드 레이아웃 표시
  - 페이지네이션 구현 (10개 항목 단위)
  - 반응형 레이아웃: 모바일 1열, 태블릿 2열, 데스크톱 3열
  - 글이 없는 경우 빈 상태(Empty State) UI 표시
  - Playwright MCP를 활용한 글 목록 페이지 E2E 테스트

- **Task 008: Notion 컨텐츠 렌더러 구현**
  - 의존성: Task 005, Task 003
  - 관련 기능: F003
  - `components/blog/notion-renderer.tsx` 구현: Notion 블록을 React 컴포넌트로 변환
  - 지원 블록 타입:
    - `paragraph`: 텍스트 단락 (리치 텍스트 포함)
    - `heading_1`, `heading_2`, `heading_3`: 제목
    - `code`: 코드 블록 (구문 강조)
    - `image`: 이미지 (Next.js Image 최적화)
    - `bulleted_list_item`, `numbered_list_item`: 리스트
    - `quote`: 인용구
    - `table`, `table_row`: 테이블
    - `callout`: 콜아웃 박스
    - `divider`: 구분선
    - `bookmark`: 북마크 링크
  - 리치 텍스트 렌더링 (볼드, 이탤릭, 코드, 링크, 색상)
  - 알 수 없는 블록 타입에 대한 폴백 처리
  - Playwright MCP를 활용한 블록 렌더링 정확도 테스트

- **Task 009: 블로그 글 상세 페이지 구현**
  - 의존성: Task 007, Task 008
  - 관련 기능: F003, F001
  - `app/blog/[slug]/page.tsx` 구현: 개별 글 상세 페이지 (Server Component)
  - `fetchPageBySlug()`로 글 메타데이터 조회, `fetchPageContent()`로 블록 데이터 페칭
  - `BlogHeader` 컴포넌트로 글 메타정보(제목, 날짜, 카테고리, 태그) 표시
  - `NotionRenderer` 컴포넌트로 본문 렌더링
  - 목차(Table of Contents) 구현: heading 블록에서 자동 생성, 사이드바 또는 상단 배치
  - `RelatedPosts` 컴포넌트로 같은 카테고리의 관련 글 추천 (최대 3개)
  - 이전/다음 글 네비게이션 링크
  - SNS 공유 버튼 (Twitter, LinkedIn, Facebook)
  - 존재하지 않는 슬러그에 대한 404 처리 (`notFound()`)
  - Playwright MCP를 활용한 글 상세 페이지 E2E 테스트

- **Task 010: 홈 페이지 블로그 연동**
  - 의존성: Task 007, Task 006
  - 관련 기능: F002
  - `app/page.tsx` 수정: 기존 랜딩 페이지를 블로그 홈으로 변경
  - 히어로 섹션: 블로그 소개 문구 및 배경
  - 최근 글 섹션: `fetchPages()`로 최신 5개 글을 `BlogCard`로 표시
  - 카테고리 섹션: `fetchCategories()`로 인기 카테고리 바로가기
  - CTA 섹션: "전체 글 보기" 버튼 -> `/blog` 링크
  - Playwright MCP를 활용한 홈 페이지 E2E 테스트

- **Task 010-1: 핵심 기능 통합 테스트**
  - 의존성: Task 007, Task 008, Task 009, Task 010
  - 관련 기능: F001, F002, F003
  - Playwright MCP를 사용한 전체 사용자 플로우 테스트
    - 홈 -> 블로그 목록 -> 글 상세 -> 관련 글 이동 플로우
    - 페이지네이션 동작 검증
    - 존재하지 않는 URL 접근 시 404 처리 검증
  - API 연동 데이터 정합성 검증
  - 에러 핸들링 및 엣지 케이스 테스트 (API 타임아웃, 빈 응답 등)

---

### Phase 4: 추가 기능 개발

> 예상 소요 시간: 약 4-5일
>
> 목표: 핵심 기능이 완성된 후, 카테고리 필터링, 검색 기능, SEO 최적화 등 부가 기능을 추가하여 블로그의 사용성을 높인다.
>
> 완료 기준:
> - `/category/[slug]` 페이지에서 해당 카테고리의 글만 필터링되어 표시됨
> - 검색 바에서 제목/태그 입력 시 실시간 필터링 동작
> - 모든 페이지에서 OG 메타데이터가 정상적으로 설정됨
> - Playwright MCP E2E 테스트 전체 통과

- **Task 011: 카테고리 페이지 및 필터링 구현** - 우선순위
  - 의존성: Task 007, Task 005
  - 관련 기능: F004
  - `app/category/[slug]/page.tsx` 구현: 카테고리별 글 목록 페이지
  - 카테고리 헤더: 카테고리명, 해당 카테고리 글 개수 표시
  - `fetchPages()`에 카테고리 필터 파라미터 적용하여 글 목록 페칭
  - `/blog` 페이지의 글 목록과 동일한 레이아웃 재활용
  - 헤더 네비게이션의 카테고리 드롭다운 메뉴 동적 생성
  - 존재하지 않는 카테고리에 대한 404 처리
  - Playwright MCP를 활용한 카테고리 필터링 E2E 테스트

- **Task 012: 검색 기능 구현**
  - 의존성: Task 007, Task 006
  - 관련 기능: F005
  - `components/blog/search-bar.tsx` 구현 완성: react-hook-form + zod 기반 검색 입력
  - 클라이언트 사이드 실시간 필터링 구현 (제목, 태그 기반)
  - 검색 결과 상태 관리 (검색 중, 결과 없음, 결과 표시)
  - URL 쿼리 파라미터와 검색 상태 동기화 (`/blog?q=검색어`)
  - 디바운스 적용 (300ms)으로 과도한 필터링 방지
  - 모바일에서 검색 바 UI 최적화 (모바일 필터 Drawer)
  - Playwright MCP를 활용한 검색 기능 E2E 테스트

- **Task 013: SEO 메타데이터 최적화**
  - 의존성: Task 009, Task 011
  - 관련 기능: F008
  - 각 페이지별 `metadata` 또는 `generateMetadata()` 함수 구현:
    - 홈 페이지: 블로그 제목, 설명 메타데이터
    - `/blog`: "블로그 - 기술 블로그" 메타데이터
    - `/blog/[slug]`: 글 제목, 요약, 커버 이미지를 OG 메타데이터로 동적 생성
    - `/category/[slug]`: 카테고리명 기반 메타데이터
  - `robots.txt` 및 `sitemap.xml` 자동 생성 설정
  - 구조화 데이터 (JSON-LD) 추가: BlogPosting 스키마
  - Playwright MCP를 활용한 메타데이터 설정 검증 테스트

- **Task 013-1: 추가 기능 통합 테스트**
  - 의존성: Task 011, Task 012, Task 013
  - 관련 기능: F004, F005, F008
  - Playwright MCP를 사용한 카테고리 + 검색 복합 플로우 테스트
    - 카테고리 페이지 접근 -> 글 목록 확인 -> 글 상세 이동
    - 검색어 입력 -> 실시간 필터링 확인 -> 검색 결과 클릭
    - URL 쿼리 파라미터 동기화 검증
  - SEO 메타데이터 페이지별 검증
  - 에러 핸들링 및 엣지 케이스 테스트

---

### Phase 5: 최적화 및 배포

> 예상 소요 시간: 약 3-4일
>
> 목표: 기능이 완성된 후 성능 최적화, 반응형 디자인 개선, Vercel 배포를 통해 프로덕션 품질을 달성한다.
>
> 완료 기준:
> - ISR 설정이 적용되어 캐싱이 정상 동작 (revalidate: 3600)
> - Lighthouse 성능 점수 90점 이상
> - Core Web Vitals: Good 등급
> - Vercel 배포 성공 및 프로덕션 환경에서 모든 기능 동작 확인
> - 모바일 디바이스(iOS Safari, Android Chrome)에서 레이아웃 정상 표시

- **Task 014: ISR 캐싱 및 성능 최적화** - 우선순위
  - 의존성: Task 009, Task 011
  - 관련 기능: F007
  - 모든 블로그 관련 페이지에 ISR 설정 적용 (`revalidate: 3600`)
  - `next/image` 컴포넌트를 활용한 이미지 최적화 (Notion 이미지 포함)
  - 동적 임포트 및 코드 스플리팅 적용
  - 폰트 최적화 (`next/font`)
  - 불필요한 클라이언트 사이드 JavaScript 제거
  - `npm run build` 후 빌드 크기 분석 및 최적화
  - Lighthouse 성능 측정 및 Core Web Vitals 개선

- **Task 015: 반응형 디자인 개선 및 접근성**
  - 의존성: Task 007, Task 009, Task 011
  - 관련 기능: F006
  - 모바일(375px), 태블릿(768px), 데스크톱(1024px+) 중단점별 레이아웃 검증
  - 모바일 환경 개선:
    - 목차를 Drawer로 변환
    - 필터를 Sheet 기반으로 변환
    - 카드 레이아웃 단일 열 최적화
    - 터치 영역 최소 44px 확보
  - 접근성(a11y) 개선: ARIA 레이블, 키보드 네비게이션, 포커스 관리
  - 다크 모드 전체 페이지 정상 동작 확인
  - Playwright MCP를 활용한 반응형 레이아웃 E2E 테스트 (다양한 뷰포트)

- **Task 016: Vercel 배포 및 프로덕션 검증**
  - 의존성: Task 014, Task 015
  - 관련 기능: 전체
  - Vercel 프로젝트 설정 및 환경 변수 등록 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
  - 배포 파이프라인 구성 (main 브랜치 자동 배포)
  - 프로덕션 환경 기능 테스트:
    - 모든 페이지 접근 및 렌더링 확인
    - ISR 캐싱 동작 확인
    - API 응답 시간 측정 (목표: < 1초)
    - 페이지 로딩 시간 측정 (LCP 목표: < 2초)
  - 모바일 디바이스 실제 테스트 (iOS Safari, Android Chrome)
  - 최종 프로덕션 Lighthouse 보고서 작성
  - Playwright MCP를 활용한 프로덕션 환경 E2E 테스트

---

## Task 의존성 다이어그램

```
Phase 1:
  Task 001 (프로젝트 구조)
    |-> Task 002 (Notion API 환경)
    |-> Task 003 (타입 정의)
    |-> Task 004 (공통 레이아웃)

Phase 2:
  Task 002 + Task 003 -> Task 005 (Notion API 공통 함수)
  Task 003 + Task 004 -> Task 006 (블로그 공통 컴포넌트)

Phase 3:
  Task 005 + Task 006 -> Task 007 (글 목록 페이지)
  Task 005 + Task 003 -> Task 008 (Notion 렌더러)
  Task 007 + Task 008 -> Task 009 (글 상세 페이지)
  Task 007 + Task 006 -> Task 010 (홈 페이지 연동)
  Task 007~010       -> Task 010-1 (핵심 통합 테스트)

Phase 4:
  Task 007 + Task 005 -> Task 011 (카테고리)
  Task 007 + Task 006 -> Task 012 (검색)
  Task 009 + Task 011 -> Task 013 (SEO)
  Task 011~013        -> Task 013-1 (추가 통합 테스트)

Phase 5:
  Task 009 + Task 011 -> Task 014 (성능 최적화)
  Task 007~011        -> Task 015 (반응형 개선)
  Task 014 + Task 015 -> Task 016 (배포)
```

---

## 예상 전체 일정

| Phase | 기간 | 주요 산출물 |
|-------|------|-------------|
| Phase 1: 프로젝트 초기 설정 | 약 3-4일 | 라우트 골격, Notion API 연결, 타입 정의 |
| Phase 2: 공통 모듈 개발 | 약 4-5일 | API 공통 함수, 공통 컴포넌트, 레이아웃 |
| Phase 3: 핵심 기능 개발 | 약 5-7일 | 글 목록, 글 상세, Notion 렌더러, 홈 페이지 |
| Phase 4: 추가 기능 개발 | 약 4-5일 | 카테고리, 검색, SEO |
| Phase 5: 최적화 및 배포 | 약 3-4일 | ISR, 반응형, Vercel 배포 |
| **합계** | **약 4-5주** | **MVP 1.0 완성** |
