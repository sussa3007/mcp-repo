import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 날짜 문자열을 포맷팅하는 함수
 * @param dateString ISO 형식의 날짜 문자열
 * @param options Intl.DateTimeFormatOptions
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }
): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", options);
  } catch (error) {
    console.error("날짜 포맷 오류:", error);
    return dateString;
  }
}
