"use client";

import Image from "next/image";
import { useEffect } from "react";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "devpost" | "demo" | "figma" | "custom";
};

export const LINK_CONFIG: Record<
  ProjectLink["kind"],
  { icon: string; bg: string; text: string; hoverBg: string }
> = {
  github:  { icon: "⌥", bg: "bg-[#45140C]/8",  text: "text-[#45140C]", hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]" },
  devpost: { icon: "◈", bg: "bg-[#45140C]/8",  text: "text-[#45140C]", hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]" },
  demo:    { icon: "▶", bg: "bg-[#B5AD21]/15", text: "text-[#45140C]", hoverBg: "hover:bg-[#B5AD21] hover:text-[#45140C]"  },
  figma:   { icon: "✦", bg: "bg-[#E5B1A4]/20", text: "text-[#45140C]", hoverBg: "hover:bg-[#E5B1A4] hover:text-[#45140C]"  },
  custom:  { icon: "→", bg: "bg-[#45140C]/8",  text: "text-[#45140C]", hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]"  },
};

export type ProjectOverview = {
  role?: string;
  timeline?: string;
  tools?: string[];
  summary: string;
  status?: "complete" | "in-progress";
};

export type QuickLookProject = {
  title: string;
  blurb: string;
  thumbnail: string;
  tags: string[];
  links?: ProjectLink[];
  overview?: ProjectOverview;
};

export default function QuickLookModal({
  project,
  onClose,
}: {
  project: QuickLookProject;
  onClose: () => void;
}) {
  const ov = project.overview;

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    /* Backdrop — dims + blurs the page behind */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#45140C]/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease]"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={`Quick look: ${project.title}`}
    >
      {/* Dialog panel — pops in from slightly below */}
      <div
        className="relative bg-[#F3EDE2] rounded-2xl shadow-[0_24px_60px_rgba(69,20,12,0.25)] w-full max-w-2xl overflow-hidden animate-[dialogIn_0.18s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Thumbnail header ── */}
        <div className="relative w-full h-64">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
          {/* Subtle dark gradient so text is readable */}
          <div className="absolute inset-0 bg-linear-to-t from-[#45140C]/60 via-[#45140C]/10 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#F3EDE2]/90 hover:bg-[#F3EDE2] text-[#45140C] flex items-center justify-center text-base font-bold transition shadow-md"
            aria-label="Close"
          >
            ×
          </button>

          {/* Status badge */}
          {ov?.status && (
            <span className={`absolute bottom-3 left-4 text-xs font-bold font-formadjr px-2.5 py-0.5 rounded-full ${
              ov.status === "in-progress"
                ? "bg-[#E5B1A4] text-[#45140C]"
                : "bg-[#B5AD21] text-[#45140C]"
            }`}>
              {ov.status === "in-progress" ? "In Progress" : "Complete"}
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="p-7">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-[#45140C]/10 text-[#45140C] font-inter"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-[#45140C] font-formadjr mb-1">
            {project.title}
          </h2>

          {/* Role + timeline */}
          {ov && (ov.role || ov.timeline) && (
            <div className="flex flex-wrap gap-4 text-sm text-[#45140C]/55 font-inter mb-3">
              {ov.role     && <span>✦ {ov.role}</span>}
              {ov.timeline && <span>◷ {ov.timeline}</span>}
            </div>
          )}

          {/* Summary */}
          <p className="text-base text-[#45140C]/70 font-inter leading-relaxed mb-5">
            {ov?.summary ?? project.blurb}
          </p>

          {/* Tools */}
          {ov?.tools && ov.tools.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {ov.tools.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full bg-[#45140C]/8 text-[#45140C] border border-[#45140C]/10 font-inter"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* External links */}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#45140C]/10">
              {project.links.map((link) => {
                const cfg = LINK_CONFIG[link.kind];
                return (
                  <a
                    key={link.label + link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-inter border border-[#45140C]/12 transition-all duration-200 ${cfg.bg} ${cfg.text} ${cfg.hoverBg}`}
                  >
                    <span>{cfg.icon}</span>
                    {link.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
