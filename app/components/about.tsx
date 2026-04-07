"use client";

import Image from "next/image";
import { useState } from "react";

const PHOTOS = ["/ABOUT/me1.png", "/ABOUT/me2.png"];

type AboutProps = {
  // Hero Section
  name: string;
  tagline: string;
  
  // Bio
  bio: string;
  
  // Skills & Tools
  skills?: {
    category: string;
    items: string[];
  }[];
  
  // Interests/Hobbies — kept for potential future use
  interests?: string[];
  
  // Community Gallery
  communityCaption?: string;
  communityMedia?: {
    src: string;
    type: "image" | "video";
    alt?: string;
    caption?: string;
  }[];

  // Books
  books?: {
    title: string;
    author?: string;
    cover: string;
  }[];
  readingBlurb?: string;
  readingPhoto?: string;
};

export default function About({
  name,
  tagline,
  bio,
  books,
  readingBlurb,
  readingPhoto,
  communityCaption,
  communityMedia,
}: AboutProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const prevPhoto = () => setCurrentPhoto((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
  const nextPhoto = () => setCurrentPhoto((i) => (i + 1) % PHOTOS.length);

  return (
    <>
    <div className="w-full bg-[#F3EDE2]">

      {/* About Me — carousel left, name + bio right */}
      <section id="about-bio" className="w-full py-16 px-4 sm:px-8 fade-in-up">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 items-center lg:items-start">

          {/* Photo Carousel */}
          <div className="shrink-0 flex flex-col items-center gap-3 lg:sticky lg:top-8 w-full lg:w-auto">
            {/* Arrow + image row */}
            <div className="flex items-center gap-3 w-full justify-center">
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="text-[#45140C] hover:text-[#B5AD21] transition-colors duration-200 text-4xl font-bold leading-none"
              >
                ‹
              </button>
              <div className="relative w-full max-w-md sm:max-w-lg lg:w-120 lg:h-90 aspect-4/3 lg:aspect-auto rounded-2xl overflow-hidden shadow-2xl border border-[#45140C]/30">
                <Image
                  key={currentPhoto}
                  src={PHOTOS[currentPhoto]}
                  alt={`${name} photo ${currentPhoto + 1}`}
                  fill
                  className="object-cover animate-fade-in"
                  priority
                />
              </div>
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="text-[#45140C] hover:text-[#B5AD21] transition-colors duration-200 text-4xl font-bold leading-none"
              >
                ›
              </button>
            </div>
            {/* Dot indicators */}
            <div className="flex gap-2">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPhoto(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === currentPhoto ? "bg-[#B5AD21] scale-125" : "bg-[#45140C]/25 hover:bg-[#45140C]/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Name, tagline, bio */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#45140C] font-formadjr mb-2">
              {name}
            </h1>
            <p className="text-lg sm:text-xl text-[#B5AD21] font-formadjr mb-6">
              {tagline}
            </p>
            <p className="text-base sm:text-lg text-[#45140C]/70 font-inter leading-relaxed whitespace-pre-line">
              {bio}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#45140C]/10" />

      {/* Community Section */}
      <section id="about-community" className="w-full py-16 px-4 sm:px-8 fade-in-up-delay-1">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-2">
            I Love My Community
          </h2>
          {communityCaption && (
            <p className="text-[#45140C]/60 font-inter text-sm mb-10 max-w-xl leading-relaxed">
              {communityCaption}
            </p>
          )}
          {!communityCaption && (
            <p className="text-[#45140C]/30 font-inter text-sm mb-10 italic">
              Add a caption via the <code className="text-xs">communityCaption</code> prop.
            </p>
          )}

          {/* Media — stacks on mobile, side by side on desktop */}
          {communityMedia && communityMedia.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6 items-start">

              {/* 2×2 image grid — full width on mobile, auto on desktop */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                {communityMedia.filter(m => m.type === "image").map((item, index) => (
                  <div
                    key={index}
                    className="relative w-full lg:w-72 rounded-xl overflow-hidden shadow-md border border-[#45140C]/10 cursor-zoom-in group"
                    style={{ aspectRatio: '16/9' }}
                    onClick={() => item.src && setLightboxSrc(item.src)}
                  >
                    {item.src ? (
                      <>
                        <Image
                          src={item.src}
                          alt={item.alt ?? "Community photo"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-2xl">⤢</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-[#45140C]/5 flex items-center justify-center">
                        <p className="text-[#45140C]/25 font-inter text-xs text-center px-3">photo coming soon</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Reels — side by side, centered on mobile */}
              <div className="flex flex-row gap-4 justify-center lg:justify-start w-full lg:w-auto">
                {communityMedia.filter(m => m.type === "video").map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="rounded-xl overflow-hidden shadow-md border border-[#45140C]/10">
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-36 sm:w-44 object-cover"
                        style={{ aspectRatio: '9/16' }}
                      />
                    </div>
                    {item.caption && (
                      <p className="text-[#45140C]/50 font-inter text-xs leading-snug max-w-44">
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-full lg:w-72 rounded-xl border border-dashed border-[#45140C]/20 bg-[#45140C]/3 flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                    <p className="text-[#45140C]/25 font-inter text-xs">photo</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-row gap-4 justify-center lg:justify-start">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="w-36 sm:w-44 rounded-xl border border-dashed border-[#45140C]/20 bg-[#45140C]/3 flex items-center justify-center" style={{ aspectRatio: '9/16' }}>
                    <p className="text-[#45140C]/25 font-inter text-xs">reel</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#45140C]/10" />

      {/* Reading Section */}
      <section id="about-interests" className="w-full py-16 px-4 sm:px-8 fade-in-up-delay-3">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-2">
            I Love to Read!
          </h2>
          <p className="text-[#45140C]/40 font-inter text-sm mb-10">Hover over a cover to see the title.</p>

          <div id="about-books" className="flex flex-col lg:flex-row gap-10 items-start">

              {/* Col 1 — photo, hidden on mobile since it crowds things */}
              <div className="hidden lg:block shrink-0 w-64">
                <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden border border-[#45140C]/30 shadow-xl bg-[#45140C]/5 flex items-center justify-center">
                  {readingPhoto ? (
                    <Image
                      src={readingPhoto}
                      alt="Me reading"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <p className="text-[#45140C]/30 font-inter text-sm text-center px-4">
                      Add a photo via the <code className="text-xs">readingPhoto</code> prop
                    </p>
                  )}
                </div>
              </div>

              {/* Col 2 — blurb on top, books below */}
              <div className="flex-1 flex flex-col gap-8">
                {/* Blurb */}
                {readingBlurb ? (
                  <p className="text-[#45140C]/70 font-inter text-base leading-relaxed max-w-xl">
                    {readingBlurb}
                  </p>
                ) : (
                  <p className="text-[#45140C]/30 font-inter text-sm italic">
                    Add a blurb via the <code className="text-xs">readingBlurb</code> prop.
                  </p>
                )}

                {/* Book row — wraps on mobile */}
                {books && books.length > 0 ? (
                  <div className="flex flex-row flex-wrap justify-center sm:justify-start gap-4">
                    {books.map((book, index) => (
                      <div
                        key={index}
                        className="group relative flex flex-col items-center cursor-default"
                      >
                        <div 
                          className="relative w-24 sm:w-28 h-36 sm:h-44 rounded-md shadow-lg border border-[#45140C]/15 group-hover:shadow-xl transition-all duration-300"
                          style={{
                            animation: 'none',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'bookTilt 0.5s ease-in-out infinite';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = 'none';
                          }}
                        >
                          <Image
                            src={book.cover}
                            alt={book.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                          <div className="bg-[#45140C] text-[#F3EDE2] text-sm font-inter px-3 py-2 rounded-lg shadow-lg">
                            <p className="font-bold">{book.title}</p>
                            {book.author && <p className="text-[#F3EDE2]/70 text-xs mt-0.5">{book.author}</p>}
                          </div>
                          <div className="w-2.5 h-2.5 bg-[#45140C] rotate-45 mx-auto -mt-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#45140C]/40 font-inter italic">No books added yet.</p>
                )}
              </div>
          </div>
        </div>
      </section>

    </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
          onClick={() => setLightboxSrc(null)}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-4 right-5 text-white/70 hover:text-white text-4xl leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>
          <div
            className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ animation: 'dialogIn 0.25s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxSrc ?? undefined}
              alt="Enlarged photo"
              className="w-full h-full object-contain max-h-[90vh]"
            />
          </div>
        </div>
      )}
    </>
  );
}

