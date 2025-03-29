import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll(callback: () => void) {
  const [isIntersecting, setIntersecting] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(callback);
  const isLoadingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !isLoadingRef.current) {
          isLoadingRef.current = true;

          // 이전 타임아웃이 있다면 취소
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          // 새로운 타임아웃 설정
          timeoutRef.current = setTimeout(() => {
            if (isLoadingRef.current) {
              Promise.resolve(callbackRef.current()).finally(() => {
                isLoadingRef.current = false;
                timeoutRef.current = undefined;
              });
            }
          }, 100); // 약간의 지연을 추가하여 상태 업데이트가 완료될 시간을 줌
        }
      },
      {
        rootMargin: "50px"
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { observerRef, isIntersecting };
}
