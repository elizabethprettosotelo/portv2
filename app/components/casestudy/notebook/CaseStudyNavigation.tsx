"use client";

import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.15, 0.25, 0.4, 0.65],
      }
    );

    const observed = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    observed.forEach((element) => observer.observe(element));

    return () => {
      observed.forEach((element) => observer.unobserve(element));
      observer.disconnect();
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
      className="sticky top-16 md:top-4 z-40 w-full border-y border-[#E5B1A4]/45 bg-[#E5B1A4]/18 backdrop-blur-[2px]"
    >
      <div className="overflow-x-auto px-3 py-3 md:px-4">
        <div className="flex min-w-max items-center gap-2">
          {items.map((item, index) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`inline-flex items-center gap-2 border-b px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B1A4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EDE2] ${
                  isActive
                    ? "border-[#45140C]/20 bg-[#E5B1A4]/34 text-[#45140C]"
                    : "border-transparent bg-transparent text-[#45140C]/60 hover:border-[#45140C]/20 hover:text-[#45140C]"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em] font-mono">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
