# MCPRepo 서비스 기획서

## 프로젝트 개요

MCPRepo는 Model Context Protocol(MCP) 관련 서버와 클라이언트 레포지토리를 통합적으로 관리하고 검색할 수 있는 웹 애플리케이션입니다. 사용자들은 MCP 생태계의 다양한 구현체들을 한 곳에서 탐색하고 정보를 얻을 수 있으며, 새로운 레포지토리를 등록할 수도 있습니다.

## 주요 기능

### 1. MCP 서버/클라이언트 레포지토리 검색 및 조회

- 사용자는 메인 페이지에서 MCP 서버와 클라이언트 목록을 확인할 수 있음
- 카테고리별 필터링 및 검색 기능 제공
- 카드 형태의 UI로 직관적인 탐색 경험 제공

### 2. 레포지토리 상세 정보 제공

- 각 레포지토리 카드를 클릭하면 상세 페이지로 이동
- GitHub 레포지토리 페이지와 유사한 UI 제공:
  - 레포지토리 메타데이터(별, 포크, 라이센스 등)
  - README 내용 표시
  - 파일 구조 탐색기 제공
  - 통합 기능 및 의존성 정보 표시

### 3. 새로운 레포지토리 등록 기능

- 사용자가 MCP 관련 레포지토리 정보를 등록할 수 있는 폼 제공
- GitHub URL은 필수 입력 항목으로 지정
- 사용자 등록 정보는 관리자 검토 후 공개됨
- 등록 상태(검토 중/승인/반려) 확인 기능

### 4. 뉴스 및 블로그 기능

- MCP 관련 소식과 업데이트를 게시하는 블로그 섹션
- 마크다운 형식의 컨텐츠 지원
- 카테고리 및 태그 기반 필터링

## 기술 스택

### 프론트엔드

- Next.js 15.2.0 (App Router)
- TypeScript
- React 18.3.1
- Shadcn UI + Radix UI 컴포넌트
- TailwindCSS
- React Hook Form + Zod

### 향후 백엔드 (계획)

- Node.js 또는 Java Spring Boot
- 데이터베이스: MongoDB 또는 PostgreSQL
- GitHub API 연동
- 인증/인가 시스템
- 마크다운 렌더링 지원

## 페이지 구조

1. **메인 페이지** (`/`): 서비스 소개 및 주요 레포지토리 하이라이트
2. **서버 목록** (`/servers`): MCP 서버 레포지토리 목록
3. **클라이언트 목록** (`/clients`): MCP 클라이언트 레포지토리 목록
4. **사용 사례** (`/use-cases`): MCP 활용 사례 모음
5. **레포지토리 상세** (`/servers/:id` 또는 `/clients/:id`): 개별 레포지토리 상세 정보
6. **등록 양식** (`/submit`): 새 레포지토리 등록 폼
7. **블로그/뉴스** (`/posts`): MCP 관련 소식 및 블로그
8. **블로그 상세** (`/posts/:id`): 개별 블로그 포스트 상세 페이지

## API 엔드포인트

### 1. 서버 API (`/api/servers`)

- `GET /api/servers`

  - 모든 MCP 서버 목록 조회
  - 응답: Server[] (서버 목록)

- `GET /api/servers/{id}`
  - 특정 서버 상세 정보 조회
  - 응답: Server 객체
  ```typescript
  interface Server {
    id: string;
    name: string;
    description: string;
    owner: string;
    repo: string;
    githubUrl: string;
    demoUrl?: string;
    isOfficial: boolean;
    language: string;
    stars: number;
    forks: number;
    license: string;
    updatedAt: string;
    tags: string[];
    apiEndpoints: {
      method: string;
      path: string;
      description: string;
      requestExample?: string;
      responseExample?: string;
    }[];
    environmentVariables: {
      name: string;
      description: string;
      required: boolean;
      defaultValue?: string;
    }[];
    database?: {
      type: string;
      description: string;
      schema?: string;
    };
    systemRequirements?: {
      hardware: string[];
      software: string[];
    };
    commands: {
      name: string;
      description: string;
      example: string;
    }[];
    deploymentOptions?: {
      name: string;
      description: string;
      example: string;
    }[];
  }
  ```

### 2. 클라이언트 API (`/api/clients`)

- `GET /api/clients`

  - 모든 MCP 클라이언트 목록 조회
  - 응답: Client[] (클라이언트 목록)

- `GET /api/clients/{id}`
  - 특정 클라이언트 상세 정보 조회
  - 응답: Client 객체
  ```typescript
  interface Client {
    id: string;
    name: string;
    description: string;
    owner: string;
    repo: string;
    githubUrl: string;
    isOfficial: boolean;
    language: string;
    stars: number;
    forks: number;
    license: string;
    updatedAt: string;
    tags: string[];
    installInstructions: string;
    usageExamples: string[];
    supportedLanguages: string[];
    platforms: string[];
    contributors: {
      name: string;
      githubUrl: string;
      avatarUrl: string;
    }[];
  }
  ```

