"use client";

import { useState } from "react";

// Click-to-play YouTube embed. Nothing loads from YouTube until the visitor
// presses play, which keeps the page fast and avoids tracking on load.
export default function VideoEmbed({ youtubeId, title, start = 0 }: { youtubeId: string; title: string; start?: number }) {
  const [playing, setPlaying] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&start=${start}`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#250D47]">
      {playing ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#FAF9F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B5D65A]"
          aria-label={`Play video: ${title}`}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8EB522] text-[#250D47] transition group-hover:scale-105">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z" />
            </svg>
          </span>
          <span className="text-lg font-bold">{title}</span>
        </button>
      )}
    </div>
  );
}
