import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-[#F3EDE2] px-4 py-20 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#B5AD21]/15"></div>
      <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-[#B5AD21]/30"></div>
      
      <div className="relative max-w-5xl w-full">
        {/* Main content */}
        <div className="flex flex-col items-start md:items-center gap-6">
          {/* "hi i'm" text with playful positioning */}
          <div className="flex items-baseline gap-3 ml-4 md:ml-0">
            <span className="text-4xl md:text-6xl font-bold text-[#B5AD21] font-formadjr">
              hi
            </span>
            <span className="text-3xl md:text-5xl font-medium text-[#45140C]/80 font-formadjr">
              i'm
            </span>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-[#45140C]/5 rounded-lg blur-xl group-hover:bg-[#45140C]/10 transition-all duration-300"></div>
            <Image 
              src="/epsforlight.png" 
              alt="Eli Pretto-Sotelo" 
              width={600} 
              height={150}
              className="relative z-10 w-full max-w-lg md:max-w-2xl h-auto drop-shadow-lg"
              priority
            />
          </div>

          {/* Subtitle with offset */}
          <div className="flex flex-col gap-2 mt-4 md:self-end md:mr-12">
            <p className="text-xl md:text-3xl text-[#45140C] font-formadjr font-medium">
              UI/UX Designer
            </p>
            <p className="text-xl md:text-3xl text-[#45140C]/70 font-formadjr font-medium md:text-right">
              & Frontend Developer
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex gap-4 ml-4 md:ml-0">
            <a
              href="#projects"
              className="px-6 py-3 bg-[#45140C] text-[#F3EDE2] rounded-lg font-formadjr font-bold hover:bg-[#E5B1A4] hover:text-[#45140C] transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              View Work
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-[#45140C] text-[#45140C] rounded-lg font-formadjr font-bold hover:bg-[#45140C] hover:text-[#F3EDE2] transition-all duration-200"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-[#45140C]/40" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
