"use client";

import Image from "next/image";

type CaseStudyGalleryProps = {
  gallery: string[];
  title?: string;
};

export default function CaseStudyGallery({ gallery, title = "More Visuals" }: CaseStudyGalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <div className="w-full h-px bg-[#45140C]/10" />
      <section className="w-full py-16 px-8 bg-[#F3EDE2]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-12 text-center">
            {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-87.5 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
