"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useHover } from "../contexts/HoverContext";
import { type ProjectLink, type ProjectOverview } from "./project-links";
import Tooltip from "./tooltip";

type Project = {
  title: string;
  blurb: string;
  tagline?: string;
  thumbnail?: string;
  imageAlt: string;
  placeholderLabel?: string;
  placeholderClass?: string;
  hoverThumbnail?: string;
  hoverVideo?: string;
  gif?: string;
  video?: string;
  videoPreview?: boolean;
  imageFit?: "contain" | "cover";
  hoverTint?: string;
  images: string[];
  tags: string[];
  slug: string;
  winner?: boolean;
  caseStudy?: boolean;
  caseStudyHref?: string;
  noTint?: boolean;
  links?: ProjectLink[];
  overview?: ProjectOverview;
};

const filterTags = ["Product Design", "Accessibility", "Web/Front-end", "Hackathon", "EdTech"];
const allTags = ["All", ...filterTags];

const allProjects: Project[] = [
  {
    title: "UCFHere",
    blurb: "A campus discovery platform for UCF students that surfaces the places, resources, and updates they need most in one streamlined experience.",
    tagline: "Creating a university attendance experience students can rely on.",
    thumbnail: "/ucfhere/frame-2.png",
    imageAlt: "UCFHere attendance app screens showing the scanner, dashboard, and attendance history",
    hoverTint: "bg-black/15",
    gif: "/project1.gif",
    video: "/conduit/conduitlaunch.mp4",
    images: ["/project1-1.jpg", "/project1-2.jpg", "/project1-3.jpg"],
    tags: ["Product Design", "EdTech"],
    slug: "ucfhere",
    caseStudy: true,
    caseStudyHref: "/projects/ucfhere/case-study",
    links: [
      {
        label: "Demo",
        href: "https://www.figma.com/proto/scJhVcSftznC0FFv8q2r0D/UCFHere?node-id=613-8793&starting-point-node-id=613%3A14304&t=f8HuBg7AZFgC5GsF-1",
        kind: "figma",
      },
    ],
    overview: {
      role: "Product Designer & Frontend Developer",
      timeline: "Most recent project",
      tools: ["Figma", "Next.js", "TypeScript"],
      summary: "A campus-centered product concept that turns UCF information into a clearer, faster, and more useful experience for students.",
      status: "in-progress",
    },
  },
  {
    title: "Wattasave",
    blurb: "A savings and spending companion that helps people spot small opportunities to save, set goals, and keep momentum without making budgeting feel heavy.",
    tagline: "Turning everyday routines into cleaner, cheaper energy choices.",
    thumbnail: "/wattasave/preview.png",
    imageAlt: "Wattasave savings dashboard with spending and savings insights",
    hoverTint: "bg-[#4A72E8]/14",
    gif: "/project2.gif",
    video: "/labeling/thumbnail.mp4",
    images: ["/project2-1.jpg", "/project2-2.jpg"],
    tags: ["Product Design", "Hackathon"],
    slug: "wattasave",
    winner: true,
    caseStudy: false,
    caseStudyHref: "/projects/wattasave",
    links: [
      { label: "Demo", href: "https://devpost.com/software/wattasave", kind: "demo" },
    ],
    overview: {
      role: "Product Designer",
      timeline: "Recent concept",
      tools: ["Figma", "Design Systems"],
      summary: "A lightweight money-saving experience focused on making personal finance feel approachable, encouraging, and easy to return to.",
      status: "in-progress",
    },
  },
  {
    title: "Conduit",
    blurb: "Multimodal accessibility platform that unifies EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface built in 36 hours.",
    tagline: "Accessibility without assumptions",
    thumbnail: "/conduit/conduitthumb.jpg",
    imageAlt: "Conduit accessibility platform interface with multimodal controls",
    gif: "/project1.gif",
    video: "/conduit/conduitlaunch.mp4",
    images: ["/project1-1.jpg", "/project1-2.jpg", "/project1-3.jpg"],
    tags: ["Accessibility", "Hackathon"],
    videoPreview: true,
    slug: "conduit",
    winner: true,
    caseStudy: false,
    caseStudyHref: "/projects/conduit",
    links: [
      { label: "GitHub", href: "https://github.com/kwaiidev/conduit", kind: "github" },
      { label: "Demo", href: "https://devpost.com/software/conduit-y8gqoj?ref_content=my-projects-tab&ref_feature=my_projects", kind: "devpost" },
      // TODO: Add Conduit's real Figma URL here when available.
    ],
  },
  {
    title: "Labeling",
    blurb: "A gamified educational widget used by more than 50,000 students and faculty members each month.",
    thumbnail: "/labeling/thumbnail.png",
    imageAlt: "Labeling educational widget interface with colorful learning controls",
    gif: "/project2.gif",
    video: "/labeling/thumbnail.mp4",
    noTint: true,
    images: ["/project2-1.jpg", "/project2-2.jpg"],
    tagline: "Modernizing a gamified educational widget for accessibility and responsiveness.",
    tags: ["Accessibility", "EdTech", "Product Design"],
    videoPreview: true,
    slug: "labeling",
    caseStudy: false,
    caseStudyHref: "/projects/labeling",
    // TODO: Add Labeling's real GitHub and Figma URLs here when available.
    links: [],
  },
  {
    title: "Tariffix",
    blurb: "A Chrome extension that calculates estimated tariff costs live while users browse products on e-commerce websites.",
    tagline: "Calculating tariff costs live while you shop online.",
    thumbnail: "/tariffix/gallery-1.jpg",
    images: ["/project5-1.jpg"],
    tags: ["Product Design", "Web/Front-end", "Hackathon"],
    imageAlt: "Tariffix browser extension interface showing estimated tariff costs",
    slug: "tariffix",
    winner: true,
    caseStudy: false,
    caseStudyHref: "/projects/tariffix",
    links: [
      { label: "GitHub", href: "https://github.com/Adr1an04/Tariffix", kind: "github" },
      { label: "Figma", href: "https://www.figma.com/design/VQeyiEWBKz8l6L7JDHwgqj/Tarrifix?node-id=0-1&p=f&t=aJdtyxYEZDz6tN2L-0", kind: "figma" },
      { label: "Demo", href: "https://devpost.com/software/tariffix", kind: "demo" },
    ],
    overview: {
      role: "Designer & Frontend Developer",
      timeline: "Bitcamp 2024 (36 hours)",
      tools: ["Next.js", "Figma", "Monorepo"],
      summary: "Shoppers often cannot tell how tariffs may affect an item's final price until late in the purchasing process. Tariffix surfaces estimated tariff costs directly on product pages, making international pricing easier to understand while shopping.",
      highlights: [
        "First frontend-heavy project - went from Figma wireframes to production Next.js site, learning the entire design-to-code pipeline",
        "Navigated a monorepo for the first time and figured out the folder structure and build configs",
        "Designed the full branding system and visual identity for the extension",
        "Translated technically dense tariff data concepts into user-friendly documentation",
        "Worked as part of a larger team system - learned to build my piece while others handled the backend AI scraping and extension logic",
        "Won 1st place at Bitcamp 2024 competing against 100+ teams",
      ],
      status: "complete",
    },
  },
  {
    title: "Knight Hacks VIII Site",
    blurb: "The visual design and UI for the Knight Hacks VIII website, created to recruit participants and introduce them to the hackathon community.",
    tagline: "More than a website - an invitation to our hackathon.",
    thumbnail: "/knighthacks/kh2025.svg",
    hoverVideo: "/knighthacks/kh2025-hover.mp4",
    imageAlt: "Knight Hacks VIII website homepage with its event branding",
    imageFit: "contain",
    images: ["/project6-1.jpg", "/project6-2.jpg", "/project6-3.jpg"],
    tags: ["Web/Front-end", "Product Design"],
    slug: "knighthacks-viii",
    caseStudy: false,
    caseStudyHref: "/projects/knighthacks-viii",
    links: [
      { label: "Demo", href: "https://2025.knighthacks.org/", kind: "demo" },
      { label: "Figma", href: "https://www.figma.com/design/w7k6OFPP8emqJeIRZULqBb/KHVIII?node-id=0-1&t=glZQk6NvaPThdUn6-1", kind: "figma" },
    ],
    overview: {
      role: "Frontend Developer",
      timeline: "6 weeks",
      tools: ["Next.js", "Tailwind"],
      summary: "The site needed to communicate essential event information while also capturing the energy, personality, and scale of Knight Hacks. I created an immersive visual system that combined clear information architecture with a distinctive event identity and engaging interface design.",
      status: "complete",
    },
  },
  {
    title: "Chop Chop",
    blurb: "A Jackbox-style cooking race where every phone is a controller and the shared screen is the kitchen.",
    tagline: "Getting a room to look up from their phones.",
    thumbnail: "/chopchop/hero.png",
    imageAlt: "Chop Chop cooking race illustration with four cooking characters around the game title",
    images: [],
    tags: ["Product Design", "Hackathon"],
    slug: "chop-chop",
    caseStudy: true,
    caseStudyHref: "/projects/chop-chop",
    links: [
      { label: "Demo", href: "https://devpost.com/software/temp-name-er3vg5", kind: "devpost" },
    ],
  },
  {
    title: "Templater",
    blurb: "A Canvas template-import tool that lets instructors see a page before they add it to their course.",
    tagline: "Showing professors what they are picking before they pick it.",
    thumbnail: "/templater/placeholder.svg",
    imageAlt: "Templater placeholder thumbnail for the Canvas template picker",
    images: [],
    tags: ["Product Design", "EdTech", "Web/Front-end"],
    slug: "templater",
    caseStudy: true,
    caseStudyHref: "/projects/templater",
    // TODO: Replace the typographic placeholder with a real Templater thumbnail.
    links: [],
  },
  {
    title: "Pallit",
    blurb: "A font and color-palette pairing generator created during my first hackathon.",
    tagline: "Where typography and color find their match.",
    thumbnail: "/pallit/frame-3.png",
    imageAlt: "Pallit font and color pairing generator interface",
    hoverThumbnail: "/pallit/gallery-2.jpg",
    images: ["/project7-1.jpg", "/project7-2.jpg"],
    tags: ["Product Design", "Web/Front-end"],
    slug: "pallit",
    caseStudy: false,
    caseStudyHref: "/projects/pallit",
    links: [
      { label: "Demo", href: "https://devpost.com/software/pallit", kind: "demo" },
      { label: "GitHub", href: "https://github.com/elizabethprettosotelo/pallit/tree/colors", kind: "github" },
      { label: "Figma", href: "https://www.figma.com/design/XuC21SyzsND047OAgysRNZ/pallit?node-id=0-1&t=I9Hm53xGdbeBgotI-1", kind: "figma" },
    ],
    overview: {
      role: "Design Placeholder",
      timeline: "Pending",
      tools: ["Figma", "Next.js"],
      summary: "Choosing typography and colors that feel cohesive can be difficult, especially for designers beginning a new project.",
      status: "in-progress",
    },
  },
];

