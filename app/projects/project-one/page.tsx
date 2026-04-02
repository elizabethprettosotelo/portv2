import CaseStudy from "../../components/casestudy";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function ProjectOnePage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 overflow-x-hidden max-w-full"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <CaseStudy
          // Hero
          title="Project One"
          subtitle="A comprehensive design system that scales across multiple platforms"
          heroImage="/project1-hero.jpg"
          
          // Meta
          role="Lead UX Designer & Frontend Developer"
          timeline="6 months (Jan - Jun 2025)"
          tools={["Figma", "React", "TypeScript", "Storybook", "Tailwind CSS"]}
          tags={["UX Design", "Research", "Design Systems", "Frontend Development"]}
          
          // Overview
          overview={`This project involved creating a comprehensive design system for a growing startup that needed to maintain consistency across web, mobile, and internal tools.

The challenge was to balance flexibility with strict guidelines, ensuring the system could evolve while maintaining brand integrity.`}
          
          // Problem
          problem={`The company was experiencing rapid growth, with multiple teams building products independently. This led to:

• Inconsistent user experiences across platforms
• Duplicated design and development work
• Slow onboarding for new team members
• Difficulty maintaining brand consistency
• Technical debt accumulating across codebases`}
          problemImage="/project1-problem.jpg"
          
          // Solution
          solution={`I led the creation of a comprehensive design system that included:

• A foundational design language with clear principles
• Reusable component library built in React
• Detailed documentation and guidelines
• Automated testing and accessibility standards
• Token-based theming for easy customization`}
          
          solutionSections={[
            {
              title: "Research & Discovery",
              content: `Conducted an audit of existing products and interviewed 15+ team members to understand pain points and requirements. Created an inventory of all UI patterns and components.`,
              image: "/project1-research.jpg",
            },
            {
              title: "Design Tokens & Foundations",
              content: `Established a token system for colors, typography, spacing, and other design decisions. This allowed for consistent theming and easy updates across all platforms.`,
              image: "/project1-tokens.jpg",
            },
            {
              title: "Component Library",
              content: `Built 50+ reusable components with variants, states, and comprehensive documentation. Each component was built mobile-first with accessibility in mind.`,
              image: "/project1-components.jpg",
            },
          ]}
          
          // Results
          results={`The design system transformed how the team worked together, reducing redundant work and improving consistency across all products.`}
          
          metrics={[
            { value: "60%", label: "Faster component development" },
            { value: "40%", label: "Reduction in design QA issues" },
            { value: "100%", label: "Team adoption rate" },
          ]}
          
          resultsImage="/project1-results.jpg"
          
          // Gallery
          gallery={[
            "/project1-gallery-1.jpg",
            "/project1-gallery-2.jpg",
            "/project1-gallery-3.jpg",
            "/project1-gallery-4.jpg",
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
