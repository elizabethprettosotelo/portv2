"use client";

import Link from "next/link";

type CaseStudyHeroProps = {
  title: string;
  subtitle: string;
};

export default function CaseStudyHero({ title, subtitle }: CaseStudyHeroProps) {
  return (
    <section className="w-full py-10 md:py-12 fade-in-up">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#250D47] font-formadjr leading-tight">
          {title}
        </h1>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#250D47]/75 hover:text-[#250D47] transition font-formadjr"
        >
          <span aria-hidden="true">←</span>
          Back to all project overviews
        </Link>

        <hr className="border-[#250D47]/15" />

        <p className="text-lg md:text-xl text-[#250D47]/90 font-medium font-inter leading-relaxed max-w-4xl">
          {subtitle}
        </p>

        <div className="mt-2 rounded-2xl border-2 border-dashed border-[#250D47]/15 bg-[#FAF9F6] p-5 md:p-6 min-h-[220px] md:min-h-[320px] flex items-center justify-center text-center">
          <div className="max-w-xl space-y-2">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8EB522] font-mono">
              Media placeholder
            </p>
            <p className="text-sm md:text-base text-[#250D47]/55 font-inter leading-relaxed">
              Add an image or video here when you are ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