### 3. 사용 사례 API (`/api/use-cases`)

- `GET /api/use-cases`

  - 모든 사용 사례 목록 조회
  - 응답: UseCase[] (사용 사례 목록)

- `GET /api/use-cases/{id}`
  - 특정 사용 사례 상세 정보 조회
  - 응답: UseCase 객체
  ```typescript
  interface UseCase {
    id: string;
    title: string;
    summary: string;
    content?: string;
    imageUrl: string;
    tags: string[];
    updatedAt: string;
    author: {
      name: string;
      avatarUrl: string;
    };
    servers?: {
      id: string;
      name: string;
      description: string;
    }[];
    clients?: {
      id: string;
      name: string;
      description: string;
    }[];
  }
  ```

### 4. 게시물 API (`/api/posts`)

- `GET /api/posts`

  - 모든 게시물 목록 조회
  - 응답: Post[] (게시물 목록)

- `GET /api/posts/{id}`
  - 특정 게시물 상세 정보 조회
  - 응답: Post 객체
  ```typescript
  interface Post {
    id: string;
    title: string;
    summary: string;
    content?: string;
    imageUrl: string;
    category: string;
    publishedAt: string;
    author: {
      name: string;
      avatarUrl: string;
    };
    tags?: string[];
    relatedPosts?: {
      id: string;
      title: string;
    }[];
  }
  ```

### 5. 제출 API (`/api/submissions`)

- `POST /api/submissions`

  - 새로운 프로젝트 제출
  - 요청: SubmissionData 객체

  ```typescript
  interface SubmissionData {
    name: string;
    author: string;
    type: "server" | "client";
    description: string;
    repoUrl: string;
    websiteUrl?: string;
    tags: string[];
    email: string;
  }
  ```

  - 응답: SubmissionResponse 객체

  ```typescript
  interface SubmissionResponse {
    id: string;
    status: "pending" | "approved" | "rejected";
    message?: string;
    createdAt: string;
  }
  ```

- `GET /api/submissions/{id}`
  - 제출된 프로젝트의 상태 확인
  - 응답: SubmissionResponse 객체

### 6. GitHub 통합 API (`/api/github`)

- `GET /api/github/{owner}/{repo}/readme`

  - GitHub 저장소의 README 파일 조회
  - 응답: GithubReadmeResponse 객체

  ```typescript
  interface GithubReadmeResponse {
    name: string;
    path: string;
    content: string;
  }
  ```

- `GET /api/github/{owner}/{repo}/contents/{path?}`
  - GitHub 저장소의 콘텐츠 조회
  - 응답: GithubContentItem[] 배열
  ```typescript
  interface GithubContentItem {
    name: string;
    path: string;
    type: string;
  }
  ```

## 개발 계획

1. **1단계**: 프론트엔드 UI 및 Mock API 구현

   - 모든 페이지 UI 완성
   - Mock 데이터를 활용한 기능 시연

2. **2단계**: 백엔드 API 개발

   - 실제 데이터 저장 및 조회 기능
   - GitHub API 연동
   - 인증/인가 시스템

3. **3단계**: 관리자 기능 및 고급 기능 추가
   - 관리자 대시보드
   - 통계 및 분석 기능
   - 사용자 피드백 시스템

## UI/UX 고려사항

- 다크 테마 기본 제공
- 반응형 디자인으로 모바일/태블릿/데스크톱 지원
- GitHub 스타일의 UI로 개발자 친화적 경험 제공
- 접근성 고려한 UI 구현

## 개발 상태

현재 모든 API는 목업 데이터를 반환하도록 구현되어 있습니다. 실제 API 연동을 위해서는 각 서비스의 주석 처리된 코드를 활성화해야 합니다.

### 인증

현재는 개발 단계로 인증이 구현되어 있지 않습니다. 향후 다음과 같은 인증 방식이 추가될 예정입니다:

- GitHub OAuth 인증
- API 키 기반 인증

### 에러 처리

모든 API는 다음과 같은 형식으로 에러를 반환합니다:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": {} // 추가 에러 정보 (옵션)
  }
}
```

### 환경 변수

필요한 환경 변수:

- `NEXT_PUBLIC_API_URL`: API 서버 기본 URL
- `NEXT_PUBLIC_APP_ENV`: 실행 환경 (development/test/production)
- `NEXT_PUBLIC_IMAGE_BASE_URL`: 이미지 서비스 기본 URL
- `GITHUB_TOKEN`: GitHub API 토큰 (선택사항)
