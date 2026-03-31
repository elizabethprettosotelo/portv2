import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#45140C] text-[#F3EDE2] py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        <div className="flex flex-wrap gap-6 text-lg font-formadjr font-medium">
          <a href="/home" className="hover:text-[#E5B1A4] transition">Home</a>
          <a href="/projects" className="hover:text-[#E5B1A4] transition">Projects</a>
          <a href="/experience" className="hover:text-[#E5B1A4] transition">Experience</a>
          <a href="/play" className="hover:text-[#E5B1A4] transition">Play</a>
          {/* Add more links as needed */}
        </div>
        <div className="flex flex-wrap gap-4 text-lg font-formadjr font-medium">
          {/* Placeholder for contact/social links */}
          <a href="mailto:your@email.com" className="hover:text-[#E5B1A4] transition">Email</a>
          <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5B1A4] transition">GitHub</a>
          <a href="https://www.linkedin.com/in/your-linkedin-username/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5B1A4] transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
