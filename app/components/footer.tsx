import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer 
      id="footer" 
      className="bg-[#45140C] text-[#F3EDE2] py-8 mt-auto overflow-hidden border-t-2 border-[#E5B1A4]/20" 
      style={{ 
        marginLeft: 'var(--sidebar-width, 0px)',
        width: 'calc(100% - var(--sidebar-width, 0px))'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <Image 
              src="/eliprettosotelo.svg" 
              alt="Eli Pretto-Sotelo Logo" 
              width={150} 
              height={40} 
              className="mb-3"
            />
            <p className="text-xs text-[#F3EDE2]/70 font-inter font-normal">
              UI/UX Designer & Frontend Developer
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start md:items-center">
            <h3 className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-3">
              NAVIGATION
            </h3>
            <div className="flex flex-col gap-1.5 text-sm font-formadjr font-medium">
              <a href="/home" className="hover:text-[#B5AD21] transition">
                Home
              </a>
              <a href="/projects" className="hover:text-[#B5AD21] transition">
                Projects
              </a>
              <a href="/experience" className="hover:text-[#B5AD21] transition">
                About
              </a>
              <a href="/play" className="hover:text-[#B5AD21] transition">
                Play
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-3">
              CONNECT
            </h3>
            <div className="flex flex-col gap-1.5 text-sm font-formadjr font-medium md:text-right">
              <a 
                href="mailto:elizabethprettosotelo@gmail.com" 
                className="hover:text-[#B5AD21] transition"
              >
                Email
              </a>
              <a 
                href="https://github.com/elizabethprettosotelo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#B5AD21] transition"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/elizabeth-pretto-sotelo/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#B5AD21] transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-[#E5B1A4]/20 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#F3EDE2]/60 font-inter font-normal">
            © {new Date().getFullYear()} Eli Pretto-Sotelo. All rights reserved.
          </p>
          <p className="text-xs text-[#F3EDE2]/60 font-inter font-normal">
            Designed & Built with 💛
          </p>
        </div>
      </div>
    </footer>
  );
}

