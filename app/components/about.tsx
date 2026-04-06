"use client";

import Image from "next/image";

type AboutProps = {
  // Hero Section
  name: string;
  tagline: string;
  profileImage: string;
  
  // Bio
  bio: string;
  
  // Skills & Tools
  skills: {
    category: string;
    items: string[];
  }[];
  
  // Interests/Hobbies
  interests: string[];
  
  // Fun Facts
  funFacts?: string[];
  
  // Contact CTA
  ctaText?: string;
};

export default function About({
  name,
  tagline,
  profileImage,
  bio,
  skills,
  interests,
  funFacts,
  ctaText = "Let's work together!",
}: AboutProps) {
  return (
    <div className="w-full bg-[#F3EDE2]">
      {/* Hero Section */}
      <section className="w-full py-20 px-8 bg-[#45140C] fade-in-up">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl shrink-0 border-4 border-[#B5AD21]">
            <Image
              src={profileImage}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Intro Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-[#F3EDE2] font-formadjr mb-4">
              {name}
            </h1>
            <p className="text-2xl md:text-3xl text-[#B5AD21] font-formadjr">
              {tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="w-full py-16 px-8 fade-in-up-delay-1">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-8">
            About Me
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#45140C]/70 font-inter leading-relaxed whitespace-pre-line">
              {bio}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#45140C]/10" />

      {/* Skills & Tools Section */}
      <section className="w-full py-16 px-8 fade-in-up-delay-2">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-12 text-center">
            Skills & Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-[#45140C] font-formadjr mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-base text-[#45140C]/65 font-inter flex items-center gap-2"
                    >
                      <span className="text-[#B5AD21]">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#45140C]/10" />

      {/* Interests Section */}
      <section className="w-full py-16 px-8 fade-in-up-delay-3">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-8">
            When I'm Not Designing...
          </h2>
          <div className="flex flex-wrap gap-4">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-[#B5AD21] text-[#45140C] rounded-full text-lg font-medium font-formadjr hover:bg-[#45140C] hover:text-[#F3EDE2] transition-all duration-300 cursor-default"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      {funFacts && funFacts.length > 0 && (
        <>
          <div className="w-full h-px bg-[#45140C]/10" />
          <section className="w-full py-16 px-8 fade-in-up-delay-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#45140C] font-formadjr mb-8">
                Fun Facts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {funFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="bg-[#45140C] rounded-lg p-6 shadow-md"
                  >
                    <p className="text-lg text-[#F3EDE2] font-inter">
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA Section */}
      <section className="w-full py-20 px-8 bg-[#45140C] border-t-2 border-[#E5B1A4]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F3EDE2] font-formadjr mb-6">
            {ctaText}
          </h2>
          <p className="text-xl text-[#F3EDE2]/80 font-inter mb-8">
            I'm always open to new opportunities and collaborations.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:elizabethprettosotelo@gmail.com"
              className="px-8 py-4 bg-[#B5AD21] text-[#45140C] rounded-lg font-formadjr font-bold text-lg hover:bg-[#E5B1A4] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-[#B5AD21] text-[#B5AD21] rounded-lg font-formadjr font-bold text-lg hover:bg-[#B5AD21] hover:text-[#45140C] transition-all duration-200"
            >
              View Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

