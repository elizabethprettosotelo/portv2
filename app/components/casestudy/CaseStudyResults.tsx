"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type Metric = {
  label: string;
  value: string;
};

type CaseStudyResultsProps = {
  results?: string;
  metrics?: Metric[];
  resultsImage?: string;
  sectionNumber?: string;
};

export default function CaseStudyResults({ 
  results, 
  metrics, 
  resultsImage,
  sectionNumber = "07"
}: CaseStudyResultsProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'results', label: 'Outcomes & Impact' });
    return () => unregisterSection('results');
  }, [registerSection, unregisterSection]);

  return (
    <section id="results" className="w-full py-12 bg-[#FAF9F6]">
      <div className="w-full">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#9AB1EB]/30 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#250D47] font-formadjr mb-6">
          Outcomes & Impact
        </h2>
        
        {/* Metrics Grid */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-linear-to-br from-[#8EB522]/10 to-[#9AB1EB]/10 border-2 border-[#8EB522]/20">
                <div className="text-4xl md:text-5xl font-black text-[#250D47] font-formadjr mb-2">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-[#250D47]/60 font-inter uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Results Description */}
        {results && (
          <div className="text-base md:text-lg text-[#250D47]/80 font-inter leading-relaxed max-w-4xl mb-8">
            {results}
          </div>
        )}

        {/* Results Image */}
        {resultsImage && (
          <div className="relative w-full h-80 rounded-xl overflow-hidden">
            <Image
              src={resultsImage}
              alt="Results visualization"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}



