import config from "@/lib/config";
import { ApiResponse, ApiResponseBuilder } from "@/types/api";
import { removeToken } from "@/lib/auth";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errorCode?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * API 호출을 위한 기본 서비스 클래스
 */
export class ApiService {
  private baseUrl: string;

  constructor(path: string = "") {
    this.baseUrl = `${config.apiBaseUrl}/api/v1${path ? `/${path}` : ""}`;
  }

  /**
   * API 엔드포인트 URL 생성
   */
  protected getUrl(endpoint: string = ""): string {
    return `${this.baseUrl}${endpoint ? `${endpoint}` : ""}`;
  }

  /**
   * 403 에러 처리
   */
  private handle403Error() {
    removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  /**
   * 응답 처리 및 에러 변환
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      let errorMessage = "An error occurred";
      let errorCode: number | undefined;

      if (isJson) {
        const errorData = await response.json();
        if (response.status === 403) {
          errorMessage = "Please sign in to continue";
        } else {
          errorMessage =
            this.translateErrorMessage(errorData.message) || errorMessage;
        }
        errorCode = errorData.errorCode;
      } else if (response.status === 403) {
        errorMessage = "Please sign in to continue";
      }

      throw new ApiError(response.status, errorMessage, errorCode);
    }

    if (!isJson) {
      throw new Error("Invalid response format");
    }

    const data = await response.json();
    return data as ApiResponse<T>;
  }

  /**
   * 에러 메시지 번역
   */
  private translateErrorMessage(message: string): string {
    const errorMessages: Record<string, string> = {
      "이메일은 필수입니다.": "Email is required.",
      "유효하지 않은 이메일 형식입니다.": "Invalid email format.",
      "제출 중 오류가 발생했습니다.": "Failed to submit project."
      // 필요한 다른 에러 메시지들을 여기에 추가
    };

    return errorMessages[message] || message;
  }

  /**
   * GET 요청 수행
   */
  protected async get<T>(
    endpoint: string = "",
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = this.getUrl(endpoint);
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("tk-mcp-repo")
        : null;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers
        },
        credentials: "include",
        ...options
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 403) {
          this.handle403Error();
        }
        throw error;
      }
      throw new ApiError(500, "Failed to fetch data from server");
    }
  }

  /**
   * POST 요청 수행
   */
  protected async post<T, D>(
    endpoint: string = "",
    data: D,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = this.getUrl(endpoint);
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("tk-mcp-repo")
        : null;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers
        },
        body: JSON.stringify(data),
        credentials: "include",
        ...options
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {

        throw error;
      }
      throw new ApiError(500, "Failed to send data to server");
    }
  }
}
