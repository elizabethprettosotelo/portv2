"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type ProblemPoint = {
  title: string;
  description: string;
};

type CaseStudyProblemProps = {
  problem?: string;
  problemPoints?: ProblemPoint[];
  problemImage?: string;
  sectionNumber?: string;
  quote?: string;
  quoteAuthor?: string;
};

export default function CaseStudyProblem({ 
  problem,
  problemPoints,
  problemImage,
  sectionNumber = "02",
  quote,
  quoteAuthor
}: CaseStudyProblemProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'problem', label: 'The Problem' });
    return () => unregisterSection('problem');
  }, []);

  return (
    <section id="problem" className="w-full py-12 px-8 bg-[#F3EDE2]">
      <div className="max-w-5xl mx-auto">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#E5B1A4]/30 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-6">
          The Problem
        </h2>
        
        {/* Problem Description (if provided) */}
        {problem && (
          <div className="text-base md:text-lg text-[#45140C]/80 font-inter leading-relaxed max-w-4xl mb-8">
            {problem}
          </div>
        )}
        
        {/* Problem Points Grid */}
        {problemPoints && problemPoints.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {problemPoints.map((point, index) => (
              <div key={index} className="space-y-3">
                <div className="text-sm font-bold text-[#45140C]/50 font-formadjr tracking-wide">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-[#45140C] font-formadjr uppercase tracking-tight">
                  {point.title}
                </h3>
                <p className="text-base text-[#45140C]/70 font-inter leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        )}
        
        {/* Quote */}
        {quote && (
          <div className="border-l-4 border-[#B5AD21] pl-6 py-3 mb-8 max-w-3xl bg-[#B5AD21]/5">
            <p className="text-lg md:text-xl text-[#45140C]/90 font-inter italic leading-relaxed mb-2">
              "{quote}"
            </p>
            {quoteAuthor && (
              <p className="text-xs text-[#45140C]/60 font-inter uppercase tracking-wide">
                — {quoteAuthor}
              </p>
            )}
          </div>
        )}
        
        {/* Problem Image */}
        {problemImage && (
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
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
  );
}
