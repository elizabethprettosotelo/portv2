"use client";

import Image from "next/image";
import { ReactNode } from "react";

type CaseStudyProps = {
  // Hero Section
  title: string;
  subtitle: string;
  heroImage: string;
  
  // Meta Info
  role: string;
  timeline: string;
  tools: string[];
  tags: string[];
  
  // Overview
  overview: string;
  
  // Problem
  problem: string;
  problemImage?: string;
  
  // Solution
  solution: string;
  solutionSections?: {
    title: string;
    content: string;
    image?: string;
  }[];
  
  // Results
  results: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  resultsImage?: string;
  
  // Additional Images
  gallery?: string[];
};

export default function CaseStudy({
  title,
  subtitle,
  heroImage,
  role,
  timeline,
  tools,
  tags,
  overview,
  problem,
  problemImage,
  solution,
  solutionSections,
  results,
  metrics,
  resultsImage,
  gallery,
}: CaseStudyProps) {
  return (
    <div className="w-full bg-[#F3EDE2]">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-100 overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#45140C]/80 via-[#45140C]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-[#F3EDE2] font-formadjr mb-4">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-[#F3EDE2]/90 font-formadjr max-w-3xl">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Meta Info Bar */}
      <section className="w-full border-b-2 border-[#45140C]/10 bg-[#F3EDE2]">
        <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Role */}
          <div>
            <div className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2">
              ROLE
            </div>
            <div className="text-base text-[#45140C] font-formadjr">{role}</div>
          </div>

          {/* Timeline */}
          <div>
            <div className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2">
              TIMELINE
            </div>
            <div className="text-base text-[#45140C] font-formadjr">{timeline}</div>
          </div>

          {/* Tools */}
          <div>
            <div className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2">
              TOOLS
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-2 py-1 rounded bg-[#45140C]/10 text-[#45140C] font-inter"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="w-full bg-[#F3EDE2] border-b border-[#45140C]/10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#B5AD21] text-[#45140C] text-sm font-medium font-formadjr"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="w-full py-16 px-8 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">📋</span>
            Overview
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#45140C]/90 font-inter leading-relaxed whitespace-pre-line">
              {overview}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#45140C]/10" />

      {/* Problem Section */}
      <section id="problem" className="w-full py-16 px-8 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">❓</span>
            The Problem
          </h2>
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-[#45140C]/90 font-inter leading-relaxed whitespace-pre-line">
              {problem}
            </p>
          </div>
          {problemImage && (
            <div className="relative w-full h-100 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={problemImage}
                alt="Problem visualization"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#45140C]/10" />

      {/* Solution Section */}
      <section id="solution" className="w-full py-16 px-8 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">💡</span>
            The Solution
          </h2>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-[#45140C]/90 font-inter leading-relaxed whitespace-pre-line">
              {solution}
            </p>
          </div>

          {/* Solution Subsections */}
          {solutionSections && solutionSections.length > 0 && (
            <div className="space-y-12">
              {solutionSections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#45140C] font-formadjr">
                    {section.title}
                  </h3>
                  <p className="text-base text-[#45140C]/90 font-inter leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                  {section.image && (
                    <div className="relative w-full h-87.5 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#45140C]/10" />

      {/* Results Section */}
      <section id="results" className="w-full py-16 px-8 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">✨</span>
            Results & Impact
          </h2>
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-[#45140C]/90 font-inter leading-relaxed whitespace-pre-line">
              {results}
            </p>
          </div>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-[#45140C] rounded-xl p-6 text-center shadow-lg"
                >
                  <div className="text-4xl font-bold text-[#B5AD21] font-formadjr mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-[#F3EDE2]/80 font-inter">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {resultsImage && (
            <div className="relative w-full h-100 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={resultsImage}
                alt="Results visualization"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      {gallery && gallery.length > 0 && (
        <>
          <div className="w-full h-px bg-[#45140C]/10" />
          <section className="w-full py-16 px-8 bg-[#F3EDE2]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-12 text-center">
                More Visuals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full h-87.5 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Back to Projects CTA */}
      <section className="w-full py-12 px-8 bg-[#45140C] border-t-2 border-[#E5B1A4]/20">
        <div className="max-w-4xl mx-auto text-center">
          <a
            href="/projects"
            className="inline-block px-8 py-4 bg-[#B5AD21] text-[#45140C] rounded-lg font-formadjr font-bold text-lg hover:bg-[#E5B1A4] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            ← Back to All Projects
          </a>
        </div>
      </section>
    </div>
  );
}
