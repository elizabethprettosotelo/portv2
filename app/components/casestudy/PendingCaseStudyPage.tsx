import Link from "next/link";
import type { ProjectLink } from "../project-links";

// A small default page for projects whose full case study isn't written yet.
// Same props as before, so every existing project page keeps working.
// Styled to match the editorial case studies: Fraunces headline, Figtree body, warm neutral background.

type PendingCaseStudyPageProps = {
  title: string;
  subtitle: string;
  overview: string;
  role?: string;
  timeline?: string;
  tools?: string[];
  tags?: string[];
  footerNote?: string;
  links?: ProjectLink[];
  /** Problem, solution, outcome. When these are given, they replace the overview paragraph. */
  summaryCards?: {
    number: string;
    title: string;
    copy: string;
  }[];
};

const ink = "text-[#250D47]";
const eyebrow = "text-xs font-bold uppercase tracking-[0.16em] text-[#5E7A12]";

export default function PendingCaseStudyPage({
  title,
  subtitle,
  overview,
  role,
  timeline,
  tools = [],
  tags = [],
  footerNote = "Full case study coming soon.",
  summaryCards = [],
}: PendingCaseStudyPageProps) {
  const meta = [
    role && { label: "Role", value: role },
    timeline && { label: "Timeline", value: timeline },
    tools.length > 0 && { label: "Tools", value: tools.join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className={`mx-auto w-full max-w-[54rem] px-5 pb-24 pt-10 md:px-8 md:pt-16 ${ink}`}>
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#250D47]/65 transition hover:text-[#250D47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB522] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F6]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M14.5 5.5L8 12l6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All projects
      </Link>

      <header className="mt-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#8EB522]/12 px-3 py-1 text-xs font-bold text-[#3D4F0C]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#8EB522]" />
          Case study in progress
        </p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-[-1px] md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-[40rem] text-lg leading-relaxed text-[#250D47]/80 md:text-xl">{subtitle}</p>

        {tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full border border-[#250D47]/12 bg-[#FFFFFF] px-3 py-1 text-xs font-semibold text-[#250D47]/80">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      {meta.length > 0 && (
        <dl className="mt-10 grid gap-5 border-y border-[#250D47]/10 py-6 sm:grid-cols-3">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className={eyebrow}>{item.label}</dt>
              <dd className="mt-1.5 text-[15px] leading-snug">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <section className="mt-14">
        <p className={eyebrow}>Overview</p>
        {summaryCards.length > 0 ? (
          <div className={`mt-4 grid gap-4 ${summaryCards.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {summaryCards.map((card) => (
              <div key={card.number} className="rounded-xl border border-[#250D47]/10 bg-[#FFFFFF] p-5">
                <p className="font-display text-2xl font-semibold tracking-[-1px] text-[#8EB522]">{card.number}</p>
                <h3 className="mt-2 text-lg font-bold">{card.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#250D47]/85">{card.copy}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 max-w-[44rem] text-[17px] leading-[1.7] text-[#250D47]/90">{overview}</p>
        )}
      </section>

      <aside className="mt-12 flex flex-col gap-3 rounded-xl border border-dashed border-[#250D47]/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-[#250D47]/80">{footerNote}</p>
        <Link
          href="/projects/ucfhere/case-study"
          className="shrink-0 text-sm font-bold text-[#250D47] underline decoration-[#8EB522] decoration-2 underline-offset-4 hover:decoration-[#250D47]"
        >
          Read the UCFHere case study →
        </Link>
      </aside>
    </article>
  );
}
