"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useHover } from "../contexts/HoverContext";

type Experience = {
  id: string;
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
    id: "exp-adobe-next",
    role: "Adobe Next// Campus Leader",
    company: "Adobe",
    location: "Remote",
    dateRange: "Aug. 2026 – Present",
    type: "Internship",
    description: "Representing Adobe Next// on campus by helping connect students with creative tools, community, and opportunities to explore design and storytelling.",
    bullets: [
      "Support campus-facing activations and community-building efforts for Adobe Next//.",
      "Share resources, prompts, and opportunities that help students explore creative careers and tools.",
      "Build visibility for Adobe Next// through student outreach and participation in campus conversations.",
    ],
    skills: ["Community Building", "Leadership", "Adobe Creative Suite", "Student Outreach"],
  },
  {
    id: "exp-cdl",
    role: "UX/UI Designer & Software Engineer",
    company: "UCF Center of Distributed Learning",
    location: "Orlando, FL",
    dateRange: "Oct. 2025 – Present",
    type: "Current",
    description: "Designing and developing for Materia, an open-source lesson-gamifying platform, bridging the gap between UX/UI design and hands-on front-end development.",
    bullets: [
      "Designed and iterated on interactive UX/UI prototypes in Figma, applying user-centered design principles to gamify learning experiences.",
      "Implemented finalized UX/UI designs through hands-on development, translating visual and interaction designs directly into functional code.",
      "Served as both designer and programmer on the project, contributing across the full design-to-development pipeline.",
    ],
    skills: ["Figma", "UX/UI Design", "Front-End Development", "User-Centered Design"],
  },
  {
    id: "exp-knighthacks",
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
    id: "exp-c2",
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

function ExperienceCard({ experience }: { experience: Experience }) {
  const { setHoveredProject } = useHover();
  return (
    <div
      id={experience.id}
      onMouseEnter={() => setHoveredProject(experience.id)}
      onMouseLeave={() => setHoveredProject(null)}
      className="relative w-full max-w-3xl bg-[#F9FAF3] rounded-xl overflow-hidden transition-all duration-300 border-2 border-transparent hover:border-[#9AB1EB] hover:-translate-y-0.5"
    >
      <div className="px-5 py-5">
        <div className="flex items-start gap-3 flex-wrap">
          {/* Company logo */}
          {experience.logo && (
            <div className="w-9 h-9 rounded-lg bg-[#250D47]/10 flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={40}
                height={40}
                className="object-contain w-full h-full p-1"
              />
            </div>
          )}
          <div className="flex-1 min-w-[200px] flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-lg font-bold text-[#250D47] font-formadjr leading-snug tracking-wide">
                {experience.role}
              </h3>
              <p className="text-[#250D47]/85 text-sm font-formadjr font-bold tracking-wide">
                {experience.company}
                <span className="text-[#250D47]/50 font-medium"> · {experience.location}</span>
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold text-[#250D47]/70 font-mono uppercase tracking-wider bg-[#250D47]/8 rounded-full px-3 py-1">
              {experience.dateRange}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-[#250D47]/75 font-semibold font-inter leading-relaxed tracking-wide">
          {experience.description}
        </p>

        {/* Key contributions */}
        {experience.bullets.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {experience.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#250D47]/70 font-medium font-inter leading-relaxed">
                <span className="mt-2 w-1 h-1 rounded-full bg-[#8EB522] shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {/* Skills */}
        {experience.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] px-2.5 py-1 rounded-full border border-[#250D47]/15 text-[#250D47]/75 font-semibold font-inter uppercase tracking-wide"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AnimatedExpCard({ experience }: { experience: Experience }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.remove("anim-hidden");
        el.classList.add("anim-slide-up");
        obs.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="anim-hidden">
      <ExperienceCard experience={experience} />
    </div>
  );
}

export default function Experiences() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.remove("anim-hidden");
        el.classList.add("anim-slide-up");
        obs.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experiences" className="w-full py-16 px-4 bg-[#F0F1E3]">
      <div ref={headingRef} className="anim-hidden max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-[#250D47] font-formadjr text-left">Experience</h2>
        <p className="text-lg text-[#250D47]/65 font-semibold font-inter mt-2 text-left">
          All the cool places I&apos;ve gotten to design, build, and lead <span className="text-[#8EB522]">✦</span>
        </p>
      </div>

      {/* Timeline layout */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-[#8EB522]"
          style={{ left: "-2rem" }}
        />

        {experiences.map((exp, i) => (
          <div key={i} className="relative mb-8">
            {/* Timeline node */}
            <div
              className="absolute w-3 h-3 rounded-full bg-[#8EB522] border-2 border-[#F0F1E3]"
              style={{ left: "-2.375rem", top: "50%", transform: "translateY(-50%)" }}
            />
            <AnimatedExpCard experience={exp} />
          </div>
        ))}
      </div>
    </section>
  );
}




