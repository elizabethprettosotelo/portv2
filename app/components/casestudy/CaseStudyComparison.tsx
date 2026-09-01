"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type ComparisonItem = {
  title: string;
  before: string; // image path for before state
  after: string; // image path for after state
  description?: string;
};

type CaseStudyComparisonProps = {
  sectionNumber?: string;
  title?: string;
  description?: string;
  comparisons: ComparisonItem[];
};

export default function CaseStudyComparison({ 
  sectionNumber = "05",
  title = "Before & After",
  description,
  comparisons
}: CaseStudyComparisonProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'comparison', label: 'Prototyping' });
    return () => unregisterSection('comparison');
  }, [registerSection, unregisterSection]);

  return (
    <section id="comparison" className="w-full py-12 bg-[#F0F1E3]">
      <div className="w-full">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#8EB522]/20 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#250D47] font-formadjr mb-6">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-base text-[#250D47]/80 font-inter leading-relaxed mb-8">
            {description}
          </p>
        )}

        {/* Comparison Items */}
        <div className="space-y-12">
          {comparisons.map((item, index) => (
            <div key={index} className="space-y-4">
              {/* Item Title */}
              <h3 className="text-xl font-bold text-[#250D47] font-formadjr">
                {item.title}
              </h3>
              
              {/* Item Description */}
              {item.description && (
                <p className="text-base text-[#250D47]/70 font-inter leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Before/After Grid */}
              <div className="flex gap-6 items-start justify-center flex-wrap">
                {/* Before */}
                <div className="space-y-3 shrink-0">
                  <div className="inline-block px-3 py-1 bg-[#9AB1EB]/20 border border-[#9AB1EB]/40 rounded-md">
                    <span className="text-xs font-bold text-[#250D47]/70 font-formadjr uppercase tracking-wide">
                      Before
                    </span>
                  </div>
                  <div className="relative h-96 w-auto rounded-xl overflow-hidden border border-[#250D47]/10">
                    <Image
                      src={item.before}
                      alt={`${item.title} - Before`}
                      width={512}
                      height={384}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3 shrink-0">
                  <div className="inline-block px-3 py-1 bg-[#8EB522]/20 border border-[#8EB522]/40 rounded-md">
                    <span className="text-xs font-bold text-[#250D47]/70 font-formadjr uppercase tracking-wide">
                      After
                    </span>
                  </div>
                  <div className="relative h-96 w-auto rounded-xl overflow-hidden border border-[#8EB522]/20 hover:border-[#8EB522]/40 transition-colors bg-white">
                    <Image
                      src={item.after}
                      alt={`${item.title} - After`}
                      width={1024}
                      height={576}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



