"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useHover } from "../contexts/HoverContext";
import QuickLookModal, { LINK_CONFIG, type ProjectLink, type ProjectOverview } from "./QuickLookModal";
type Project = {
  title: string;
  blurb: string;
  thumbnail: string;
  gif?: string;
  video?: string;
  images: string[];
  tags: string[];
  slug: string;
  featured?: boolean;
  caseStudy?: boolean;
  noTint?: boolean;
  links?: ProjectLink[];
  overview?: ProjectOverview;
};

const allProjects: Project[] = [
  {
    title: "Conduit",
    blurb: "Multimodal accessibility platform that unifies EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface built in 36 hours.",
    thumbnail: "/conduitthumb.jpg",
    gif: "/project1.gif",
    video: "/conduit/conduitlaunch.mp4",
    images: ["/project1-1.jpg", "/project1-2.jpg", "/project1-3.jpg"],
    tags: ["Accessibility", "UX Design", "Multimodal Design"],
    slug: "project-one",
    featured: true,
    caseStudy: true,
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
    noTint: true,
    images: ["/project2-1.jpg", "/project2-2.jpg"],
    tags: ["UI Redesign", "Accessibility", "Higher Education"],
    slug: "project-two",
    featured: true,
    caseStudy: true,
    links: [
      { label: "GitHub", href: "https://github.com/elizabethprettosotelo", kind: "github" },
      { label: "Figma",  href: "https://figma.com",                        kind: "figma"  },
    ],
  },
  {
    title: "Project Three",
    blurb: "A short description of this project. What problem it solved, your role, and what made it interesting.",
    thumbnail: "/project3-thumb.jpg",
    images: ["/project3-1.jpg", "/project3-2.jpg", "/project3-3.jpg"],
    tags: ["Frontend", "Design Systems"],
    slug: "project-three",
    featured: true,
    overview: {
      role: "Designer & Developer",
      timeline: "2 weeks",
      tools: ["Figma", "React"],
      summary: "Add a quick summary here — what the project was, what you made, and why it matters.",
      status: "in-progress",
    },
  },
  {
    title: "Project Four",
    blurb: "An exploration of design patterns and user flows for a complex application.",
    thumbnail: "/project4-thumb.jpg",
    images: ["/project4-1.jpg", "/project4-2.jpg"],
    tags: ["UX Design", "Wireframing"],
    slug: "project-four",
    overview: {
      role: "UX Designer",
      timeline: "3 weeks",
      tools: ["Figma"],
      summary: "Add a quick summary here — what the project was, what you made, and why it matters.",
      status: "complete",
    },
  },
  {
    title: "Project Five",
    blurb: "A comprehensive branding and identity project for a startup company.",
    thumbnail: "/project5-thumb.jpg",
    images: ["/project5-1.jpg"],
    tags: ["Branding", "UI Design"],
    slug: "project-five",
    overview: {
      role: "Brand Designer",
      timeline: "1 month",
      tools: ["Illustrator", "Figma"],
      summary: "Add a quick summary here — what the project was, what you made, and why it matters.",
      status: "complete",
    },
  },
  {
    title: "Project Six",
    blurb: "Responsive web design and development for an e-commerce platform.",
    thumbnail: "/project6-thumb.jpg",
    images: ["/project6-1.jpg", "/project6-2.jpg", "/project6-3.jpg"],
    tags: ["Frontend", "Responsive Design"],
    slug: "project-six",
    overview: {
      role: "Frontend Developer",
      timeline: "6 weeks",
      tools: ["Next.js", "Tailwind"],
      summary: "Add a quick summary here — what the project was, what you made, and why it matters.",
      status: "complete",
    },
  },
];

