"use client";

import Image from "next/image";

type CaseStudyHeroProps = {
  title: string;
  subtitle: string;
  heroImage: string;
};

export default function CaseStudyHero({ title, subtitle, heroImage }: CaseStudyHeroProps) {
  return (
    <section className="relative w-full h-[60vh] min-h-100 overflow-hidden fade-in-up">
      <Image
        src={heroImage}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#45140C]/80 via-[#45140C]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-[#F3EDE2] font-formadjr mb-4">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-[#F3EDE2]/90 font-formadjr max-w-3xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
