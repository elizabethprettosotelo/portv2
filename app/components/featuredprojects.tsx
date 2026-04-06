"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useHover } from "../contexts/HoverContext";

type Project = {
  title: string;
  blurb: string;
  thumbnail: string;
  gif: string;
  tags: string[];
  slug: string;
};

const projects: Project[] = [
  {
    title: "Conduit",
    blurb: "Multimodal accessibility platform that unifies EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface built in 36 hours.",
    thumbnail: "/project1-thumb.jpg",
    gif: "/project1.gif",
    tags: ["Accessibility", "UX Design", "Multimodal Design"],
    slug: "project-one",
  },
  {
    title: "Labeling",
    blurb: "Redesigned Materia's image labeling widget with full WCAG 2.1 AA compliance, responsive layouts, and modern UI for 50,000+ students.",
    thumbnail: "/project2-thumb.jpg",
    gif: "/project2.gif",
    tags: ["UI Redesign", "Accessibility", "Higher Education"],
    slug: "project-two",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const { hoveredProject, setHoveredProject } = useHover();
  
  const isHighlighted = hoveredProject === project.slug;

  return (
    <div 
      className={`relative bg-[#F3EDE2] rounded-xl shadow-md overflow-hidden w-full max-w-2xl transition-all duration-300 ${
        isHighlighted ? 'ring-2 ring-[#B5AD21] shadow-xl' : ''
      }`}
      onMouseEnter={() => {
        setHoveredProject(project.slug);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setHoveredProject(null);
        setIsHovered(false);
      }}
    >
      {/* Image/GIF */}
      <div className="relative w-full h-56">
        <Image
          src={isHovered ? project.gif : project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          unoptimized={isHovered}
        />
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
        <Link
          href={`/projects/${project.slug}`}
          className="inline-block mt-4 text-sm font-medium text-[#45140C] underline underline-offset-4 hover:text-[#B5AD21] transition font-formadjr"
        >
          Read case study →
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="w-full py-16 px-4 bg-[#F3EDE2]">
      <h2 className="text-4xl font-bold text-[#45140C] font-formadjr mb-12 text-center">Selected Projects</h2>

      {/* Timeline layout */}
      <div className="relative flex flex-col items-center gap-0 max-w-2xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#E5B1A4]/30" style={{ left: "-2rem" }} />

        {projects.map((project) => (
          <div key={project.slug} id={project.slug} className="relative w-full mb-12">
            {/* Node on the line */}
            <div
              className="absolute w-3 h-3 rounded-full bg-[#E5B1A4] border-2 border-[#F3EDE2]"
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

