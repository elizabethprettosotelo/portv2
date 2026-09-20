"use client";

import Link from "next/link";
import MediaFrame from "./MediaFrame";
import type { CaseStudyDocumentData } from "./types";
import { useInView } from "../../../hooks/useInView";

type NotebookHeroProps = {
  study: CaseStudyDocumentData;
};

export default function NotebookHero({ study }: NotebookHeroProps) {
  const introRef = useInView<HTMLDivElement>("anim-slide-up");
  const metaRef = useInView<HTMLDListElement>("anim-slide-up anim-delay-1");
  const mediaRef = useInView<HTMLDivElement>("anim-scale-in anim-delay-2");

  return (
    <section className="w-full border-b border-[#250D47]/10 bg-[#F0F1E3]">
      <div className="mx-auto w-full max-w-[92rem] px-4 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
          <div ref={introRef} className="space-y-6 anim-hidden">
            <div className="space-y-4">
              <Link
                href={study.returnHref}
                className="inline-flex items-center gap-2 border-b border-[#250D47]/25 pb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#250D47]/72 transition hover:border-[#250D47]/55 hover:text-[#250D47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9AB1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0F1E3]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 shrink-0"
                >
                  <path
                    d="M14.5 5.5L8 12l6.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{study.returnLabel}</span>
              </Link>
              <hr className="border-[#250D47]/12" />
              <div className="flex flex-wrap gap-2">
                {(study.categories ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#8EB522]/30 bg-[#8EB522]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#250D47]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8EB522]">
                Case study
              </p>
              <h1 className="text-4xl font-bold leading-[1.02] text-[#250D47] md:text-6xl lg:text-[3.75rem] font-formadjr">
                {study.title}
              </h1>
              <p className="text-lg leading-relaxed text-[#250D47]/80 md:text-xl">
                {study.description}
              </p>
              <p className="border-l-4 border-[#8EB522] pl-4 text-lg leading-relaxed text-[#250D47]">
                {study.valueStatement}
              </p>
            </div>

            <dl
              ref={metaRef}
              className="grid gap-4 border-t border-[#250D47]/10 pt-6 sm:grid-cols-2 xl:grid-cols-3 anim-hidden"
            >
              {study.meta.map((item) => (
                <div key={item.label} className="space-y-1">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#8EB522]">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-[#250D47]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div ref={mediaRef} className="anim-hidden lg:pt-2">
            <MediaFrame
              media={study.heroMedia}
              aspectClassName="aspect-[4/5] min-h-[420px] lg:min-h-[560px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}



