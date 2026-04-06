"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type SolutionSection = {
  title: string;
  content: string;
  whyItMatters?: string;
  image?: string;
};

type CaseStudySolutionProps = {
  solution?: string;
  solutionSections?: SolutionSection[];
  sectionNumber?: string;
};

export default function CaseStudySolution({ 
  solution, 
  solutionSections,
  sectionNumber = "05"
}: CaseStudySolutionProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'solution', label: 'Design Process' });
    return () => unregisterSection('solution');
  }, []);

  return (
    <section id="solution" className="w-full py-12 px-8 bg-[#F3EDE2]">
      <div className="max-w-5xl mx-auto">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#B5AD21]/20 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-6">
          Design Process
        </h2>
        
        {/* Solution Description */}
        {solution && (
          <div className="text-base md:text-lg text-[#45140C]/80 font-inter leading-relaxed max-w-4xl mb-10">
            {solution}
          </div>
        )}

        {/* Process Sections */}
        {solutionSections && solutionSections.length > 0 && (
          <div className="space-y-10">
            {solutionSections.map((section, index) => (
              <div key={index} className="space-y-4">
                {/* Section Image */}
                {section.image && (
                  <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg mb-4">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* Section Title */}
                <h3 className="text-sm font-bold text-[#B5AD21] font-formadjr uppercase tracking-widest">
                  {section.title}
                </h3>
                
                {/* Main Content */}
                <p className="text-base text-[#45140C]/80 font-inter leading-relaxed">
                  {section.content}
                </p>
                
                {/* Why It Matters */}
                {section.whyItMatters && (
                  <div className="bg-[#E5B1A4]/10 border-l-4 border-[#E5B1A4] pl-6 py-3 rounded-r-lg">
                    <p className="text-sm font-bold text-[#45140C]/60 font-formadjr mb-2 uppercase tracking-wide">
                      Why this mattered:
                    </p>
                    <p className="text-base text-[#45140C]/70 font-inter leading-relaxed">
                      {section.whyItMatters}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
