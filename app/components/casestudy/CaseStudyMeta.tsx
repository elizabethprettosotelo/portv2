"use client";

type CaseStudyMetaProps = {
  role: string;
  timeline: string;
  tools: string[];
  tags: string[];
};

export default function CaseStudyMeta({ role, timeline, tools, tags }: CaseStudyMetaProps) {
  return (
    <>
      {/* Meta Info Bar */}
      <section className="w-full border-b-2 border-[#45140C]/10 bg-[#F3EDE2] fade-in-up-delay-1">
        <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Role */}
          <div>
            <div className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2">
              ROLE
            </div>
            <div className="text-base text-[#45140C] font-formadjr">{role}</div>
          </div>

          {/* Timeline */}
          <div>
            <div className="text-xs font-bold text-[#B5AD21] tracking-wider font-mono mb-2">
              TIMELINE
            </div>
            <div className="text-base text-[#45140C] font-formadjr">{timeline}</div>
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
