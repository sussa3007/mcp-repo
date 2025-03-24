"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  fallbackSrc?: string;
};

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  onLoad,
  fallbackSrc,
  ...props
}: ImageProps &
  Omit<
    React.ComponentProps<typeof Image>,
    "src" | "alt" | "width" | "height" | "className" | "priority" | "onLoad"
  >) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  const imageSrc = error && fallbackSrc ? fallbackSrc : src;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
        </div>
      )}
    </div>
  );
}

// 이미지 경로에 대한 헬퍼 함수
export function getImagePath(path: string): string {
  // 이미 외부 URL인 경우 그대로 반환
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
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
