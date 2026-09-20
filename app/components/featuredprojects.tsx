"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useHover } from "../contexts/HoverContext";
import { LINK_CONFIG } from "./project-links";
import Tooltip from "./tooltip";

type Project = {
  title: string;
  blurb: string;
  tagline: string;
  thumbnail: string;
  gif: string;
  video?: string;
  tags: string[];
  slug: string;
  noTint?: boolean;
  caseStudyHref?: string;
  links?: { label: string; href: string; kind: "github" | "devpost" | "demo" | "figma" | "custom" }[];
};

const projects: Project[] = [
  {
    title: "UCFHere",
    blurb: "A campus-focused experience for UCF students that brings the most useful places, resources, and updates into one fast, easy-to-scan interface.",
    tagline: "Creating a university attendance experience students can rely on.",
    thumbnail: "/ucfhere/frame-2.png",
    gif: "/project1.gif",
    video: "/conduit/conduitlaunch.mp4",
    tags: ["Product Design", "EdTech"],
    slug: "ucfhere",
    caseStudyHref: "/projects/ucfhere/case-study",
    links: [
      {
        label: "Demo",
        href: "https://www.figma.com/proto/scJhVcSftznC0FFv8q2r0D/UCFHere?node-id=613-8793&starting-point-node-id=613%3A14304&t=f8HuBg7AZFgC5GsF-1",
        kind: "figma",
      },
    ],
  },
  {
    title: "Wattasave",
    blurb: "A savings and spending companion that helps people spot small opportunities to save, set goals, and keep momentum without making budgeting feel heavy.",
    tagline: "Turning everyday routines into cleaner, cheaper energy choices.",
    thumbnail: "/wattasave/preview.png",
    gif: "/project2.gif",
    video: "/labeling/thumbnail.mp4",
    tags: ["Fintech", "Hackathon"],
    slug: "wattasave",
    caseStudyHref: "/projects/wattasave",
    links: [
      { label: "Demo", href: "https://devpost.com/software/wattasave", kind: "demo" },
    ],
  },
  {
    title: "Conduit",
    blurb: "Multimodal accessibility platform that unifies EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface built in 36 hours.",
    tagline: "Accessibility without assumptions",
    thumbnail: "/conduit/conduitthumb.jpg",
    gif: "/project1.gif",
    video: "/conduit/conduitlaunch.mp4",
    tags: ["Accessibility", "Hackathon"],
    slug: "project-one",
    caseStudyHref: "/projects/project-one",
    links: [
      { label: "GitHub", href: "https://github.com/kwaiidev/conduit", kind: "github" },
      { label: "Demo", href: "https://devpost.com/software/conduit-y8gqoj?ref_content=my-projects-tab&ref_feature=my_projects", kind: "devpost" },
      { label: "Figma", href: "https://figma.com", kind: "figma" },
    ],
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
  const showVideoPreview = project.slug === "project-one";
  const caseStudyHref =
    project.slug === "ucfhere" ? "/projects/ucfhere/case-study" : `/projects/${project.slug}`;

  return (
    <div
      className={`relative bg-[#F9FAF3] rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col ${
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
      <Tooltip followCursor label="Open case study" className="block h-full">
        <Link href={caseStudyHref} className="block cursor-pointer h-full">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
            {showVideoPreview && project.video && (
              <video
                src={project.video}
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isHovered ? "opacity-100" : "opacity-0"}`}
              />
            )}
            <div className={`absolute inset-0 transition-colors duration-300 z-20 ${isHighlighted ? hoverTintClass : "bg-black/0"}`} />
          </div>

          <div className="p-5 flex flex-col flex-1">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-[#250D47]/15 text-[#250D47]/75 font-semibold font-inter uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-bold text-[#250D47] font-formadjr mb-2">{project.title}</h3>
            <p className="text-[#250D47]/70 text-base font-semibold font-inter leading-relaxed">{project.tagline}</p>
          </div>
        </Link>
      </Tooltip>

      <div className="px-5 pb-5 flex flex-wrap gap-2">
        {(project.links ?? []).map((link) => (
          <a
            key={link.label + link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold tracking-[0.02em] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB522] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9FAF3] ${LINK_CONFIG[link.kind].bg} ${LINK_CONFIG[link.kind].text} border-[#250D47]/15 hover:border-[#250D47]/25 ${LINK_CONFIG[link.kind].hoverBg}`}
          >
            <span aria-hidden="true">{LINK_CONFIG[link.kind].icon}</span>
            <span>{link.label}</span>
            <span aria-hidden="true" className="text-[10px] opacity-80">
              ↗
            </span>
          </a>
        ))}
      </div>
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
    <section id="projects" className="w-full py-16 px-4 bg-[#F0F1E3]">
      <div ref={headingRef} className="anim-hidden max-w-7xl mx-auto mb-12 w-full">
        <div className="max-w-3xl text-left">
          <h2 className="text-4xl font-bold text-[#250D47] font-formadjr text-left">Selected Projects</h2>
          <p className="text-lg text-[#250D47]/65 font-semibold font-inter mt-2 text-left">
            A few recent things I&apos;ve been cooking up <span className="text-[#8EB522]">✦</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-12 items-stretch">
          {projects.map((project) => (
            <div key={project.slug} id={project.slug} className="h-full">
              <AnimatedCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <div ref={btnRef} className="anim-hidden flex justify-center mt-8">
        <Link
          href="/projects"
          className="px-8 py-3 bg-[#250D47] text-[#F0F1E3] rounded-lg font-formadjr font-bold text-lg hover:bg-[#8EB522] hover:text-[#250D47] transition-all duration-200 hover:-translate-y-0.5"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
}





