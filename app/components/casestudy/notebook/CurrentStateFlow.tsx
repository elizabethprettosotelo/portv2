import type { FlowStep } from "./types";

type CurrentStateFlowProps = {
  intro: string;
  steps: FlowStep[];
  note?: string;
};

export default function CurrentStateFlow({ intro, steps, note }: CurrentStateFlowProps) {
  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-base leading-relaxed text-[#250D47]/80">{intro}</p>

      <div className="rounded-[1.75rem] border border-[#250D47]/12 bg-[#F0F1E3] p-5 md:p-6">
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
                          ? "border-[#8EB522] bg-[#8EB522] text-[#250D47]"
                          : "border-[#250D47]/15 bg-white text-[#250D47]"
                      }`}
                    >
                      0{index + 1}
                    </div>
                    {!isLast && (
                      <div className="my-2 hidden h-full w-px flex-1 bg-[#250D47]/12 lg:block" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pb-4 lg:pb-0">
                    <div className="space-y-2 rounded-[1.25rem] border border-[#250D47]/10 bg-white p-4">
                      <p className="text-sm font-semibold text-[#250D47]">{step.label}</p>
                      {step.detail && (
                        <p className="text-sm leading-relaxed text-[#250D47]/70">
                          {step.detail}
                        </p>
                      )}
                      {step.friction && (
                        <p className="rounded-xl border border-[#9AB1EB]/35 bg-[#9AB1EB]/8 px-3 py-2 text-xs leading-relaxed text-[#250D47]/75">
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
        <p className="max-w-3xl border-l-4 border-[#8EB522] pl-4 text-sm leading-relaxed text-[#250D47]/70">
          {note}
        </p>
      )}
    </div>
  );
}



