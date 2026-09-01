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
    registerSection({ id: 'insights', label: 'Ideation' });
    return () => unregisterSection('insights');
  }, [registerSection, unregisterSection]);

  return (
    <section id="insights" className="w-full py-12 bg-[#F0F1E3]">
      <div className="w-full">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#9AB1EB]/30 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#250D47] font-formadjr mb-6">
          Define
        </h2>

        {/* Key Insights */}
        <h3 className="text-xl font-bold text-[#250D47] font-formadjr mb-6">
          What&apos;s making this problem so difficult for users?
        </h3>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {insights.map((insight, index) => (
            <div key={index} className="bg-linear-to-br from-[#8EB522]/5 to-[#9AB1EB]/5 rounded-lg p-6 border-2 border-[#250D47]/5">
              <h4 className="text-sm font-bold text-[#9AB1EB] font-formadjr mb-3 uppercase tracking-wide">
                {insight.title}
              </h4>
              <p className="text-base text-[#250D47]/80 font-inter leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))}
        </div>

        {/* How Might We */}
        {hmwStatement && (
          <div className="bg-[#250D47] rounded-xl p-8 text-center">
            <p className="text-sm font-bold text-[#8EB522] font-formadjr mb-3 uppercase tracking-widest">
              How might we
            </p>
            <p className="text-2xl md:text-3xl font-bold text-[#F0F1E3] font-formadjr leading-tight">
              {hmwStatement}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}



