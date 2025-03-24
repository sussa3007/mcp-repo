type ImageCategory = "client" | "server" | "usecase" | "hero" | "logo" | "misc";

interface ImageInfo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  category: ImageCategory;
}

// 로컬 이미지에 대한 정보를 관리하는 객체
export const localImages: Record<string, ImageInfo> = {
  hero: {
    src: "/images/hero-image.jpg",
    alt: "MCP 히어로 이미지",
    width: 1200,
    height: 600,
    category: "hero"
  },
  logo: {
    src: "/images/logo.png",
    alt: "MCP 로고",
    width: 200,
    height: 200,
    category: "logo"
  },
  client: {
    src: "/images/client-image.jpg",
    alt: "MCP 클라이언트 이미지",
    width: 600,
    height: 400,
    category: "client"
  },
  server: {
    src: "/images/server-image.jpg",
    alt: "MCP 서버 이미지",
    width: 600,
    height: 400,
    category: "server"
  },
  usecase: {
    src: "/images/usecase-image.jpg",
    alt: "MCP 유스케이스 이미지",
    width: 600,
    height: 400,
    category: "usecase"
  }
};

// 이미지 경로 가져오기
export function getImagePath(path: string): string {
  // 이미 외부 URL인 경우 그대로 반환
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // 로컬 이미지 키를 통해 접근할 경우
  if (localImages[path]) {
    return localImages[path].src;
  }

  // 경로가 /로 시작하지 않으면 /를 추가
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  // 이미지가 /images/로 시작하지 않으면 /images/ 경로 추가
  if (!path.startsWith("/images/")) {
    if (path.startsWith("/")) {
      path = `/images${path}`;
    } else {
      path = `/images/${path}`;
    }
  }

  return path;
}

// 이미지 키로 정보 가져오기
export function getImageInfo(key: string): ImageInfo | null {
  return localImages[key] || null;
}

// 카테고리별 이미지 가져오기
export function getImagesByCategory(category: ImageCategory): ImageInfo[] {
  return Object.values(localImages).filter((img) => img.category === category);
}

// 이미지 플레이스홀더 생성 함수
export function getPlaceholderImage(
  width: number,
  height: number,
  text: string = "Image"
): string {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(
    text
  )}`;
}
