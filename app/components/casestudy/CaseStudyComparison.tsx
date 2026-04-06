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
    registerSection({ id: 'comparison', label: 'Comparison' });
    return () => unregisterSection('comparison');
  }, []);

  return (
    <section id="comparison" className="w-full py-12 px-8 bg-[#F3EDE2]">
      <div className="max-w-5xl mx-auto">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#B5AD21]/20 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-6">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-base text-[#45140C]/80 font-inter leading-relaxed mb-8">
            {description}
          </p>
        )}

        {/* Comparison Items */}
        <div className="space-y-12">
          {comparisons.map((item, index) => (
            <div key={index} className="space-y-4">
              {/* Item Title */}
              <h3 className="text-xl font-bold text-[#45140C] font-formadjr">
                {item.title}
              </h3>
              
              {/* Item Description */}
              {item.description && (
                <p className="text-base text-[#45140C]/70 font-inter leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Before/After Grid */}
              <div className="flex gap-6 items-start justify-center flex-wrap">
                {/* Before */}
                <div className="space-y-3 flex-shrink-0">
                  <div className="inline-block px-3 py-1 bg-[#E5B1A4]/20 border border-[#E5B1A4]/40 rounded-md">
                    <span className="text-xs font-bold text-[#45140C]/70 font-formadjr uppercase tracking-wide">
                      Before
                    </span>
                  </div>
                  <div className="relative h-96 w-auto rounded-xl overflow-hidden shadow-lg border border-[#45140C]/10">
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
                <div className="space-y-3 flex-shrink-0">
                  <div className="inline-block px-3 py-1 bg-[#B5AD21]/20 border border-[#B5AD21]/40 rounded-md">
                    <span className="text-xs font-bold text-[#45140C]/70 font-formadjr uppercase tracking-wide">
                      After
                    </span>
                  </div>
                  <div className="relative h-96 w-auto rounded-xl overflow-hidden shadow-lg border border-[#B5AD21]/20 hover:border-[#B5AD21]/40 transition-colors bg-white">
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
