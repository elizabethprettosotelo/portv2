"use client";

import { useEffect } from 'react';
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type CaseStudyFigmaEmbedProps = {
  sectionNumber?: string;
  title?: string;
  description?: string;
  figmaUrl: string;
  height?: string;
};

export default function CaseStudyFigmaEmbed({ 
  sectionNumber = "05",
  title = "Interactive Prototype",
  description,
  figmaUrl,
  height = "600px"
}: CaseStudyFigmaEmbedProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'prototype', label: 'Prototype' });
    return () => unregisterSection('prototype');
  }, []);

  return (
    <section id="prototype" className="w-full py-12 px-8 bg-[#F3EDE2]">
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

        {/* Figma Embed */}
        <div className="relative w-full rounded-xl overflow-hidden border border-[#B5AD21]/20 shadow-lg bg-white">
          <iframe 
            style={{ border: 'none', display: 'block' }} 
            width="100%" 
            height={height}
            src={figmaUrl}
            allowFullScreen
            title={title}
          />
        </div>

        {/* Helper Text */}
        <p className="text-xs text-[#45140C]/50 font-inter mt-3 text-center italic">
          Click and drag to explore the interactive prototype
        </p>
      </div>
    </section>
  );
}
