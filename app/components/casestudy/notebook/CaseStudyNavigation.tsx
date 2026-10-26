"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CaseStudySection } from "./types";

type CaseStudyNavigationProps = {
  sections: CaseStudySection[];
};

export default function CaseStudyNavigation({ sections }: CaseStudyNavigationProps) {
  const items = useMemo(
    () =>
      sections.map((section) => ({
        id: section.id,
        label: section.label,
      })),
    [sections]
  );

  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const trackRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Track which section is active by comparing each section's position to a
  // fixed trigger line near the top of the viewport, rather than intersection
  // ratio - sections here are often taller than a full viewport, so a
  // ratio-based observer never crosses its threshold even while the section
  // is clearly the one on screen. The sliding pill indicator is measured in
  // this same pass (rather than a separate effect keyed on activeId) so it
  // can never fall out of sync with which label is actually marked active -
  // a separate effect raced the click-triggered scroll and could reposition
  // the pill a frame behind the text-color/underline update.
  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const triggerLine = 160;
    let rafId = 0;

    const measure = () => {
      rafId = 0;

      let current = elements[0]?.id ?? "";
      for (const el of elements) {
        if (el.getBoundingClientRect().top - triggerLine <= 0) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current);

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);

      const activeButton = buttonRefs.current[current];
      const track = trackRef.current;
      if (activeButton && track) {
        const trackBox = track.getBoundingClientRect();
        const buttonBox = activeButton.getBoundingClientRect();
        setIndicator({ left: buttonBox.left - trackBox.left + track.scrollLeft, width: buttonBox.width });
      }
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, [items]);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-16 md:top-0 z-40 w-full border-b border-[#250D47]/10 bg-[#FFFFFF]"
    >
      <div ref={trackRef} className="relative overflow-x-auto px-3 md:px-6">
        <div
          aria-hidden="true"
          className="absolute bottom-0 top-1.5 rounded-full bg-[#250D47]/6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ left: indicator.left, width: indicator.width }}
        />
        <div className="mx-auto flex w-max min-w-max items-center gap-1">
          {items.map((item, index) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  buttonRefs.current[item.id] = el;
                }}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`relative z-10 inline-flex items-center gap-2 rounded-full px-3.5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9AB1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] ${
                  isActive ? "text-[#250D47]" : "text-[#250D47]/45 hover:text-[#250D47]/80"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.24em] font-mono transition-colors ${
                    isActive ? "text-[#8EB522]" : "text-current"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] font-mono">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#250D47]/6">
        <div
          className="h-full bg-[#8EB522] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </nav>
  );
}


