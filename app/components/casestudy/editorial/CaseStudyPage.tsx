import SheetSpec from "./SheetSpec";
import VideoEmbed from "./VideoEmbed";
import PhoneClip from "./PhoneClip";
import ZoomableImage from "./ZoomableImage";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Block, CaseStudy, ListItem, PathStep, PathTone, Placeholder, Slot } from "./types";

// Set to false once every placeholder has a real image, or to hide them while you work.
/** Phone screenshots and phone placeholders get a narrower column so they don't tower over the text. */
const isTall = (slot: Slot) => ("src" in slot ? slot.height > slot.width * 1.5 : slot.shape === "phone");

export const SHOW_PLACEHOLDERS = true;

const ink = "text-[#250D47]";
const body = "max-w-[54rem] text-[17px] leading-[1.7] text-[#250D47]/90";
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
  tardy: { color: "#D9730D", icon: "M12 7v5l3 2" },
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

/** Small line icons for the six error categories. */
const errorIcons: Record<string, ReactNode> = {
  "Camera and permissions": (
    <>
      <path d="M3 3l18 18" />
      <path d="M9.5 5.5h5l1.5 2H19a1.5 1.5 0 0 1 1.5 1.5v8M17 19H5a1.5 1.5 0 0 1-1.5-1.5V9A1.5 1.5 0 0 1 5 7.5h1.5" />
    </>
  ),
  "QR detection": <path d="M4 8.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3M15.5 4h3A1.5 1.5 0 0 1 20 5.5v3M20 15.5v3a1.5 1.5 0 0 1-1.5 1.5h-3M8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3M8 12h8" />,
  "Interrupted sequence": (
    <>
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="11" cy="12" r="1.8" />
      <path d="M16 9.5l5 5M21 9.5l-5 5" />
    </>
  ),
  "QR validity": <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14.5 14.5l5 5M19.5 14.5l-5 5" />,
  "Check-in": (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16.5 8.5l4 4M20.5 8.5l-4 4" />
    </>
  ),
  "Network and system": <path d="M3 3l18 18M8.5 16.5a5 5 0 0 1 6-.7M5 13a10 10 0 0 1 4.5-2.6M19 13a10 10 0 0 0-3.3-2.2M12 20h.01" />,
};

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
            <Image src={recovered.src} alt={`${recoveredLabel} screen`} width={recovered.width} height={recovered.height} sizes="200px" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0" style={{ clipPath: half.failed }}>
            <Image
              src={failed.src}
              alt={`${failedLabel} screen`}
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

