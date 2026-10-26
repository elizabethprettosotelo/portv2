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
    registerSection({ id: 'problem', label: 'Define' });
    return () => unregisterSection('problem');
  }, [registerSection, unregisterSection]);

  return (
    <section id="problem" className="w-full py-12 bg-[#FAF9F6]">
      <div className="w-full">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#9AB1EB]/30 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#250D47] font-formadjr mb-6">
          The Problem
        </h2>
        
        {/* Problem Description (if provided) */}
        {problem && (
          <div className="text-base md:text-lg text-[#250D47]/80 font-inter leading-relaxed max-w-4xl mb-8">
            {problem}
          </div>
        )}
        
        {/* Problem Points Grid */}
        {problemPoints && problemPoints.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {problemPoints.map((point, index) => (
              <div key={index} className="space-y-3">
                <div className="text-sm font-bold text-[#250D47]/50 font-formadjr tracking-wide">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-[#250D47] font-formadjr uppercase tracking-tight">
                  {point.title}
                </h3>
                <p className="text-base text-[#250D47]/70 font-inter leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        )}
        
        {/* Quote */}
        {quote && (
          <div className="border-l-4 border-[#8EB522] pl-6 py-3 mb-8 max-w-3xl bg-[#8EB522]/5">
            <p className="text-lg md:text-xl text-[#250D47]/90 font-inter italic leading-relaxed mb-2">
              &ldquo;{quote}&rdquo;
            </p>
            {quoteAuthor && (
              <p className="text-xs text-[#250D47]/60 font-inter uppercase tracking-wide">
                — {quoteAuthor}
              </p>
            )}
          </div>
        )}
        
        {/* Problem Image */}
        {problemImage && (
          <div className="relative w-full h-80 rounded-xl overflow-hidden">
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



