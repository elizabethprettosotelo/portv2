"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import type { DesignChapter, GoalItem, MediaAsset, ProblemIssue, ProblemSection } from "./types";
import MediaFrame from "./MediaFrame";
import { useInView } from "../../../hooks/useInView";

export function SectionHeading({
  number,
  kicker,
  title,
}: {
  number: string;
  kicker?: string;
  title: string;
}) {
  const headingRef = useInView<HTMLDivElement>("cs-fade-in");

  return (
    <header ref={headingRef} className="anim-hidden space-y-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#8EB522]">
          {number}
        </span>
        {kicker && (
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#250D47]/40">
            {kicker}
          </span>
        )}
      </div>
      <h2 className="font-formadjr text-3xl font-bold leading-[1.08] text-[#250D47] md:text-4xl lg:text-[2.85rem]">
        {title}
      </h2>
    </header>
  );
}

export function MarginNote({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-[#9AB1EB]/40 bg-[#9AB1EB]/8 p-4 text-sm leading-relaxed text-[#250D47]/70">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#4a6bb3]">
        Design note
      </p>
      {children}
    </aside>
  );
}

export function PullQuote({ quote }: { quote: string }) {
  const quoteRef = useInView<HTMLQuoteElement>("cs-fade-up");

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
  const goalRef = useInView<HTMLDivElement>("cs-fade-up");

  return (
    <div ref={goalRef} className="anim-hidden space-y-8">
      <div className="rounded-[1.75rem] border border-[#250D47]/12 bg-[#FFFFFF] p-6 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#8EB522]">
          Main goal
        </p>
        <p className="text-2xl font-semibold leading-tight text-[#250D47] md:text-3xl">
          {mainGoal}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {supportingGoals.map((goal, index) => (
          <div
            key={goal.label}
            className={`anim-slide-up anim-delay-${(index % 6) + 1} flex gap-4 rounded-2xl border border-[#250D47]/10 bg-[#FFFFFF] p-5 lg:min-h-full`}
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

function AttendancePathComparison({ paths }: { paths: NonNullable<ProblemSection["pathComparison"]> }) {
  return (
    <div className="grid min-w-0 gap-5 md:grid-cols-2">
      {(["happy", "unhappy"] as const).map((path) => {
        const unhappy = path === "unhappy";
        return (
          <div
            key={path}
            className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#250D47]/12 bg-[#FFFFFF] p-5 lg:p-6"
          >
            <h3 className="mb-5 text-center text-lg font-semibold text-[#250D47]">
              {unhappy ? "The unhappy path" : "The happy path"}
            </h3>
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {["Open app", "Scan QR code", "Confirm attendance"].map((label, index) => {
                const blocked = unhappy && index > 0;
                const screen = paths.screens?.[path][index];
                return (
                  <figure key={label} className="min-w-0">
                    {screen?.src ? (
                      <div className="relative overflow-hidden rounded-lg border border-[#250D47]/40 bg-black">
                        <Image
                          src={screen.src}
                          alt={screen.alt ?? screen.caption ?? label}
                          width={586}
                          height={1268}
                          sizes="(min-width: 768px) 160px, 30vw"
                          className={`h-auto w-full ${blocked ? "blur-[1.5px] brightness-50" : ""}`}
                        />
                        {blocked && (
                          <svg aria-hidden="true" viewBox="0 0 100 180" preserveAspectRatio="none" className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-stone-200">
                            <path d="M8 8L92 172M92 8L8 172" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                    ) : (
                    <div
                      role="img"
                      aria-label={`${label}: ${blocked ? "unavailable screen, crossed out" : "mobile screen placeholder"}`}
                      className={`relative flex aspect-[586/1268] w-full items-center justify-center overflow-hidden rounded-lg border p-2 ${
                        blocked
                          ? "border-stone-300 bg-stone-200 text-stone-400"
                          : "border-dashed border-[#250D47]/25 bg-[#FAF9F6] text-[#250D47]/40"
                      }`}
                    >
                      <span className="absolute top-2 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-full bg-current opacity-30" />
                      <span className={`text-center text-[10px] font-medium ${blocked ? "opacity-40" : ""}`}>Screen {index + 1}</span>
                      {blocked && (
                        <svg aria-hidden="true" viewBox="0 0 100 180" preserveAspectRatio="none" className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-stone-400">
                          <path d="M8 8L92 172M92 8L8 172" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    )}
                    <figcaption className={`mt-2 text-center text-[10px] leading-snug sm:text-xs ${blocked ? "text-stone-500" : "text-[#250D47]/65"}`}>
                      {screen?.caption ?? label}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
            <h4 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#8EB522]">
              THE FLOW
            </h4>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-[#250D47]/75">
              {paths[path].map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span aria-hidden="true" className="shrink-0">&bull;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <div
                className={`flex items-start gap-3 rounded-xl border px-3 py-3 text-sm leading-relaxed text-[#250D47] ${
                  unhappy
                    ? "border-red-400/30 bg-red-500/10"
                    : "border-amber-400/30 bg-amber-400/10"
                }`}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="mt-0.5 h-7 w-7 shrink-0">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="9" cy="9" r="0.7" fill="currentColor" />
                  <circle cx="15" cy="9" r="0.7" fill="currentColor" />
                  <path d={unhappy ? "M8 16Q12 11 16 16" : "M8 15H16"} />
                </svg>
                <div>
                  <p className="font-semibold">
                    {unhappy ? "Overall Experience: Negative" : "Overall Experience: Neutral"}
                  </p>
                  <p className="mt-1 text-[#250D47]/75">
                    {unhappy ? (
                      <>
                        <span className="font-semibold text-[#250D47]">Attendance wasn&apos;t recorded.</span>
                        <br />
                        Without error handling or system feedback, the user can&apos;t recover from any problems or bugs.
                      </>
                    ) : (
                      "Scan completed and attendance recorded, but the user feels unsure and disoriented afterward."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProblemGrid({
  statement,
  evidence,
  issues,
  consequences,
  visual,
  pathComparison,
}: {
  statement: string;
  evidence?: string;
  issues?: ProblemIssue[];
  consequences?: string[];
  visual?: MediaAsset;
  pathComparison?: ProblemSection["pathComparison"];
}) {
  const hasIssues = Boolean(issues && issues.length > 0);
  const problemRef = useInView<HTMLDivElement>("cs-fade-up");

  return (
    <div ref={problemRef} className="anim-hidden space-y-8">
      <div className="space-y-5">
        {pathComparison ? (
          <AttendancePathComparison paths={pathComparison} />
        ) : (
          <MediaFrame
            media={visual}
            aspectClassName="aspect-[16/9] min-h-[280px] lg:min-h-[360px]"
          />
        )}
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
        <div className="grid gap-5 xl:grid-cols-3">
          {issues!.map((issue, index) => (
            <article
              key={issue.title}
              className={`anim-slide-up anim-delay-${(index % 6) + 1} rounded-[1.5rem] border border-[#250D47]/10 bg-[#FFFFFF] p-5`}
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
          <ul className="grid gap-4 md:grid-cols-2">
            {consequences.map((item, index) => (
              <li
                key={item}
                className={`anim-slide-up anim-delay-${(index % 6) + 1} flex gap-3 rounded-2xl border border-[#9AB1EB]/30 bg-[#9AB1EB]/8 p-5 text-sm leading-relaxed text-[#250D47]/75`}
              >
                <span className="mt-0.5 text-[#4a6bb3]">&rarr;</span>
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
  const decisionRef = useInView<HTMLDivElement>("cs-fade-up");

  return (
    <article
      ref={decisionRef}
      className="anim-hidden grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start"
    >
      <div className="space-y-5">
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
}: {
  chapter: DesignChapter;
}) {
  const chapterRef = useInView<HTMLElement>("cs-fade-up", undefined, { threshold: 0 });

  return (
    <article
      ref={chapterRef}
      id={chapter.id}
      className="anim-hidden min-w-0 space-y-8 scroll-mt-32 border-l border-[#250D47]/15 pl-6"
    >
      <div className="w-full space-y-5">
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
        {chapter.checklist && chapter.checklist.length > 0 && (
          <ul className="grid gap-2 sm:grid-cols-2">
            {chapter.checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-xl border border-[#250D47]/10 bg-[#FFFFFF] px-3 py-2.5 text-sm leading-relaxed text-[#250D47]/80"
              >
                <span className="mt-0.5 text-[#8EB522]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full min-w-0 space-y-6 md:space-y-8">
        {chapter.mediaRows?.map((row, rowIndex) => (
          <div
            key={`${chapter.id}-${rowIndex}`}
            className={`grid min-w-0 gap-4 md:gap-6 ${
              row.items.length === 3
                ? "sm:grid-cols-3"
                : row.items.length === 2
                  ? "sm:grid-cols-2"
                  : "grid-cols-1"
            }`}
          >
            {row.items.map((media, mediaIndex) => (
              <MediaFrame
                key={`${chapter.id}-${rowIndex}-${mediaIndex}`}
                media={media}
                className="min-w-0 w-full"
                delayMs={mediaIndex * 120}
                aspectClassName={
                  row.kind === "banner"
                    ? "aspect-[4/1] min-h-32"
                    : row.kind === "graph"
                      ? "aspect-[16/9]"
                      : row.kind === "focus"
                        ? "aspect-[4/3]"
                        : "aspect-[3/4]"
                }
              />
            ))}
          </div>
        ))}
      </div>
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
  const accessibilityRef = useInView<HTMLDivElement>("cs-fade-up");

  return (
    <div ref={accessibilityRef} className="anim-hidden space-y-8">
      <MediaFrame
        media={{ placeholder: "Accessibility in practice" }}
        aspectClassName="aspect-[16/9] min-h-[280px] lg:min-h-[360px]"
      />
      <div className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8EB522]">
          Accessibility and responsiveness
        </p>
        <p className="text-base leading-relaxed text-[#250D47]/80">{intro}</p>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={item}
            className={`anim-hidden anim-slide-up anim-delay-${
              (index % 6) + 1
            } rounded-2xl border border-[#250D47]/10 bg-[#FFFFFF] px-5 py-4 text-sm leading-relaxed text-[#250D47]`}
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
  const outcomeRef = useInView<HTMLDivElement>("cs-fade-up");

  return (
    <div ref={outcomeRef} className="anim-hidden space-y-8">
      <MediaFrame
        media={{ placeholder: "Final reflection" }}
        aspectClassName="aspect-[16/9] min-h-[280px] lg:min-h-[360px]"
      />
      <div className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8EB522]">
          Outcomes and reflection
        </p>
        <p className="text-base leading-relaxed text-[#250D47]">{summary}</p>
        <p className="text-base leading-relaxed text-[#250D47]/80">{reflection}</p>
      </div>
      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#4a6bb3]">
          What&apos;s next
        </p>
        {nextSteps.map((step, index) => (
          <div
            key={step}
            className={`anim-hidden anim-slide-up anim-delay-${
              (index % 6) + 1
            } flex gap-3 rounded-2xl border border-dashed border-[#9AB1EB]/40 bg-[#9AB1EB]/8 p-4 text-sm leading-relaxed text-[#250D47]/75`}
          >
            <span className="text-[#4a6bb3]">&rarr;</span>
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
  const iterationRef = useInView<HTMLDivElement>("cs-fade-up");

  return (
    <div ref={iterationRef} className="anim-hidden grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {iterations.map((iteration, index) => (
        <div
          key={iteration.title}
          className={`anim-slide-up anim-delay-${(index % 6) + 1} rounded-[1.5rem] border border-[#250D47]/10 bg-[#FFFFFF] p-5`}
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



