import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import PendingCaseStudyPage from "../../../components/casestudy/PendingCaseStudyPage";

export default function ProjectThreePage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#F3EDE2]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="Project Three"
          subtitle="Case study pending. This page is a quick preview of the work while the full write-up is still coming together."
          role="Designer & Developer"
          timeline="In progress"
          tools={["Figma", "React", "Next.js"]}
          tags={["Frontend", "Design Systems"]}
          overview="Project Three is still being documented, but the current story centers on clarifying the interface, tightening the interaction flow, and building a foundation that is easy to expand into a fuller case study later."
        />
      </main>
      <Footer />
    </div>
  );
}
