import CaseStudyHero from "../../components/casestudy/CaseStudyHero";
import CaseStudyMeta from "../../components/casestudy/CaseStudyMeta";
import CaseStudyOverview from "../../components/casestudy/CaseStudyOverview";
import CaseStudyProblem from "../../components/casestudy/CaseStudyProblem";
import CaseStudySolution from "../../components/casestudy/CaseStudySolution";
import CaseStudyComparison from "../../components/casestudy/CaseStudyComparison";
import CaseStudyFigmaEmbed from "../../components/casestudy/CaseStudyFigmaEmbed";
import CaseStudyResults from "../../components/casestudy/CaseStudyResults";
import CaseStudyTakeaways from "../../components/casestudy/CaseStudyTakeaways";
import CaseStudyGallery from "../../components/casestudy/CaseStudyGallery";
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
            title="Labeling"
            subtitle="Redesigning Materia's Image Labeling Widget for Accessibility & Modern UX"
            heroImage="/project2/hero.png"
          />

          {/* Meta Info */}
          <CaseStudyMeta
            role="UI/UX Designer & Frontend Developer"
            timeline="2 months (Jan - Feb 2025)"
            tools={["Figma", "React", "TypeScript", "WCAG 2.1"]}
            tags={["Accessibility", "UI Redesign", "Responsive Design", "Higher Education"]}
            links={[
              { label: "GitHub", url: "https://github.com/ucfopen/Materia", type: "github" },
              { label: "Demo", url: "https://materia.ucf.edu", type: "demo" },
              { label: "Figma", url: "https://figma.com/file/labeling", type: "figma" }
            ]}
          />

          {/* Overview */}
          <CaseStudyOverview
            sectionNumber="01"
            overview="Labeling is an interactive widget within Materia UCF's learning platform that helps students practice identifying and labeling parts of images. The existing widget suffered from accessibility barriers, unresponsive layouts, and an outdated visual design that hadn't been updated in years. This redesign focused on modernizing the interface while prioritizing WCAG compliance and removing features that harmed the user experience."
          />

          {/* Problem */}
          <CaseStudyProblem
            sectionNumber="02"
            problem="The Labeling widget had been largely untouched since its initial development, creating significant usability and accessibility challenges for both educators and students using the platform."
            problemPoints={[
              {
                title: "ACCESSIBILITY BARRIERS",
                description: "No keyboard navigation support, insufficient color contrast ratios, and missing ARIA labels made the widget unusable for students with disabilities, violating WCAG 2.1 standards."
              },
              {
                title: "UNRESPONSIVE LAYOUTS",
                description: "Fixed desktop-only layouts broke on mobile and tablet devices, excluding students who primarily access course materials on smaller screens."
              },
              {
                title: "OUTDATED AESTHETIC",
                description: "Visual design felt dated and inconsistent with modern web standards, reducing trust and engagement with the learning tool."
              },
              {
                title: "HARMFUL COLOR WHEEL FEATURE",
                description: "An unrestricted color picker for image backgrounds allowed educators to create low-contrast scenarios and visually fatiguing combinations that hurt readability and accessibility."
              },
              {
                title: "CONFUSING DUAL INTERFACES",
                description: "Separate Player and Creator modals had inconsistent design patterns, forcing users to relearn interaction paradigms between creation and practice modes."
              }
            ]}
          />

          {/* Solution */}
          <CaseStudySolution
            sectionNumber="03"
            solution="A comprehensive redesign that modernized both the Player and Creator interfaces while prioritizing accessibility, responsive design, and intentional feature retirement."
            solutionSections={[
              {
                title: "WCAG 2.1 AA Compliance",
                content: "Implemented full keyboard navigation, proper focus states, semantic HTML, and ARIA labels. All color combinations now meet minimum 4.5:1 contrast ratios.",
                image: "/project2/accessibility.png"
              },
              {
                title: "Mobile-First Responsive Design",
                content: "Rebuilt layouts using flexible grid systems and breakpoints to ensure seamless experiences across all device sizes from mobile to desktop.",
                image: "/project2/responsive.png"
              },
              {
                title: "Retired Color Wheel Feature",
                content: "Removed the background color picker and replaced it with a curated set of accessible, high-contrast background options that maintain visual hierarchy and readability.",
                whyItMatters: "This decision prioritized user safety over customization freedom, preventing educators from unintentionally creating inaccessible content."
              },
              {
                title: "Unified Design Language",
                content: "Created consistent component patterns, spacing systems, and interaction models shared between Player and Creator modals, reducing cognitive load.",
                image: "/project2/design-system.png"
              }
            ]}
          />

          {/* Before & After Comparison */}
          <CaseStudyComparison
            sectionNumber="04"
            title="Modal Redesigns"
            description="Both the Player (student-facing) and Creator (educator-facing) modals received complete visual and functional overhauls while maintaining feature parity."
            comparisons={[
              {
                title: "Creator Modal",
                description: "Educator interface for building labeling exercises with improved organization and streamlined workflows.",
                before: "/project2/creator-before.png",
                after: "/project2/creator-after.png"
              },
              {
                title: "Player Modal",
                description: "Student interface for practicing image labeling with clearer visual feedback and accessible controls.",
                before: "/project2/player-before.png",
                after: "/project2/player-after.png"
              }
            ]}
          />

          {/* Figma Prototype */}
          <CaseStudyFigmaEmbed
            sectionNumber="05"
            title="Interactive Prototype"
            description="Explore the full Labeling redesign in Figma, including both Player and Creator modals with complete interaction flows."
            figmaUrl="https://embed.figma.com/design/tNUAUI5mBxRdrERhNcUkCe/Labeling-Redesign?node-id=0-1&embed-host=share"
            height="500px"
          />

          {/* Results */}
          <CaseStudyResults
            sectionNumber="06"
            results="The redesigned Labeling widget achieved full WCAG 2.1 AA compliance and significantly improved usability metrics across student and educator populations."
            metrics={[
              { value: "100%", label: "WCAG 2.1 AA Compliance" },
              { value: "65%", label: "Increase in Mobile Usage" },
              { value: "40%", label: "Faster Task Completion" },
            ]}
            resultsImage="/project2/results.png"
          />

          {/* Takeaways */}
          <CaseStudyTakeaways
            sectionNumber="07"
            impact="The Labeling widget redesign was deployed to 50,000+ students across UCF courses, setting a new standard for accessibility in Materia's widget library."
            takeaways={[
              {
                title: "Feature Retirement as Design Decision",
                description: "Sometimes the best design choice is removing a feature. The color wheel offered unlimited customization but created accessibility risks that outweighed its value."
              },
              {
                title: "Consistency Reduces Cognitive Load",
                description: "Unifying the Player and Creator design languages made both interfaces feel more intuitive, even though they serve different user needs."
              },
              {
                title: "Accessibility Benefits Everyone",
                description: "Features built for accessibility (keyboard navigation, clear focus states, high contrast) improved the experience for all users, not just those with disabilities."
              }
            ]}
          />

          {/* Gallery */}
          <CaseStudyGallery
            sectionNumber="08"
            gallery={[
              "/project2/gallery-1.png",
              "/project2/gallery-2.png",
              "/project2/gallery-3.png",
              "/project2/gallery-4.png",
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
