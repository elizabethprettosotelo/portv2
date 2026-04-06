"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type CaseStudyProblemProps = {
  problem: string;
  problemImage?: string;
  icon?: string;
  title?: string;
};

export default function CaseStudyProblem({ 
  problem, 
  problemImage,
  icon = "❓",
  title = "The Problem"
}: CaseStudyProblemProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'problem', label: title });
    return () => unregisterSection('problem');
  }, [title]);

  return (
    <>
      <div className="w-full h-px bg-[#45140C]/10" />
      <section id="problem" className="w-full py-16 px-8 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">{icon}</span>
            {title}
          </h2>
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-[#45140C]/70 font-inter leading-relaxed whitespace-pre-line">
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
    </>
  );
}
