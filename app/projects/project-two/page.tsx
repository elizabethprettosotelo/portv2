import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import PendingCaseStudyPage from "../../components/casestudy/PendingCaseStudyPage";

export default function ProjectTwoPage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#F3EDE2]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="Labeling"
          subtitle="A gamified educational widget used by more than 50,000 students and faculty members each month."
          role="UI/UX Designer & Frontend Developer"
          timeline="Jan - Feb 2025"
          tools={["Figma", "React", "TypeScript"]}
          tags={["Accessibility", "UI Redesign", "EdTech"]}
          links={[
            { label: "GitHub", href: "https://github.com/elizabethprettosotelo", kind: "github" },
            { label: "Figma", href: "https://figma.com", kind: "figma" },
          ]}
          overview="The existing experience felt outdated and was not designed to work consistently across screen sizes or support a wide range of users. I modernized the interface and improved its accessibility and responsiveness while preserving the widget's core learning interactions."
          summaryCards={[
            {
              number: "01",
              title: "Problem",
              copy: "The existing experience felt outdated and was not designed to work consistently across screen sizes or support a wide range of users.",
            },
            {
              number: "02",
              title: "Solution",
              copy: "I modernized the interface and improved its accessibility and responsiveness while preserving the widget's core learning interactions.",
            },
            {
              number: "03",
              title: "Outcome",
              copy: "Delivered a cleaner, more inclusive experience that works more effectively across desktop and mobile devices.",
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
