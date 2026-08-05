"use client";

import { useEffect, useMemo, useState } from "react";
import { useProjectSections } from "../../contexts/ProjectSectionsContext";

type RailItem = {
  id: string;
  label: string;
  ids: string[];
};

const SECTION_GROUPS = [
  { label: "Overview", ids: ["overview"] },
  { label: "Define", ids: ["problem"] },
  { label: "Ideation", ids: ["personas", "research", "insights"] },
  { label: "Prototyping", ids: ["comparison", "prototype", "solution"] },
  { label: "Outcomes", ids: ["results", "takeaways"] },
] as const;

export default function CaseStudyStatusRail() {
  const { sections } = useProjectSections();
  const [activeSectionId, setActiveSectionId] = useState<string>("overview");

  const items = useMemo<RailItem[]>(() => {
    const mapped: RailItem[] = [];

    for (const group of SECTION_GROUPS) {
      const sectionId = group.ids.find((id) => sections.some((entry) => entry.id === id));
      if (!sectionId) continue;
      mapped.push({ id: sectionId, label: group.label, ids: [...group.ids] });
    }

    return mapped;
  }, [sections]);

  useEffect(() => {
    const updateActiveSection = () => {
      const offset = 160;
      let currentId = items[0]?.id ?? "overview";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        if (window.scrollY >= top) {
          currentId = section.id;
        }
      }

      setActiveSectionId(currentId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [items, sections]);

  const activeLabel =
    items.find((item) => item.ids.includes(activeSectionId))?.label ?? "Overview";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="lg:sticky lg:top-28 self-start">
      <div className="hidden lg:flex flex-col items-start gap-3">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-[#45140C]/45 font-mono">
          <span className="inline-block h-2 w-2 rounded-full bg-[#B5AD21]" />
          Status
        </div>

        <div className="relative pl-4">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-[#45140C]/15" />
          <div className="space-y-3">
            {items.map((item) => {
              const isActive = item.ids.includes(activeSectionId);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center gap-3 text-left transition-colors duration-200 ${
                    isActive ? "text-[#45140C]" : "text-[#45140C]/45 hover:text-[#45140C]/75"
                  }`}
                >
                  <span
                    className={`relative z-10 block h-2.5 w-2.5 rounded-full border transition-all duration-200 ${
                      isActive
                        ? "bg-[#B5AD21] border-[#B5AD21] scale-110"
                        : "bg-[#F3EDE2] border-[#45140C]/20"
                    }`}
                  />
                  <span className={`text-sm font-medium font-formadjr ${isActive ? "" : ""}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 text-[10px] font-mono uppercase tracking-[0.24em] text-[#45140C]/35">
          {activeLabel}
        </div>
      </div>

      <div className="flex lg:hidden gap-2 overflow-x-auto pb-2">
        {items.map((item) => {
          const isActive = item.ids.includes(activeSectionId);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium font-formadjr transition-colors ${
                isActive
                  ? "border-[#B5AD21] bg-[#B5AD21]/15 text-[#45140C]"
                  : "border-[#45140C]/10 bg-[#FDFAF7] text-[#45140C]/55"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
