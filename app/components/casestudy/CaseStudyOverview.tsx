"use client";

import { useEffect } from 'react';
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type CaseStudyOverviewProps = {
  overview: string;
  sectionNumber?: string;
};

export default function CaseStudyOverview({ overview, sectionNumber = "01" }: CaseStudyOverviewProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'overview', label: 'Overview' });
    return () => unregisterSection('overview');
  }, []);

  return (
    <section id="overview" className="w-full py-12 px-8 bg-[#F3EDE2]">
      <div className="max-w-5xl mx-auto">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#B5AD21]/20 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-6">
          Context
        </h2>
        
        {/* Content */}
        <div className="text-base md:text-lg text-[#45140C]/80 font-inter leading-relaxed max-w-4xl">
          {overview}
        </div>
      </div>
    </section>
  );
}
