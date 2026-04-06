"use client";

type ProjectLink = {
  label: string;
  url: string;
  type: 'github' | 'demo' | 'figma' | 'other';
};

type CaseStudyMetaProps = {
  role: string;
  timeline: string;
  tools: string[];
  tags: string[];
  links?: ProjectLink[];
};

export default function CaseStudyMeta({ role, timeline, tools, tags, links }: CaseStudyMetaProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'github':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'demo':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        );
      case 'figma':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'github':
        return 'bg-[#45140C] hover:bg-[#45140C]/90 text-[#F3EDE2]';
      case 'demo':
        return 'bg-[#B5AD21] hover:bg-[#B5AD21]/90 text-[#45140C]';
      case 'figma':
        return 'bg-[#E5B1A4] hover:bg-[#E5B1A4]/90 text-[#45140C]';
      default:
        return 'bg-[#45140C]/10 hover:bg-[#45140C]/20 text-[#45140C]';
    }
  };

  return (
    <>
      {/* Meta Info Bar */}
      <section className="w-full border-b-2 border-[#B5AD21]/20 bg-[#F3EDE2]">
        <div className={`max-w-7xl mx-auto px-8 py-6 grid grid-cols-1 ${links && links.length > 0 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-4`}>
          {/* Role */}
          <div>
            <div className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2">
              ROLE
            </div>
            <div className="text-base text-[#45140C] font-inter">{role}</div>
          </div>

          {/* Timeline */}
          <div>
            <div className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2">
              TIMELINE
            </div>
            <div className="text-base text-[#45140C] font-inter">{timeline}</div>
          </div>

          {/* Tools */}
          <div>
            <div className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2">
              TOOLS
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-2 py-1 rounded bg-[#45140C]/10 text-[#45140C] font-inter"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {links && links.length > 0 && (
            <div>
              <div className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2">
                LINKS
              </div>
              <div className="flex flex-wrap gap-2">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-inter font-medium text-xs transition-all duration-200 ${getColorForType(link.type)}`}
                    title={link.label}
                  >
                    {getIconForType(link.type)}
                    <span className="hidden xl:inline">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tags */}
      <section className="w-full bg-[#F3EDE2] border-b border-[#45140C]/10 fade-in-up-delay-2">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#B5AD21] text-[#45140C] text-sm font-medium font-formadjr"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
