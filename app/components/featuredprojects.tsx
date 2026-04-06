"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useHover } from "../contexts/HoverContext";

type Project = {
  title: string;
  blurb: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  slug: string;
};

const projects: Project[] = [
  {
    title: "Project One",
    blurb: "A short description of this project. What problem it solved, your role, and what made it interesting.",
    thumbnail: "/project1-thumb.jpg",
    images: ["/project1-1.jpg", "/project1-2.jpg", "/project1-3.jpg"],
    tags: ["UX Design", "Research"],
    slug: "project-one",
  },
  {
    title: "Project Two",
    blurb: "A short description of this project. What problem it solved, your role, and what made it interesting.",
    thumbnail: "/project2-thumb.jpg",
    images: ["/project2-1.jpg", "/project2-2.jpg"],
    tags: ["UI Design", "Prototyping"],
    slug: "project-two",
  },
  {
    title: "Project Three",
    blurb: "A short description of this project. What problem it solved, your role, and what made it interesting.",
    thumbnail: "/project3-thumb.jpg",
    images: ["/project3-1.jpg", "/project3-2.jpg", "/project3-3.jpg"],
    tags: ["Frontend", "Design Systems"],
    slug: "project-three",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { hoveredProject, setHoveredProject } = useHover();
  
  const isHighlighted = hoveredProject === project.slug;

  const allImages = [project.thumbnail, ...project.images];

  const prev = () => setCurrentImage((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setCurrentImage((i) => (i + 1) % allImages.length);

  return (
    <div 
      className={`relative bg-[#F3EDE2] rounded-xl shadow-md overflow-hidden w-full max-w-2xl transition-all duration-300 ${
        isHighlighted ? 'ring-2 ring-[#B5AD21] shadow-xl' : ''
      }`}
      onMouseEnter={() => setHoveredProject(project.slug)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      {/* Thumbnail */}
      {!carouselOpen && (
        <div
          className="relative w-full h-56 cursor-pointer group"
          onClick={() => setCarouselOpen(true)}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <span className="text-white text-sm font-medium font-formadjr">View images</span>
          </div>
        </div>
      )}

      {/* Carousel */}
      {carouselOpen && (
        <div className="relative w-full h-56 bg-black">
          <Image
            src={allImages[currentImage]}
            alt={`${project.title} image ${currentImage + 1}`}
            fill
            className="object-cover"
          />
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition"
          >
            ›
          </button>
          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition ${i === currentImage ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
          <button
            onClick={() => { setCarouselOpen(false); setCurrentImage(0); }}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-black/70 transition"
          >
            ✕
          </button>
        </div>
      )}

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

