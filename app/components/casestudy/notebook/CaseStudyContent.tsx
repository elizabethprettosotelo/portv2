"use client";

import type { ReactNode } from "react";
import type { DesignChapter, GoalItem, MediaAsset, ProblemIssue } from "./types";
import MediaFrame from "./MediaFrame";
import { useInView } from "../../../hooks/useInView";

export function SectionHeading({
  number,
  title,
  kicker,
}: {
  number: string;
  title: string;
  kicker?: string;
}) {
  const headingRef = useInView<HTMLDivElement>("anim-slide-up");

  return (
    <header ref={headingRef} className="space-y-3 anim-hidden">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8EB522]">
        {number}
      </p>
      <div className="space-y-2">
        {kicker && (
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#250D47]/50">
            {kicker}
          </p>
        )}
        <h2 className="font-formadjr text-3xl font-bold leading-[1.08] text-[#250D47] md:text-4xl lg:text-[2.85rem]">
          {title}
        </h2>
      </div>
    </header>
  );
}

export function MarginNote({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-[#250D47]/10 bg-[#F0F1E3] p-4 text-sm leading-relaxed text-[#250D47]/70">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8EB522]">
        Margin note
      </p>
      {children}
    </aside>
  );
}

export function PullQuote({ quote }: { quote: string }) {
  const quoteRef = useInView<HTMLQuoteElement>("anim-slide-up");

  return (
    <blockquote
      ref={quoteRef}
      className="anim-hidden border-l-4 border-[#8EB522] bg-[#8EB522]/5 px-5 py-4 text-lg leading-relaxed text-[#250D47]"
    >
      <p className="font-medium italic">&ldquo;{quote}&rdquo;</p>
    </blockquote>
  );
}

export function GoalList({
  mainGoal,
  supportingGoals,
}: {
  mainGoal: string;
  supportingGoals: GoalItem[];
}) {
  const goalRef = useInView<HTMLDivElement>("anim-slide-up");

  return (
    <div ref={goalRef} className="anim-hidden space-y-6">
      <div className="rounded-[1.75rem] border border-[#250D47]/12 bg-[#F0F1E3] p-6 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#8EB522]">
          Main goal
        </p>
        <p className="text-2xl font-semibold leading-tight text-[#250D47] md:text-3xl">
          {mainGoal}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {supportingGoals.map((goal, index) => (
          <div
            key={goal.label}
            className={`anim-slide-up anim-delay-${(index % 6) + 1} flex gap-4 rounded-2xl border border-[#250D47]/10 bg-[#F0F1E3] p-4 lg:min-h-full`}
          >
            <div className="shrink-0 text-sm font-bold uppercase tracking-[0.2em] text-[#8EB522]">
              0{index + 1}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#250D47]">{goal.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#250D47]/70">
                {goal.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProblemGrid({
  statement,
  evidence,
  issues,
  consequences,
  visual,
}: {
  statement: string;
  evidence?: string;
  issues?: ProblemIssue[];
  consequences?: string[];
  visual?: MediaAsset;
}) {
  const hasIssues = Boolean(issues && issues.length > 0);
  const problemRef = useInView<HTMLDivElement>("anim-slide-up");

  return (
    <div ref={problemRef} className="anim-hidden space-y-6">
      <div className="space-y-4">
        <MediaFrame
          media={visual}
          aspectClassName="aspect-[16/9] min-h-[280px] lg:min-h-[360px]"
        />
        <p className="text-xl leading-relaxed text-[#250D47] md:text-[1.45rem]">
          {statement}
        </p>
        <div className="space-y-4">
          {evidence && (
            <blockquote className="border-l-4 border-[#8EB522] bg-[#8EB522]/5 px-5 py-4 text-base leading-relaxed text-[#250D47]/80">
              <p className="font-medium">{evidence}</p>
            </blockquote>
          )}
        </div>
      </div>

      {hasIssues ? (
        <div className="grid gap-4 xl:grid-cols-3">
          {issues!.map((issue, index) => (
            <article
              key={issue.title}
              className={`anim-slide-up anim-delay-${(index % 6) + 1} rounded-[1.5rem] border border-[#250D47]/10 bg-[#F0F1E3] p-4 md:p-5`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8EB522]">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#250D47]">
                {issue.title}
              </h3>
              <MediaFrame
                media={issue.screenshot}
                className="mt-4"
                aspectClassName="aspect-[9/16] min-h-[280px]"
              />
              <p className="mt-2 text-sm leading-relaxed text-[#250D47]/75">
                {issue.description}
              </p>
            </article>
          ))}
        </div>
      ) : (
        consequences &&
        consequences.length > 0 && (
          <ul className="grid gap-3">
            {consequences.map((item, index) => (
              <li
                key={item}
                className={`anim-slide-up anim-delay-${(index % 6) + 1} flex gap-3 rounded-2xl border border-[#250D47]/10 bg-[#F0F1E3] p-4 text-sm leading-relaxed text-[#250D47]/75`}
              >
                <span className="mt-0.5 text-[#8EB522]">&rarr;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export function DesignDecision({
  title,
  problem,
  decision,
  reasoning,
  note,
  visual,
}: {
  title: string;
  problem: string;
  decision: string;
  reasoning: string;
  note?: string;
  visual?: MediaAsset;
}) {
  const decisionRef = useInView<HTMLDivElement>("anim-slide-up");

  return (
    <article
      ref={decisionRef}
      className="anim-hidden grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
    >
      <div className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8EB522]">
          Design decision
        </p>
        <h3 className="text-2xl font-semibold text-[#250D47] md:text-3xl">
          {title}
        </h3>
        <div className="space-y-4 text-base leading-relaxed text-[#250D47]/80">
          <p>
            <span className="font-semibold text-[#250D47]">Problem: </span>
            {problem}
          </p>
          <p>
            <span className="font-semibold text-[#250D47]">Decision: </span>
            {decision}
          </p>
          <p>
            <span className="font-semibold text-[#250D47]">Reasoning: </span>
            {reasoning}
          </p>
        </div>
        {note && <MarginNote>{note}</MarginNote>}
      </div>
      <MediaFrame media={visual} />
    </article>
  );
}

export function ProcessChapter({
  chapter,
  reverse,
}: {
  chapter: DesignChapter;
  reverse?: boolean;
}) {
  const chapterRef = useInView<HTMLElement>("anim-slide-up");

  return (
    <article
      ref={chapterRef}
      className={`anim-hidden grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8EB522]">
            {chapter.number}
          </p>
          <div className="h-px flex-1 bg-[#250D47]/10" />
        </div>
        <h3 className="text-2xl font-semibold text-[#250D47] md:text-3xl">
          {chapter.title}
        </h3>
        <div className="space-y-4 text-base leading-relaxed text-[#250D47]/80">
          <p>
            <span className="font-semibold text-[#250D47]">Challenge: </span>
            {chapter.challenge}
          </p>
          <p>
            <span className="font-semibold text-[#250D47]">Decision: </span>
            {chapter.decision}
          </p>
          <p>
            <span className="font-semibold text-[#250D47]">Reasoning: </span>
            {chapter.reasoning}
          </p>
        </div>
        {chapter.note && <MarginNote>{chapter.note}</MarginNote>}
      </div>
      <MediaFrame media={chapter.visual} />
    </article>
  );
}

export function AccessibilitySummary({
  intro,
  items,
}: {
  intro: string;
  items: string[];
}) {
  const accessibilityRef = useInView<HTMLDivElement>("anim-slide-up");

  return (
    <div ref={accessibilityRef} className="anim-hidden space-y-6">
      <MediaFrame
        media={{
          placeholder:
            "Add a mobile accessibility screenshot here showing responsive behavior, focus states, or a touch-friendly interaction.",
        }}
        aspectClassName="aspect-[16/9] min-h-[280px] lg:min-h-[360px]"
      />
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8EB522]">
          Accessibility and responsiveness
        </p>
        <p className="text-base leading-relaxed text-[#250D47]/80">{intro}</p>
      </div>
      <ul className="grid gap-3">
        {items.map((item, index) => (
          <li
            key={item}
            className={`anim-hidden anim-slide-up anim-delay-${
              (index % 6) + 1
            } rounded-2xl border border-[#250D47]/10 bg-[#F0F1E3] px-4 py-3 text-sm leading-relaxed text-[#250D47]`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OutcomeSummary({
  summary,
  reflection,
  nextSteps,
}: {
  summary: string;
  reflection: string;
  nextSteps: string[];
}) {
  const outcomeRef = useInView<HTMLDivElement>("anim-slide-up");

  return (
    <div ref={outcomeRef} className="anim-hidden space-y-6">
      <MediaFrame
        media={{
          placeholder:
            "Add an outcomes screenshot or short demo clip here showing the final product, success state, or reflection slide.",
        }}
        aspectClassName="aspect-[16/9] min-h-[280px] lg:min-h-[360px]"
      />
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8EB522]">
          Outcomes and reflection
        </p>
        <p className="text-base leading-relaxed text-[#250D47]">{summary}</p>
        <p className="text-base leading-relaxed text-[#250D47]/80">{reflection}</p>
      </div>
      <div className="space-y-3">
        {nextSteps.map((step, index) => (
          <div
            key={step}
            className={`anim-hidden anim-slide-up anim-delay-${
              (index % 6) + 1
            } flex gap-3 rounded-2xl border border-dashed border-[#250D47]/18 bg-[#F0F1E3] p-4 text-sm leading-relaxed text-[#250D47]/75`}
          >
            <span className="text-[#8EB522]">&rarr;</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IterationSequence({
  iterations,
}: {
  iterations: { title: string; caption: string }[];
}) {
  const iterationRef = useInView<HTMLDivElement>("anim-slide-up");

  return (
    <div ref={iterationRef} className="anim-hidden grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {iterations.map((iteration, index) => (
        <div
          key={iteration.title}
          className={`anim-slide-up anim-delay-${(index % 6) + 1} rounded-[1.5rem] border border-[#250D47]/10 bg-[#F0F1E3] p-4`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8EB522]">
            0{index + 1}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[#250D47]">
            {iteration.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#250D47]/70">
            {iteration.caption}
          </p>
        </div>
      ))}
    </div>
  );
}



