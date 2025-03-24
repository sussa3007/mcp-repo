"use client";

import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// 타입 정의
type PrismTheme = any;

// 코드 하이라이팅 테마 이름 타입
export type CodeThemeName =
  | "vscDarkPlus"
  | "atomDark"
  | "dracula"
  | "nord"
  | "materialDark";

// 마크다운 설정 인터페이스
export interface MarkdownConfig {
  codeTheme: PrismTheme;
  showLineNumbers: boolean;
  linkTarget: "_blank" | "_self";
  proseTailwindClasses: string;
}

const codeThemes: Record<CodeThemeName, PrismTheme> = {
  vscDarkPlus,
  atomDark,
  dracula,
  nord,
  materialDark
};

// 기본 설정 값
export const defaultMarkdownConfig: MarkdownConfig = {
  codeTheme: vscDarkPlus,
  showLineNumbers: true,
  linkTarget: "_blank",
  proseTailwindClasses: `
    prose prose-invert prose-zinc max-w-none 
    prose-headings:text-white prose-headings:font-semibold
    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
    prose-p:text-zinc-300 prose-a:text-purple hover:prose-a:text-purple-light
    prose-strong:text-white prose-code:text-purple
    prose-li:text-zinc-300 prose-li:marker:text-purple
    prose-blockquote:border-purple prose-blockquote:bg-zinc-800/50 prose-blockquote:px-4 
    prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:rounded-sm
    prose-table:border-collapse prose-th:bg-zinc-800 
    prose-th:text-white prose-td:border-zinc-700
  `
};

// 테마 선택기
export const getCodeTheme = (themeName: CodeThemeName): PrismTheme => {
  return codeThemes[themeName] || vscDarkPlus;
};

// 설정 생성기
export const createMarkdownConfig = (
  config: Partial<MarkdownConfig> = {}
): MarkdownConfig => {
  return {
    ...defaultMarkdownConfig,
    ...config
  };
};
