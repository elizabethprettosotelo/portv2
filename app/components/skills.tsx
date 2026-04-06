"use client";

import { useEffect, useRef } from "react";

const skillGroups = [
  {
    category: "Design",
    items: [
      "UI/UX Design",
      "Prototyping",
      "Design Systems",
      "User Research",
      "Figma",
      "Adobe Creative Suite",
    ],
  },
  {
    category: "Development",
    items: [
      "React / Next.js",
      "TypeScript",
      "HTML/CSS",
      "Tailwind CSS",
      "Git & GitHub",
      "Responsive Design",
    ],
  },
  {
    category: "Process",
    items: [
      "Agile Methodologies",
      "Design Thinking",
      "Wireframing",
      "Accessibility (a11y)",
      "Cross-functional Teams",
      "Documentation",
    ],
  },
];

function AnimatedSkillCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.classList.remove("anim-hidden");
          el.classList.add("anim-slide-up");
        }, index * 80);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="anim-hidden flex-1 min-w-[160px] bg-[#FDFAF7] rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="text-sm font-bold text-[#45140C] font-formadjr mb-3 border-b border-[#45140C]/10 pb-2 uppercase tracking-wider">
        {group.category}
      </h3>
      <ul className="space-y-1">
        {group.items.map((item, i) => (
          <li key={i} className="text-sm text-[#45140C]/65 font-inter flex items-center gap-2">
            <span className="text-[#B5AD21] text-xs">✦</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
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
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="w-full py-20 px-4 bg-[#F3EDE2]">
      <div className="max-w-3xl mx-auto">
        <div ref={headingRef} className="anim-hidden mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-2">
            Skills & Tools
          </h2>
          <p className="text-[#45140C]/40 font-inter text-sm">The stuff I actually use day-to-day.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {skillGroups.map((group, index) => (
            <AnimatedSkillCard key={index} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
