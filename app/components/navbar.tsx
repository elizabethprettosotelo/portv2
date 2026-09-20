'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavbar } from '../contexts/NavbarContext';
import Tooltip from './tooltip';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentPath = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useNavbar();

  const mobileNavLinks = [
    { href: '/home', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'About' },
    { href: '/play', label: 'Play' },
    { href: '/blog', label: 'Blog' },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#250D47] border-b-2 border-[#9AB1EB]/20 z-50 overflow-x-hidden">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo/Name */}
          <Link href="/" className="text-lg font-bold text-[#F0F1E3] font-formadjr hover:text-[#9AB1EB] transition">
            Eli Pretto-Sotelo
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-7 h-0.5 bg-[#F0F1E3] transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-7 h-0.5 bg-[#F0F1E3] my-1.5 transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-7 h-0.5 bg-[#F0F1E3] transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#250D47] ${
            isOpen ? 'max-h-125 opacity-100 border-t border-[#9AB1EB]/20' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2 py-4 px-4">
            {mobileNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-lg font-formadjr font-medium text-[#F0F1E3] hover:text-[#9AB1EB] hover:bg-[#F0F1E3]/5 px-4 py-3 rounded transition-all duration-200"
              >
                <span className="text-[#8EB522] text-sm">✦</span>
                {link.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-lg px-4 py-3 bg-[#8EB522] text-[#250D47] rounded font-formadjr font-bold hover:bg-[#9AB1EB] transition-all duration-200 text-center mt-2"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Left Sidebar */}
      <aside className={`hidden md:block fixed left-0 top-0 h-screen bg-[#250D47] border-r-2 border-[#9AB1EB]/20 z-50 overflow-y-auto overflow-x-hidden transition-all duration-300 custom-scrollbar ${
        sidebarCollapsed ? 'w-12' : 'w-64'
      }`}>
        <div className={`p-4 ${sidebarCollapsed ? 'p-2' : ''}`}>
          {/* Project Name with Toggle Button */}
          <div className="mb-4 pb-3 border-b border-[#9AB1EB]/20">
            <div className="flex items-start justify-between gap-2">
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <Image src="/thebaby.png" alt="alt" width={32} height={32} className="mb-2" />
                  <h2 className="text-lg font-bold text-[#F0F1E3] font-formadjr">eli&apos;s portfolio</h2>
                </div>
              )}
              
              {/* Toggle Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#F0F1E3]/10 rounded transition group border border-[#9AB1EB]/20 shrink-0"
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <svg
                  className={`w-4 h-4 text-[#F0F1E3] group-hover:text-[#9AB1EB] transition-all duration-300 ${
                    sidebarCollapsed ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Pages Section */}
          {!sidebarCollapsed && (
            <>
              <div className="mb-4 pb-3 border-b border-[#9AB1EB]/20">
                <div className="text-xs font-bold text-[#9AB1EB] tracking-wider font-mono mb-3">PAGES</div>
                <div className="flex flex-col gap-1">
                  {mobileNavLinks.map((link) => {
                    const isActive = currentPath === link.href || (currentPath === '/' && link.href === '/home');
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded transition-all ${
                          isActive
                            ? 'bg-[#8EB522]/20 text-[#8EB522]'
                            : 'text-[#F0F1E3] hover:bg-[#F0F1E3]/5'
                        }`}
                      >
                        <span className="text-xs text-[#8EB522]">✦</span>
                        <span className="text-sm font-mono flex-1">{link.label}</span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8EB522]"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Export Section */}
          {!sidebarCollapsed && (
            <>
              <div className="w-full h-px bg-[#9AB1EB]/20 my-4"></div>
              <div className="mb-3">
                <div className="text-xs font-bold text-[#9AB1EB] tracking-wider font-mono mb-3">EXPORT</div>
                <div className="grid grid-cols-4 gap-2">
                  {/* Copy Link */}
                  <Tooltip label="Copy site link">
                    <button
                      onClick={copyToClipboard}
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#F0F1E3]/10 rounded transition group border border-[#9AB1EB]/20 relative"
                    >
                      {copied ? (
                        <svg className="w-4 h-4 text-[#8EB522]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-[#F0F1E3] group-hover:text-[#9AB1EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      )}
                    </button>
                  </Tooltip>

                  {/* GitHub */}
                  <Tooltip label="GitHub">
                    <a
                      href="https://github.com/elizabethprettosotelo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#F0F1E3]/10 rounded transition group border border-[#9AB1EB]/20"
                    >
                      <svg className="w-4 h-4 text-[#F0F1E3] group-hover:text-[#9AB1EB]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </Tooltip>

                  {/* LinkedIn */}
                  <Tooltip label="LinkedIn">
                    <a
                      href="https://www.linkedin.com/in/elizabeth-pretto-sotelo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#F0F1E3]/10 rounded transition group border border-[#9AB1EB]/20"
                    >
                      <svg className="w-4 h-4 text-[#F0F1E3] group-hover:text-[#9AB1EB]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </Tooltip>

                  {/* Resume */}
                  <Tooltip label="Resume">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#F0F1E3]/10 rounded transition group border border-[#9AB1EB]/20"
                    >
                      <svg className="w-4 h-4 text-[#F0F1E3] group-hover:text-[#9AB1EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </a>
                  </Tooltip>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}




