

import Image from "next/image";
import Footer from "./footer";

export default function UnderConstruction() {

  return (
    <div className="min-h-screen flex flex-col bg-[#B5AD21]">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
        <div className="relative mb-2 flex items-center justify-center" style={{ height: "60px" }}>
          <h1
            className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl text-[#F3EDE2] font-bold font-formadjr whitespace-nowrap"
            style={{
              WebkitTextStroke: "4px #45140C",
              zIndex: 1,
            }}
          >
            Pardon our dust!
          </h1>
          <h1
            className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl text-[#F3EDE2] font-bold font-formadjr whitespace-nowrap"
            style={{
              zIndex: 2,
            }}
          >
            Pardon our dust!
          </h1>
        </div>
        <p className="text-lg sm:text-3xl mb-6 text-[#45140C] font-medium font-inter text-center">This portfolio is currently still being developed.
          Please check back soon!</p>
        <div className="flex flex-col items-center">
          <div className="flex gap-3 mb-4 flex-wrap justify-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-2xl px-4 py-2 bg-[#45140C] text-white rounded hover:text-[#E5B1A4] transition font-formadjr font-medium"
            >
              Resume
            </a>
            <a
              href="https://github.com/elizabethprettosotelo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-2xl px-4 py-2 bg-[#45140C] text-white rounded hover:text-[#E5B1A4] transition font-formadjr font-medium"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/elizabeth-pretto-sotelo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-2xl px-4 py-2 bg-[#45140C] text-white rounded hover:text-[#E5B1A4] transition font-formadjr font-medium"
            >
              LinkedIn
            </a>
          </div>
          <Image src="/littleguys.svg" alt="alt" width={300} height={300} className="w-40 sm:w-75 h-auto" /> 
        </div>
      </div>
      <Footer />
    </div>
  );
}
