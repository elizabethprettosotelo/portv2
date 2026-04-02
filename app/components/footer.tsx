import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" className="w-full max-w-full bg-[#45140C] text-[#F3EDE2] py-6 mt-auto transition-all duration-300 overflow-x-hidden" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4 max-w-full">
        <Image src="/eliprettosotelo.svg" alt="alt" width={200} height={200} />
        <div className=" text-left flex flex-wrap gap-6 text-lg font-formadjr font-medium">
          <a href="/home" className="hover:text-[#E5B1A4] transition">Home</a>
          <a href="/projects" className="hover:text-[#E5B1A4] transition">Projects</a>
          <a href="/experience" className="hover:text-[#E5B1A4] transition">Experience</a>
          <a href="/play" className="hover:text-[#E5B1A4] transition">Play</a>
          {/* Add more links as needed */}
        </div>
        <div className="text-right flex flex-col gap-bottom-2 text-lg font-formadjr font-medium">
          {/* Placeholder for contact/social links */}
          <a href="mailto:elizabethprettosotelo@gmail.com" className="hover:text-[#E5B1A4] transition">Email</a>
          <a href="https://github.com/elizabethprettosotelo" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5B1A4] transition">GitHub</a>
          <a href="https://www.linkedin.com/in/elizabeth-pretto-sotelo/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5B1A4] transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
