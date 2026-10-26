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
  }, [registerSection, unregisterSection]);

  return (
    <section id="takeaways" className="w-full py-12 bg-[#FAF9F6]">
      <div className="w-full">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#8EB522]/20 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#250D47] font-formadjr mb-6">
          Impact & Takeaways
        </h2>

        {/* Impact Statement */}
        {impact && (
          <p className="text-base md:text-lg text-[#250D47]/80 font-inter leading-relaxed mb-12">
            {impact}
          </p>
        )}

        {/* Takeaways */}
        <h3 className="text-lg font-bold text-[#250D47] font-formadjr mb-6">
          Key takeaways:
        </h3>

        <div className="space-y-6">
          {takeaways.map((takeaway, index) => (
            <div key={index} className="border-l-4 border-[#9AB1EB] pl-6 py-2">
              <h4 className="text-base font-bold text-[#250D47] font-formadjr mb-2">
                {takeaway.title}
              </h4>
              <p className="text-base text-[#250D47]/80 font-inter leading-relaxed">
                {takeaway.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



