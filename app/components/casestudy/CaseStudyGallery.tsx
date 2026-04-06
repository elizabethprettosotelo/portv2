"use client";

import Image from "next/image";

type CaseStudyGalleryProps = {
  gallery: string[];
  title?: string;
  sectionNumber?: string;
};

export default function CaseStudyGallery({ gallery, title = "More Visuals", sectionNumber = "08" }: CaseStudyGalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="w-full py-12 px-8 bg-[#F3EDE2]">
      <div className="max-w-5xl mx-auto">
        {/* Section Number & Title */}
        <div className="text-6xl font-bold text-[#E5B1A4]/30 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#45140C] font-formadjr mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-72 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-[#B5AD21]/30"
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
  );
}
