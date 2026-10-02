"use client";

import type { FlowStep } from "./types";
import { useInView } from "../../../hooks/useInView";

type CurrentStateFlowProps = {
  intro: string;
  steps: FlowStep[];
  note?: string;
};

export default function CurrentStateFlow({ intro, steps, note }: CurrentStateFlowProps) {
  const flowRef = useInView<HTMLDivElement>("cs-scale-in");

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-[#250D47]/70">{intro}</p>

      <div ref={flowRef} className="anim-hidden overflow-x-auto pb-1">
        <div
          className="grid gap-x-4 gap-y-3"
          style={{
            gridTemplateColumns: `repeat(${steps.length}, minmax(9rem, 1fr))`,
            minWidth: `${steps.length * 9}rem`,
          }}
        >
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <div key={`number-${step.label}-${index}`} className="flex items-center">
                <span className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-[#250D47]/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {!isLast && (
                  <div className="ml-2 flex flex-1 items-center">
                    <div className="h-px flex-1 bg-[#250D47]/25" />
                    <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0 text-[#250D47]/35">
                      <path d="M1 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}

          {steps.map((step, index) => (
            <div
              key={`card-${step.label}-${index}`}
              className="rounded-xl border border-[#250D47]/12 bg-[#F9FAF3] p-3.5"
            >
              <p className="text-sm font-semibold text-[#250D47]">{step.label}</p>
              {step.detail && (
                <p className="mt-1 text-xs leading-relaxed text-[#250D47]/65">
                  {step.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {note && (
        <p className="text-xs leading-relaxed text-[#250D47]/60">{note}</p>
      )}
    </div>
  );
}
