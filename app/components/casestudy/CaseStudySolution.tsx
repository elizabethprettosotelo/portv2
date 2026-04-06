"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type SolutionSection = {
  title: string;
  content: string;
  image?: string;
};

type CaseStudySolutionProps = {
  solution: string;
  solutionSections?: SolutionSection[];
  icon?: string;
  title?: string;
};

export default function CaseStudySolution({ 
  solution, 
  solutionSections,
  icon = "💡",
  title = "The Solution"
}: CaseStudySolutionProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'solution', label: title });
    return () => unregisterSection('solution');
  }, [title]);

  return (
    <>
      <div className="w-full h-px bg-[#45140C]/10" />
      <section id="solution" className="w-full py-16 px-8 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">{icon}</span>
            {title}
          </h2>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-[#45140C]/70 font-inter leading-relaxed whitespace-pre-line">
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
                  <p className="text-base text-[#45140C]/70 font-inter leading-relaxed whitespace-pre-line">
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
    </>
  );
}
