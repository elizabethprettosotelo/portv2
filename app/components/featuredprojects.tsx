"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { useHover } from "../contexts/HoverContext";

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
};

const projects: Project[] = [
  {
    title: "UCFHere",
    blurb: "A campus-focused experience for UCF students that brings the most useful places, resources, and updates into one fast, easy-to-scan interface.",
    tagline: "Creating a university attendance experience students can rely on.",
    thumbnail: "/ucfhere/frame-2.png",
    gif: "/project1.gif",
    video: "/conduit/conduitlaunch.mp4",
    tags: ["Product Design", "Campus Experience", "Frontend"],
    slug: "ucfhere",
  },
  {
    title: "Wattasave",
    blurb: "A savings and spending companion that helps people spot small opportunities to save, set goals, and keep momentum without making budgeting feel heavy.",
    tagline: "Turning everyday routines into cleaner, cheaper energy choices.",
    thumbnail: "/wattasave/preview.png",
    gif: "/project2.gif",
    video: "/labeling/thumbnail.mp4",
    tags: ["Fintech", "UI Design", "Mobile First"],
    slug: "wattasave",
  },
  {
    title: "Conduit",
    blurb: "Multimodal accessibility platform that unifies EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface built in 36 hours.",
    tagline: "Accessibility without assumptions",
    thumbnail: "/conduit/conduitthumb.jpg",
    gif: "/project1.gif",
    video: "/conduit/conduitlaunch.mp4",
    tags: ["Accessibility", "UX Design", "Multimodal Design"],
    slug: "project-one",
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
  const router = useRouter();
  const { hoveredProject, setHoveredProject } = useHover();
  const isHighlighted = hoveredProject === project.slug;
  const hoverTintClass =
    project.slug === "ucfhere"
      ? "bg-black/15"
      : project.slug === "wattasave"
        ? "bg-[#4A72E8]/14"
        : "bg-black/0";
  const showVideoPreview = project.slug === "project-one";

  const handleMouseEnter = () => {
    setHoveredProject(project.slug);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <div
      className={`relative bg-[#FDFAF7] rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col ${
        isHighlighted ? "shadow-[0_4px_12px_rgba(229,177,164,0.4)] -translate-y-1" : ""
      }`}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isHighlighted ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div className={`absolute inset-0 transition-colors duration-300 z-20 ${isHighlighted ? hoverTintClass : "bg-black/0"}`} />
      </div>

      <div className="p-5 flex flex-col flex-1">
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
        <p className="text-[#45140C]/90 text-base font-medium font-inter leading-relaxed">{project.tagline}</p>

        <div className="mt-4">
          <span className="inline-flex text-sm font-medium text-[#45140C] underline underline-offset-4 hover:text-[#B5AD21] transition font-formadjr whitespace-nowrap">
            Read case study →
          </span>
        </div>
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
    <section id="projects" className="w-full py-16 px-4 bg-[#F3EDE2]">
      <div ref={headingRef} className="anim-hidden max-w-7xl mx-auto mb-12 w-full">
        <div className="max-w-3xl text-left">
          <h2 className="text-4xl font-bold text-[#45140C] font-formadjr text-left">Selected Projects</h2>
          <p className="text-lg text-[#45140C]/70 font-inter mt-2 text-left">Look at all these things I&apos;ve been cooking up ✦</p>
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
          className="px-8 py-3 bg-[#45140C] text-[#F3EDE2] rounded font-formadjr font-medium text-lg hover:bg-[#B5AD21] transition"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
}
