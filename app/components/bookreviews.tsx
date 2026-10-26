"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type BookReview = {
  slug: string;
  title: string;
  author: string;
  cover: string;
  rating: 1 | 2 | 3 | 4 | 5;
  genre: string;
  format: "Physical" | "Ebook" | "Audiobook";
  dateFinished: string;
  takeaway: string;
  review: string;
};

const bookReviews: BookReview[] = [
  {
    slug: "circe",
    title: "Circe",
    author: "Madeline Miller",
    cover: "/ABOUT/books/circe.jpg",
    rating: 5,
    genre: "Myth Retelling",
    format: "Physical",
    dateFinished: "Aug 2026",
    takeaway: "A slow-burn myth retelling that turned into one of my all-time favorites.",
    review:
      "Miller takes one of mythology's most vilified women and gives her an entire interior life - patience, grief, fury, tenderness. I went in expecting a retelling and came out with one of my favorite character studies, period. The prose is unhurried in the best way; every page feels earned.",
  },
  {
    slug: "the-namesake",
    title: "The Namesake",
    author: "Jhumpa Lahiri",
    cover: "/ABOUT/books/thenamesake.jpg",
    rating: 4,
    genre: "Literary Fiction",
    format: "Physical",
    dateFinished: "Jun 2026",
    takeaway: "Quietly devastating - the kind of book that stays with you for weeks.",
    review:
      "Lahiri writes identity and belonging with a quietness that sneaks up on you. Nothing about this book is loud, but by the final chapter I felt like I'd lived an entire life alongside Gogol. A slow read that rewards patience.",
  },
  {
    slug: "war-and-peace",
    title: "War and Peace",
    author: "Leo Tolstoy",
    cover: "/ABOUT/books/warandpeace.jpg",
    rating: 4,
    genre: "Classic",
    format: "Physical",
    dateFinished: "Mar 2026",
    takeaway: "Long, yes. Worth it? Also yes. Just don't rush it.",
    review:
      "Yes, it's long. Yes, there are a lot of names. But Tolstoy's ability to zoom from a ballroom to a battlefield to a single character's private doubt, all in the same breath, is unmatched. Don't rush it - read it in chunks and let it live in your head for a while.",
  },
  {
    slug: "yerba-buena",
    title: "Yerba Buena",
    author: "Nina LaCour",
    cover: "/ABOUT/books/yerbabuena.jpg",
    rating: 4,
    genre: "Contemporary Fiction",
    format: "Ebook",
    dateFinished: "Jan 2026",
    takeaway: "Messy, tender, and one of the better queer love stories I've read recently.",
    review:
      "LaCour writes two flawed, deeply human women trying to figure out love and self-worth at the same time, and it's messy in the way real relationships actually are. Some pacing dips in the middle, but the ending pulled it all together.",
  },
  {
    slug: "im-glad-my-mom-died",
    title: "I'm Glad My Mom Died",
    author: "Jennette McCurdy",
    cover: "/ABOUT/books/gladmymomdied.jpg",
    rating: 5,
    genre: "Memoir",
    format: "Audiobook",
    dateFinished: "Nov 2025",
    takeaway: "Darkly funny in a way I really wasn't prepared for.",
    review:
      "McCurdy's writing is sharp, funny, and unflinching about things that really shouldn't be funny. It's a hard book emotionally, but never once feels exploitative - just honest in a way memoirs rarely manage.",
  },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const textSize = size === "lg" ? "text-xl" : "text-sm";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`${textSize} leading-none ${i <= rating ? "text-[#4A72E8]" : "text-[#250D47]/15"}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function BookDetailDrawer({ book, onClose }: { book: BookReview | null; onClose: () => void }) {
  const [renderedBook, setRenderedBook] = useState<BookReview | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (book) {
      setRenderedBook(book);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [book]);

  useEffect(() => {
    document.body.style.overflow = book ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [book]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!renderedBook) return null;

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[#250D47]/30 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${renderedBook.title} review`}
        onTransitionEnd={() => {
          if (!book) setRenderedBook(null);
        }}
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] md:w-[480px] overflow-y-auto bg-[#FAF9F6] border-l-4 border-[#4A72E8] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 md:p-8">
          <button
            onClick={onClose}
            aria-label="Close"
            className="mb-6 flex items-center gap-1.5 text-sm font-bold font-formadjr text-[#250D47]/60 hover:text-[#250D47] transition-colors"
          >
            <span aria-hidden="true">→</span>
            Close
          </button>

          <div className="flex gap-5">
            <div className="relative w-24 sm:w-28 aspect-2/3 rounded-md overflow-hidden shrink-0 bg-[#250D47]/5">
              <Image src={renderedBook.cover} alt={`${renderedBook.title} cover`} fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[11px] w-fit px-2.5 py-1 mb-2 rounded-full border border-[#250D47]/15 text-[#250D47]/75 font-semibold font-inter uppercase tracking-wide">
                {renderedBook.genre}
              </span>
              <h2 className="text-2xl font-bold text-[#250D47] font-formadjr leading-snug">
                {renderedBook.title}
              </h2>
              <p className="text-sm text-[#250D47]/65 font-semibold font-inter mt-0.5">{renderedBook.author}</p>
              <div className="mt-2">
                <StarRating rating={renderedBook.rating} size="lg" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="rounded-lg bg-[#FFFFFF] px-4 py-3">
              <p className="text-[10px] font-bold text-[#250D47]/50 font-mono uppercase tracking-wider mb-1">
                Finished
              </p>
              <p className="text-sm font-bold text-[#250D47] font-formadjr">{renderedBook.dateFinished}</p>
            </div>
            <div className="rounded-lg bg-[#FFFFFF] px-4 py-3">
              <p className="text-[10px] font-bold text-[#250D47]/50 font-mono uppercase tracking-wider mb-1">
                Format
              </p>
              <p className="text-sm font-bold text-[#250D47] font-formadjr">{renderedBook.format}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold text-[#250D47]/50 font-mono uppercase tracking-wider mb-2">
              My Take
            </p>
            <p className="text-base text-[#250D47]/80 font-semibold font-inter leading-relaxed">
              {renderedBook.review}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function BookReviews() {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [activeBook, setActiveBook] = useState<BookReview | null>(null);

  const allGenres = ["All", ...new Set(bookReviews.map((b) => b.genre))];

  const filteredBooks =
    selectedGenre === "All" ? bookReviews : bookReviews.filter((b) => b.genre === selectedGenre);

  return (
    <>
      {/* Genre filter */}
      <section className="w-full py-6 px-4 bg-[#EDF1F9] border-t border-[#250D47]/10 fade-in-up-delay-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full font-formadjr font-bold text-sm transition-all duration-200 ${
                  selectedGenre === genre
                    ? "bg-[#4A72E8] text-[#FAF9F6]"
                    : "bg-[#250D47]/10 text-[#250D47] hover:bg-[#250D47]/20"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reading log list */}
      <section className="w-full py-10 px-4 bg-[#EDF1F9]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#4A72E8] text-sm">✦</span>
            <span className="text-xs font-bold text-[#250D47]/60 tracking-wider font-mono">
              READING LOG
            </span>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="flex flex-col">
              {filteredBooks.map((book, index) => (
                <button
                  key={book.slug}
                  onClick={() => setActiveBook(book)}
                  className={`group flex items-center gap-4 sm:gap-5 py-4 text-left w-full border-b border-[#250D47]/10 border-l-4 border-l-transparent pl-3 -ml-3 hover:border-l-[#4A72E8] hover:bg-[#FFFFFF] transition-all duration-200 fade-in-up-delay-${Math.min(
                    index + 1,
                    6
                  )}`}
                >
                  <div className="relative w-11 sm:w-14 aspect-2/3 rounded-sm overflow-hidden shrink-0 bg-[#250D47]/5">
                    <Image src={book.cover} alt={`${book.title} cover`} fill className="object-cover" />
                  </div>

                  <div className="min-w-[140px] sm:min-w-[200px] shrink-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#250D47] font-formadjr leading-snug group-hover:text-[#2c4694] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#250D47]/60 font-semibold font-inter">
                      {book.author}
                    </p>
                    <div className="mt-1">
                      <StarRating rating={book.rating} />
                    </div>
                  </div>

                  <p className="hidden md:block flex-1 text-sm text-[#250D47]/70 font-semibold font-inter leading-relaxed line-clamp-2">
                    {book.takeaway}
                  </p>

                  <div className="ml-auto flex flex-col items-end gap-2 shrink-0">
                    <span className="text-[11px] px-2.5 py-1 rounded-full border border-[#250D47]/15 text-[#250D47]/75 font-semibold font-inter uppercase tracking-wide whitespace-nowrap">
                      {book.genre}
                    </span>
                    <span className="text-xs text-[#250D47]/50 font-mono">{book.dateFinished}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[#250D47]/60 font-formadjr">
                No books found in this genre yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <BookDetailDrawer book={activeBook} onClose={() => setActiveBook(null)} />
    </>
  );
}
