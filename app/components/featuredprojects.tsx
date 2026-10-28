"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useHover } from "../contexts/HoverContext";
import Tooltip from "./tooltip";

type Project = {
  title: string;
  blurb: string;
  tagline: string;
  thumbnail?: string;
  heroVideo?: string;
  hoverVideo?: string;
  imageFit?: "contain" | "cover";
  heroPoster?: string;
  heroLabel?: string;
  heroDetail?: string;
  heroClass?: string;
  tags: string[];
  slug: string;
  noTint?: boolean;
  caseStudy?: boolean;
  caseStudyHref?: string;
  links?: { label: string; href: string; kind: "github" | "devpost" | "demo" | "figma" | "custom" }[];
};

const projects: Project[] = [
  {
    title: "UCFHere",
    blurb: "A campus-focused attendance experience that helps students understand when their check-in counted and recover when it does not.",
    tagline: "Making sure showing up always counts.",
    thumbnail: "/ucfhere/final/overview.png",
    heroVideo: "/ucfhere/motion/reliable.mp4",
    heroPoster: "/ucfhere/motion/reliable-poster.jpg",
    tags: ["Product Design", "EdTech"],
    slug: "ucfhere",
    caseStudy: true,
    links: [
      {
        label: "Demo",
        href: "https://www.figma.com/proto/scJhVcSftznC0FFv8q2r0D/UCFHere?node-id=613-8793&starting-point-node-id=613%3A14304&t=f8HuBg7AZFgC5GsF-1",
        kind: "figma",
      },
    ],
  },
  {
    title: "Chop Chop",
    blurb: "A Jackbox-style cooking race where every phone is a controller and the shared screen is the kitchen.",
    tagline: "Getting a room to look up from their phones.",
    thumbnail: "/chopchop/hero.png",
    heroLabel: "MULTIPLAYER UX",
    heroDetail: "A cooking race for the whole room",
    heroClass: "bg-[#F2B84B] text-[#250D47]",
    tags: ["Game Design", "Interaction"],
    slug: "chop-chop",
    caseStudy: false,
    links: [
      { label: "Demo", href: "https://devpost.com/software/temp-name-er3vg5", kind: "devpost" },
    ],
  },
  {
    title: "Knight Hacks VIII Site",
    blurb: "The visual design and UI for the Knight Hacks VIII website, created to recruit participants and introduce them to the hackathon community.",
    tagline: "More than a website—an invitation to our hackathon.",
    thumbnail: "/knighthacks/kh2025.svg",
    hoverVideo: "/knighthacks/kh2025-hover.mp4",
    imageFit: "contain",
    tags: ["Event Branding", "Web Design"],
    slug: "knighthacks-viii",
    caseStudy: false,
    links: [
      { label: "Demo", href: "https://2025.knighthacks.org/", kind: "demo" },
      { label: "Figma", href: "https://www.figma.com/design/w7k6OFPP8emqJeIRZULqBb/KHVIII?node-id=0-1&t=glZQk6NvaPThdUn6-1", kind: "figma" },
    ],
  },
  {
    title: "Templater",
    blurb: "A Canvas template-import tool that lets instructors see a page before they add it to their course.",
    tagline: "Showing professors what they are picking before they pick it.",
    thumbnail: "/templater/hero-thumbnails.png",
    heroVideo: "/templater/hero.mp4",
    heroPoster: "/templater/hero-thumbnails.png",
    tags: ["Product Design", "EdTech"],
    slug: "templater",
    caseStudy: true,
    caseStudyHref: "/projects/templater",
  },
];

function AnimatedCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.remove("anim-hidden");
        el.classList.add("anim-slide-up");
        obs.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="anim-hidden">
      <ProjectCard project={project} />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { hoveredProject, setHoveredProject } = useHover();
  const [isHovered, setIsHovered] = useState(false);
  const isHighlighted = isHovered || hoveredProject === project.slug;
  const hoverTintClass =
    project.slug === "ucfhere"
      ? "bg-black/15"
      : project.slug === "wattasave"
        ? "bg-[#4A72E8]/14"
        : "bg-black/0";
  const demoHref = project.links?.find((link) => link.label === "Demo")?.href;
  const cardContent = (
    <div className="group block h-full">
      <div className={`relative w-full aspect-[16/9] overflow-hidden ${project.heroClass ?? "bg-[#250D47]"}`}>
        {project.heroVideo ? (
          <video
            src={project.heroVideo}
            poster={project.heroPoster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label={`${project.title} final product walkthrough`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : project.hoverVideo && isHovered ? (
          <video
            src={project.hoverVideo}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label={`${project.title} screen recording`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={`${project.title}: ${project.tagline}`}
            fill
            className={`transition-transform duration-700 ease-out group-hover:scale-[1.03] ${project.imageFit === "contain" ? "object-contain scale-[0.88] p-6" : "object-cover"}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] opacity-65">{project.heroLabel}</span>
            <div>
              <div className="mb-3 h-px w-16 bg-current opacity-35" />
              <p className="max-w-xs font-display text-4xl font-semibold leading-none tracking-[-1px] sm:text-5xl">{project.title}</p>
              <p className="mt-3 max-w-xs text-sm font-semibold leading-relaxed opacity-75">{project.heroDetail}</p>
            </div>
          </div>
        )}
        <div className={`absolute inset-0 transition-colors duration-500 z-10 ${isHighlighted ? hoverTintClass : "bg-black/0"}`} />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#250D47]/50 font-inter">{project.title}</p>
          <span className="border-l border-[#8EB522]/50 pl-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5E7A12] font-inter">
            {project.tags.join(" · ")}
          </span>
        </div>
        <h3 className="mt-1.5 text-xl sm:text-2xl font-bold text-[#250D47] font-formadjr leading-tight">{project.tagline}</h3>
      </div>
    </div>
  );

  return (
    <div
      className={`relative bg-[#FFFFFF] rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col ${
        isHighlighted ? "-translate-y-1 border-[#9AB1EB]" : "border-transparent"
      } border-2`}
      onMouseEnter={() => {
        setIsHovered(true);
        setHoveredProject(project.slug);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredProject(null);
      }}
    >
      <Tooltip
        followCursor
        label="Coming soon | View demo"
        disabled={project.caseStudy}
        className="block h-full"
      >
        {project.caseStudy && project.caseStudyHref ? (
          <Link href={project.caseStudyHref} className="block h-full">
            {cardContent}
          </Link>
        ) : (
          <a href={demoHref} target="_blank" rel="noopener noreferrer" className="block h-full">
            {cardContent}
          </a>
        )}
      </Tooltip>

      {/* External project-link pills intentionally omitted. */}
      {/* {(project.links ?? []).map((link) => (
          <a
            key={link.label + link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.02em] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB522] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] ${LINK_CONFIG[link.kind].bg} ${LINK_CONFIG[link.kind].text} border-[#250D47]/15 hover:border-[#250D47]/25 ${LINK_CONFIG[link.kind].hoverBg}`}
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

export default function FeaturedProjects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [
      { el: headingRef.current, cls: "anim-slide-up", delay: 0 },
      { el: btnRef.current, cls: "anim-slide-up", delay: 200 },
    ];
    const observers: IntersectionObserver[] = [];
    targets.forEach(({ el, cls, delay }) => {
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove("anim-hidden");
            el.classList.add(cls);
          }, delay);
          obs.disconnect();
        }
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="projects" className="w-full py-20 px-5 sm:px-8 lg:px-12 bg-[#FAF9F6]">
      <div ref={headingRef} className="anim-hidden max-w-[88rem] mx-auto mb-10 w-full">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-3xl text-left">
          <h2 className="text-4xl font-bold text-[#250D47] font-formadjr text-left">Selected Projects</h2>
          <p className="text-base text-[#250D47]/65 font-semibold font-inter mt-2 text-left">
            A few recent things I&apos;ve been cooking up <span className="text-[#8EB522]">✦</span>
          </p>
          </div>
          <div ref={btnRef} className="anim-hidden shrink-0">
            <Link
              href="/projects"
              className="inline-flex px-5 py-2.5 bg-[#250D47] text-[#FAF9F6] rounded-lg font-formadjr font-bold text-sm hover:bg-[#8EB522] hover:text-[#250D47] transition-all duration-200 hover:-translate-y-0.5"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 items-stretch">
          {projects.map((project) => (
            <div key={project.slug} id={project.slug} className="h-full">
              <AnimatedCard project={project} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}





