"use client";

import Link from "next/link";

type CaseStudyCTAProps = {
  text?: string;
  href?: string;
};

export default function CaseStudyCTA({
  text = "Back to All Projects",
  href = "/projects",
}: CaseStudyCTAProps) {
  return (
    <section className="w-full py-10 bg-linear-to-r from-[#250D47] to-[#250D47]/95">
      <div className="w-full text-center">
        <Link
          href={href}
          className="inline-block px-8 py-4 bg-[#8EB522] text-[#250D47] rounded-lg font-formadjr font-bold text-lg hover:bg-[#9AB1EB] transition-all duration-200 hover:scale-105"
        >
          {text}
        </Link>
      </div>
    </section>
  );
}

