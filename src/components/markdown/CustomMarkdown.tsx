"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import {
  createMarkdownConfig,
  CodeThemeName,
  MarkdownConfig
} from "./markdown-config";
import { colorSchemes, defaultColorScheme, ColorScheme } from "./color-schemes";

// 컴포넌트 타입에 대한 인터페이스
interface CodeComponentProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

interface CustomMarkdownProps {
  children: string;
  className?: string;
  config?: Partial<MarkdownConfig>;
  codeTheme?: CodeThemeName;
  colorScheme?: string;
}

// 전역 스타일 추가 (한번만 실행되도록)
const GlobalStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
      .repo-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 1.5rem 0;
        padding: 0.75rem 1rem;
        background-color: rgba(39, 39, 42, 0.5);
        border: 1px solid rgba(63, 63, 70, 0.5);
        border-radius: 0.5rem;
      }
      
      .repo-stat {
        display: inline-flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 500;
        color: #e4e4e7;
      }
      
      .repo-stat:hover {
        color: #a5b4fc;
      }
    `
    }}
  />
);

const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
  children,
  className = "",
  config = {},
  codeTheme,
  colorScheme = "darkIndigo"
}) => {
  // 컬러 스키마 적용
  const scheme = colorSchemes[colorScheme] || defaultColorScheme;

  // 설정 병합
  const markdownConfig = createMarkdownConfig({
    ...config,
    ...(codeTheme
      ? {
          codeTheme: require("react-syntax-highlighter/dist/cjs/styles/prism")[
            codeTheme
          ]
        }
      : {
          codeTheme: require("react-syntax-highlighter/dist/cjs/styles/prism")[
            scheme.codeHighlightTheme as CodeThemeName
          ]
        })
  });

  const {
    codeTheme: syntaxTheme,
    showLineNumbers,
    linkTarget,
    proseTailwindClasses
  } = markdownConfig;

  // 프로즈 클래스 계산
  const proseClasses = `prose prose-invert prose-zinc max-w-none ${scheme.prose}`;

  return (
    <div className={`${proseClasses} ${className}`}>
      <GlobalStyles />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          code({
            node,
            inline,
            className,
            children,
            ...props
          }: CodeComponentProps) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                // @ts-ignore - 타입 문제 잠시 무시
                style={syntaxTheme}
                language={match[1]}
                PreTag="div"
                className="rounded-md border border-zinc-700 !bg-zinc-800/70 my-4"
                showLineNumbers={showLineNumbers}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-zinc-800 px-1 py-0.5 rounded text-purple font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          a({ node, ...props }: CodeComponentProps) {
            return (
              <a
                className="text-purple hover:text-purple-light underline transition-colors"
                target={linkTarget}
                rel={
                  linkTarget === "_blank" ? "noopener noreferrer" : undefined
                }
                {...props}
              />
            );
          },
          table({ node, ...props }: CodeComponentProps) {
            return (
              <div className="overflow-x-auto my-8">
                <table className="border border-zinc-700 w-full" {...props} />
              </div>
            );
          },
          th({ node, ...props }: CodeComponentProps) {
            return (
              <th
                className="border border-zinc-700 px-4 py-2 bg-zinc-800 text-white"
                {...props}
              />
            );
          },
          td({ node, ...props }: CodeComponentProps) {
            return (
              <td className="border border-zinc-700 px-4 py-2" {...props} />
            );
          },
          blockquote({ node, ...props }: CodeComponentProps) {
            return (
              <blockquote
                className="border-l-4 border-purple bg-zinc-800/50 pl-4 py-1 my-4 rounded-sm"
                {...props}
              />
            );
          },
          ul({ node, ...props }: CodeComponentProps) {
            return <ul className="list-disc pl-6 my-4 space-y-2" {...props} />;
          },
          ol({ node, ...props }: CodeComponentProps) {
            return (
              <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
            );
          },
          img({ node, ...props }: CodeComponentProps) {
            return (
              <div className="my-6">
                <Image 
                  className="rounded-md w-full" 
                  width={1000}
                  height={600}
                  style={{ width: '100%', height: 'auto' }}
                  alt={props.alt || "Markdown content image"}
                  src={props.src || ""}
                />
              </div>
            );
          }
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default CustomMarkdown;
