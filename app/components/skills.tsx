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
    <div ref={ref} className="anim-hidden flex-1 min-w-[160px] bg-[#FFFFFF] rounded-xl px-5 py-4 border-2 border-transparent hover:border-[#9AB1EB] transition-colors duration-200">
      <h3 className="text-xs font-bold text-[#250D47] font-formadjr mb-3 border-b border-[#250D47]/10 pb-2 uppercase tracking-wider">
        {group.category}
      </h3>
      <ul className="space-y-1.5">
        {group.items.map((item, i) => (
          <li key={i} className="text-sm text-[#250D47]/75 font-semibold font-inter flex items-center gap-2">
            <span className="text-[#8EB522] text-xs">✦</span>
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
    <section id="skills" className="w-full py-20 px-4 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto">
        <div ref={headingRef} className="anim-hidden mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#250D47] font-formadjr mb-2">
            Skills & Tools
          </h2>
          <p className="text-[#250D47]/60 font-semibold font-inter text-sm">The stuff I actually use day-to-day.</p>
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



