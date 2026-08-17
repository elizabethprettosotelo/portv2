"use client";

import type { ReactNode } from "react";
import type { CaseStudyDocumentData, CaseStudySection } from "./types";
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

function SectionShell({
  section,
  children,
}: {
  section: CaseStudySection;
  children: ReactNode;
}) {
  const sectionRef = useInView<HTMLElement>("anim-slide-up");
  return (
    <section
      ref={sectionRef}
      id={section.id}
      className="scroll-mt-28 py-10 md:py-14 anim-hidden"
    >
      <div className="mx-auto grid w-full max-w-[min(80vw,76rem)] gap-6">
        {children}
      </div>
    </section>
  );
}

export default function CaseStudyDocument({ study }: CaseStudyDocumentProps) {
  const sections = study.sections;

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        switch (section.kind) {
          case "intro":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading
                  number="01"
                  title={section.label}
                  kicker="Project introduction"
                />
                <p className="text-base leading-relaxed text-[#45140C]/80 md:text-lg">
                  {section.description}
                </p>
                <PullQuote quote={section.valueStatement} />
              </SectionShell>
            );

          case "context":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading
                  number="02"
                  title={section.label}
                  kicker="Context"
                />
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-[#45140C]/80 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                  <PullQuote quote={section.emphasis} />
                  <MediaFrame media={section.diagram} />
                </div>
              </SectionShell>
            );

          case "problem":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading
                  number="03"
                  title={section.label}
                  kicker="The problem"
                />
                <ProblemGrid
                  statement={section.statement}
                  evidence={section.evidence}
                  issues={section.issues}
                  consequences={section.consequences}
                  visual={section.visual}
                />
              </SectionShell>
            );

          case "goals":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading
                  number="04"
                  title={section.label}
                  kicker="Project goal"
                />
                <GoalList
                  mainGoal={section.mainGoal}
                  supportingGoals={section.supportingGoals}
                />
              </SectionShell>
            );

          case "flow":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading
                  number="05"
                  title={section.label}
                  kicker="Current-state experience"
                />
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
                <SectionHeading
                  number="06"
                  title={section.label}
                  kicker="Design approach"
                />
                <div className="space-y-12">
                  <p className="max-w-3xl text-base leading-relaxed text-[#45140C]/80 md:text-lg">
                    {section.intro}
                  </p>
                  {section.iterations && section.iterations.length > 0 && (
                    <IterationSequence iterations={section.iterations} />
                  )}
                  {section.chapters.map((chapter, index) => (
                    <ProcessChapter
                      key={chapter.id}
                      chapter={chapter}
                      reverse={index % 2 === 1}
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
                <SectionHeading
                  number="07"
                  title={section.label}
                  kicker="Final product"
                />
                <div className="space-y-6">
                  <p className="max-w-3xl text-base leading-relaxed text-[#45140C]/80 md:text-lg">
                    {section.summary}
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.visuals.map((media) => (
                      <MediaFrame key={media.placeholder ?? media.src} media={media} />
                    ))}
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {section.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-2xl border border-[#45140C]/10 bg-[#FDFAF7] p-4 text-sm leading-relaxed text-[#1f1712]"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                  {section.links && section.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {section.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="inline-flex items-center rounded-full border border-[#45140C]/12 bg-[#1f1712] px-4 py-2 text-sm font-medium text-[#F3EDE2] transition hover:bg-[#45140C]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </SectionShell>
            );

          case "accessibility":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading
                  number="08"
                  title={section.label}
                  kicker="Responsiveness and accessibility"
                />
                <AccessibilitySummary intro={section.intro} items={section.items} />
              </SectionShell>
            );

          case "outcomes":
            return (
              <SectionShell key={section.id} section={section}>
                <SectionHeading
                  number="09"
                  title={section.label}
                  kicker="Outcomes and reflection"
                />
                <OutcomeSummary
                  summary={section.summary}
                  reflection={section.reflection}
                  nextSteps={section.nextSteps}
                />
                {section.links && section.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {section.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center rounded-full border border-[#45140C]/12 bg-[#FDFAF7] px-4 py-2 text-sm font-medium text-[#1f1712] transition hover:border-[#B5AD21]/40 hover:bg-[#B5AD21]/6"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </SectionShell>
            );

          default:
            return null;
        }
      })}

      <section className="py-8">
        <div className="flex flex-wrap gap-3">
          <a
            href={study.returnHref}
            className="inline-flex items-center rounded-full border border-[#45140C]/12 bg-[#FDFAF7] px-4 py-2 text-sm font-medium text-[#1f1712] transition hover:border-[#B5AD21]/40 hover:bg-[#B5AD21]/6"
          >
            {study.returnLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
