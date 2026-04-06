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
  }, []);

  return (
    <section id="results" className="w-full py-12 px-8 bg-[#F3EDE2]">
      <div className="max-w-5xl mx-auto">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#E5B1A4]/30 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-6">
          Outcomes & Impact
        </h2>
        
        {/* Metrics Grid */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-[#B5AD21]/10 to-[#E5B1A4]/10 border-2 border-[#B5AD21]/20">
                <div className="text-4xl md:text-5xl font-black text-[#45140C] font-formadjr mb-2">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-[#45140C]/60 font-inter uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Results Description */}
        {results && (
          <div className="text-base md:text-lg text-[#45140C]/80 font-inter leading-relaxed max-w-4xl mb-8">
            {results}
          </div>
        )}

        {/* Results Image */}
        {resultsImage && (
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
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
