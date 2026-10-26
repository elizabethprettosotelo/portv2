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
    leftAccent: "#FAF9F6",
    rightAccent: "#FAF9F6",
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
    leftAccent: "#FAF9F6",
    rightAccent: "#FAF9F6",
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
    leftAccent: "#FAF9F6",
    rightAccent: "#FAF9F6",
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
    leftAccent: "#FAF9F6",
    rightAccent: "#FAF9F6",
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
    leftAccent: "#FAF9F6",
    rightAccent: "#FAF9F6",
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
      className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-[#250D47]/18"
      style={{
        backgroundColor: accent,
        backgroundImage: `${pattern}, linear-gradient(180deg, rgba(255,255,255,0.25), transparent 40%)`,
      }}
    >
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(69,20,12,0.08)_1px,transparent_1px)] [background-size:100%_26px]" />
      <div
        className={`absolute top-0 bottom-0 w-6 bg-[#250D47]/10 ${side === "left" ? "right-0" : "left-0"}`}
        style={{
          clipPath: side === "left" ? "polygon(100% 0, 0 0, 100% 100%)" : "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#250D47]/70">Sketchbook</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[#250D47] font-formadjr leading-none">
              {label}
            </h3>
          </div>
          <div className="rounded-full border border-[#250D47]/20 bg-[#FAF9F6]/75 px-3 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-[#250D47]/70">
            Placeholder
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-end justify-between gap-4">
          <div className="max-w-[65%] rounded-2xl border border-dashed border-[#250D47]/25 bg-[#FAF9F6]/45 px-3 py-2 text-sm text-[#250D47]/80">
            Add your artwork here
          </div>
          <div className="text-right text-xs uppercase tracking-[0.3em] text-[#250D47]/60">
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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(69,20,12,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(181,173,33,0.16),_transparent_32%),linear-gradient(180deg,#FAF9F6_0%,#FAF9F6_55%,#FAF9F6_100%)]" />
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#250D47]/15 bg-[#FAF9F6]/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#250D47]/70 backdrop-blur">
              <BookOpenText className="h-4 w-4" />
              Play page
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-[#250D47] font-formadjr leading-none">
              Sketchbook spreads
            </h1>
            <p className="mt-3 max-w-xl text-sm sm:text-base md:text-lg text-[#250D47]/75">
              A two-page carousel designed to feel like flipping through a real sketchbook. Replace each placeholder spread with your artwork, and it&apos;s ready to grow to five spreads right now.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#250D47]/20 bg-[#FAF9F6]/90 text-[#250D47] transition hover:-translate-y-0.5 hover:bg-[#250D47] hover:text-[#FAF9F6]"
              aria-label="Previous spread"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#250D47]/20 bg-[#FAF9F6]/90 text-[#250D47] transition hover:-translate-y-0.5 hover:bg-[#250D47] hover:text-[#FAF9F6]"
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
                    <div className="relative overflow-hidden rounded-[2rem] border border-[#250D47]/15 bg-[#250D47] p-3 sm:p-4">
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
                      className={`pointer-events-none absolute inset-y-3 left-1/2 hidden w-[calc(50%-0.25rem)] -translate-x-1/2 rounded-[1.5rem] border border-[#250D47]/18 md:block ${
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

                    <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-[#250D47]/25 md:block" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#250D47]/75">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>{current.title}</span>
              </div>
              <span>
                Spread {index + 1} of {spreads.length}
              </span>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-[#250D47]/12 bg-[#FAF9F6]/85 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-[#250D47]/60">How to use</p>
            <p className="mt-3 text-sm leading-relaxed text-[#250D47]/80">
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
                      ? "border-[#250D47] bg-[#250D47] text-[#FAF9F6]"
                      : "border-[#250D47]/12 bg-[#FAF9F6] text-[#250D47] hover:-translate-y-0.5 hover:border-[#250D47]/30"
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

            <p className="mt-4 text-xs leading-relaxed text-[#250D47]/60">
              Tip: this is structured as a five-spread set now, so you can drop in final art without changing the component shape.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}



