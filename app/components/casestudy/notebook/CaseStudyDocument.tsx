"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseStudyDocumentData, CaseStudyLink, CaseStudySection } from "./types";
import CurrentStateFlow from "./CurrentStateFlow";
import MediaFrame from "./MediaFrame";
import {
  AccessibilitySummary,
  DesignDecision,
  GoalList,
  IterationSequence,
  OutcomeSummary,
  ProcessChapter,
  PullQuote,
  ProblemGrid,
  SectionHeading,
} from "./CaseStudyContent";
import { useInView } from "../../../hooks/useInView";

type CaseStudyDocumentProps = {
  study: CaseStudyDocumentData;
};

function CaseStudyLinkButton({ link, className }: { link: CaseStudyLink; className: string }) {
  const isInternal = link.href.startsWith("/");
  if (isInternal) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

function SectionShell({
  section,
  children,
}: {
  section: CaseStudySection;
  children: ReactNode;
}) {
  const sectionRef = useInView<HTMLElement>("cs-fade-up", undefined, { threshold: 0 });
  return (
    <section
      ref={sectionRef}
      id={section.id}
      className="anim-hidden scroll-mt-32 border-t border-[#250D47]/8 py-16 first:border-t-0 first:pt-10 md:py-24"
    >
      <div className="mx-auto w-full max-w-4xl space-y-8">{children}</div>
    </section>
  );
}

export default function CaseStudyDocument({ study }: CaseStudyDocumentProps) {
  const sections = study.sections;

  return (
    <div>
      {sections.map((section, index) => {
        const number = String(index + 1).padStart(2, "0");

        switch (section.kind) {
          case "intro":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading number={number} kicker="Project overview" title={section.label} />
                <p className="text-base leading-relaxed text-[#250D47]/80 md:text-lg">
                  {section.description}
                </p>
                {section.contextCards && (
                  <div className="grid min-w-0 gap-4 sm:grid-cols-3">
                    {[...section.contextCards].reverse().map((card, cardIndex) => (
                      <MediaFrame
                        key={cardIndex}
                        media={card}
                        className="min-w-0"
                        aspectClassName="aspect-4/5"
                        fit="contain"
                        variant="plain"
                        delayMs={cardIndex * 120}
                      />
                    ))}
                  </div>
                )}
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-[#250D47]/80 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.emphasis && <PullQuote quote={section.emphasis} />}
                {section.flow && <CurrentStateFlow {...section.flow} />}
              </SectionShell>
            );

          case "context":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading number={number} kicker="Context" title={section.label} />
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-[#250D47]/80 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                  <PullQuote quote={section.emphasis} />
                  <MediaFrame media={section.diagram} />
                </div>
              </SectionShell>
            );

          case "problem":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading number={number} kicker="The problem" title={section.label} />
                <ProblemGrid
                  statement={section.statement}
                  evidence={section.evidence}
                  issues={section.issues}
                  consequences={section.consequences}
                  visual={section.visual}
                  pathComparison={section.pathComparison}
                />
              </SectionShell>
            );

          case "goals":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading number={number} kicker="Project goal" title={section.label} />
                <GoalList
                  mainGoal={section.mainGoal}
                  supportingGoals={section.supportingGoals}
                />
              </SectionShell>
            );

          case "flow":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading number={number} kicker="Current-state experience" title={section.label} />
                <CurrentStateFlow
                  intro={section.intro}
                  steps={section.steps}
                  note={section.note}
                />
              </SectionShell>
            );

          case "chapters":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading number={number} kicker="The process" title={section.label} />
                <div className="space-y-16">
                  <p className="text-base leading-relaxed text-[#250D47]/80 md:text-lg">
                    {section.intro}
                  </p>
                  {section.iterations && section.iterations.length > 0 && (
                    <IterationSequence iterations={section.iterations} />
                  )}
                  {section.chapters.map((chapter) => (
                    <ProcessChapter
                      key={chapter.id}
                      chapter={chapter}
                    />
                  ))}
                  {section.decision && (
                    <DesignDecision
                      title={section.decision.title}
                      problem={section.decision.problem}
                      decision={section.decision.decision}
                      reasoning={section.decision.reasoning}
                      note={section.decision.note}
                      visual={section.decision.visual}
                    />
                  )}
                </div>
              </SectionShell>
            );

          case "final":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading number={number} kicker="Final product" title={section.label} />
                <div className="space-y-8">
                  <p className="text-base leading-relaxed text-[#250D47]/80 md:text-lg">
                    {section.summary}
                  </p>
                  <div className="grid gap-5 md:grid-cols-2">
                    {section.visuals.map((media, mediaIndex) => (
                      <MediaFrame
                        key={media.placeholder ?? media.src}
                        media={media}
                        delayMs={mediaIndex * 120}
                      />
                    ))}
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {section.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-2xl border border-[#250D47]/10 bg-[#F9FAF3] p-4 text-sm leading-relaxed text-[#250D47]"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                  {section.links && section.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {section.links.map((link) => (
                        <CaseStudyLinkButton
                          key={link.label}
                          link={link}
                          className="inline-flex items-center rounded-full border border-[#250D47]/12 bg-[#250D47] px-4 py-2 text-sm font-bold text-[#F0F1E3] transition hover:bg-[#8EB522] hover:text-[#250D47]"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </SectionShell>
            );

          case "accessibility":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading number={number} kicker="Responsiveness and accessibility" title={section.label} />
                <AccessibilitySummary intro={section.intro} items={section.items} />
              </SectionShell>
            );

          case "outcomes":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading number={number} kicker="Outcomes and reflection" title={section.label} />
                <OutcomeSummary
                  summary={section.summary}
                  reflection={section.reflection}
                  nextSteps={section.nextSteps}
                />
                {section.links && section.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {section.links.map((link) => (
                      <CaseStudyLinkButton
                        key={link.label}
                        link={link}
                        className="inline-flex items-center rounded-full border border-[#250D47]/15 bg-[#F9FAF3] px-4 py-2 text-sm font-bold text-[#250D47] transition hover:border-[#8EB522]/50 hover:bg-[#8EB522]/10"
                      />
                    ))}
                  </div>
                )}
              </SectionShell>
            );

          default:
            return null;
        }
      })}

      <section className="border-t border-[#250D47]/8 py-12">
        <div className="flex flex-wrap gap-3">
          <CaseStudyLinkButton
            link={{ label: study.returnLabel, href: study.returnHref }}
            className="inline-flex items-center rounded-full border border-[#250D47]/15 bg-[#F9FAF3] px-4 py-2 text-sm font-bold text-[#250D47] transition hover:border-[#8EB522]/50 hover:bg-[#8EB522]/10"
          />
        </div>
      </section>
    </div>
  );
}