function ProjectCard({ project }: { project: Project; }) {
  const [isHovered, setIsHovered] = useState(false);
  const { hoveredProject, setHoveredProject } = useHover();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isHighlighted = isHovered || hoveredProject === project.slug;
  const hoverTintClass = project.hoverTint ?? "bg-black/0";
  const showVideoPreview = project.videoPreview ?? false;
  const mainImage =
    project.hoverThumbnail && isHovered ? project.hoverThumbnail : project.thumbnail;
  const useHoverVideo = project.hoverVideo && isHovered;
  const imageFitClass = project.imageFit === "contain" ? "object-contain scale-[0.88] p-6" : "object-cover";
  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoveredProject(project.slug);
    if (showVideoPreview && videoRef.current) {
      videoRef.current.currentTime = 0;
      playPromiseRef.current = videoRef.current.play();
      playPromiseRef.current?.catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredProject(null);
    if (showVideoPreview && videoRef.current) {
      const video = videoRef.current;
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          video.pause();
          video.currentTime = 0;
        }).catch(() => {});
        playPromiseRef.current = null;
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  return (
    <div
      className={`relative bg-[#FFFFFF] rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col border-2 ${
        isHighlighted ? "-translate-y-1 border-[#9AB1EB]" : "border-transparent"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsHovered(false);
      }}
    >
      {project.winner && (
        <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-[#8EB522] text-white text-xs font-bold font-formadjr rounded-full">
          WINNER
        </div>
      )}

      <Tooltip
        followCursor
        label="Coming soon | View demo"
        disabled={project.caseStudy}
        className="block"
      >
        <Link
          href={project.caseStudyHref ?? `/projects/${project.slug}`}
          className="block cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9AB1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F6]"
        >
          <div className="cursor-pointer">
            <div className="relative w-full h-56 overflow-hidden bg-[#250D47]/5 shrink-0">
              {useHoverVideo ? (
                <video
                  src={project.hoverVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : mainImage ? (
                <Image
                  src={mainImage}
                  alt={project.imageAlt}
                  fill
                  className={imageFitClass}
                />
              ) : (
                <div className={`flex h-full items-center justify-center p-6 text-center ${project.placeholderClass ?? "bg-[#250D47] text-[#FAF9F6]"}`}>
                  <span className="font-display text-3xl font-semibold">{project.placeholderLabel ?? project.title}</span>
                </div>
              )}
              {showVideoPreview && project.video && !useHoverVideo && (
                <video
                  ref={videoRef}
                  src={project.video}
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isHovered ? "opacity-100" : "opacity-0"}`}
                />
              )}
              <div className={`absolute inset-0 transition-colors duration-300 z-20 ${
                isHighlighted ? hoverTintClass : "bg-black/0"
              }`} />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-3">
                <h3 className="text-xl font-bold text-[#250D47] font-formadjr">{project.title}</h3>
                <span className="border-l border-[#8EB522]/50 pl-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5E7A12] font-inter">
                  {project.tags.join(" · ")}
                </span>
              </div>
              <p className="text-[#250D47]/70 text-sm font-semibold font-inter leading-relaxed line-clamp-2 flex-1">
                {project.tagline}
              </p>
            </div>
          </div>
        </Link>
      </Tooltip>

      {/* External project-link pills intentionally omitted. */}
      {/* {(project.links ?? []).filter((link) => !isPlaceholderLink(link.href)).map((link) => (
          <a
            key={link.label + link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold tracking-[0.02em] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB522] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] ${LINK_CONFIG[link.kind].bg} ${LINK_CONFIG[link.kind].text} border-[#250D47]/15 hover:border-[#250D47]/25 ${LINK_CONFIG[link.kind].hoverBg}`}
          >
            <span aria-hidden="true">{LINK_CONFIG[link.kind].icon}</span>
            <span>{link.label}</span>
            <span aria-hidden="true" className="text-[10px] opacity-80">
              ↗
            </span>
          </a>
        ))} */}
    </div>
  );
}

