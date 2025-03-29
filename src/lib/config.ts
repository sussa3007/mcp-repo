/**
 * 애플리케이션 환경 변수 및 설정을 관리하는 중앙 설정 파일
 */

export const config = {
  // API 기본 URL (환경 변수에서 가져오기)
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",

  // 실행 환경 (개발/테스트/프로덕션)
  env: process.env.NEXT_PUBLIC_APP_ENV || "development",

  github: {
    apiUrl: "https://api.github.com",
    token: process.env.GITHUB_TOKEN
  },

  // 이미지 서비스 관련 설정
  images: {
    baseUrl: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "/assets/images"
  }
};

// 환경 확인 헬퍼 함수들
export const isDevelopment = () => config.env === "development";
export const isProduction = () => config.env === "production";
export const isTest = () => config.env === "test";

// 설정 파일 내보내기
export default config;
