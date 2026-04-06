"use client";

type CaseStudyCTAProps = {
  text?: string;
  href?: string;
};

export default function CaseStudyCTA({ 
  text = "← Back to All Projects",
  href = "/projects"
}: CaseStudyCTAProps) {
  return (
    <section className="w-full py-12 px-8 bg-[#45140C] border-t-2 border-[#E5B1A4]/20">
      <div className="max-w-4xl mx-auto text-center">
        <a
          href={href}
          className="inline-block px-8 py-4 bg-[#B5AD21] text-[#45140C] rounded-lg font-formadjr font-bold text-lg hover:bg-[#E5B1A4] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {text}
        </a>
      </div>
    </section>
  );
}
