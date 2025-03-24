import { ApiService } from "./api-service";
import config from "@/lib/config";

// GitHub API 응답 타입 정의
export interface GithubReadmeResponse {
  name: string;
  path: string;
  content: string;
}

export interface GithubContentItem {
  name: string;
  path: string;
  type: string;
}

class GithubService extends ApiService {
  constructor() {
    super("github");
  }

  /**
   * GitHub 저장소 README 가져오기
   */
  async getGithubReadme(
    owner: string,
    repo: string
  ): Promise<GithubReadmeResponse> {
    // 실제 API 연동 시 아래 주석 해제
    // const url = `${config.github.apiUrl}/repos/${owner}/${repo}/readme`;
    // const options = config.github.token
    //   ? { headers: { 'Authorization': `token ${config.github.token}` } }
    //   : {};
    // return await this.get<GithubReadmeResponse>(`${owner}/${repo}/readme`, options);

    // 현재는 목업 데이터 반환
    return {
      name: "README.md",
      path: "README.md",
      content: Buffer.from(
        `# ${repo}

<div class="repo-stats">
  <span class="repo-stat">⭐ Stars: ${
    repo === "mcp-server" ? "1800" : "1200"
  }</span>
  <span class="repo-stat">🍴 Forks: ${
    repo === "mcp-server" ? "450" : "350"
  }</span>
  <span class="repo-stat">🐛 Issues: ${
    repo === "mcp-server" ? "24" : "18"
  }</span>
</div>

## Introduction
This project is an implementation of the MCP(Model Context Protocol) ${
          repo === "mcp-server" ? "server" : "client"
        } called ${repo}.

## Installation
\`\`\`bash
npm install ${repo}
\`\`\`

## Usage
\`\`\`typescript
import { MCP } from '${repo}';

// Initialize
const mcp = new MCP({
  // Configuration
});

// Connect
await mcp.connect();
\`\`\`

## Features
- Fast performance
- Reliable connection
- Multi-platform support
- Extensible architecture

## License
MIT License
`
      ).toString("base64")
    };
  }

  /**
   * GitHub 저장소 내용 가져오기
   */
  async getGithubContents(
    owner: string,
    repo: string,
    path: string = ""
  ): Promise<GithubContentItem[]> {
    // 실제 API 연동 시 아래 주석 해제
    // const url = `${config.github.apiUrl}/repos/${owner}/${repo}/contents/${path}`;
    // const options = config.github.token
    //   ? { headers: { 'Authorization': `token ${config.github.token}` } }
    //   : {};
    // return await this.get<GithubContentItem[]>(`${owner}/${repo}/contents/${path}`, options);

    // 현재는 목업 데이터 반환
    return [
      {
        name: "src",
        path: "src",
        type: "dir"
      },
      {
        name: "package.json",
        path: "package.json",
        type: "file"
      },
      {
        name: "README.md",
        path: "README.md",
        type: "file"
      },
      {
        name: "LICENSE",
        path: "LICENSE",
        type: "file"
      },
      {
        name: "tsconfig.json",
        path: "tsconfig.json",
        type: "file"
      },
      {
        name: ".gitignore",
        path: ".gitignore",
        type: "file"
      }
    ];
  }
}

// 서비스 인스턴스 생성
const githubService = new GithubService();

// 기존 함수명을 유지하면서 서비스 메서드 export
export const getGithubReadme = (owner: string, repo: string) =>
  githubService.getGithubReadme(owner, repo);

export const getGithubContents = (owner: string, repo: string, path?: string) =>
  githubService.getGithubContents(owner, repo, path);
