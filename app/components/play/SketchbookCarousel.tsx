"use client";

import { ChevronLeft, ChevronRight, BookOpenText, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Spread = {
  title: string;
  leftLabel: string;
  rightLabel: string;
  leftAccent: string;
  rightAccent: string;
  leftPattern: string;
  rightPattern: string;
  note: string;
};

const spreads: Spread[] = [
  {
    title: "Field Notes",
    leftLabel: "Thumbnail studies",
    rightLabel: "Perspective fragments",
    leftAccent: "#E8DCCB",
    rightAccent: "#D8C7B0",
    leftPattern:
      "linear-gradient(135deg, rgba(69,20,12,0.08) 0 18%, transparent 18% 36%, rgba(69,20,12,0.06) 36% 54%, transparent 54% 72%, rgba(69,20,12,0.08) 72% 100%)",
    rightPattern:
      "radial-gradient(circle at 20% 20%, rgba(69,20,12,0.12) 0 8%, transparent 8% 100%), linear-gradient(45deg, rgba(69,20,12,0.06) 0 12%, transparent 12% 24%, rgba(69,20,12,0.06) 24% 36%, transparent 36% 48%, rgba(69,20,12,0.06) 48% 60%, transparent 60% 72%, rgba(69,20,12,0.06) 72% 84%, transparent 84% 100%)",
    note: "Use this spread for process sketches, reference clips, or small studies.",
  },
  {
    title: "Character Pass",
    leftLabel: "Gesture page",
    rightLabel: "Expression sheet",
    leftAccent: "#E6D1C7",
    rightAccent: "#D9CFC0",
    leftPattern:
      "linear-gradient(0deg, rgba(69,20,12,0.08) 0 2px, transparent 2px 100%), linear-gradient(90deg, rgba(69,20,12,0.04) 0 1px, transparent 1px 100%)",
    rightPattern:
      "radial-gradient(circle at 30% 28%, rgba(69,20,12,0.11) 0 6%, transparent 6% 100%), radial-gradient(circle at 68% 60%, rgba(69,20,12,0.09) 0 5%, transparent 5% 100%)",
    note: "Built for a left-right pairing where one page complements the other.",
  },
  {
    title: "Material Tests",
    leftLabel: "Texture swatches",
    rightLabel: "Color callouts",
    leftAccent: "#D9C8AA",
    rightAccent: "#E3D3BE",
    leftPattern:
      "repeating-linear-gradient(135deg, rgba(69,20,12,0.08) 0 10px, transparent 10px 22px)",
    rightPattern:
      "radial-gradient(circle at 50% 50%, rgba(69,20,12,0.1) 0 7%, transparent 7% 100%), repeating-linear-gradient(45deg, rgba(69,20,12,0.05) 0 8px, transparent 8px 18px)",
    note: "Good for close-up experiments, swatches, and visual research.",
  },
  {
    title: "Storyboard",
    leftLabel: "Frame one",
    rightLabel: "Frame two",
    leftAccent: "#E9DDC8",
    rightAccent: "#D7CCB9",
    leftPattern:
      "linear-gradient(180deg, rgba(69,20,12,0.08) 0 2px, transparent 2px 100%), linear-gradient(90deg, rgba(69,20,12,0.06) 0 2px, transparent 2px 100%)",
    rightPattern:
      "linear-gradient(135deg, rgba(69,20,12,0.08) 0 16%, transparent 16% 32%, rgba(69,20,12,0.08) 32% 48%, transparent 48% 64%, rgba(69,20,12,0.08) 64% 80%, transparent 80% 100%)",
    note: "A spread like this can handle sequential moments or before/after ideas.",
  },
  {
    title: "Final Polish",
    leftLabel: "Draft refinements",
    rightLabel: "Presentation page",
    leftAccent: "#E5D8CA",
    rightAccent: "#DCCDB8",
    leftPattern:
      "radial-gradient(circle at 18% 30%, rgba(69,20,12,0.12) 0 4%, transparent 4% 100%), radial-gradient(circle at 72% 68%, rgba(69,20,12,0.08) 0 4%, transparent 4% 100%)",
    rightPattern:
      "repeating-linear-gradient(90deg, rgba(69,20,12,0.05) 0 1px, transparent 1px 14px), repeating-linear-gradient(0deg, rgba(69,20,12,0.04) 0 1px, transparent 1px 14px)",
    note: "Use this for finished artwork, presentation spreads, or polished mockups.",
  },
];

function SketchPage({
  label,
  accent,
  pattern,
  side,
}: {
  label: string;
  accent: string;
  pattern: string;
  side: "left" | "right";
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-[#45140C]/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
      style={{
        backgroundColor: accent,
        backgroundImage: `${pattern}, linear-gradient(180deg, rgba(255,255,255,0.25), transparent 40%)`,
      }}
    >
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(69,20,12,0.08)_1px,transparent_1px)] [background-size:100%_26px]" />
      <div
        className={`absolute top-0 bottom-0 w-6 bg-[#45140C]/10 ${side === "left" ? "right-0" : "left-0"}`}
        style={{
          clipPath: side === "left" ? "polygon(100% 0, 0 0, 100% 100%)" : "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#45140C]/70">Sketchbook</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[#45140C] font-formadjr leading-none">
              {label}
            </h3>
          </div>
          <div className="rounded-full border border-[#45140C]/20 bg-[#F3EDE2]/75 px-3 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-[#45140C]/70">
            Placeholder
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-end justify-between gap-4">
          <div className="max-w-[65%] rounded-2xl border border-dashed border-[#45140C]/25 bg-[#F3EDE2]/45 px-3 py-2 text-sm text-[#45140C]/80 shadow-sm">
            Add your artwork here
          </div>
          <div className="text-right text-xs uppercase tracking-[0.3em] text-[#45140C]/60">
            spread
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SketchbookCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isFlipping, setIsFlipping] = useState(false);

  const current = useMemo(() => spreads[index], [index]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsFlipping(false), 780);
    return () => window.clearTimeout(timer);
  }, [index]);

  const goTo = (nextIndex: number) => {
    if (nextIndex === index || isFlipping) return;
    setDirection(nextIndex > index || (index === spreads.length - 1 && nextIndex === 0) ? "next" : "prev");
    setIsFlipping(true);
    window.setTimeout(() => setIndex(nextIndex), 180);
  };

  const handlePrev = () => goTo((index - 1 + spreads.length) % spreads.length);
  const handleNext = () => goTo((index + 1) % spreads.length);

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 md:px-10 lg:px-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(69,20,12,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(181,173,33,0.16),_transparent_32%),linear-gradient(180deg,#F3EDE2_0%,#EFE4D6_55%,#E6D8C4_100%)]" />
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#45140C]/15 bg-[#F3EDE2]/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#45140C]/70 shadow-sm backdrop-blur">
              <BookOpenText className="h-4 w-4" />
              Play page
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-[#45140C] font-formadjr leading-none">
              Sketchbook spreads
            </h1>
            <p className="mt-3 max-w-xl text-sm sm:text-base md:text-lg text-[#45140C]/75">
              A two-page carousel designed to feel like flipping through a real sketchbook. Replace each placeholder spread with your artwork, and it&apos;s ready to grow to five spreads right now.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#45140C]/20 bg-[#F3EDE2]/90 text-[#45140C] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#45140C] hover:text-[#F3EDE2]"
              aria-label="Previous spread"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#45140C]/20 bg-[#F3EDE2]/90 text-[#45140C] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#45140C] hover:text-[#F3EDE2]"
              aria-label="Next spread"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_260px] lg:items-start">
          <div className="relative">
            <div className="[perspective:2200px]">
              <div className="relative mx-auto w-full max-w-6xl">
                <div className="relative overflow-hidden rounded-[2rem] border border-[#45140C]/15 bg-[#6b4f35] p-3 sm:p-4 shadow-[0_30px_80px_rgba(69,20,12,0.22)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_60%)]" />
                  <div className="relative grid min-h-[520px] grid-cols-1 gap-3 sm:min-h-[620px] md:grid-cols-2">
                    <div className="relative h-full min-h-[240px] md:min-h-0">
                      <SketchPage
                        label={current.leftLabel}
                        accent={current.leftAccent}
                        pattern={current.leftPattern}
                        side="left"
                      />
                    </div>
                    <div className="relative h-full min-h-[240px] md:min-h-0">
                      <SketchPage
                        label={current.rightLabel}
                        accent={current.rightAccent}
                        pattern={current.rightPattern}
                        side="right"
                      />
                    </div>

                    <div
                      className={`pointer-events-none absolute inset-y-3 left-1/2 hidden w-[calc(50%-0.25rem)] -translate-x-1/2 rounded-[1.5rem] border border-[#45140C]/18 shadow-[0_16px_40px_rgba(69,20,12,0.2)] md:block ${
                        isFlipping
                          ? direction === "next"
                            ? "animate-[bookFlipNext_0.78s_ease-in-out_forwards]"
                            : "animate-[bookFlipPrev_0.78s_ease-in-out_forwards]"
                          : "opacity-0"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: direction === "next" ? "left center" : "right center",
                        backgroundImage:
                          "linear-gradient(90deg, rgba(243,237,226,0.98), rgba(225,215,197,0.96) 45%, rgba(181,173,33,0.08) 48%, rgba(243,237,226,0.98) 100%)",
                      }}
                    />

                    <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-[#45140C]/25 shadow-[0_0_0_1px_rgba(255,255,255,0.18)] md:block" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#45140C]/75">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>{current.title}</span>
              </div>
              <span>
                Spread {index + 1} of {spreads.length}
              </span>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-[#45140C]/12 bg-[#F3EDE2]/85 p-5 shadow-[0_18px_50px_rgba(69,20,12,0.1)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-[#45140C]/60">How to use</p>
            <p className="mt-3 text-sm leading-relaxed text-[#45140C]/80">
              Swap each panel with a real image, drawing scan, or spread preview. The right-side notes work well for captions, medium, or a short process description.
            </p>

            <div className="mt-5 space-y-3">
              {spreads.map((spread, spreadIndex) => (
                <button
                  key={spread.title}
                  type="button"
                  onClick={() => goTo(spreadIndex)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    spreadIndex === index
                      ? "border-[#45140C] bg-[#45140C] text-[#F3EDE2] shadow-md"
                      : "border-[#45140C]/12 bg-[#F3EDE2] text-[#45140C] hover:-translate-y-0.5 hover:border-[#45140C]/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{spread.title}</span>
                    <span className="text-xs uppercase tracking-[0.25em] opacity-70">
                      {spreadIndex + 1}
                    </span>
                  </div>
                  <div className="mt-1 text-xs opacity-80">
                    {spread.leftLabel} / {spread.rightLabel}
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#45140C]/60">
              Tip: this is structured as a five-spread set now, so you can drop in final art without changing the component shape.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
