"use client";

import { useEffect } from 'react';
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type CaseStudyOverviewProps = {
  overview: string;
  sectionNumber?: string;
  title?: string;
};

export default function CaseStudyOverview({ overview, sectionNumber = "01", title = "Context" }: CaseStudyOverviewProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'overview', label: 'Overview' });
    return () => unregisterSection('overview');
  }, [registerSection, unregisterSection]);

  return (
    <section id="overview" className="w-full py-12 bg-[#F0F1E3]">
      <div className="w-full">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#8EB522]/20 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#250D47] font-formadjr mb-6">
          {title}
        </h2>
        
        {/* Content */}
        <div className="text-base md:text-lg text-[#250D47]/80 font-inter leading-relaxed max-w-4xl">
          {overview}
        </div>
      </div>
    </section>
  );
}



