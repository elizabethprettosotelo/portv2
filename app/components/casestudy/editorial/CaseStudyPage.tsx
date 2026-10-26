import SheetSpec from "./SheetSpec";
import VideoEmbed from "./VideoEmbed";
import ZoomableImage from "./ZoomableImage";
import Image from "next/image";
import Link from "next/link";
import type { Block, CaseStudy, ListItem, PathStep, PathTone, Placeholder, Slot } from "./types";

// Set to false once every placeholder has a real image, or to hide them while you work.
/** Phone screenshots and phone placeholders get a narrower column so they don't tower over the text. */
const isTall = (slot: Slot) => ("src" in slot ? slot.height > slot.width * 1.5 : slot.shape === "phone");

export const SHOW_PLACEHOLDERS = true;

const ink = "text-[#250D47]";
const body = "max-w-[44rem] text-[17px] leading-[1.7] text-[#250D47]/90";
const eyebrow = "text-xs font-bold uppercase tracking-[0.18em] text-[#5E7A12]";
const caption = "mt-2 text-sm leading-snug text-[#250D47]/70";

const shapes = {
  phone: "aspect-[586/1268]",
  wide: "aspect-video",
  square: "aspect-square",
};

function PlaceholderBox({ slot }: { slot: Placeholder }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#250D47]/25 p-3 text-center ${shapes[slot.shape]}`}
      style={{
        backgroundColor: "rgba(37, 13, 71, 0.04)",
        backgroundImage: "repeating-linear-gradient(135deg, rgba(37,13,71,0.05) 0 10px, transparent 10px 20px)",
      }}
    >
      <span className="rounded-full bg-[#250D47] px-2.5 py-0.5 text-xs font-bold text-[#FAF9F6]">{slot.asset}</span>
      <span className="text-sm font-semibold leading-snug text-[#250D47]/80">{slot.label}</span>
    </div>
  );
}

function SlotView({ slot, sizes, framed, className = "" }: { slot: Slot; sizes: string; framed?: boolean; className?: string }) {
  const text = slot.caption;
  if (!("src" in slot)) {
    if (!SHOW_PLACEHOLDERS) return null;
    return (
      <div className={className}>
        <PlaceholderBox slot={slot} />
        {text && <p className={caption}>{text}</p>}
      </div>
    );
  }
  return (
    <div className={className}>
      <ZoomableImage figure={slot} sizes={sizes} framed={framed} />
      {text && <p className={caption}>{text}</p>}
    </div>
  );
}

const statusStyle = {
  present: { color: "#2F8A4C", icon: "M5 12.5l4.5 4.5L19 7.5" },
  tardy: { color: "#B7860B", icon: "M12 7v5l3 2" },
  absent: { color: "#C93C3C", icon: "M7 7l10 10M17 7L7 17" },
  excused: { color: "#6A5BC4", icon: "M8 7h8M8 12h8M8 17h5" },
};

