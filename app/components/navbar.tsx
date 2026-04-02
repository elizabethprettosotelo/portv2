'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Layer structure mimicking Figma's layers panel
type Layer = {
  id: string;
  label: string;
  icon: string;
  sublayers?: { id: string; label: string }[];
};

const layers: Layer[] = [
  { id: 'hero', label: 'Hero Section', icon: '⬜' },
  {
    id: 'projects',
    label: 'Featured Projects',
    icon: '📁',
    sublayers: [
      { id: 'project-one', label: 'Project One' },
      { id: 'project-two', label: 'Project Two' },
      { id: 'project-three', label: 'Project Three' },
    ],
  },
  { id: 'experiences', label: 'Experiences', icon: '⬜' },
  { id: 'footer', label: 'Footer', icon: '⬜' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(new Set(['projects']));
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const mobileNavLinks = [
    { href: '/home', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/play', label: 'Play' },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Update CSS variable for sidebar width
  useEffect(() => {
    const updateSidebarWidth = () => {
      // Only apply sidebar width on desktop
      if (window.innerWidth >= 768) {
        const width = sidebarCollapsed ? '48px' : '256px';
        document.documentElement.style.setProperty('--sidebar-width', width);
      } else {
        document.documentElement.style.setProperty('--sidebar-width', '0px');
      }
    };

    updateSidebarWidth();
    window.addEventListener('resize', updateSidebarWidth);
    return () => window.removeEventListener('resize', updateSidebarWidth);
  }, [sidebarCollapsed]);

  // Scroll spy effect
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    layers.forEach((layer) => {
      const element = document.getElementById(layer.id);
      if (element) observer.observe(element);

      // Observe sublayers
      layer.sublayers?.forEach((sublayer) => {
        const subElement = document.getElementById(sublayer.id);
        if (subElement) observer.observe(subElement);
      });
    });

    return () => observer.disconnect();
  }, []);

  const toggleLayer = (layerId: string) => {
    setExpandedLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Different offset for mobile (with top header) vs desktop (left sidebar)
      const offset = window.innerWidth < 768 ? 80 : 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  const isActive = (id: string) => {
    return activeSection === id || (activeSection.startsWith('project-') && id === 'projects');
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#45140C] border-b-2 border-[#E5B1A4]/20 z-50 overflow-x-hidden">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo/Name */}
          <a href="/" className="text-lg font-bold text-[#F3EDE2] font-formadjr hover:text-[#E5B1A4] transition">
            Eli Pretto-Sotelo
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-7 h-0.5 bg-[#F3EDE2] transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-7 h-0.5 bg-[#F3EDE2] my-1.5 transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-7 h-0.5 bg-[#F3EDE2] transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#45140C] ${
            isOpen ? 'max-h-125 opacity-100 border-t border-[#E5B1A4]/20' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2 py-4 px-4">
            {mobileNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-formadjr font-medium text-[#F3EDE2] hover:text-[#E5B1A4] hover:bg-[#F3EDE2]/5 px-4 py-3 rounded transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-lg px-4 py-3 bg-[#B5AD21] text-[#45140C] rounded font-formadjr font-bold hover:bg-[#E5B1A4] transition-all duration-200 text-center mt-2"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Left Sidebar */}
      <aside className={`hidden md:block fixed left-0 top-0 h-screen bg-[#45140C] border-r-2 border-[#E5B1A4]/20 z-50 overflow-y-auto overflow-x-hidden transition-all duration-300 ${
        sidebarCollapsed ? 'w-12' : 'w-64'
      }`}>
        <div className={`p-4 ${sidebarCollapsed ? 'p-2' : ''}`}>
          {/* Project Name */}
          {!sidebarCollapsed && (
            <div className="mb-4 pb-3 border-b border-[#E5B1A4]/20">
                <Image src="/thebaby.png" alt="alt" width={32} height={32} className="mb-2" />
              <h2 className="text-lg font-bold text-[#F3EDE2] font-formadjr">eli's portfolio</h2>
            </div>
          )}

          {/* Figma-style title */}
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E5B1A4]/20">
              <div className="text-xs font-bold text-[#E5B1A4] tracking-wider font-mono">LAYERS</div>
              <div className="w-px h-4 bg-[#E5B1A4]/30"></div>
              <div className="text-xs text-[#F3EDE2]/60 font-mono">Home Page</div>
            </div>
          )}

          {/* Toggle Button - Small square aligned right */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#F3EDE2]/10 rounded transition group border border-[#E5B1A4]/20"
              aria-label={sidebarCollapsed ? "Expand layers" : "Collapse layers"}
              title={sidebarCollapsed ? "Expand layers" : "Collapse layers"}
            >
              <svg
                className={`w-4 h-4 text-[#F3EDE2] group-hover:text-[#E5B1A4] transition-all duration-300 ${
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

          {/* Layers List */}
          {!sidebarCollapsed && (
            <div className="flex flex-col gap-0.5">
            {layers.map((layer) => (
              <div key={layer.id}>
                {/* Main Layer */}
                <div
                  className={`group flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-all ${
                    isActive(layer.id)
                      ? 'bg-[#B5AD21]/20 text-[#B5AD21]'
                      : 'text-[#F3EDE2] hover:bg-[#F3EDE2]/5'
                  }`}
                  onClick={() => {
                    if (layer.sublayers) {
                      toggleLayer(layer.id);
                    } else {
                      scrollToSection(layer.id);
                    }
                  }}
                >
                  {/* Expand/collapse chevron */}
                  {layer.sublayers && (
                    <svg
                      className={`w-3 h-3 transition-transform ${expandedLayers.has(layer.id) ? 'rotate-90' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 7l3 3 3-3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {!layer.sublayers && <div className="w-3"></div>}

                  {/* Layer icon */}
                  <span className="text-xs opacity-70">{layer.icon}</span>

                  {/* Layer name */}
                  <span className="text-sm font-mono flex-1">{layer.label}</span>

                  {/* Active indicator */}
                  {isActive(layer.id) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B5AD21]"></div>
                  )}
                </div>

                {/* Sublayers */}
                {layer.sublayers && expandedLayers.has(layer.id) && (
                  <div className="ml-5 border-l border-[#E5B1A4]/20 pl-2">
                    {layer.sublayers.map((sublayer) => (
                      <div
                        key={sublayer.id}
                        className={`group flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-all ${
                          activeSection === sublayer.id
                            ? 'bg-[#B5AD21]/20 text-[#B5AD21]'
                            : 'text-[#F3EDE2]/80 hover:bg-[#F3EDE2]/5'
                        }`}
                        onClick={() => scrollToSection(sublayer.id)}
                      >
                        <span className="text-xs opacity-70">⬜</span>
                        <span className="text-sm font-mono flex-1">{sublayer.label}</span>
                        {activeSection === sublayer.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B5AD21]"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          )}

          {/* Export Section */}
          {!sidebarCollapsed && (
            <>
              <div className="w-full h-px bg-[#E5B1A4]/20 my-4"></div>
              <div className="mb-3">
                <div className="text-xs font-bold text-[#E5B1A4] tracking-wider font-mono mb-3">EXPORT</div>
                <div className="grid grid-cols-4 gap-2">
                  {/* Copy Link */}
                  <button
                    onClick={copyToClipboard}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F3EDE2]/10 rounded transition group border border-[#E5B1A4]/20 relative"
                    title="Copy link to site"
                  >
                    {copied ? (
                      <svg className="w-4 h-4 text-[#B5AD21]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-[#F3EDE2] group-hover:text-[#E5B1A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    )}
                  </button>

                  {/* GitHub */}
                  <a
                    href="https://github.com/elizabethprettosotelo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F3EDE2]/10 rounded transition group border border-[#E5B1A4]/20"
                    title="GitHub"
                  >
                    <svg className="w-4 h-4 text-[#F3EDE2] group-hover:text-[#E5B1A4]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/elizabeth-pretto-sotelo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F3EDE2]/10 rounded transition group border border-[#E5B1A4]/20"
                    title="LinkedIn"
                  >
                    <svg className="w-4 h-4 text-[#F3EDE2] group-hover:text-[#E5B1A4]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  {/* Resume */}
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F3EDE2]/10 rounded transition group border border-[#E5B1A4]/20"
                    title="Resume"
                  >
                    <svg className="w-4 h-4 text-[#F3EDE2] group-hover:text-[#E5B1A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
