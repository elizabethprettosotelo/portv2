"use client";

import Image from "next/image";

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
    role: "UX/UI Designer & Software Engineer",
    company: "UCF Center of Distributed Learning",
    location: "Orlando, FL",
    dateRange: "Oct. 2025 – Present",
    type: "Internship",
    description: "Designing and developing for Materia, an open-source lesson-gamifying platform, bridging the gap between UX/UI design and hands-on front-end development.",
    bullets: [
      "Designed and iterated on interactive UX/UI prototypes in Figma, applying user-centered design principles to gamify learning experiences.",
      "Implemented finalized UX/UI designs through hands-on development, translating visual and interaction designs directly into functional code.",
      "Served as both designer and programmer on the project, contributing across the full design-to-development pipeline.",
    ],
    skills: ["Figma", "UX/UI Design", "Front-End Development", "User-Centered Design"],
  },
  {
    role: "Design Director",
    company: "Knight Hacks",
    location: "UCF, Orlando, FL",
    dateRange: "Jan. 2026 – Mar. 2026",
    type: "Volunteer",
    description: "Led design efforts for UCF's largest software engineering club and its premier Hackathon, Knight Hacks, ensuring a positive and enriching experience for all participants.",
    bullets: [
      "Organized and directed design contributions for Knight Hacks' annual hackathon event.",
      "Designed graphics for merchandise, the hackathon site, and branding that stay true to Knight Hacks' mission.",
    ],
    skills: ["Graphic Design", "Branding", "Event Design", "Figma"],
  },
  {
    role: "UX/UI Design & Web Development Intern",
    company: "C² Technologies",
    location: "Remote",
    dateRange: "Aug. 2025 – Oct. 2025",
    type: "Internship",
    description: "Supported C² Technologies' adaptable learning platform, Adapt2Learn, through UX/UI design and digital marketing asset creation.",
    bullets: [
      "Designed and prototyped interactive, demo-ready websites in Figma to support Adapt2Learn, ensuring user-friendly layouts and modern UI practices.",
      "Created digital marketing assets and graphic deliverables aligned with brand guidelines.",
      "Elevated company visibility at showcases, client demonstrations, and internal presentations.",
    ],
    skills: ["Figma", "UX/UI Design", "Web Design", "Graphic Design", "Branding"],
  },
];

const typeColors: Record<string, string> = {
  "Full-time": "bg-[#F3EDE2] text-[#45140C]",
  "Internship": "bg-[#B5AD21] text-[#45140C]",
  "Freelance": "bg-[#E5B1A4] text-[#45140C]",
  "Volunteer": "bg-[#F3EDE2]/70 text-[#45140C]",
};

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="relative w-full max-w-2xl bg-[#F3EDE2] border border-[#45140C]/20 rounded-xl shadow-sm overflow-hidden hover:shadow-[0_4px_12px_rgba(229,177,164,0.4)] transition-all duration-200">
      {/* Type pill — overlaid top-right */}
      <span
        className={`absolute top-3 right-3 z-10 text-xs font-formadjr font-semibold px-3 py-1 rounded-full ${typeColors[experience.type] ?? "bg-[#45140C]/10 text-[#45140C]"}`}
      >
        {experience.type}
      </span>

      <div className="px-6 py-5">
        <div className="flex items-center gap-3 flex-wrap pr-24">
          {/* Company logo */}
          {experience.logo && (
            <div className="w-11 h-11 rounded-lg bg-[#45140C]/10 flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={40}
                height={40}
                className="object-contain w-full h-full p-1"
              />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-[#45140C] font-formadjr leading-snug tracking-wide">
              {experience.role}
            </h3>
            <p className="text-[#45140C]/80 text-base font-formadjr font-medium tracking-wide">
              {experience.company}
            </p>
            <p className="text-sm text-[#45140C]/60 font-inter tracking-wide mt-0.5">{experience.dateRange}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="text-sm px-3 py-1 rounded-full border border-[#45140C]/40 text-[#45140C] font-formadjr tracking-wide"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-4 text-base text-[#45140C]/90 font-inter leading-relaxed tracking-wide">
          {experience.description}
        </p>
      </div>
    </div>
  );
}

export default function Experiences() {
  return (
    <section id="experiences" className="w-full py-16 px-4 bg-[#F3EDE2]">
      <div className="max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-[#45140C] font-formadjr text-left">Experience</h2>
        <p className="text-lg text-[#45140C]/70 font-inter mt-2 text-left">look at all the places that have put up with me ✦</p>
      </div>

      {/* Timeline layout */}
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-[#B5AD21]"
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

