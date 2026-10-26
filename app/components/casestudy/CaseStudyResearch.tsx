"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useProjectSections } from '../../contexts/ProjectSectionsContext';

type ResearchGoal = {
  title: string;
  description: string;
};

type ResearchFinding = {
  quote: string;
  author?: string;
};

type PersonaProps = {
  name: string;
  age?: string;
  occupation?: string;
  location?: string;
  image?: string;
  quote?: string;
  bio?: string;
  goals?: string[];
  frustrations?: string[];
  behaviors?: string[];
  motivations?: string[];
};

type CaseStudyResearchProps = {
  sectionNumber?: string;
  introBlurb?: string;
  goals?: ResearchGoal[];
  findings?: ResearchFinding[];
  affinityMapImage?: string;
  themes?: string[];
  personas?: PersonaProps[];
};

export default function CaseStudyResearch({ 
  sectionNumber = "03",
  introBlurb,
  goals,
  findings,
  affinityMapImage,
  themes,
  personas
}: CaseStudyResearchProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: 'research', label: 'Ideation' });
    return () => unregisterSection('research');
  }, [registerSection, unregisterSection]);

  return (
    <section id="research" className="w-full py-12 bg-[#FAF9F6]">
      <div className="w-full">
        {/* Section Number */}
        <div className="text-6xl font-bold text-[#8EB522]/20 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#250D47] font-formadjr mb-6">
          Research
        </h2>

        {/* Intro Blurb */}
        {introBlurb && (
          <p className="text-base text-[#250D47]/70 font-inter leading-relaxed mb-8 italic">
            {introBlurb}
          </p>
        )}

        {/* Research Goals */}
        {goals && goals.length > 0 && (
          <>
            <h3 className="text-xl font-bold text-[#250D47] font-formadjr mb-6">
              Defining goals for user research
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-sm font-bold text-[#8EB522] font-formadjr uppercase tracking-wide">
                    {goal.title}
                  </h4>
                  <p className="text-base text-[#250D47]/80 font-inter leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Key Findings */}
        {findings && findings.length > 0 && (
          <>
            <div className="space-y-4 mb-12">
              {findings.map((finding, index) => (
                <div key={index} className="border-l-4 border-[#9AB1EB] pl-6 py-3 bg-[#9AB1EB]/5">
                  <p className="text-lg text-[#250D47]/90 font-inter italic leading-relaxed">
                    &ldquo;{finding.quote}&rdquo;
                  </p>
                  {finding.author && (
                    <p className="text-xs text-[#250D47]/60 font-inter mt-2">
                      — {finding.author}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Affinity Map */}
        {affinityMapImage && (
          <>
            <h3 className="text-xl font-bold text-[#250D47] font-formadjr mb-6">
              Making sense of user research with affinity mapping
            </h3>
            <div className="relative w-full h-80 rounded-xl overflow-hidden mb-6">
              <Image
                src={affinityMapImage}
                alt="Affinity mapping"
                fill
                className="object-cover"
              />
            </div>
          </>
        )}

        {/* Identified Themes */}
        {themes && themes.length > 0 && (
          <div className="bg-[#8EB522]/5 rounded-lg p-6 border-l-4 border-[#8EB522] mb-12">
            <p className="text-sm font-bold text-[#250D47]/60 font-formadjr mb-3 uppercase tracking-wide">
              Identified patterns & themes:
            </p>
            <ul className="space-y-2">
              {themes.map((theme, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#8EB522] mt-1">•</span>
                  <span className="text-base text-[#250D47]/80 font-inter leading-relaxed">
                    {theme}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* User Personas */}
        {personas && personas.length > 0 && (
          <>
            <h3 className="text-xl font-bold text-[#250D47] font-formadjr mb-6">
              User Personas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {personas.map((persona, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden flex flex-col"
                >
                  {/* Compact Header with Image/Avatar */}
                  <div className="bg-[#250D47] p-6 flex items-center gap-4">
                    {persona.image && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-3 border-[#8EB522]">
                        <Image
                          src={persona.image}
                          alt={persona.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {!persona.image && (
                      <div className="w-16 h-16 rounded-full bg-[#8EB522] flex items-center justify-center shrink-0 border-3 border-[#FAF9F6]">
                        <span className="text-2xl font-bold text-[#250D47] font-formadjr">
                          {persona.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-[#FAF9F6] font-formadjr mb-1 truncate">
                        {persona.name}
                      </h3>
                      <div className="flex flex-col gap-0.5 text-xs text-[#FAF9F6]/70 font-inter">
                        {persona.age && persona.occupation && (
                          <span className="truncate">{persona.age}, {persona.occupation}</span>
                        )}
                        {!persona.occupation && persona.age && <span>{persona.age}</span>}
                        {!persona.age && persona.occupation && <span className="truncate">{persona.occupation}</span>}
                        {persona.location && (
                          <span className="truncate">{persona.location}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Quote */}
                    {persona.quote && (
                      <div className="mb-4 pb-4 border-b border-[#250D47]/10">
                        <div className="relative pl-4">
                          <div className="absolute left-0 top-0 text-2xl text-[#8EB522] font-formadjr leading-none">
                            &ldquo;
                          </div>
                          <p className="text-sm text-[#250D47]/80 font-inter italic leading-relaxed">
                            {persona.quote}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Bio */}
                    {persona.bio && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-[#8EB522] tracking-wider font-mono mb-2 uppercase">
                          Background
                        </h4>
                        <p className="text-sm text-[#250D47]/70 font-inter leading-relaxed line-clamp-3">
                          {persona.bio}
                        </p>
                      </div>
                    )}

                    {/* Goals */}
                    {persona.goals && persona.goals.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-[#8EB522] tracking-wider font-mono mb-2 uppercase">
                          Goals
                        </h4>
                        <ul className="space-y-1.5">
                          {persona.goals.slice(0, 3).map((goal, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-[#250D47]/70 font-inter"
                            >
                              <span className="text-[#8EB522] mt-0.5 text-xs">✓</span>
                              <span className="line-clamp-2">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Frustrations */}
                    {persona.frustrations && persona.frustrations.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-[#9AB1EB] tracking-wider font-mono mb-2 uppercase">
                          Frustrations
                        </h4>
                        <ul className="space-y-1.5">
                          {persona.frustrations.slice(0, 3).map((frustration, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-[#250D47]/70 font-inter"
                            >
                              <span className="text-[#9AB1EB] mt-0.5 text-xs">✗</span>
                              <span className="line-clamp-2">{frustration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Behaviors */}
                    {persona.behaviors && persona.behaviors.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-[#8EB522] tracking-wider font-mono mb-2 uppercase">
                          Behaviors
                        </h4>
                        <ul className="space-y-1.5">
                          {persona.behaviors.slice(0, 3).map((behavior, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-[#250D47]/70 font-inter"
                            >
                              <span className="text-[#8EB522] mt-0.5 text-xs">→</span>
                              <span className="line-clamp-2">{behavior}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Motivations */}
                    {persona.motivations && persona.motivations.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-[#8EB522] tracking-wider font-mono mb-2 uppercase">
                          Motivations
                        </h4>
                        <ul className="space-y-1.5">
                          {persona.motivations.slice(0, 3).map((motivation, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-[#250D47]/70 font-inter"
                            >
                              <span className="text-[#8EB522] mt-0.5 text-xs">★</span>
                              <span className="line-clamp-2">{motivation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}



