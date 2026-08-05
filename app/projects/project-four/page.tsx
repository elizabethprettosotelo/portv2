import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import PendingCaseStudyPage from "../../../components/casestudy/PendingCaseStudyPage";

export default function ProjectFourPage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#F3EDE2]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="Project Four"
          subtitle="Case study pending. I’m keeping the surface simple for now so the page can show the structure before the full narrative arrives."
          role="UX Designer"
          timeline="In progress"
          tools={["Figma", "Wireframing", "Prototyping"]}
          tags={["UX Design", "Flow Design"]}
          overview="Project Four is a work-in-progress case study focused on sharpening the experience story, keeping the interaction model easy to scan, and leaving room for a fuller breakdown when the project is ready."
        />
      </main>
      <Footer />
    </div>
  );
}