function renderBlock(block: Block, index: number, level: 2 | 3 = 2) {
  // Headings inside a block sit one level below the section's own heading.
  const Hx = level === 3 ? "h4" : "h3";
  switch (block.type) {
    case "text":
      return (
        <p key={index} className={`${body} mt-5 first:mt-0`}>
          {block.text}
        </p>
      );

    case "subhead": {
      const H = level === 3 ? "h4" : "h3";
      return (
        <H key={index} className={`mt-10 text-xl font-bold first:mt-0 ${ink}`}>
          {block.text}
        </H>
      );
    }

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
        <figure key={index} className="relative my-12 w-fit max-w-[54rem] px-8 py-7 md:px-10">
          <CornerFlourish className="absolute left-0 top-0" />
          <CornerFlourish className="absolute bottom-0 right-0 rotate-180" />
          <blockquote className={`font-display text-2xl font-semibold tracking-[-1px] leading-snug md:text-3xl ${ink}`}>
            {block.text}
          </blockquote>
        </figure>
      );

    case "clip":
      return (
        <figure key={index} className="my-10">
          <div className={block.wide ? "w-full" : "mx-auto w-full max-w-[260px]"}>
            <PhoneClip src={block.src} poster={block.poster} label={block.label} wide={block.wide} />
          </div>
          {block.caption && <figcaption className={`${caption} text-center`}>{block.caption}</figcaption>}
        </figure>
      );

    case "clips":
      return (
        <div key={index} className={`my-10 grid gap-8 ${block.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {block.items.map((item) => (
            <figure key={item.title} className="flex min-w-0 flex-col">
              <div className="mx-auto w-full max-w-[230px]">
                {item.clip ? (
                  <PhoneClip src={item.clip.src} poster={item.clip.poster} label={item.clip.label} />
                ) : item.slot ? (
                  <SlotView slot={item.slot} sizes="230px" framed className="w-full" />
                ) : null}
              </div>
              <figcaption className="mt-5">
                <Hx className={`text-lg font-bold ${ink}`}>{item.title}</Hx>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#250D47]/85">{item.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
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
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
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
          {block.title && <p className={`${eyebrow} mb-4`}>{block.title}</p>}
          {/* Each side is as wide as its number of screens, so one old screen sits beside three new ones at the same size. */}
          <div
            className="grid gap-8 sm:[grid-template-columns:var(--cols)]"
            style={{ ["--cols" as string]: `${block.before.length}fr ${block.after.length}fr` }}
          >
            {column("Before", block.before, verdictTone.neutral)}
            {column("After", block.after, verdictTone.positive)}
          </div>
          {block.caption && <figcaption className={caption}>{block.caption}</figcaption>}
        </figure>
      );
    }

    case "paths":
      return (
        // Every path uses the same row: what happened on the left, the three screens on the right,
        // so the three rows read as one comparison from top to bottom.
        <div key={index} className="my-10 overflow-hidden rounded-xl border border-[#250D47]/10 bg-[#FFFFFF]">
          {block.rows.map((row, r) => (
            <div
              key={row.title}
              className={`grid gap-5 p-4 sm:p-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:items-center md:gap-8 ${
                r > 0 ? "border-t border-[#250D47]/10" : ""
              }`}
            >
              <div className="min-w-0">
                <span className={`inline-flex items-center gap-1.5 rounded-full py-1 pl-1.5 pr-3 text-xs font-bold uppercase tracking-[0.12em] ${pathTone[row.tone]}`}>
                  <Face tone={row.tone} className="h-5 w-5" />
                  {row.verdict}
                </span>
                <Hx className={`mt-3 text-lg font-bold ${ink}`}>{row.title}</Hx>
                <p className="mt-1.5 text-[15px] leading-snug text-[#250D47]/80">{row.note}</p>
              </div>
              <div className="grid max-w-[30rem] grid-cols-3 gap-3">
                {row.steps.map((step, i) => (
                  <Step key={i} step={step} index={i} />
                ))}
              </div>
            </div>
          ))}
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
      if (block.feature)
        return (
          <ol key={index} className="my-10 grid gap-4 sm:grid-cols-2">
            {block.items.map((card, i) => (
              <li key={card.title} className="flex flex-col rounded-2xl bg-[#250D47] p-6 text-[#FAF9F6] sm:p-7">
                <span aria-hidden="true" className="font-display text-5xl font-semibold leading-none tracking-[-2px] text-[#B5D65A]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Hx className="mt-5 font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.5px]">{card.title}</Hx>
                <p className="mt-2 text-[15.5px] leading-relaxed text-[#FAF9F6]/80">{card.text}</p>
              </li>
            ))}
          </ol>
        );
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
              <Hx className={`${block.numbered ? "mt-2" : ""} text-lg font-bold leading-snug ${ink}`}>{card.title}</Hx>
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
        <figure key={index} className="my-10">
        {block.title && <p className={`${eyebrow} mb-4`}>{block.title}</p>}
        <div className="grid gap-4 sm:grid-cols-3">
          {block.options.map((option) => (
            <div
              key={option.title}
              className={`flex flex-col rounded-xl border p-4 ${
                option.verdict === "yes" ? "border-[#8EB522] bg-[#8EB522]/10" : "border-[#250D47]/10 bg-[#FFFFFF]"
              }`}
            >
              <SlotView slot={option.slot} sizes="(min-width: 640px) 220px, 100vw" framed className="mx-auto w-full max-w-[200px]" />
              <div className="mt-4 flex items-center justify-between gap-2">
                <Hx className={`font-bold ${ink}`}>{option.title}</Hx>
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
        {block.caption && <figcaption className={caption}>{block.caption}</figcaption>}
        </figure>
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
              <p className={`flex items-center gap-2.5 text-[15px] font-bold ${ink}`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8EB522]/15 text-[#5E7A12]">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    {errorIcons[type.title]}
                  </svg>
                </span>
                {type.title}
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-[#250D47]/65">{type.errors.join(" · ")}</p>
            </div>
          ))}
        </div>
      );

    case "countHead":
      return (
        <div key={index} className="mt-14 flex items-start gap-5 border-t border-[#250D47]/10 pt-8 first:mt-0">
          <span aria-hidden="true" className="font-display text-6xl font-semibold leading-none tracking-[-2px] text-[#8EB522]">
            {block.n}
          </span>
          <div className="min-w-0 pt-1">
            <Hx className={`text-2xl font-bold ${ink}`}>
              {block.title.slice(0, block.title.lastIndexOf(" ") + 1)}
              <span className="font-display text-[1.3em] font-medium italic leading-none tracking-[-0.5px]">{block.title.slice(block.title.lastIndexOf(" ") + 1)}</span>
            </Hx>
            <p className="mt-1.5 max-w-[54rem] text-[16px] leading-[1.6] text-[#250D47]/85">{block.text}</p>
          </div>
        </div>
      );

    case "box":
      return (
        <aside key={index} className="my-10 rounded-xl border border-[#8EB522]/40 bg-[#8EB522]/10 px-5 py-5 sm:px-7 sm:py-6">
          <Hx className={`text-lg font-bold ${ink}`}>{block.title}</Hx>
          {block.text.map((t) => (
            <p key={t} className="mt-2 text-[16px] leading-[1.65] text-[#250D47]/90">
              {t}
            </p>
          ))}
        </aside>
      );

    case "columns":
      return (
        <div key={index} className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.title} className="min-w-0 border-t-2 border-[#250D47]/10 pt-4">
              <Hx className={`text-lg font-bold ${ink}`}>{item.title}</Hx>
              <p className="mt-2 text-[16px] leading-[1.65] text-[#250D47]/90">{item.text}</p>
            </div>
          ))}
        </div>
      );

    case "sideBySide":
      return (
        <div key={index} className="my-10 grid gap-8 sm:grid-cols-2">
          {block.items.map((item) => (
            <article key={item.title} className="min-w-0">
              <Hx className={`text-xl font-bold ${ink}`}>{item.title}</Hx>
              <p className="mt-2 text-[16px] leading-[1.65] text-[#250D47]/90">{item.text}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {item.figures.map((slot, i) => (
                  <SlotView key={i} slot={slot} sizes="(min-width: 640px) 220px, 44vw" framed className="w-full" />
                ))}
              </div>
            </article>
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
      return <SheetSpec headingLevel={level === 3 ? 4 : 3} key={index} levels={block.levels} rules={block.rules} />;

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

/** Decorative swirl tucked into a corner of a pull quote. Used in diagonally opposite corners. */
function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 72 72" className={`h-14 w-14 text-[#8EB522] ${className}`} fill="none">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8h34c7 0 11 4.5 8.5 8.5-2 3.2-7 2.4-6.6-1.2.3-2.7 3.6-3.3 5-1.4" />
        <path d="M8 8v34c0 7 4.5 11 8.5 8.5 3.2-2 2.4-7-1.2-6.6-2.7.3-3.3 3.6-1.4 5" />
        <path d="M42 8c6-.2 12 1.6 16 5M8 42c-.2 6 1.6 12 5 16" opacity="0.55" />
      </g>
      <path d="M8 3.5 12.5 8 8 12.5 3.5 8z" fill="currentColor" />
    </svg>
  );
}

/** "How might we" gets a hand-drawn green marker stroke underneath. */
function MarkerHMW({ text }: { text: string }) {
  const m = text.match(/^(How might we)([\s\S]*)$/);
  if (!m) return <>{text}</>;
  return (
    <>
      <span className="relative inline-block whitespace-nowrap">
        {m[1]}
        <svg aria-hidden="true" viewBox="0 0 200 12" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-1.5 left-[-2%] h-3 w-[104%]" fill="none">
          <path d="M3 8.5C36 4.5 76 4 112 5.6c30 1.3 58 3 85-1.6" stroke="#8EB522" strokeWidth="4.5" strokeLinecap="round" opacity="0.95" />
        </svg>
      </span>
      {m[2]}
    </>
  );
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


      {study.hero && <SlotView slot={study.hero} sizes="(min-width: 1152px) 1072px, 100vw" className="mt-12" />}

      <section aria-label="Project summary" className="mt-12 grid gap-x-10 gap-y-8 rounded-xl bg-[#250D47] p-6 text-[#FAF9F6] md:grid-cols-2 md:p-10">
          <dl className="grid grid-cols-1 gap-x-10 gap-y-4 border-b border-[#FAF9F6]/15 pb-7 sm:grid-cols-3 md:col-span-2">
            {study.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-[#B5D65A]">{item.label}</dt>
                <dd className="mt-1.5 text-[15px] leading-snug text-[#FAF9F6]/90">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-x-10 gap-y-8 md:col-span-2 md:grid-cols-2">
            {study.overview.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B5D65A]">{item.label}</p>
                <p className="mt-2 text-[17px] leading-relaxed text-[#FAF9F6]/90">
                  {item.label === "Objective" ? <MarkerHMW text={item.text} /> : item.text}
                </p>
              </div>
            ))}
          </div>
          {study.stats && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#FAF9F6]/15 pt-6 md:col-span-2 sm:grid-cols-4">
              {study.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-semibold tracking-[-1px] text-[#FAF9F6]">{stat.value}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-[#FAF9F6]/70">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
      </section>

      <div className="mt-20 lg:grid lg:grid-cols-[6.5rem_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-10 space-y-2 text-sm">
            {study.sections
              .filter((section) => section.nav)
              .map((section) => (
                <li key={section.id} className={section.level === 3 ? "border-l border-[#250D47]/15 pl-3 text-[13px]" : ""}>
                  <a href={`#${section.id}`} className="text-[#250D47]/55 hover:text-[#250D47]">
                    {section.nav}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className="min-w-0 max-w-[54rem]">
          {study.sections.map((section) => {
            const level = section.level ?? 2;
            const H = level === 3 ? "h3" : "h2";
            return (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-24 border-t py-14 first:border-t-0 first:pt-0 ${level === 3 ? "border-dashed border-[#250D47]/10" : "border-[#250D47]/10"}`}
              >
                <p className={eyebrow}>{section.eyebrow}</p>
                <H
                  className={`mt-3 font-display font-semibold tracking-[-1px] leading-tight ${level === 3 ? "text-[1.7rem] md:text-[2rem]" : "text-3xl md:text-4xl"} ${ink}`}
                >
                  {section.title}
                </H>
                <div className="mt-6">{section.blocks.map((block, i) => renderBlock(block, i, level))}</div>
              </section>
            );
          })}

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
