"use client";

import Image from "next/image";
import { useState } from "react";

type Experience = {
  role: string;
  company: string;
  location: string;
  dateRange: string;
  type: string; // e.g. "Full-time", "Internship", "Freelance", "Volunteer"
  description: string;
  bullets: string[];
  skills: string[];
  logo?: string; // optional path to company logo, e.g. "/logos/company.png"
};

const experiences: Experience[] = [
  {
    role: "UX Designer",
    company: "Company Name",
    location: "City, State",
    dateRange: "Jan 2024 – Present",
    type: "Full-time",
    description: "A short overview of this role and what you worked on. Keep it to 1–2 sentences that set the stage.",
    bullets: [
      "Led end-to-end design of a feature used by 10k+ users.",
      "Collaborated with engineers and PMs to ship product updates.",
      "Conducted user research and synthesized findings into design decisions.",
    ],
    skills: ["Figma", "User Research", "Prototyping"],
    logo: "/logos/company1.png",
  },
  {
    role: "Product Design Intern",
    company: "Another Company",
    location: "Remote",
    dateRange: "May 2023 – Aug 2023",
    type: "Internship",
    description: "A short overview of this internship and the team you were part of.",
    bullets: [
      "Redesigned onboarding flow, reducing drop-off by 20%.",
      "Built and maintained a component library in Figma.",
    ],
    skills: ["Figma", "Design Systems", "Usability Testing"],
    logo: "/logos/company2.png",
  },
  {
    role: "Freelance Designer",
    company: "Independent",
    location: "Remote",
    dateRange: "2022 – Present",
    type: "Freelance",
    description: "Worked with small businesses and startups to craft brand identities and digital experiences.",
    bullets: [
      "Delivered brand identities for 5+ clients.",
      "Designed marketing sites and landing pages.",
    ],
    skills: ["Branding", "Web Design", "Illustration"],
    // no logo for freelance
  },
];

const typeColors: Record<string, string> = {
  "Full-time": "bg-[#F3EDE2] text-[#45140C]",
  "Internship": "bg-[#B5AD21] text-[#45140C]",
  "Freelance": "bg-[#E5B1A4] text-[#45140C]",
  "Volunteer": "bg-[#F3EDE2]/70 text-[#45140C]",
};

function ExperienceCard({ experience }: { experience: Experience }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full max-w-2xl bg-[#45140C] rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            {/* Company logo */}
            {experience.logo && (
              <div className="w-12 h-12 rounded-lg bg-[#F3EDE2] flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  width={44}
                  height={44}
                  className="object-contain w-full h-full p-1"
                />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-[#F3EDE2] font-formadjr leading-tight">
                {experience.role}
              </h3>
              <p className="text-[#E5B1A4] text-lg font-formadjr font-medium">
                {experience.company}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-formadjr font-semibold px-3 py-1 rounded-full mt-1 shrink-0 ${typeColors[experience.type] ?? "bg-[#F3EDE2] text-[#45140C]"}`}
          >
            {experience.type}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-[#F3EDE2]/70 font-inter">
          <span>📍 {experience.location}</span>
          <span>🗓 {experience.dateRange}</span>
        </div>

        {/* Description */}
        <p className="mt-3 text-[#F3EDE2]/90 text-base font-inter leading-relaxed">
          {experience.description}
        </p>
      </div>

      {/* Expandable bullets */}
      <div className="px-5 pb-2">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-sm text-[#E5B1A4] font-formadjr font-medium hover:text-[#B5AD21] transition flex items-center gap-1"
        >
          {expanded ? "Hide details ▲" : "Show details ▼"}
        </button>

        {expanded && (
          <ul className="mt-3 space-y-2 list-none">
            {experience.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-[#F3EDE2]/90 text-sm font-inter leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E5B1A4] shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Skills */}
      <div className="px-5 pb-5 pt-2 flex flex-wrap gap-2">
        {experience.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-full border border-[#F3EDE2]/30 text-[#F3EDE2]/80 font-formadjr"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experiences() {
  return (
    <section id="experiences" className="w-full py-16 px-4 bg-[#F3EDE2]">
      <h2 className="text-4xl font-bold text-[#45140C] font-formadjr mb-12 text-center">
        Experience
      </h2>

      {/* Timeline layout */}
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-[#45140C]/30"
          style={{ left: "-2rem" }}
        />

        {experiences.map((exp, i) => (
          <div key={i} className="relative mb-10">
            {/* Timeline node */}
            <div
              className="absolute w-3 h-3 rounded-full bg-[#B5AD21] border-2 border-[#F3EDE2]"
              style={{ left: "-2.375rem", top: "50%", transform: "translateY(-50%)" }}
            />
            <ExperienceCard experience={exp} />
          </div>
        ))}
      </div>
    </section>
  );
}

