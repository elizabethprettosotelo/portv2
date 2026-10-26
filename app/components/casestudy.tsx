"use client";

import Image from "next/image";
import Link from "next/link";
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
    <div className="w-full bg-[#FAF9F6]">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-100 overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#250D47]/80 via-[#250D47]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-[#FAF9F6] font-formadjr mb-4">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-[#FAF9F6]/90 font-formadjr max-w-3xl">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Meta Info Bar */}
      <section className="w-full border-b-2 border-[#250D47]/10 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Role */}
          <div>
            <div className="text-xs font-bold text-[#8EB522] tracking-wider font-mono mb-2">
              ROLE
            </div>
            <div className="text-base text-[#250D47] font-formadjr">{role}</div>
          </div>

          {/* Timeline */}
          <div>
            <div className="text-xs font-bold text-[#8EB522] tracking-wider font-mono mb-2">
              TIMELINE
            </div>
            <div className="text-base text-[#250D47] font-formadjr">{timeline}</div>
          </div>

          {/* Tools */}
          <div>
            <div className="text-xs font-bold text-[#8EB522] tracking-wider font-mono mb-2">
              TOOLS
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-2 py-1 rounded bg-[#250D47]/10 text-[#250D47] font-inter"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="w-full bg-[#FAF9F6] border-b border-[#250D47]/10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#8EB522] text-[#250D47] text-sm font-medium font-formadjr"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="w-full py-16 px-8 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#250D47] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">📋</span>
            Overview
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#250D47]/90 font-inter leading-relaxed whitespace-pre-line">
              {overview}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#250D47]/10" />

      {/* Problem Section */}
      <section id="problem" className="w-full py-16 px-8 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#250D47] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">❓</span>
            The Problem
          </h2>
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-[#250D47]/90 font-inter leading-relaxed whitespace-pre-line">
              {problem}
            </p>
          </div>
          {problemImage && (
            <div className="relative w-full h-100 rounded-xl overflow-hidden">
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
      <div className="w-full h-px bg-[#250D47]/10" />

      {/* Solution Section */}
      <section id="solution" className="w-full py-16 px-8 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#250D47] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">💡</span>
            The Solution
          </h2>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-[#250D47]/90 font-inter leading-relaxed whitespace-pre-line">
              {solution}
            </p>
          </div>

          {/* Solution Subsections */}
          {solutionSections && solutionSections.length > 0 && (
            <div className="space-y-12">
              {solutionSections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#250D47] font-formadjr">
                    {section.title}
                  </h3>
                  <p className="text-base text-[#250D47]/70 font-inter leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                  {section.image && (
                    <div className="relative w-full h-87.5 rounded-xl overflow-hidden">
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
      <div className="w-full h-px bg-[#250D47]/10" />

      {/* Results Section */}
      <section id="results" className="w-full py-16 px-8 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#250D47] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">✨</span>
            Results & Impact
          </h2>
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-[#250D47]/90 font-inter leading-relaxed whitespace-pre-line">
              {results}
            </p>
          </div>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-[#250D47] rounded-xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-[#8EB522] font-formadjr mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-[#FAF9F6]/80 font-inter">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {resultsImage && (
            <div className="relative w-full h-100 rounded-xl overflow-hidden">
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
          <div className="w-full h-px bg-[#250D47]/10" />
          <section className="w-full py-16 px-8 bg-[#FAF9F6]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#250D47] font-formadjr mb-12 text-center">
                More Visuals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full h-87.5 rounded-xl overflow-hidden"
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
      <section className="w-full py-12 px-8 bg-[#250D47] border-t-2 border-[#9AB1EB]/20">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/projects"
            className="inline-block px-8 py-4 bg-[#8EB522] text-[#250D47] rounded-lg font-formadjr font-bold text-lg hover:bg-[#9AB1EB] transition-all duration-200"
          >
            ← Back to All Projects
          </Link>
        </div>
      </section>
    </div>
  );
}



