import type { FlowStep } from "./types";

type CurrentStateFlowProps = {
  intro: string;
  steps: FlowStep[];
  note?: string;
};

export default function CurrentStateFlow({ intro, steps, note }: CurrentStateFlowProps) {
  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-base leading-relaxed text-[#45140C]/80">{intro}</p>

      <div className="rounded-[1.75rem] border border-[#45140C]/12 bg-[#FDFAF7] p-5 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <div key={`${step.label}-${index}`} className="flex-1">
                <div className="flex h-full gap-3">
                  <div className="flex w-8 flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                        step.highlight
                          ? "border-[#B5AD21] bg-[#B5AD21] text-[#45140C]"
                          : "border-[#45140C]/15 bg-white text-[#45140C]"
                      }`}
                    >
                      0{index + 1}
                    </div>
                    {!isLast && (
                      <div className="my-2 hidden h-full w-px flex-1 bg-[#45140C]/12 lg:block" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pb-4 lg:pb-0">
                    <div className="space-y-2 rounded-[1.25rem] border border-[#45140C]/10 bg-white p-4">
                      <p className="text-sm font-semibold text-[#1f1712]">{step.label}</p>
                      {step.detail && (
                        <p className="text-sm leading-relaxed text-[#45140C]/70">
                          {step.detail}
                        </p>
                      )}
                      {step.friction && (
                        <p className="rounded-xl border border-[#E5B1A4]/35 bg-[#E5B1A4]/8 px-3 py-2 text-xs leading-relaxed text-[#45140C]/75">
                          Friction: {step.friction}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {note && (
        <p className="max-w-3xl border-l-4 border-[#B5AD21] pl-4 text-sm leading-relaxed text-[#45140C]/70">
          {note}
        </p>
      )}
    </div>
  );
}
