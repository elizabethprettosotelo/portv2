import { LINK_CONFIG, type ProjectLink } from "../project-links";
import CaseStudyOverview from "./CaseStudyOverview";
import MediaFrame from "./notebook/MediaFrame";

type PendingCaseStudyPageProps = {
  title: string;
  subtitle: string;
  overview: string;
  role: string;
  timeline: string;
  tools: string[];
  tags: string[];
  footerNote?: string;
  links?: ProjectLink[];
  previewEmbedUrl?: string;
  previewEmbedTitle?: string;
  summaryCards?: {
    number: string;
    title: string;
    copy: string;
  }[];
};

function PendingSummaryCard({
  number,
  title,
  copy,
}: {
  number: string;
  title: string;
  copy: string;
}) {
  return (
    <article className="rounded-2xl border border-[#45140C]/10 bg-[#FDFAF7] p-5 md:p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#E5B1A4] font-mono">
        {number}
      </p>
      <h3 className="mt-3 text-xl font-bold text-[#45140C] font-formadjr">
        {title}
      </h3>
      <p className="mt-3 text-sm md:text-base leading-relaxed text-[#45140C]/78">
        {copy}
      </p>
    </article>
  );
}

export default function PendingCaseStudyPage({
  title,
  subtitle,
  overview,
  role,
  timeline,
  tools,
  tags,
  footerNote = "Full case study coming soon.",
  links = [],
  previewEmbedUrl,
  previewEmbedTitle = "Project preview",
  summaryCards = [
    {
      number: "01",
      title: "Problem",
      copy: "This project is still being documented, but the problem summary will live here once the full case study is ready.",
    },
    {
      number: "02",
      title: "Solution",
      copy: "Use this card for the high-level approach, key design moves, or the product direction you want to highlight.",
    },
    {
      number: "03",
      title: "Outcome",
      copy: "Use this space for the result, what changed, and any quick notes on next steps or open questions.",
    },
  ],
}: PendingCaseStudyPageProps) {
  return (
    <div className="space-y-0">
      <section className="w-full border-b border-[#45140C]/10 bg-[#F3EDE2]">
        <div className="mx-auto w-full max-w-[min(80vw,76rem)] px-4 py-10 md:px-8 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <a
                  href="/projects"
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
                  <span>Back to all projects</span>
                </a>
                <hr className="border-[#45140C]/12" />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
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
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E5B1A4]">
                  Quick look
                </p>
                <h1 className="text-4xl font-bold leading-[1.02] text-[#1f1712] md:text-6xl font-formadjr">
                  {title}
                </h1>
                <p className="text-lg leading-relaxed text-[#45140C]/80 md:text-xl">
                  {subtitle}
                </p>
              </div>

              <dl className="grid gap-4 border-t border-[#45140C]/10 pt-6 sm:grid-cols-2 xl:grid-cols-3">
                <div className="space-y-1">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#E5B1A4]">
                    Role
                  </dt>
                  <dd className="text-sm leading-relaxed text-[#1f1712]">
                    {role}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#E5B1A4]">
                    Timeline
                  </dt>
                  <dd className="text-sm leading-relaxed text-[#1f1712]">
                    {timeline}
                  </dd>
                </div>
                <div className="space-y-1 sm:col-span-2 xl:col-span-1">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#E5B1A4]">
                    Tools
                  </dt>
                  <dd className="flex flex-wrap gap-2 pt-1">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[#45140C]/10 bg-[#FDFAF7] px-3 py-1 text-xs font-medium text-[#45140C]"
                      >
                        {tool}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {links.map((link) => {
                    const cfg = LINK_CONFIG[link.kind];
                    return (
                      <a
                        key={link.label + link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-full border border-[#45140C]/12 px-3 py-1.5 text-xs font-medium transition-all duration-200 ${cfg.bg} ${cfg.text} ${cfg.hoverBg}`}
                      >
                        <span aria-hidden="true">{cfg.icon}</span>
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {previewEmbedUrl ? (
              <div className="lg:pt-2">
                <div className="overflow-hidden rounded-[1.5rem] border border-[#45140C]/12 bg-[#FDFAF7] shadow-sm aspect-[4/5] min-h-[420px] lg:min-h-[560px]">
                  <iframe
                    title={previewEmbedTitle}
                    src={previewEmbedUrl}
                    className="h-full w-full"
                    style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <MediaFrame
                media={{
                  placeholder:
                    "Add a preview image or short video here when you are ready.",
                }}
                className="lg:pt-2"
                aspectClassName="aspect-[4/5] min-h-[420px] lg:min-h-[560px]"
              />
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F3EDE2]">
        <div className="mx-auto w-full max-w-[min(80vw,76rem)] px-4 md:px-8">
          <CaseStudyOverview overview={overview} title="Overview" />
        </div>
      </section>

      <section className="w-full bg-[#F3EDE2] pb-20">
        <div className="mx-auto w-full max-w-[min(80vw,76rem)] px-4 md:px-8">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {summaryCards.map((card) => (
                <PendingSummaryCard
                  key={card.number}
                  number={card.number}
                  title={card.title}
                  copy={card.copy}
                />
              ))}
            </div>
            <div className="rounded-2xl border border-[#E5B1A4]/40 bg-[#FDFAF7] px-5 py-4 text-sm leading-relaxed text-[#45140C]/78">
              {footerNote}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
