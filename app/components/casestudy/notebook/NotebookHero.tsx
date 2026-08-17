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
    <section className="w-full border-b border-[#45140C]/10 bg-[#F3EDE2]">
      <div className="mx-auto w-full max-w-[min(80vw,76rem)] px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
          <div ref={introRef} className="space-y-6 anim-hidden">
            <div className="space-y-4">
              <Link
                href={study.returnHref}
                className="inline-flex items-center gap-2 border-b border-[#45140C]/25 pb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#45140C]/72 transition hover:border-[#45140C]/55 hover:text-[#45140C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B1A4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EDE2]"
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
              <hr className="border-[#45140C]/12" />
              <div className="flex flex-wrap gap-2">
                {(study.categories ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#B5AD21]/30 bg-[#B5AD21]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#45140C]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 max-w-[46rem]">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B5AD21]">
                Case study
              </p>
              <h1 className="text-4xl font-bold leading-[1.02] text-[#1f1712] md:text-6xl font-formadjr">
                {study.title}
              </h1>
              <p className="text-lg leading-relaxed text-[#45140C]/80 md:text-xl">
                {study.description}
              </p>
              <p className="max-w-3xl border-l-4 border-[#B5AD21] pl-4 text-lg leading-relaxed text-[#1f1712]">
                {study.valueStatement}
              </p>
            </div>

            <dl
              ref={metaRef}
              className="grid gap-4 border-t border-[#45140C]/10 pt-6 sm:grid-cols-2 xl:grid-cols-3 anim-hidden"
            >
              {study.meta.map((item) => (
                <div key={item.label} className="space-y-1">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#B5AD21]">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-[#1f1712]">
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