export default function AllProjects() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get("tag");
    if (!tag || !allTags.includes(tag)) return;
    const timeout = window.setTimeout(() => setSelectedTag(tag), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const tagCounts = allTags.reduce<Record<string, number>>((counts, tag) => {
    counts[tag] = tag === "All" ? allProjects.length : allProjects.filter((project) => project.tags.includes(tag)).length;
    return counts;
  }, {});

  const filteredProjects =
    selectedTag === "All"
      ? allProjects
      : allProjects.filter((p) => p.tags.includes(selectedTag));

  const selectTag = (tag: string) => {
    setSelectedTag(tag);
    const params = new URLSearchParams(window.location.search);
    if (tag === "All") params.delete("tag");
    else params.set("tag", tag);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  };

  const getDelayClass = (index: number) => {
    const delays = ["fade-in-up-delay-2", "fade-in-up-delay-3", "fade-in-up-delay-4", "fade-in-up-delay-5", "fade-in-up-delay-6"];
    return delays[Math.min(index, 4)];
  };

  return (
    <>
      <section className="w-full py-16 px-4 bg-[#FAF9F6] fade-in-up">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#250D47] font-formadjr mb-4">All Projects</h1>
          <p className="text-xl text-[#250D47]/70 font-semibold font-formadjr max-w-2xl">
            A collection of my design and development work across various disciplines.
          </p>
        </div>
      </section>

      <section className="w-full py-6 px-4 bg-[#FAF9F6] border-t border-[#250D47]/10 fade-in-up-delay-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3" aria-label="Filter projects by category">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => selectTag(tag)}
                aria-pressed={selectedTag === tag}
                className={`rounded-full px-4 py-2 font-formadjr font-bold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9AB1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F6] ${
                  selectedTag === tag
                    ? "bg-[#250D47] text-[#FAF9F6]"
                    : "bg-[#250D47]/10 text-[#250D47] hover:bg-[#250D47]/20"
                }`}
              >
                {tag}
                <span className="ml-1.5 text-xs opacity-65">{tagCounts[tag]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-4 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <p aria-live="polite" className="mb-6 text-sm font-semibold text-[#250D47]/60">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
            {selectedTag !== "All" ? ` in ${selectedTag}` : ""}.
          </p>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {filteredProjects.map((project, index) => (
                <div key={project.slug} className={getDelayClass(index)}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[#250D47]/60 font-formadjr">No projects found with this filter.</p>
              <button
                type="button"
                onClick={() => selectTag("All")}
                className="mt-5 rounded-lg bg-[#250D47] px-5 py-2.5 text-sm font-bold text-[#FAF9F6] transition hover:bg-[#8EB522] hover:text-[#250D47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9AB1EB] focus-visible:ring-offset-2"
              >
                Show all projects
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}





