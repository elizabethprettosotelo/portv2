"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Folder from "./Folder";

const FOLDER_POSITIONS = [
  { left: "6%", top: "12%" },
  { left: "38%", top: "42%" },
  { left: "68%", top: "8%" },
];

type PlaySection = {
  id: string;
  title: string;
  description: string;
  slotCount: number;
  imageCount: number;
};

const sections: PlaySection[] = [
  {
    id: "personal",
    title: "Personal Work",
    description: "Passion projects, experiments, and the things I make just because I want to.",
    slotCount: 3,
    imageCount: 0,
  },
  {
    id: "techrangers",
    title: "Techrangers @ CDL",
    description: "Design and development work built with the Techrangers team at UCF's Center for Distributed Learning.",
    slotCount: 3,
    imageCount: 6,
  },
  {
    id: "knighthacks",
    title: "Knight Hacks",
    description: "Branding, graphics, and event design made as Design Director for UCF's Knight Hacks hackathon.",
    slotCount: 3,
    imageCount: 12,
  },
];

function GraphicCard({
  src,
  alt,
  fit = "contain",
  aspect = "3/4",
}: {
  src: string;
  alt: string;
  fit?: "contain" | "cover";
  aspect?: "3/4" | "4/5" | "1/1";
}) {
  const aspectClass = aspect === "4/5" ? "aspect-4/5" : aspect === "1/1" ? "aspect-square" : "aspect-3/4";
  return (
    <div className={`relative ${aspectClass} w-full overflow-hidden rounded-xl border border-[#250D47]/15 bg-[#F9FAF3]`}>
      <Image src={src} alt={alt} fill className={fit === "cover" ? "object-cover" : "object-contain"} />
    </div>
  );
}

function TechRangersGallery() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#250D47]/60 font-inter">
        Hiring Season Fall 2026
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[3, 4, 5, 6].map((n) => (
          <GraphicCard key={n} src={`/techrangers/tr-graphics-${n}.png`} alt={`Techrangers graphic ${n}`} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[2, 1].map((n) => (
          <GraphicCard
            key={n}
            src={`/techrangers/tr-graphics-${n}.png`}
            alt={`Techrangers graphic ${n}`}
            fit={n === 2 ? "cover" : "contain"}
          />
        ))}
      </div>
    </div>
  );
}

function KnightHacksGallery() {
  const rows: { key: string; label: string; order: number[]; subheading: string }[] = [
    { key: "gemiknights", label: "GemiKnights", order: [1, 2, 3], subheading: "Knight Hacks 2026" },
    { key: "mentor-apps", label: "Mentor apps", order: [3, 2, 1], subheading: "Knight Hacks 2025" },
    { key: "mentee-apps", label: "Mentee apps", order: [3, 2, 1], subheading: "Knight Hacks 2025" },
    { key: "khviii-mixer", label: "Knight Hacks VIII acceptance & mixer", order: [1, 2, 3], subheading: "Knight Hacks 2025" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {rows.map((row, i) => {
        const showSubheading = i === 0 || rows[i - 1].subheading !== row.subheading;
        return (
          <div key={row.key} className="flex flex-col gap-3">
            {showSubheading && (
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#250D47]/60 font-inter">
                {row.subheading}
              </h3>
            )}
            <div className="grid grid-cols-3 gap-4">
              {row.order.map((n) => (
                <GraphicCard
                  key={n}
                  src={`/knighthacks/play/${row.key}-${n}.png`}
                  alt={`${row.label} graphic ${n}`}
                  aspect={row.key === "khviii-mixer" && n === 1 ? "1/1" : "4/5"}
                  fit="cover"
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FileSlot() {
  return (
    <div className="group relative flex aspect-4/3 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#250D47]/20 bg-[#F9FAF3] text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#9AB1EB]">
      <span className="text-3xl text-[#250D47]/25 transition-colors duration-300 group-hover:text-[#9AB1EB]">
        +
      </span>
      <span className="px-4 text-xs font-semibold uppercase tracking-wide text-[#250D47]/40 font-inter">
        Coming soon
      </span>
    </div>
  );
}

export default function PlayGround() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openSection = sections.find((s) => s.id === openId) ?? null;
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative min-h-screen w-full bg-[#F0F1E3]"
      style={{
        backgroundImage: "radial-gradient(rgba(154,177,235,0.55) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-[#250D47]/15 bg-[#F0F1E3]/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#250D47]/70 font-inter">
            Play
          </span>
          <h1 className="mt-4 text-5xl font-bold text-[#250D47] font-formadjr md:text-6xl">
            A space to play around
          </h1>
          <p className="mt-4 text-lg text-[#250D47]/70 font-semibold font-inter leading-relaxed">
            An open canvas for the design work that doesn&apos;t fit neatly into a case study &mdash; sorted into folders by where it came from. Click one to open it up.
          </p>
        </div>

        <div
          ref={canvasRef}
          className="relative h-72 w-full rounded-2xl border border-dashed border-[#250D47]/15 sm:h-80"
        >
          {sections.map((section, i) => (
            <Folder
              key={section.id}
              title={section.title}
              count={section.slotCount}
              badgeCount={section.imageCount}
              isOpen={openId === section.id}
              onClick={() => setOpenId((current) => (current === section.id ? null : section.id))}
              dragConstraintsRef={canvasRef}
              initialPosition={FOLDER_POSITIONS[i]}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {openSection && (
            <motion.div
              key={openSection.id}
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-12 rounded-2xl border border-[#250D47]/12 bg-[#F9FAF3]/60 p-6 sm:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#250D47] font-formadjr">{openSection.title}</h2>
                    <p className="mt-1 max-w-xl text-sm text-[#250D47]/70 font-semibold font-inter leading-relaxed">
                      {openSection.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenId(null)}
                    aria-label="Close folder"
                    className="shrink-0 rounded-full border border-[#250D47]/15 bg-[#F0F1E3] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#250D47]/70 transition hover:border-[#9AB1EB] hover:text-[#250D47] font-inter"
                  >
                    Close
                  </button>
                </div>
                {openSection.id === "techrangers" ? (
                  <TechRangersGallery />
                ) : openSection.id === "knighthacks" ? (
                  <KnightHacksGallery />
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: openSection.slotCount }).map((_, i) => (
                      <FileSlot key={i} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
