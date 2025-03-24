import config from "@/lib/config";

/**
 * API 호출을 위한 기본 서비스 클래스
 */
export class ApiService {
  private baseUrl: string;

  constructor(path: string = "") {
    this.baseUrl = `${config.apiBaseUrl}${path ? `/${path}` : ""}`;
  }

  /**
   * API 엔드포인트 URL 생성
   */
  protected getUrl(endpoint: string = ""): string {
    return `${this.baseUrl}${endpoint ? `/${endpoint}` : ""}`;
  }

  /**
   * GET 요청 수행
   */
  protected async get<T>(endpoint: string = "", options = {}): Promise<T> {
    const url = this.getUrl(endpoint);

    // 현재는 목업 데이터를 사용하므로 실제 호출하지 않음
    // 실제 API를 호출할 때는 아래 주석을 해제하여 사용
    /*
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    return await response.json();
    */

    console.log(`[GET] ${url} - API는 현재 목업 데이터를 사용 중입니다.`);
    return {} as T;
  }

  /**
   * POST 요청 수행
   */
  protected async post<T, D>(
    endpoint: string = "",
    data: D,
    options = {}
  ): Promise<T> {
    const url = this.getUrl(endpoint);

    // 현재는 목업 데이터를 사용하므로 실제 호출하지 않음
    // 실제 API를 호출할 때는 아래 주석을 해제하여 사용
    /*
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...options
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    return await response.json();
    */

    console.log(
      `[POST] ${url} - API는 현재 목업 데이터를 사용 중입니다.`,
      data
    );
    return {} as T;
  }
}
