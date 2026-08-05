import type { ReactNode } from "react";
import type { DesignChapter, GoalItem, MediaAsset, ProblemIssue } from "./types";
import MediaFrame from "./MediaFrame";

export function SectionHeading({
  number,
  title,
  kicker,
}: {
  number: string;
  title: string;
  kicker?: string;
}) {
  return (
    <header className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B5AD21]">
        {number}
      </p>
      <div className="space-y-2">
        {kicker && (
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#45140C]/50">
            {kicker}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-[2.85rem] font-bold leading-[1.08] text-[#1f1712] font-formadjr">
          {title}
        </h2>
      </div>
    </header>
  );
}

export function MarginNote({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-[#45140C]/10 bg-[#FDFAF7] p-4 text-sm leading-relaxed text-[#45140C]/70">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B5AD21] mb-2">
        Margin note
      </p>
      {children}
    </aside>
  );
}

export function PullQuote({ quote }: { quote: string }) {
  return (
    <blockquote className="border-l-4 border-[#B5AD21] bg-[#B5AD21]/5 px-5 py-4 text-lg leading-relaxed text-[#1f1712]">
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
  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-[#45140C]/12 bg-[#FDFAF7] p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B5AD21] mb-3">
          Main goal
        </p>
        <p className="text-2xl md:text-3xl font-semibold leading-tight text-[#1f1712]">
          {mainGoal}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {supportingGoals.map((goal, index) => (
          <div
            key={goal.label}
            className="flex gap-4 rounded-2xl border border-[#45140C]/10 bg-[#FDFAF7] p-4 lg:min-h-full"
          >
            <div className="shrink-0 text-sm font-bold uppercase tracking-[0.2em] text-[#B5AD21]">
              0{index + 1}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#1f1712]">{goal.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#45140C]/70">
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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <MediaFrame
          media={visual}
          aspectClassName="aspect-[16/9] min-h-[280px] lg:min-h-[360px]"
        />
        <p className="text-xl leading-relaxed text-[#1f1712] md:text-[1.45rem]">
          {statement}
        </p>
        <div className="space-y-4">
          {evidence && (
            <blockquote className="border-l-4 border-[#B5AD21] bg-[#B5AD21]/5 px-5 py-4 text-base leading-relaxed text-[#45140C]/80">
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
              className="rounded-[1.5rem] border border-[#45140C]/10 bg-[#FDFAF7] p-4 md:p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B5AD21]">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#1f1712]">
                {issue.title}
              </h3>
              <MediaFrame
                media={issue.screenshot}
                className="mt-4"
                aspectClassName="aspect-[9/16] min-h-[280px]"
              />
              <p className="mt-2 text-sm leading-relaxed text-[#45140C]/75">
                {issue.description}
              </p>
            </article>
          ))}
        </div>
      ) : (
        consequences &&
        consequences.length > 0 && (
          <ul className="grid gap-3">
            {consequences.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl border border-[#45140C]/10 bg-[#FDFAF7] p-4 text-sm leading-relaxed text-[#45140C]/75"
              >
                <span className="mt-0.5 text-[#B5AD21]">&rarr;</span>
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
  return (
    <article className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#B5AD21]">
          Design decision
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold text-[#1f1712]">
          {title}
        </h3>
        <div className="space-y-4 text-base leading-relaxed text-[#45140C]/80">
          <p>
            <span className="font-semibold text-[#1f1712]">Problem: </span>
            {problem}
          </p>
          <p>
            <span className="font-semibold text-[#1f1712]">Decision: </span>
            {decision}
          </p>
          <p>
            <span className="font-semibold text-[#1f1712]">Reasoning: </span>
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
  return (
    <article
      className={`grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B5AD21]">
            {chapter.number}
          </p>
          <div className="h-px flex-1 bg-[#45140C]/10" />
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold text-[#1f1712]">
          {chapter.title}
        </h3>
        <div className="space-y-4 text-base leading-relaxed text-[#45140C]/80">
          <p>
            <span className="font-semibold text-[#1f1712]">Challenge: </span>
            {chapter.challenge}
          </p>
          <p>
            <span className="font-semibold text-[#1f1712]">Decision: </span>
            {chapter.decision}
          </p>
          <p>
            <span className="font-semibold text-[#1f1712]">Reasoning: </span>
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
  return (
    <div className="space-y-6">
      <MediaFrame
        media={{
          placeholder:
            "Add a mobile accessibility screenshot here showing responsive behavior, focus states, or a touch-friendly interaction.",
        }}
        aspectClassName="aspect-[16/9] min-h-[280px] lg:min-h-[360px]"
      />
      <div className="space-y-4 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#B5AD21]">
          Accessibility and responsiveness
        </p>
        <p className="text-base leading-relaxed text-[#45140C]/80">{intro}</p>
      </div>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-[#45140C]/10 bg-[#FDFAF7] px-4 py-3 text-sm leading-relaxed text-[#1f1712]"
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
  return (
    <div className="space-y-6">
      <MediaFrame
        media={{
          placeholder:
            "Add an outcomes screenshot or short demo clip here showing the final product, success state, or reflection slide.",
        }}
        aspectClassName="aspect-[16/9] min-h-[280px] lg:min-h-[360px]"
      />
      <div className="space-y-4 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#B5AD21]">
          Outcomes and reflection
        </p>
        <p className="text-base leading-relaxed text-[#1f1712]">{summary}</p>
        <p className="text-base leading-relaxed text-[#45140C]/80">{reflection}</p>
      </div>
      <div className="space-y-3">
        {nextSteps.map((step) => (
          <div
            key={step}
            className="flex gap-3 rounded-2xl border border-dashed border-[#45140C]/18 bg-[#FDFAF7] p-4 text-sm leading-relaxed text-[#45140C]/75"
          >
            <span className="text-[#B5AD21]">&rarr;</span>
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
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {iterations.map((iteration, index) => (
        <div
          key={iteration.title}
          className="rounded-[1.5rem] border border-[#45140C]/10 bg-[#FDFAF7] p-4"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B5AD21]">
            0{index + 1}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[#1f1712]">
            {iteration.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#45140C]/70">
            {iteration.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
