import CaseStudyHero from "../../components/casestudy/CaseStudyHero";
import CaseStudyMeta from "../../components/casestudy/CaseStudyMeta";
import CaseStudyProblem from "../../components/casestudy/CaseStudyProblem";
import CaseStudySolution from "../../components/casestudy/CaseStudySolution";
import CaseStudyResults from "../../components/casestudy/CaseStudyResults";
import CaseStudyCTA from "../../components/casestudy/CaseStudyCTA";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function ProjectTwoPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-0 overflow-x-hidden max-w-full bg-[#F3EDE2]" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
        <div className="w-full bg-[#F3EDE2]">
          {/* Hero */}
          <CaseStudyHero
            title="Project Two"
            subtitle="Mobile app redesign focused on user engagement"
            heroImage="/project2-hero.jpg"
          />

          {/* Meta Info */}
          <CaseStudyMeta
            role="UI/UX Designer"
            timeline="3 months (Mar - May 2025)"
            tools={["Figma", "Adobe Illustrator", "Protopie"]}
            tags={["UI Design", "Prototyping", "Mobile Design"]}
          />

          {/* Problem - Using custom title and icon */}
          <CaseStudyProblem
            title="The Challenge"
            icon="🎯"
            problem={`The existing mobile app had low user engagement and high drop-off rates. User feedback indicated confusion with navigation and difficulty completing key tasks.`}
            problemImage="/project2-problem.jpg"
          />

          {/* Solution - Simple solution without subsections */}
          <CaseStudySolution
            title="Our Approach"
            icon="🚀"
            solution={`Redesigned the core user flows with a focus on simplicity and clarity. Implemented a new navigation system and streamlined the checkout process.`}
          />

          {/* Results */}
          <CaseStudyResults
            title="Impact"
            icon="📈"
            results={`The redesign significantly improved user engagement and conversion rates.`}
            metrics={[
              { value: "85%", label: "Increase in daily active users" },
              { value: "50%", label: "Faster task completion" },
              { value: "4.8★", label: "App store rating" },
            ]}
          />

          {/* CTA */}
          <CaseStudyCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}
