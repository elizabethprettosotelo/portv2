"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useHover } from "../contexts/HoverContext";

type ProjectLink = {
  label: string;
  href: string;
  /** "github" | "devpost" | "demo" | "figma" | "custom" */
  kind: "github" | "devpost" | "demo" | "figma" | "custom";
};

type Project = {
  title: string;
  blurb: string;
  thumbnail: string;
  gif: string;
  video?: string;
  tags: string[];
  slug: string;
  links?: ProjectLink[];
  noTint?: boolean;
};

const LINK_CONFIG: Record<
  ProjectLink["kind"],
  { label: string; icon: string; bg: string; text: string; hoverBg: string }
> = {
  github:  { label: "GitHub",  icon: "⌥", bg: "bg-[#45140C]/8",  text: "text-[#45140C]", hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]" },
  devpost: { label: "Devpost", icon: "◈", bg: "bg-[#45140C]/8",  text: "text-[#45140C]", hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]" },
  demo:    { label: "Demo",    icon: "▶", bg: "bg-[#B5AD21]/15", text: "text-[#45140C]", hoverBg: "hover:bg-[#B5AD21] hover:text-[#45140C]"  },
  figma:   { label: "Figma",  icon: "✦", bg: "bg-[#E5B1A4]/20", text: "text-[#45140C]", hoverBg: "hover:bg-[#E5B1A4] hover:text-[#45140C]"  },
  custom:  { label: "",       icon: "→", bg: "bg-[#45140C]/8",  text: "text-[#45140C]", hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]"  },
};

const projects: Project[] = [
  {
    title: "Conduit",
    blurb: "Multimodal accessibility platform that unifies EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface built in 36 hours.",
    thumbnail: "/conduit/conduitthumb.jpg",
    gif: "/project1.gif",
    video: "/conduit/conduitlaunch.mp4",
    tags: ["Accessibility", "UX Design", "Multimodal Design"],
    slug: "project-one",
    links: [
      { label: "GitHub",  href: "https://github.com/elizabethprettosotelo", kind: "github"  },
      { label: "Devpost", href: "https://devpost.com",                       kind: "devpost" },
      { label: "Figma",   href: "https://figma.com",                         kind: "figma"   },
    ],
  },
  {
    title: "Labeling",
    blurb: "Redesigned Materia's image labeling widget with full WCAG 2.1 AA compliance, responsive layouts, and modern UI for 50,000+ students.",
    thumbnail: "/labeling/thumbnail.png",
    gif: "/project2.gif",
    video: "/labeling/thumbnail.mp4",
    tags: ["UI Redesign", "Accessibility", "Higher Education"],
    slug: "project-two",
    noTint: true,
    links: [
      { label: "GitHub", href: "https://github.com/elizabethprettosotelo", kind: "github" },
      { label: "Figma",  href: "https://figma.com",                        kind: "figma"  },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const { hoveredProject, setHoveredProject } = useHover();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const isHighlighted = hoveredProject === project.slug;

  const handleMouseEnter = () => {
    setHoveredProject(project.slug);
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={`relative bg-[#F3EDE2] rounded-xl shadow-md overflow-hidden w-full max-w-3xl transition-all duration-300 ${
        isHighlighted ? 'shadow-[0_4px_12px_rgba(229,177,164,0.4)]' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image/Video/GIF */}
      <div className="relative w-full h-112">
        {/* Thumbnail — always visible underneath */}
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
        />
        {/* Brown tint overlay */}
        {!project.noTint && (
          <div className="absolute inset-0 bg-[#45140C]/20 z-10" />
        )}
        {/* Video — fades in on top, thumbnail stays visible beneath */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        {/* GIF fallback for non-video projects */}
        {!project.video && (
          <Image
            src={project.gif}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-500 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            unoptimized
          />
        )}
      </div>

      {/* Card content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-[#45140C]/10 text-[#45140C] font-normal font-inter"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-[#45140C] font-formadjr mb-2">{project.title}</h3>
        <p className="text-[#45140C]/65 text-base font-inter leading-relaxed">{project.blurb}</p>

        {/* Links row */}
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
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
                  {link.label || cfg.label}
                </a>
              );
            })}
            <Link
              href={`/projects/${project.slug}`}
              className="ml-auto text-sm font-medium text-[#45140C] underline underline-offset-4 hover:text-[#B5AD21] transition font-formadjr"
            >
              Read case study →
            </Link>
          </div>
        )}

        {/* Fallback: no links, just the case study link */}
        {(!project.links || project.links.length === 0) && (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-block mt-4 text-sm font-medium text-[#45140C] underline underline-offset-4 hover:text-[#B5AD21] transition font-formadjr"
          >
            Read case study →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="w-full py-16 px-4 bg-[#F3EDE2]">
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-[#45140C] font-formadjr text-left">Selected Projects</h2>
        <p className="text-lg text-[#45140C]/70 font-inter mt-2 text-left">look at all these things i&apos;ve been cooking up ✦</p>
      </div>

      {/* Timeline layout */}
      <div className="relative flex flex-col items-center gap-0 max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#B5AD21]" style={{ left: "-2rem" }} />

        {projects.map((project) => (
          <div key={project.slug} id={project.slug} className="relative w-full mb-12">
            {/* Node on the line */}
            <div
              className="absolute w-3 h-3 rounded-full bg-[#B5AD21] border-2 border-[#F3EDE2]"
              style={{ left: "-2.375rem", top: "50%", transform: "translateY(-50%)" }}
            />
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* View all projects button */}
      <div className="flex justify-center mt-4">
        <Link
          href="/projects"
          className="px-8 py-3 bg-[#45140C] text-[#F3EDE2] rounded font-formadjr font-medium text-lg hover:bg-[#B5AD21] transition"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
}

