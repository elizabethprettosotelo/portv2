"use client";

import { useEffect, useRef } from "react";

/**
 * Observes an element and adds `animClass` (plus optional `delayClass`) to it
 * once it enters the viewport. The element should start with `anim-hidden` class.
 */
export function useInView<T extends HTMLElement>(
  animClass: string,
  delayClass?: string,
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("anim-hidden");
          el.classList.add(animClass);
          if (delayClass) el.classList.add(delayClass);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animClass, delayClass, options]);

  return ref;
}
