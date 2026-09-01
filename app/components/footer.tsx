import React from "react";

export default function Footer() {
  return (
    <footer 
      id="footer" 
      className="bg-[#9AB1EB] text-[#250D47] py-8 mt-auto overflow-hidden" 
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
            <p className="mb-3 text-lg font-bold tracking-wide text-[#250D47] font-formadjr">
              Eli Pretto-Sotelo
            </p>
            <p className="text-xs text-[#250D47]/70 font-inter font-normal">
              UI/UX Designer & Frontend Developer
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start md:items-center">
            <h3 className="text-xs font-bold text-[#250D47]/70 tracking-wider font-mono mb-3">
              NAVIGATION
            </h3>
            <div className="flex flex-col gap-1.5 text-sm font-formadjr font-medium">
              <a href="/home" className="text-[#250D47]/85 hover:text-[#250D47] transition">
                Home
              </a>
              <a href="/projects" className="text-[#250D47]/85 hover:text-[#250D47] transition">
                Projects
              </a>
              <a href="/experience" className="text-[#250D47]/85 hover:text-[#250D47] transition">
                About
              </a>
              <a href="/play" className="text-[#250D47]/85 hover:text-[#250D47] transition">
                Play
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-xs font-bold text-[#250D47]/70 tracking-wider font-mono mb-3">
              CONNECT
            </h3>
            <div className="flex flex-col gap-1.5 text-sm font-formadjr font-medium md:text-right">
              <a 
                href="mailto:elizabethprettosotelo@gmail.com" 
                className="text-[#250D47]/85 hover:text-[#250D47] transition"
              >
                Email
              </a>
              <a 
                href="https://github.com/elizabethprettosotelo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#250D47]/85 hover:text-[#250D47] transition"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/elizabeth-pretto-sotelo/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#250D47]/85 hover:text-[#250D47] transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#250D47]/60 font-inter font-normal">
            © {new Date().getFullYear()} Eli Pretto-Sotelo. All rights reserved.
          </p>
          <p className="text-xs text-[#250D47]/60 font-inter font-normal">
            Designed & Built with 💛
          </p>
        </div>
      </div>
    </footer>
  );
}




