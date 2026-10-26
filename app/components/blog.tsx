"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookReviews from "./bookreviews";

type Mode = "writing" | "books";

function PenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4.5C2 3.67 2.67 3 3.5 3H10a3 3 0 0 1 2 .76A3 3 0 0 1 14 3h6.5c.83 0 1.5.67 1.5 1.5V18a1 1 0 0 1-1 1h-7a2 2 0 0 0-2 2 2 2 0 0 0-2-2H3a1 1 0 0 1-1-1Z" />
      <path d="M12 4v16" />
    </svg>
  );
}

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail: string;
  featured?: boolean;
};

const posts: Post[] = [
  {
    slug: "designing-ucfhere",
    title: "Designing UCFHere: turning campus chaos into one clear map",
    excerpt:
      "How I approached research, information architecture, and visual design for a campus discovery platform built for UCF students juggling a dozen disconnected resources.",
    date: "Sep 2, 2026",
    readTime: "6 min read",
    tags: ["Product Design", "Case Study"],
    thumbnail: "/ucfhere/frame-2.png",
    featured: true,
  },
  {
    slug: "36-hours-conduit",
    title: "What 36 hours of building Conduit taught me about accessibility",
    excerpt:
      "Notes from a hackathon sprint building a multimodal accessibility platform - what we got right, what broke, and why designing without assumptions changes everything.",
    date: "Jul 14, 2026",
    readTime: "5 min read",
    tags: ["Hackathons", "Accessibility"],
    thumbnail: "/conduit/conduitthumb.jpg",
  },
  {
    slug: "from-figma-to-frontend",
    title: "From Figma to frontend: lessons from my first production build",
    excerpt:
      "Tariffix was my first time taking a design all the way to shipped code. Here's what surprised me about the handoff and how it changed the way I design now.",
    date: "May 3, 2026",
    readTime: "7 min read",
    tags: ["Frontend", "Reflections"],
    thumbnail: "/tariffix/gallery-1.jpg",
  },
  {
    slug: "building-a-design-system-solo",
    title: "Building a design system as a team of one",
    excerpt:
      "Practical rules I use to keep visual language consistent across projects when there's no design team to check in with - just me, a Figma file, and deadlines.",
    date: "Mar 21, 2026",
    readTime: "4 min read",
    tags: ["Product Design", "Systems"],
    thumbnail: "/pallit/frame-3.png",
  },
];

export default function Blog() {
  const [mode, setMode] = useState<Mode>("writing");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allTags = ["All", ...new Set(posts.flatMap((p) => p.tags))];

  const filteredPosts =
    selectedTag === "All" ? posts : posts.filter((p) => p.tags.includes(selectedTag));

  const featuredPost = posts.find((p) => p.featured);
  const restPosts = filteredPosts.filter((p) => p.slug !== featuredPost?.slug);

  const getDelayClass = (index: number) => {
    const delays = [
      "fade-in-up-delay-2",
      "fade-in-up-delay-3",
      "fade-in-up-delay-4",
      "fade-in-up-delay-5",
      "fade-in-up-delay-6",
    ];
    return delays[Math.min(index, 4)];
  };

  return (
    <>
      {/* Hero */}
      <section
        className={`w-full py-16 px-4 transition-colors duration-500 fade-in-up ${
          mode === "books" ? "bg-[#EDF1F9]" : "bg-[#FAF9F6]"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <span
            className={`inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold font-mono tracking-wider transition-colors duration-300 ${
              mode === "books" ? "bg-[#9AB1EB]/30 text-[#24406b]" : "bg-[#8EB522]/20 text-[#4d6414]"
            }`}
          >
            {mode === "writing" ? "NOTES & WRITING" : "THE BOOK NOOK"}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#250D47] font-formadjr mb-4">
            {mode === "writing" ? "Blog" : "Book Nook"}
          </h1>
          <p className="text-xl text-[#250D47]/70 font-semibold font-formadjr max-w-2xl">
            {mode === "writing" ? (
              "Thoughts on product design, frontend development, and what I'm learning along the way."
            ) : (
              <>
                Everything I&apos;ve been reading lately, rated and reviewed{" "}
                <span className="text-[#4A72E8]">✦</span>
              </>
            )}
          </p>

          {/* Mode toggle */}
          <div className="relative flex mt-8 w-full max-w-xs p-1 rounded-full bg-[#250D47]/10">
            <div
              className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mode === "books" ? "translate-x-full bg-[#4A72E8]" : "translate-x-0 bg-[#250D47]"
              }`}
            />
            <button
              onClick={() => setMode("writing")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full font-formadjr font-bold text-sm transition-colors duration-200 ${
                mode === "writing" ? "text-[#FAF9F6]" : "text-[#250D47]/60 hover:text-[#250D47]"
              }`}
            >
              <PenIcon className="w-4 h-4 shrink-0" />
              Writing
            </button>
            <button
              onClick={() => setMode("books")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full font-formadjr font-bold text-sm transition-colors duration-200 ${
                mode === "books" ? "text-[#FAF9F6]" : "text-[#250D47]/60 hover:text-[#250D47]"
              }`}
            >
              <BookIcon className="w-4 h-4 shrink-0" />
              Book Nook
            </button>
          </div>
        </div>
      </section>

      {mode === "books" ? (
        <BookReviews />
      ) : (
        <>
      {/* Tag filter */}
      <section className="w-full py-6 px-4 bg-[#FAF9F6] border-t border-[#250D47]/10 fade-in-up-delay-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-formadjr font-bold text-sm transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-[#250D47] text-[#FAF9F6]"
                    : "bg-[#250D47]/10 text-[#250D47] hover:bg-[#250D47]/20"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && selectedTag === "All" && (
        <section className="w-full px-4 pt-10 pb-4 bg-[#FAF9F6] fade-in-up-delay-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#8EB522] text-sm">✦</span>
              <span className="text-xs font-bold text-[#250D47]/60 tracking-wider font-mono">
                FEATURED
              </span>
            </div>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 items-stretch bg-[#FFFFFF] rounded-xl overflow-hidden transition-all duration-300 border-2 border-transparent hover:border-[#9AB1EB] hover:-translate-y-1"
            >
              <div className="relative w-full h-64 md:h-full min-h-[280px] overflow-hidden bg-[#250D47]/5">
                <Image
                  src={featuredPost.thumbnail}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[#250D47]/15 text-[#250D47]/75 font-semibold font-inter uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#250D47] font-formadjr mb-3 group-hover:text-[#2c4694] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-[#250D47]/70 text-base font-semibold font-inter leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#250D47]/60 font-inter">
                  <span>{featuredPost.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.readTime}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[#250D47] font-semibold group-hover:text-[#8EB522] transition-colors">
                    Read post
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="w-full py-16 px-4 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          {restPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {restPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group relative bg-[#FFFFFF] rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col border-2 border-transparent hover:border-[#9AB1EB] hover:-translate-y-1 ${getDelayClass(
                    index
                  )}`}
                >
                  <div className="relative w-full h-48 overflow-hidden bg-[#250D47]/5 shrink-0">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-1 rounded-full border border-[#250D47]/15 text-[#250D47]/75 font-semibold font-inter uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-[#250D47] font-formadjr mb-2 group-hover:text-[#2c4694] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[#250D47]/70 text-sm font-semibold font-inter leading-relaxed line-clamp-3 flex-1 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#250D47]/60 font-inter">
                      <span>{post.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[#250D47]/60 font-formadjr">
                No posts found with this filter.
              </p>
            </div>
          )}
        </div>
      </section>
        </>
      )}
    </>
  );
}
