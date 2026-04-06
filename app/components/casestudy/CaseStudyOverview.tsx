"use client";

import { useEffect } from 'react';
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type CaseStudyOverviewProps = {
  overview: string;
};

export default function CaseStudyOverview({ overview }: CaseStudyOverviewProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'overview', label: 'Overview' });
    return () => unregisterSection('overview');
  }, []);

  return (
    <section id="overview" className="w-full py-16 px-8 bg-[#F3EDE2] fade-in-up-delay-3">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-6 flex items-center gap-4">
          <span className="text-3xl">📋</span>
          Overview
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-[#45140C]/70 font-inter leading-relaxed whitespace-pre-line">
            {overview}
          </p>
        </div>
      </div>
    </section>
  );
}
