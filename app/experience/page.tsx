import About from "../components/about";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-0 overflow-x-hidden max-w-full bg-[#F3EDE2]" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
        <About
          // Hero
          name="Eli Pretto-Sotelo"
          tagline="UI/UX Designer & Frontend Developer"
          
          // Bio
          bio={`Hi! I'm Eli, a designer and developer who loves creating beautiful, functional digital experiences.

I combine my background in UX design with frontend development skills to bridge the gap between design and code. I believe the best products come from understanding both sides of the process.

Currently based in [Your Location], I work with teams and clients to bring their digital visions to life through thoughtful design and clean code.`}
          
          // Skills
          skills={[
            {
              category: "Design",
              items: [
                "UI/UX Design",
                "Prototyping",
                "Design Systems",
                "User Research",
                "Figma",
                "Adobe Creative Suite",
              ],
            },
            {
              category: "Development",
              items: [
                "React / Next.js",
                "TypeScript",
                "HTML/CSS",
                "Tailwind CSS",
                "Git & GitHub",
                "Responsive Design",
              ],
            },
            {
              category: "Process",
              items: [
                "Agile Methodologies",
                "Design Thinking",
                "Wireframing",
                "Accessibility (a11y)",
                "Cross-functional Teams",
                "Documentation",
              ],
            },
          ]}
          
          // Interests
          interests={[
            "Photography",
            "Coffee Culture",
            "Hiking",
            "Reading",
            "Cooking",
            "Travel",
          ]}
          
          // Fun Facts
          funFacts={[
            "🎨 I've designed over 50+ projects in the last year",
            "☕ Coffee enthusiast - espresso is my love language",
            "🌍 I've traveled to 10+ countries for design inspiration",
            "📚 Always learning something new in tech and design",
          ]}
          
          // CTA
          ctaText="Let's Create Something Amazing!"
        />
      </main>
      <Footer />
    </div>
  );
}
