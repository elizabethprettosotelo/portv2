"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const headlineRef  = useRef<HTMLDivElement>(null);
  const svgRef       = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);

  // Stagger hero elements in on mount
  useEffect(() => {
    const els = [
      { el: headlineRef.current,  cls: "anim-slide-left",  delay: 0   },
      { el: svgRef.current,       cls: "anim-slide-up",    delay: 150 },
      { el: cardRef.current,      cls: "anim-slide-right", delay: 200 },
    ];
    els.forEach(({ el, cls, delay }) => {
      if (!el) return;
      setTimeout(() => {
        el.classList.remove("anim-hidden");
        el.classList.add(cls);
      }, delay);
    });
  }, []);
  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const btn = e.currentTarget;
    // Brief press animation before scrolling
    btn.classList.add("scale-95", "opacity-80");
    setTimeout(() => {
      btn.classList.remove("scale-95", "opacity-80");
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 180);
  };

  return (
    <section id="hero" className="relative h-[85vh] flex items-center justify-center bg-[#B5AD21] px-6 md:px-12 py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-[#45140C]/5"></div>
      <div className="absolute bottom-40 left-20 w-60 h-60 rounded-full bg-[#45140C]/10"></div>
      
      <div className="relative max-w-7xl w-full z-10 flex justify-center">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Main headline with SVG */}
          <div ref={headlineRef} className="anim-hidden shrink-0 text-center lg:text-left">
            <h1 className="text-6xl md:text-8xl lg:text-8xl xl:text-9xl font-bold text-[#45140C] font-formadjr leading-none">
              design til <br />
              <span className="text-[#F3EDE2]">it&apos;s right!</span>
            </h1>
            
            {/* Little guys SVG */}
            <div ref={svgRef} className="anim-hidden mt-6 pt-1 flex justify-center">
              <Image 
                src="/littleguys.svg" 
                alt="Little guys decoration" 
                width={300} 
                height={100}
                className="w-auto h-20 md:h-24"
              />
            </div>
          </div>

          {/* Supporting text and CTAs in tan container */}
          <div ref={cardRef} className="anim-hidden bg-[#F3EDE2] rounded-2xl p-8 md:p-10 shadow-xl max-w-xl w-full">
            <div className="flex flex-col gap-6">
              {/* Supporting text */}
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-[#45140C] font-inter leading-relaxed">
                  Welcome to my portfolio — a collection of my design work & development projects.
                </p>
                <p className="text-lg md:text-xl text-[#45140C]/80 font-inter leading-relaxed">
                  I&apos;m <span className="font-bold text-[#45140C]">Eli Pretto-Sotelo</span>, a UX Designer and Frontend Developer who believes in iterating until 
                  every pixel feels intentional.
                </p>
                <a 
                  href="/experience" 
                  className="inline-block underline decoration-2 underline-offset-4 hover:text-[#B5AD21] transition-colors duration-200 font-medium text-lg md:text-xl text-[#45140C]/80 font-inter"
                >
                  Learn more about me →
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleScrollToProjects}
                  className="px-8 py-4 bg-[#45140C] text-[#F3EDE2] rounded-lg font-formadjr font-bold text-lg hover:bg-[#B5AD21] hover:text-[#45140C] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
                >
                  View Projects
                </button>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-3 border-[#45140C] text-[#45140C] rounded-lg font-formadjr font-bold text-lg hover:bg-[#45140C] hover:text-[#F3EDE2] transition-all duration-200"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-[#45140C]/40" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
