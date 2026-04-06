"use client";

import { useEffect } from 'react';
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type Insight = {
  title: string;
  description: string;
};

type CaseStudyInsightsProps = {
  sectionNumber?: string;
  insights: Insight[];
  hmwStatement?: string;
};

export default function CaseStudyInsights({ 
  sectionNumber = "04",
  insights,
  hmwStatement
}: CaseStudyInsightsProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'insights', label: 'Define' });
    return () => unregisterSection('insights');
  }, []);

  return (
    <section id="insights" className="w-full py-12 px-8 bg-[#F3EDE2]">
      <div className="max-w-5xl mx-auto">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#E5B1A4]/30 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-6">
          Define
        </h2>

        {/* Key Insights */}
        <h3 className="text-xl font-bold text-[#45140C] font-formadjr mb-6">
          What's making this problem so difficult for users?
        </h3>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {insights.map((insight, index) => (
            <div key={index} className="bg-gradient-to-br from-[#B5AD21]/5 to-[#E5B1A4]/5 rounded-lg p-6 border-2 border-[#45140C]/5">
              <h4 className="text-sm font-bold text-[#E5B1A4] font-formadjr mb-3 uppercase tracking-wide">
                {insight.title}
              </h4>
              <p className="text-base text-[#45140C]/80 font-inter leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))}
        </div>

        {/* How Might We */}
        {hmwStatement && (
          <div className="bg-[#45140C] rounded-xl p-8 text-center">
            <p className="text-sm font-bold text-[#B5AD21] font-formadjr mb-3 uppercase tracking-widest">
              How might we
            </p>
            <p className="text-2xl md:text-3xl font-bold text-[#F3EDE2] font-formadjr leading-tight">
              {hmwStatement}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
