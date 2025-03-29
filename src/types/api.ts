export interface PageInfo {
  totalElements: number; // Total number of items
  totalPages: number; // Total number of pages
  pageNumber: number; // Current page number (0-based)
  pageSize: number; // Page size
  numberOfElements: number; // Number of items in the current page
  first: boolean; // Whether this is the first page
  last: boolean; // Whether this is the last page
  empty: boolean; // Whether the data is empty
}

export interface ApiResponse<T> {
  statusCode: number;
  status: "SUCCESS" | "FAILED";
  data: T | null;
  message: string;
  errorCode?: number;
  pageInfo?: PageInfo;
}

export class ApiResponseBuilder {
  // 성공 응답 생성 메서드
  static success<T>(data: T, message: string): ApiResponse<T> {
    return {
      statusCode: 200,
      status: "SUCCESS",
      data,
      message
    };
  }

  // 성공 응답 생성 메서드 (상태 코드 지정)
  static successWithCode<T>(
    data: T,
    message: string,
    statusCode: number
  ): ApiResponse<T> {
    return {
      statusCode,
      status: "SUCCESS",
      data,
      message
    };
  }

  // Page 타입 데이터용 성공 응답 생성 메서드
  static successWithPage<T>(
    data: T,
    pageInfo: PageInfo,
    message: string
  ): ApiResponse<T> {
    return {
      statusCode: 200,
      status: "SUCCESS",
      data,
      message,
      pageInfo
    };
  }

  // Page 타입 데이터용 성공 응답 생성 메서드 (상태 코드 지정)
  static successWithPageAndCode<T>(
    data: T,
    pageInfo: PageInfo,
    message: string,
    statusCode: number
  ): ApiResponse<T> {
    return {
      statusCode,
      status: "SUCCESS",
      data,
      message,
      pageInfo
    };
  }

  // 실패 응답 생성 메서드
  static error<T>(
    statusCode: number,
    message: string,
    errorCode?: number
  ): ApiResponse<T> {
    return {
      statusCode,
      status: "FAILED",
      data: null,
      message,
      errorCode
    };
  }
}
