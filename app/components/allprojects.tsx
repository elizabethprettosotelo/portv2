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
  featured?: boolean;
};

const allProjects: Project[] = [
  // Featured Projects
  {
    title: "Project One",
    blurb: "A short description of this project. What problem it solved, your role, and what made it interesting.",
    thumbnail: "/project1-thumb.jpg",
    images: ["/project1-1.jpg", "/project1-2.jpg", "/project1-3.jpg"],
    tags: ["UX Design", "Research"],
    slug: "project-one",
    featured: true,
  },
  {
    title: "Project Two",
    blurb: "A short description of this project. What problem it solved, your role, and what made it interesting.",
    thumbnail: "/project2-thumb.jpg",
    images: ["/project2-1.jpg", "/project2-2.jpg"],
    tags: ["UI Design", "Prototyping"],
    slug: "project-two",
    featured: true,
  },
  {
    title: "Project Three",
    blurb: "A short description of this project. What problem it solved, your role, and what made it interesting.",
    thumbnail: "/project3-thumb.jpg",
    images: ["/project3-1.jpg", "/project3-2.jpg", "/project3-3.jpg"],
    tags: ["Frontend", "Design Systems"],
    slug: "project-three",
    featured: true,
  },
  // Additional Projects
  {
    title: "Project Four",
    blurb: "An exploration of design patterns and user flows for a complex application.",
    thumbnail: "/project4-thumb.jpg",
    images: ["/project4-1.jpg", "/project4-2.jpg"],
    tags: ["UX Design", "Wireframing"],
    slug: "project-four",
  },
  {
    title: "Project Five",
    blurb: "A comprehensive branding and identity project for a startup company.",
    thumbnail: "/project5-thumb.jpg",
    images: ["/project5-1.jpg"],
    tags: ["Branding", "UI Design"],
    slug: "project-five",
  },
  {
    title: "Project Six",
    blurb: "Responsive web design and development for an e-commerce platform.",
    thumbnail: "/project6-thumb.jpg",
    images: ["/project6-1.jpg", "/project6-2.jpg", "/project6-3.jpg"],
    tags: ["Frontend", "Responsive Design"],
    slug: "project-six",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const { hoveredProject, setHoveredProject } = useHover();
  
  // Check if this card should show hover effects (either from card hover or navbar hover)
  const isHighlighted = isHovered || hoveredProject === project.slug;

  return (
    <Link href={`/projects/${project.slug}`}>
      <div
        className={`relative bg-[#F3EDE2] rounded-xl shadow-md overflow-hidden group cursor-pointer transition-all duration-300 ${
          isHighlighted ? 'shadow-xl -translate-y-1' : ''
        }`}
        onMouseEnter={() => {
          setIsHovered(true);
          setHoveredProject(project.slug);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredProject(null);
        }}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-[#B5AD21] text-[#45140C] text-xs font-bold font-formadjr rounded-full">
            FEATURED
          </div>
        )}

        {/* Thumbnail */}
        <div className="relative w-full h-64 overflow-hidden bg-[#45140C]/5">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-300 ${
              isHighlighted ? 'scale-105' : ''
            }`}
          />
          <div className={`absolute inset-0 transition-colors duration-300 flex items-center justify-center ${
            isHighlighted ? 'bg-black/20' : 'bg-black/0'
          }`}>
            <span className={`text-white text-sm font-medium font-formadjr transition-opacity duration-300 ${
              isHighlighted ? 'opacity-100' : 'opacity-0'
            }`}>
              View Project →
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-[#45140C]/10 text-[#45140C] font-normal font-inter"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-[#45140C] font-formadjr mb-2">
            {project.title}
          </h3>
          <p className="text-[#45140C]/65 text-sm font-inter leading-relaxed line-clamp-2">
            {project.blurb}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function AllProjects() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Get all unique tags
  const allTags = ["All", ...new Set(allProjects.flatMap((p) => p.tags))];

  // Filter projects based on selected tag
  const filteredProjects =
    selectedTag === "All"
      ? allProjects
      : allProjects.filter((p) => p.tags.includes(selectedTag));

  // Animation delay classes (must be static for Tailwind)
  const getDelayClass = (index: number) => {
    const delays = [
      'fade-in-up-delay-2',
      'fade-in-up-delay-3',
      'fade-in-up-delay-4',
      'fade-in-up-delay-5',
      'fade-in-up-delay-6',
    ];
    return delays[Math.min(index, 4)];
  };

  return (
    <>
      {/* Header */}
      <section className="w-full py-16 px-4 bg-[#F3EDE2] fade-in-up">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#45140C] font-formadjr mb-4">
            All Projects
          </h1>
          <p className="text-xl text-[#45140C]/70 font-formadjr max-w-2xl">
            A collection of my design and development work across various
            disciplines.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.slug}
                  className={getDelayClass(index)}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[#45140C]/60 font-formadjr">
                No projects found with this filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