/* ── Project card ────────────────────────────────────────────────── */
function ProjectCard({
  project,
  onQuickLook,
}: {
  project: Project;
  onQuickLook: (p: Project) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { hoveredProject, setHoveredProject } = useHover();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHighlighted = isHovered || hoveredProject === project.slug;
  const hasCaseStudy = !!project.caseStudy;

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoveredProject(project.slug);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredProject(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCardClick = () => {
    if (hasCaseStudy) {
      router.push(`/projects/${project.slug}`);
    } else {
      onQuickLook(project);
    }
  };

  return (
    <div
      className={`relative bg-[#F3EDE2] rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col ${
        isHighlighted ? "shadow-[0_4px_12px_rgba(229,177,164,0.4)] -translate-y-1" : ""
      }`}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-[#B5AD21] text-[#45140C] text-xs font-bold font-formadjr rounded-full">
          FEATURED
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative w-full h-56 overflow-hidden bg-[#45140C]/5 shrink-0">
        {/* Static thumbnail — always visible underneath */}
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
        />
        {/* Brown tint overlay (skipped if noTint) */}
        {!project.noTint && (
          <div className="absolute inset-0 bg-[#45140C]/20 z-10" />
        )}
        {/* Video — fades in on hover */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-20 ${isHovered ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {/* GIF fallback for non-video projects */}
        {!project.video && project.gif && (
          <Image
            src={project.gif}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-500 z-20 ${isHovered ? "opacity-100" : "opacity-0"}`}
            unoptimized
          />
        )}
        {/* Hover label — sits above everything */}
        <div className={`absolute inset-0 transition-colors duration-300 flex items-center justify-center z-30 ${
          isHighlighted ? "bg-black/10" : "bg-black/0"
        }`}>
          <span className={`text-white text-sm font-medium font-formadjr transition-opacity duration-300 drop-shadow ${
            isHighlighted ? "opacity-100" : "opacity-0"
          }`}>
            {hasCaseStudy ? "View Case Study →" : "Quick Look →"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#45140C]/10 text-[#45140C] font-normal font-inter">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-[#45140C] font-formadjr mb-2">{project.title}</h3>
        <p className="text-[#45140C]/65 text-sm font-inter leading-relaxed line-clamp-2 flex-1">{project.blurb}</p>

        {/* Footer row */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {/* External link pills — stop propagation so they don't trigger card click */}
          {project.links?.map((link) => {
            const cfg = LINK_CONFIG[link.kind];
            return (
              <a
                key={link.label + link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-inter border border-[#45140C]/12 transition-all duration-200 ${cfg.bg} ${cfg.text} ${cfg.hoverBg}`}
              >
                <span>{cfg.icon}</span>
                {link.label}
              </a>
            );
          })}

          {/* Case study CTA */}
          {hasCaseStudy && (
            <span className="ml-auto text-sm font-medium text-[#45140C] underline underline-offset-4 hover:text-[#B5AD21] transition font-formadjr whitespace-nowrap">
              See case study →
            </span>
          )}

          {/* Quick look CTA */}
          {!hasCaseStudy && (
            <button
              onClick={(e) => { e.stopPropagation(); onQuickLook(project); }}
              className="ml-auto text-sm font-medium text-[#45140C]/60 hover:text-[#45140C] transition font-formadjr whitespace-nowrap"
            >
              Quick look ✦
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function AllProjects() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [quickLookProject, setQuickLookProject] = useState<Project | null>(null);

  const allTags = ["All", ...new Set(allProjects.flatMap((p) => p.tags))];

  const filteredProjects =
    selectedTag === "All"
      ? allProjects
      : allProjects.filter((p) => p.tags.includes(selectedTag));

  const getDelayClass = (index: number) => {
    const delays = ["fade-in-up-delay-2", "fade-in-up-delay-3", "fade-in-up-delay-4", "fade-in-up-delay-5", "fade-in-up-delay-6"];
    return delays[Math.min(index, 4)];
  };

  return (
    <>
      {/* Header */}
      <section className="w-full py-16 px-4 bg-[#F3EDE2] fade-in-up">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#45140C] font-formadjr mb-4">All Projects</h1>
          <p className="text-xl text-[#45140C]/70 font-formadjr max-w-2xl">
            A collection of my design and development work across various disciplines.
          </p>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="w-full py-6 px-4 bg-[#F3EDE2] border-t border-[#45140C]/10 fade-in-up-delay-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-formadjr font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-[#45140C] text-[#F3EDE2]"
                    : "bg-[#45140C]/10 text-[#45140C] hover:bg-[#45140C]/20"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full py-16 px-4 bg-[#F3EDE2]">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {filteredProjects.map((project, index) => (
                <div key={project.slug} className={getDelayClass(index)}>
                  <ProjectCard project={project} onQuickLook={setQuickLookProject} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[#45140C]/60 font-formadjr">No projects found with this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick-look modal */}
      {quickLookProject && (
        <QuickLookModal
          project={quickLookProject}
          onClose={() => setQuickLookProject(null)}
        />
      )}
    </>
  );
}
