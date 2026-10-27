import Image from "next/image";
import type { SheetLevel } from "./types";

// Inline version of the bottom sheet spec: a coded phone mockup for each level,
// plus the rules for when it appears and what it holds. Drawn in code so it stays
// sharp at any size and the text is real, selectable text.

function Reticle() {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className="absolute left-1/2 top-[34%] w-1/2 -translate-x-1/2 -translate-y-1/2">
      <path
        d="M4 54V24Q4 4 24 4H54M146 4H176Q196 4 196 24V54M196 146V176Q196 196 176 196H146M54 196H24Q4 196 4 176V146"
        stroke="rgba(255,255,255,.9)"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Button({ children, primary }: { children: string; primary?: boolean }) {
  return (
    <span
      className={`mt-1.5 block rounded-lg border px-2 py-2 text-center text-[11px] font-bold ${
        primary ? "border-[#250D47] bg-[#250D47] text-white" : "border-[#D6D2DD] text-[#250D47]"
      }`}
    >
      {children}
    </span>
  );
}

function Phone({ level }: { level: SheetLevel }) {
  const m = level.mock;
  const camera = level.kind !== "full";

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[300/620] w-full max-w-[210px] overflow-hidden rounded-[26px] border-[6px] border-[#14121A] bg-[#2A2733] text-[#250D47]"
    >
      {camera && (
        <>
          <div className="flex justify-between px-4 pt-4 text-[10px] font-semibold text-[#EDEAE0]">
            <span>UCFHere</span>
            <span>Scan</span>
          </div>
          <Reticle />
        </>
      )}

      {level.kind === "nudge" && (
        <div className="absolute inset-x-2.5 bottom-3 rounded-xl bg-white px-2 py-2.5 text-center text-[11px] font-bold">{m.title}</div>
      )}

      {level.kind === "half" && (
        <>
          <p className="absolute inset-x-0 top-12 text-center text-[8px] font-bold tracking-[0.12em] text-[#EDEAE0]">SCAN PAUSED</p>
          <div className="absolute inset-x-0 bottom-0 flex h-[56%] flex-col rounded-t-2xl bg-white px-3.5 pb-3 pt-2">
            <span className="mx-auto mb-2 h-[3px] w-8 rounded-full bg-[#D6D2DD]" />
            <p className="text-[13px] font-extrabold leading-tight">{m.title}</p>
            {m.body && <p className="mt-1 text-[9.5px] leading-snug text-[#4A3F5C]">{m.body}</p>}
            <span className="flex-1" />
            {m.primary && <Button primary>{m.primary}</Button>}
            {m.secondary && <Button>{m.secondary}</Button>}
            {m.footnote && <p className="mt-2 text-center text-[8.5px] text-[#7A7088]">{m.footnote}</p>}
          </div>
        </>
      )}

      {level.kind === "full" && (
        <div className="absolute inset-0 flex flex-col bg-white px-3.5 pb-3 pt-7">
          {m.meta && <p className="text-[7.5px] font-bold uppercase tracking-[0.1em] text-[#6B5E80]">{m.meta}</p>}
          <p className="mt-1.5 text-[13px] font-extrabold leading-tight">{m.title}</p>
          {m.steps && (
            <ol className="mt-2 list-decimal space-y-1 pl-3.5 text-[9.5px] leading-snug">
              {m.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          )}
          <span className="flex-1" />
          {m.primary && <Button primary>{m.primary}</Button>}
          {m.footnote && <p className="mt-2 text-center text-[8.5px] text-[#7A7088]">{m.footnote}</p>}
        </div>
      )}
    </div>
  );
}

export default function SheetSpec({ levels, rules, headingLevel = 3 }: { levels: SheetLevel[]; rules?: { title: string; text: string }[]; headingLevel?: 3 | 4 }) {
  const H = headingLevel === 4 ? "h4" : "h3";
  const rowCount = levels[0]?.rows.length ?? 0;
  // Header, phone, each row, and the "used by" footer share one row track per card,
  // so labels and dividers line up across all three levels on wide screens.
  const span = rowCount + 3;

  return (
    <div className="my-10">
      <div className="grid gap-5 md:grid-cols-3 md:gap-x-4 md:gap-y-0">
        {levels.map((level, i) => (
          <section
            key={level.name}
            className="grid min-w-0 overflow-hidden rounded-2xl border border-[#250D47]/10 bg-white md:grid-rows-subgrid md:[grid-row:span_var(--span)]"
            style={{ ["--span" as string]: span }}
          >
            <header className="flex items-center gap-2.5 px-4 pb-3 pt-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                style={{ backgroundColor: level.color }}
              >
                {i + 1}
              </span>
              <H className="text-lg font-bold text-[#250D47]">{level.name}</H>
              <span
                className="ml-auto shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{ color: level.color, backgroundColor: level.tint }}
              >
                {level.count}
              </span>
            </header>

            <div className="mx-3 rounded-xl px-4 py-5" style={{ backgroundColor: level.tint }}>
              {level.image ? (
                <div className="@container mx-auto w-full max-w-[190px]">
                  {/* Same thin iPhone frame as the other screenshots. */}
                  <div className="rounded-[13cqw] bg-[#1C1B21] p-[2.4cqw]">
                    <Image
                      src={level.image.src}
                      alt={level.image.alt}
                      width={level.image.width}
                      height={level.image.height}
                      sizes="190px"
                      className="block h-auto w-full rounded-[10.8cqw]"
                    />
                  </div>
                </div>
              ) : (
                <Phone level={level} />
              )}
            </div>

            <dl className="contents">
              {level.rows.map((row, r) => (
                <div key={row.label} className={`mx-4 py-3 ${r === 0 ? "mt-2" : "border-t border-[#250D47]/10"}`}>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6B5E80]">{row.label}</dt>
                  <dd className="mt-1 text-[15px] leading-snug text-[#250D47]/90">{row.text}</dd>
                </div>
              ))}
            </dl>

            <div className="mx-4 border-t border-[#250D47]/10 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6B5E80]">Handles</p>
              <ul className="mt-1.5 space-y-1 text-[15px] leading-snug text-[#250D47]/90">
                {level.usedBy.map((type) => (
                  <li key={type} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: level.color }} />
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {rules && rules.length > 0 && (
        <div className="mt-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6B5E80]">Rules every level follows</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {rules.map((rule, i) => (
              <div key={rule.title} className="rounded-xl border border-[#250D47]/10 bg-white p-4">
                <p className="flex items-center gap-2 font-bold text-[#250D47]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFC904] text-xs font-extrabold text-[#250D47]">
                    {i + 1}
                  </span>
                  {rule.title}
                </p>
                <p className="mt-2 text-[15px] leading-snug text-[#250D47]/85">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
