import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer 
      id="footer" 
      className="bg-[#45140C] text-[#F3EDE2] py-12 mt-auto overflow-hidden border-t-2 border-[#E5B1A4]/20" 
      style={{ 
        marginLeft: 'var(--sidebar-width, 0px)',
        width: 'calc(100% - var(--sidebar-width, 0px))'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <Image 
              src="/eliprettosotelo.svg" 
              alt="Eli Pretto-Sotelo Logo" 
              width={180} 
              height={50} 
              className="mb-4"
            />
            <p className="text-sm text-[#F3EDE2]/70 font-inter">
              UI/UX Designer & Frontend Developer
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start md:items-center">
            <h3 className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-4">
              NAVIGATION
            </h3>
            <div className="flex flex-col gap-2 text-base font-formadjr">
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
            <h3 className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-4">
              CONNECT
            </h3>
            <div className="flex flex-col gap-2 text-base font-formadjr md:text-right">
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
        <div className="pt-6 border-t border-[#E5B1A4]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#F3EDE2]/60 font-inter">
            © {new Date().getFullYear()} Eli Pretto-Sotelo. All rights reserved.
          </p>
          <p className="text-sm text-[#F3EDE2]/60 font-inter">
            Designed & Built with 💛
          </p>
        </div>
      </div>
    </footer>
  );
}

