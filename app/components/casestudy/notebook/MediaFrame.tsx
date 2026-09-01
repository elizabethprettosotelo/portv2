"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "./types";

type MediaFrameProps = {
  media?: MediaAsset;
  className?: string;
  aspectClassName?: string;
};

function getFocusableElements(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled"));
}

export default function MediaFrame({
  media,
  className = "",
  aspectClassName = "aspect-[16/9]",
}: MediaFrameProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = getFocusableElements(dialogRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      lastFocusedRef.current?.focus();
    };
  }, [open]);

  if (!media) return null;

  const imageSrc = media.src;
  const caption = media.caption ?? media.placeholder;

  if (imageSrc) {
    return (
      <>
        <div className={className}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`group relative block w-full overflow-hidden rounded-[1.5rem] border border-[#250D47]/12 bg-[#F0F1E3] text-left transition hover:border-[#8EB522]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB522] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0F1E3] ${aspectClassName}`}
            aria-label={media.alt ?? "Open image preview"}
          >
            <Image
              src={imageSrc}
              alt={media.alt ?? ""}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 760px, 100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#250D47]/55 via-transparent to-transparent" />
            {caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <p className="max-w-[90%] text-xs font-medium uppercase tracking-[0.2em] text-[#F0F1E3]/80">
                  {caption}
                </p>
              </div>
            )}
          </button>
        </div>

        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#250D47]/70 p-4">
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={media.alt ?? "Image preview"}
              className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] bg-[#F0F1E3]"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#250D47]/10 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8EB522]">
                    Preview
                  </p>
                  {media.caption && (
                    <p className="truncate text-sm text-[#250D47]/70">
                      {media.caption}
                    </p>
                  )}
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-[#250D47]/15 px-3 py-1.5 text-sm font-medium text-[#250D47] transition hover:bg-[#250D47]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB522]"
                >
                  Close
                </button>
              </div>
              <div className="relative aspect-[16/9] bg-[#250D47]">
                <Image
                  src={imageSrc}
                  alt={media.alt ?? ""}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={className}>
      <div className={`flex items-center justify-center rounded-[1.5rem] border border-dashed border-[#250D47]/20 bg-[#F0F1E3] p-8 text-center ${aspectClassName}`}>
        <div className="max-w-md space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8EB522]">
            Placeholder
          </p>
          <p className="text-sm leading-relaxed text-[#250D47]/65">
            {media.placeholder ?? "Add a project image or video here."}
          </p>
        </div>
      </div>
    </div>
  );
}



