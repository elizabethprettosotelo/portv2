"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useProjectSections } from "../../contexts/ProjectSectionsContext";

interface PersonaProps {
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
}

interface CaseStudyPersonaProps {
  title?: string;
  personas: PersonaProps[];
}

export default function CaseStudyPersona({
  title = "User Personas",
  personas,
}: CaseStudyPersonaProps) {
  const { registerSection, unregisterSection } = useProjectSections();

  useEffect(() => {
    registerSection({ id: "personas", label: "Personas" });
    return () => {
      unregisterSection("personas");
    };
  }, []);

  return (
    <section id="personas" className="w-full py-16 px-6 bg-[#F3EDE2] fade-in-up-delay-3">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-4">
          {title}
        </h2>
        <div className="w-20 h-1 bg-[#B5AD21] mb-12"></div>

        {/* Personas Grid - 2-3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Compact Header with Image/Avatar */}
              <div className="bg-[#45140C] p-6 flex items-center gap-4">
                {persona.image && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-3 border-[#B5AD21]">
                    <Image
                      src={persona.image}
                      alt={persona.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {!persona.image && (
                  <div className="w-16 h-16 rounded-full bg-[#B5AD21] flex items-center justify-center shrink-0 border-3 border-[#F3EDE2]">
                    <span className="text-2xl font-bold text-[#45140C] font-formadjr">
                      {persona.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-[#F3EDE2] font-formadjr mb-1 truncate">
                    {persona.name}
                  </h3>
                  <div className="flex flex-col gap-0.5 text-xs text-[#F3EDE2]/70 font-inter">
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
                  <div className="mb-4 pb-4 border-b border-[#45140C]/10">
                    <div className="relative pl-4">
                      <div className="absolute left-0 top-0 text-2xl text-[#B5AD21] font-formadjr leading-none">
                        "
                      </div>
                      <p className="text-sm text-[#45140C]/80 font-inter italic leading-relaxed">
                        {persona.quote}
                      </p>
                    </div>
                  </div>
                )}

                {/* Bio */}
                {persona.bio && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2 uppercase">
                      Background
                    </h4>
                    <p className="text-sm text-[#45140C]/70 font-inter leading-relaxed line-clamp-3">
                      {persona.bio}
                    </p>
                  </div>
                )}

                {/* Goals */}
                {persona.goals && persona.goals.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2 uppercase">
                      Goals
                    </h4>
                    <ul className="space-y-1.5">
                      {persona.goals.slice(0, 3).map((goal, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[#45140C]/70 font-inter"
                        >
                          <span className="text-[#B5AD21] mt-0.5 text-xs">✓</span>
                          <span className="line-clamp-2">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Frustrations */}
                {persona.frustrations && persona.frustrations.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#E5B1A4] tracking-wider font-mono mb-2 uppercase">
                      Frustrations
                    </h4>
                    <ul className="space-y-1.5">
                      {persona.frustrations.slice(0, 3).map((frustration, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[#45140C]/70 font-inter"
                        >
                          <span className="text-[#E5B1A4] mt-0.5 text-xs">✗</span>
                          <span className="line-clamp-2">{frustration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Behaviors */}
                {persona.behaviors && persona.behaviors.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2 uppercase">
                      Behaviors
                    </h4>
                    <ul className="space-y-1.5">
                      {persona.behaviors.slice(0, 3).map((behavior, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[#45140C]/70 font-inter"
                        >
                          <span className="text-[#B5AD21] mt-0.5 text-xs">→</span>
                          <span className="line-clamp-2">{behavior}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Motivations */}
                {persona.motivations && persona.motivations.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2 uppercase">
                      Motivations
                    </h4>
                    <ul className="space-y-1.5">
                      {persona.motivations.slice(0, 3).map((motivation, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[#45140C]/70 font-inter"
                        >
                          <span className="text-[#B5AD21] mt-0.5 text-xs">★</span>
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
      </div>
    </section>
  );
}
