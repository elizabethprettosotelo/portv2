"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type Metric = {
  label: string;
  value: string;
};

type CaseStudyResultsProps = {
  results: string;
  metrics?: Metric[];
  resultsImage?: string;
  icon?: string;
  title?: string;
};

export default function CaseStudyResults({ 
  results, 
  metrics, 
  resultsImage,
  icon = "✨",
  title = "Results & Impact"
}: CaseStudyResultsProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'results', label: title });
    return () => unregisterSection('results');
  }, [title]);

  return (
    <>
      <div className="w-full h-px bg-[#45140C]/10" />
      <section id="results" className="w-full py-16 px-8 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-6 flex items-center gap-4">
            <span className="text-3xl">{icon}</span>
            {title}
          </h2>
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-[#45140C]/70 font-inter leading-relaxed whitespace-pre-line">
              {results}
            </p>
          </div>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-[#45140C] rounded-xl p-6 text-center shadow-lg"
                >
                  <div className="text-4xl font-bold text-[#B5AD21] font-formadjr mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-[#F3EDE2]/80 font-inter">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {resultsImage && (
            <div className="relative w-full h-100 rounded-xl overflow-hidden shadow-lg">
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
    </>
  );
}
