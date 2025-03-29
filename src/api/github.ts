import { ApiService } from "./api-service";
import config from "@/lib/config";

// GitHub API 응답 타입 정의
export interface GithubReadmeResponse {
  name: string;
  path: string;
  content: string;
  encoding?: string;
  size?: number;
  url?: string;
  html_url?: string;
  download_url?: string;
}

export interface GithubContentItem {
  name: string;
  path: string;
  type: string;
  size?: number;
  url?: string;
  html_url?: string;
  download_url?: string | null;
}

export interface GithubFileContent {
  type: string;
  encoding?: string;
  size?: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  git_url?: string;
  html_url?: string;
  download_url?: string;
}

export class GithubService extends ApiService {
  private headers: Record<string, string>;

  constructor() {
    super();
    this.headers = {
      Accept: "application/vnd.github.v3+json",
      ...(config.github.token
        ? { Authorization: `token ${config.github.token}` }
        : {})
    };
  }

  /**
   * GitHub 저장소 README 가져오기
   */
  async getGithubReadme(
    owner: string,
    repo: string
  ): Promise<GithubReadmeResponse> {
    try {
      const response = await fetch(
        `${config.github.apiUrl}/repos/${owner}/${repo}/readme`,
        { headers: this.headers }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("README not found");
        }
        throw new Error(`Failed to fetch README: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching GitHub README:", error);
      throw error;
    }
  }

  /**
   * GitHub 저장소 내용 가져오기
   */
  async getGithubContents(
    owner: string,
    repo: string,
    path: string = ""
  ): Promise<GithubContentItem[]> {
    try {
      const response = await fetch(
        `${config.github.apiUrl}/repos/${owner}/${repo}/contents/${path}`,
        { headers: this.headers }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Repository contents not found");
        }
        throw new Error(`Failed to fetch contents: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching GitHub contents:", error);
      throw error;
    }
  }

  async getFileContent(
    owner: string,
    repo: string,
    path: string
  ): Promise<GithubFileContent> {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        { headers: this.headers }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("파일을 찾을 수 없습니다.");
        }
        throw new Error("파일 내용을 가져오는데 실패했습니다.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("GitHub API 파일 내용 조회 실패:", error);
      throw error;
    }
  }

  async getDirectoryContents(
    owner: string,
    repo: string,
    path: string = ""
  ): Promise<GithubFileContent[]> {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        { headers: this.headers }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("디렉토리를 찾을 수 없습니다.");
        }
        throw new Error("디렉토리 내용을 가져오는데 실패했습니다.");
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error("GitHub API 디렉토리 내용 조회 실패:", error);
      throw error;
    }
  }
}

// 서비스 인스턴스 생성
const githubService = new GithubService();

// 기존 함수명을 유지하면서 서비스 메서드 export
export const getGithubReadme = (owner: string, repo: string) =>
  githubService.getGithubReadme(owner, repo);

export const getGithubContents = (owner: string, repo: string, path?: string) =>
  githubService.getGithubContents(owner, repo, path);

export const getFileContent = (owner: string, repo: string, path: string) =>
  githubService.getFileContent(owner, repo, path);

export const getDirectoryContents = (
  owner: string,
  repo: string,
  path?: string
) => githubService.getDirectoryContents(owner, repo, path);
