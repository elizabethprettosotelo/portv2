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
    <section className="w-full py-12 bg-[#F0F1E3]">
      <div className="w-full">
        {/* Section Number & Title */}
        <div className="text-6xl font-bold text-[#9AB1EB]/30 mb-3 font-formadjr">
          {sectionNumber}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#250D47] font-formadjr mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-72 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#8EB522]/30"
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