function StatusIcon({ status }: { status: keyof typeof statusStyle }) {
  const s = statusStyle[status];
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${s.color}1F` }}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        {status === "tardy" && <circle cx="12" cy="12" r="8" stroke={s.color} strokeWidth="2" />}
        <path d={s.icon} stroke={s.color} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Smile, flat, or frown, matching the faces on the journey map. The worst path adds furrowed brows. */
function Face({ tone, className = "h-5 w-5" }: { tone: PathTone; className?: string }) {
  const mouth = { positive: "M8 13.5Q12 17.5 16 13.5", neutral: "M8 15H16", negative: "M8 16.5Q12 12.5 16 16.5", worst: "M8 17Q12 12 16 17" }[tone];
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`shrink-0 ${className}`}>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
      {tone === "worst" && <path d="M6.8 6.6L10.2 7.8M17.2 6.6L13.8 7.8" />}
      <path d={mouth} />
    </svg>
  );
}

function StepLabel({ index, label, muted }: { index: number; label: string; muted?: boolean }) {
  return (
    <p className={`mt-2 text-[13px] font-semibold leading-tight ${muted ? "text-[#250D47]/40 line-through" : ink}`}>
      <span className="mr-1.5 text-[#5E7A12]">{String(index + 1).padStart(2, "0")}</span>
      {label}
    </p>
  );
}

const half = { recovered: "polygon(0 0, 100% 0, 0 100%)", failed: "polygon(100% 0, 100% 100%, 0 100%)" };

function Step({ step, index }: { step: PathStep; index: number }) {
  if ("split" in step) {
    const { recovered, recoveredLabel, failed, failedLabel } = step.split;
    return (
      <div className="min-w-0">
        <div
          role="img"
          aria-label={`Two possible outcomes. ${recoveredLabel}: ${recovered.alt}. ${failedLabel}: ${failed.alt}.`}
          className="@container"
        >
          {/* Same thin iPhone frame as the other screenshots. */}
          <div className="rounded-[13cqw] bg-[#1C1B21] p-[2.4cqw] shadow-[0_1px_0_1px_rgba(37,13,71,0.08),0_14px_30px_-18px_rgba(37,13,71,0.45)]">
          <div className="relative overflow-hidden rounded-[10.8cqw] bg-[#14121A]" style={{ aspectRatio: `${recovered.width} / ${recovered.height}` }}>
          <div className="absolute inset-0" style={{ clipPath: half.recovered }}>
            <Image src={recovered.src} alt="" width={recovered.width} height={recovered.height} sizes="200px" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0" style={{ clipPath: half.failed }}>
            <Image
              src={failed.src}
              alt=""
              width={failed.width}
              height={failed.height}
              sizes="200px"
              className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale"
            />
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path d="M58 58L92 92M92 58L58 92" stroke="#C93C3C" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M100 0L0 100" stroke="#FFFFFF" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute left-[8%] top-[5%] rounded-full bg-[#2F8A4C] px-1.5 py-0.5 text-[9px] leading-tight sm:px-2 sm:text-[10px] font-bold text-white">{recoveredLabel}</span>
          <span className="absolute bottom-[5%] right-[8%] rounded-full bg-[#C93C3C] px-1.5 py-0.5 text-[9px] leading-tight sm:px-2 sm:text-[10px] font-bold text-white">{failedLabel}</span>
          </div>
          </div>
        </div>
        <StepLabel index={index} label={step.label} />
      </div>
    );
  }
  return (
    <div className="min-w-0">
      <div className="relative">
        <div className={step.broken ? "opacity-35 grayscale" : ""}>
          <SlotView slot={step.slot} sizes="(min-width: 640px) 200px, 30vw" framed />
        </div>
        {step.broken && (
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
            <path d="M8 8L92 92M92 8L8 92" stroke="#C93C3C" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        )}
      </div>
      <StepLabel index={index} label={step.label} muted={step.broken} />
    </div>
  );
}

function Item({ item }: { item: ListItem }) {
  if (typeof item === "string") return <>{item}</>;
  return (
    <>
      <strong className={`font-semibold ${ink}`}>{item.lead}</strong> {item.text}
    </>
  );
}

const pathTone: Record<PathTone, string> = {
  neutral: "bg-[#250D47]/[0.05] text-[#250D47]/80",
  negative: "bg-[#C93C3C]/10 text-[#A52F2F]",
  worst: "bg-[#7A1F1F] text-[#FFE3E3]",
  positive: "bg-[#8EB522]/12 text-[#3D4F0C]",
};

const verdictTone = {
  neutral: "bg-[#250D47]/8 text-[#250D47]/85",
  negative: "bg-[#C93C3C]/12 text-[#A52F2F]",
  positive: "bg-[#2F8A4C]/12 text-[#236B3A]",
};

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "text":
      return (
        <p key={index} className={`${body} mt-5 first:mt-0`}>
          {block.text}
        </p>
      );

    case "subhead":
      return (
        <h3 key={index} className={`mt-10 text-xl font-bold first:mt-0 ${ink}`}>
          {block.text}
        </h3>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          key={index}
          className={`${body} mt-5 space-y-3 pl-5 ${block.ordered ? "list-decimal" : "list-disc"} marker:font-semibold marker:text-[#5E7A12]`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <Item item={item} />
            </li>
          ))}
        </Tag>
      );
    }

    case "quote":
      return (
        <blockquote
          key={index}
          className={`my-10 border-l-4 border-[#8EB522] pl-6 font-display text-2xl font-semibold tracking-[-1px] leading-snug md:text-3xl ${ink}`}
        >
          {block.text}
        </blockquote>
      );

    case "figures": {
      if (block.layout === "stackPhone") {
        // Diagrams stacked on the left, one phone screen on the right.
        const phoneSlot = block.items[block.items.length - 1];
        return (
          <figure key={index} className="my-10">
            <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_200px] md:grid-cols-[minmax(0,1fr)_230px]">
              <div className="flex flex-col gap-4">
                {block.items.slice(0, -1).map((slot, i) => (
                  <SlotView key={i} slot={slot} sizes="(min-width: 1024px) 520px, 100vw" />
                ))}
              </div>
              <SlotView slot={phoneSlot} sizes="(min-width: 640px) 230px, 60vw" framed className="mx-auto w-full max-w-[230px]" />
            </div>
            {block.caption && <figcaption className={caption}>{block.caption}</figcaption>}
          </figure>
        );
      }
      const grid = {
        wide: "grid gap-4",
        pair: "grid grid-cols-2 gap-4 sm:max-w-md",
        split: "grid gap-4 sm:grid-cols-2",
        stackPhone: "",
        phones: "grid grid-cols-2 gap-4 sm:grid-cols-3",
        illustrations: "grid grid-cols-3 gap-3 sm:gap-4",
      }[block.layout];
      const sizes = block.layout === "wide" ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 640px) 240px, 45vw";
      return (
        <figure key={index} className="my-10">
          <div className={grid}>
            {block.items.map((slot, i) => (
              <SlotView key={i} slot={slot} sizes={sizes} framed={block.layout === "phones" || block.layout === "pair"} />
            ))}
          </div>
          {block.caption && <figcaption className={caption}>{block.caption}</figcaption>}
        </figure>
      );
    }

    case "beforeAfter": {
      const column = (label: string, items: typeof block.before, tone: string) => (
        <div className="min-w-0">
          <p className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${tone}`}>{label}</p>
          <div className={`grid gap-3 ${items.length > 1 ? "grid-cols-2" : ""}`}>
            {items.map((slot, i) => (
              <SlotView
                key={i}
                slot={slot}
                sizes="(min-width: 640px) 360px, 90vw"
                framed
                className={isTall(slot) ? "mx-auto w-full max-w-[280px]" : undefined}
              />
            ))}
          </div>
        </div>
      );
      return (
        <figure key={index} className="my-10 rounded-xl bg-[#FFFFFF] p-4 sm:p-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {column("Before", block.before, verdictTone.neutral)}
            {column("After", block.after, verdictTone.positive)}
          </div>
          {block.caption && <figcaption className={caption}>{block.caption}</figcaption>}
        </figure>
      );
    }

    case "paths":
      return (
        <div key={index} className="my-10 grid gap-4 lg:grid-cols-2">
          {block.rows.map((row) => {
            const verdict = (
              <div className={`flex items-start gap-3 rounded-lg px-3.5 py-3 ${pathTone[row.tone]}`}>
                <Face tone={row.tone} className="mt-0.5 h-6 w-6" />
                <p className={`text-[14px] leading-snug ${row.tone === "worst" ? "text-white/90" : "text-[#250D47]/85"}`}>
                  <span className="mb-0.5 block text-xs font-bold uppercase tracking-[0.12em]">Overall: {row.verdict}</span>
                  {row.note}
                </p>
              </div>
            );
            const steps = (
              <div className="grid grid-cols-3 gap-2.5">
                {row.steps.map((step, i) => (
                  <Step key={i} step={step} index={i} />
                ))}
              </div>
            );
            return row.wide ? (
              <div key={row.title} className="min-w-0 rounded-xl border border-[#250D47]/10 bg-[#FFFFFF] p-4 sm:p-5 lg:col-span-2">
                <h3 className={`mb-4 text-lg font-bold ${ink}`}>{row.title}</h3>
                <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-6">
                  <div className="min-w-0">{steps}</div>
                  <div className="min-w-0">{verdict}</div>
                </div>
              </div>
            ) : (
              <div key={row.title} className="flex min-w-0 flex-col rounded-xl border border-[#250D47]/10 bg-[#FFFFFF] p-4 sm:p-5">
                <h3 className={`mb-4 text-lg font-bold ${ink}`}>{row.title}</h3>
                {steps}
                <span className="min-h-5 flex-1" />
                {verdict}
              </div>
            );
          })}
        </div>
      );

    case "sequence":
      return (
        <ol key={index} className="my-10 grid gap-6 sm:grid-cols-3">
          {block.steps.map((step, i) => (
            <li key={step.title} className="flex min-w-0 flex-col">
              <div className="flex flex-1 items-center">
                <SlotView slot={step.slot} sizes="(min-width: 640px) 240px, 100vw" framed className="mx-auto w-full max-w-[220px] sm:max-w-none" />
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#5E7A12]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#250D47] text-xs text-[#FAF9F6]">{i + 1}</span>
                {step.title}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#250D47]/85">{step.text}</p>
            </li>
          ))}
        </ol>
      );

    case "cards":
      return (
        <div key={index} className={`my-8 grid gap-4 ${block.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {block.items.map((card, i) => (
            <div
              key={card.title}
              className="flex flex-col overflow-hidden rounded-xl border border-[#250D47]/10 bg-[#FFFFFF] p-5"
              style={card.accent ? { borderTop: `4px solid ${card.accent}` } : undefined}
            >
              {block.numbered && (
                <p className="font-display text-3xl font-semibold tracking-[-1px] text-[#8EB522]">{String(i + 1).padStart(2, "0")}</p>
              )}
              <h3 className={`${block.numbered ? "mt-2" : ""} text-lg font-bold leading-snug ${ink}`}>{card.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#250D47]/85">{card.text}</p>
              {card.tag && (
                <>
                  <span className="min-h-4 flex-1" />
                  <p className="self-start rounded-full px-3 py-1 text-xs font-bold" style={{ color: card.accent, backgroundColor: card.tint }}>
                    {card.tag}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      );

    case "compare":
      return (
        <div key={index} className="my-10 grid gap-4 sm:grid-cols-3">
          {block.options.map((option) => (
            <div
              key={option.title}
              className={`flex flex-col rounded-xl border p-4 ${
                option.verdict === "yes" ? "border-[#8EB522] bg-[#8EB522]/10" : "border-[#250D47]/10 bg-[#FFFFFF]"
              }`}
            >
              <SlotView slot={option.slot} sizes="(min-width: 640px) 220px, 100vw" framed className="mx-auto w-full max-w-[200px]" />
              <div className="mt-4 flex items-center justify-between gap-2">
                <h3 className={`font-bold ${ink}`}>{option.title}</h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    option.verdict === "yes" ? verdictTone.positive : verdictTone.negative
                  }`}
                >
                  {option.verdict === "yes" ? "Chosen" : "Ruled out"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#250D47]/85">{option.text}</p>
            </div>
          ))}
        </div>
      );

    case "chips":
      return (
        <ul key={index} className="my-6 flex flex-wrap gap-2">
          {block.items.map((chip, i) => (
            <li key={chip} className={`rounded-full border border-[#250D47]/15 bg-[#FFFFFF] px-4 py-2 text-sm font-semibold ${ink}`}>
              <span className="mr-2 text-[#5E7A12]">{i + 1}</span>
              {chip}
            </li>
          ))}
        </ul>
      );

    case "errorTypes":
      return (
        <div key={index} className="my-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((type) => (
            <div key={type.title} className="rounded-xl border border-[#250D47]/10 bg-[#FFFFFF] px-4 py-3.5">
              <p className={`flex items-baseline gap-2 text-[15px] font-bold ${ink}`}>
                <span className="font-display text-xl font-semibold tracking-[-0.5px] text-[#5E7A12]">{type.count}</span>
                {type.title}
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-[#250D47]/65">{type.errors.join(" · ")}</p>
            </div>
          ))}
        </div>
      );

    case "columns":
      return (
        <div key={index} className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.title} className="min-w-0 border-t-2 border-[#250D47]/10 pt-4">
              <h3 className={`text-lg font-bold ${ink}`}>{item.title}</h3>
              <p className="mt-2 text-[16px] leading-[1.65] text-[#250D47]/90">{item.text}</p>
            </div>
          ))}
        </div>
      );

    case "video":
      return (
        <figure key={index} className="my-10">
          <VideoEmbed youtubeId={block.youtubeId} title={block.title} start={block.start} />
          {block.caption && <figcaption className={caption}>{block.caption}</figcaption>}
        </figure>
      );

    case "sheetSpec":
      return <SheetSpec key={index} levels={block.levels} rules={block.rules} />;

    case "legend":
      return (
        <ul key={index} className="my-8 grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <li key={item.status} className="flex items-start gap-3 rounded-xl bg-[#FFFFFF] p-4">
              <StatusIcon status={item.status} />
              <div>
                <p className={`font-bold ${ink}`}>{item.label}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-[#250D47]/85">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      );
  }
}

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <article className="mx-auto w-full max-w-6xl px-5 pb-24 pt-12 md:px-10 md:pt-20">
      <Link href="/projects" className="text-sm font-semibold text-[#250D47]/70 hover:text-[#250D47]">
        ← All projects
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className={eyebrow}>{study.project}</p>
        <h1 className={`mt-3 font-display text-4xl font-semibold tracking-[-1px] leading-[1.1] md:text-6xl ${ink}`}>{study.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-[#250D47]/90 md:text-2xl">{study.summary}</p>
      </header>

      <dl className="mt-10 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-5 border-t border-[#250D47]/15 pt-6 md:grid-cols-5">
        {study.meta.map((item) => (
          <div key={item.label}>
            <dt className={eyebrow}>{item.label}</dt>
            <dd className={`mt-1.5 text-[15px] leading-snug ${ink}`}>{item.value}</dd>
          </div>
        ))}
      </dl>

      {study.hero && <SlotView slot={study.hero} sizes="(min-width: 1152px) 1072px, 100vw" className="mt-12" />}

      {study.stats && (
        <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-[#250D47]/15 py-8 sm:grid-cols-4">
          {study.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className={`block font-display text-4xl font-semibold tracking-[-1px] md:text-5xl ${ink}`}>{stat.value}</span>
                <span className="mt-1 block text-sm leading-snug text-[#250D47]/75">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      <section aria-label="Project summary" className="mt-12 grid gap-x-10 gap-y-8 rounded-xl bg-[#250D47] p-6 text-[#FAF9F6] md:grid-cols-2 md:p-10">
        {study.overview.map((item) => (
          <div key={item.label}>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#B5D65A]">{item.label}</h2>
            <p className="mt-2 text-[17px] leading-relaxed text-[#FAF9F6]/90">{item.text}</p>
          </div>
        ))}
      </section>

      <div className="mt-20 lg:grid lg:grid-cols-[6.5rem_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-10 space-y-2 text-sm">
            {study.sections
              .filter((section) => section.nav)
              .map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-[#250D47]/55 hover:text-[#250D47]">
                    {section.nav}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className="min-w-0 max-w-[54rem]">
          {study.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-t border-[#250D47]/10 py-14 first:border-t-0 first:pt-0"
            >
              <p className={eyebrow}>{section.eyebrow}</p>
              <h2 className={`mt-3 font-display text-3xl font-semibold tracking-[-1px] leading-tight md:text-4xl ${ink}`}>{section.title}</h2>
              <div className="mt-6">{section.blocks.map(renderBlock)}</div>
            </section>
          ))}

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#250D47]/10 pt-8 text-[15px] font-semibold">
            <Link href="/projects" className="text-[#250D47]/70 hover:text-[#250D47]">
              ← All projects
            </Link>
            {study.next && (
              <Link href={study.next.href} className={`${ink} hover:text-[#5E7A12]`}>
                {study.next.label} →
              </Link>
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}
