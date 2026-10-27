"use client";

import { useEffect, useRef, useState } from "react";

// A short looping screen recording inside the same thin iPhone frame as the screenshots.
// Autoplays muted; people who prefer reduced motion get a paused clip with controls instead.
export default function PhoneClip({ src, poster, label, wide }: { src: string; poster: string; label: string; wide?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) ref.current?.pause();
      else ref.current?.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (wide) {
    // A 16:9 scene that already has its own phone in it, so no extra frame.
    return (
      <video
        ref={ref}
        className="block aspect-video w-full rounded-xl bg-[#FAF9F6] shadow-[0_1px_0_1px_rgba(37,13,71,0.06)]"
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        controls={reduced}
        preload="metadata"
      />
    );
  }

  return (
    <div className="@container w-full">
      <div className="rounded-[13cqw] bg-[#1C1B21] p-[2.4cqw] shadow-[0_1px_0_1px_rgba(37,13,71,0.08),0_14px_30px_-18px_rgba(37,13,71,0.45)]">
        <video
          ref={ref}
          className="block w-full overflow-hidden rounded-[10.8cqw] bg-black"
          src={src}
          poster={poster}
          aria-label={label}
          muted
          loop
          playsInline
          autoPlay={!reduced}
          controls={reduced}
          preload="metadata"
        />
      </div>
    </div>
  );
}
