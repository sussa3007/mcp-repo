"use client";

// 다양한 컬러 스키마 정의

export interface ColorScheme {
  name: string;
  prose: string;
  codeHighlightTheme: string;
}

export const darkIndigo: ColorScheme = {
  name: "darkIndigo",
  prose: `
    prose-headings:text-white 
    prose-h1:text-purple-100 
    prose-h2:border-b prose-h2:border-purple-900/50 prose-h2:pb-2 
    prose-p:text-zinc-300 
    prose-a:text-purple hover:prose-a:text-purple-light
    prose-code:text-purple
    prose-pre:bg-zinc-900
  `,
  codeHighlightTheme: "vscDarkPlus"
};

export const darkPurple: ColorScheme = {
  name: "darkPurple",
  prose: `
    prose-headings:text-white prose-headings:font-semibold
    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
    prose-p:text-zinc-300 prose-a:text-purple-400 hover:prose-a:text-purple-300
    prose-strong:text-white prose-code:text-purple-300
    prose-li:text-zinc-300 prose-li:marker:text-purple-400
    prose-blockquote:border-purple-500 prose-blockquote:bg-zinc-800/50
    prose-th:bg-zinc-800 prose-th:text-white prose-td:border-zinc-700
  `,
  codeHighlightTheme: "atomDark"
};

export const darkBlue: ColorScheme = {
  name: "darkBlue",
  prose: `
    prose-headings:text-white prose-headings:font-semibold
    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
    prose-p:text-zinc-300 prose-a:text-blue-400 hover:prose-a:text-blue-300
    prose-strong:text-white prose-code:text-blue-300
    prose-li:text-zinc-300 prose-li:marker:text-blue-400
    prose-blockquote:border-blue-500 prose-blockquote:bg-zinc-800/50
    prose-th:bg-zinc-800 prose-th:text-white prose-td:border-zinc-700
  `,
  codeHighlightTheme: "nord"
};

export const darkGreen: ColorScheme = {
  name: "darkGreen",
  prose: `
    prose-headings:text-white prose-headings:font-semibold
    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
    prose-p:text-zinc-300 prose-a:text-emerald-400 hover:prose-a:text-emerald-300
    prose-strong:text-white prose-code:text-emerald-300
    prose-li:text-zinc-300 prose-li:marker:text-emerald-400
    prose-blockquote:border-emerald-500 prose-blockquote:bg-zinc-800/50
    prose-th:bg-zinc-800 prose-th:text-white prose-td:border-zinc-700
  `,
  codeHighlightTheme: "materialDark"
};

export const colorSchemes: Record<string, ColorScheme> = {
  darkIndigo,
  darkPurple,
  darkBlue,
  darkGreen
};

export const defaultColorScheme = darkPurple;
