"use client";

import { useEffect } from 'react';
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type Takeaway = {
  title: string;
  description: string;
};

type CaseStudyTakeawaysProps = {
  sectionNumber?: string;
  impact?: string;
  takeaways: Takeaway[];
};

export default function CaseStudyTakeaways({ 
  sectionNumber = "08",
  impact,
  takeaways
}: CaseStudyTakeawaysProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'takeaways', label: 'Takeaways' });
    return () => unregisterSection('takeaways');
  }, []);

  return (
    <section id="takeaways" className="w-full py-12 px-8 bg-[#F3EDE2]">
      <div className="max-w-5xl mx-auto">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#B5AD21]/20 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-6">
          Impact & Takeaways
        </h2>

        {/* Impact Statement */}
        {impact && (
          <p className="text-base md:text-lg text-[#45140C]/80 font-inter leading-relaxed mb-12">
            {impact}
          </p>
        )}

        {/* Takeaways */}
        <h3 className="text-lg font-bold text-[#45140C] font-formadjr mb-6">
          Key takeaways:
        </h3>

        <div className="space-y-6">
          {takeaways.map((takeaway, index) => (
            <div key={index} className="border-l-4 border-[#E5B1A4] pl-6 py-2">
              <h4 className="text-base font-bold text-[#45140C] font-formadjr mb-2">
                {takeaway.title}
              </h4>
              <p className="text-base text-[#45140C]/80 font-inter leading-relaxed">
                {takeaway.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
