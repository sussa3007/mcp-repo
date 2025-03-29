// 소셜 로그인 타입
export type SocialType = "GOOGLE" | "GITHUB" | "EMAIL";

// 사용자 역할
export type Role = "USER" | "ADMIN";

export interface User {
  id: number;
  name: string;
  email: string;
  imageUrl?: string;
  socialType: SocialType;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
