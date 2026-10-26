import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import PendingCaseStudyPage from "../../components/casestudy/PendingCaseStudyPage";

export default function ProjectOnePage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#FAF9F6]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#FAF9F6]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="Conduit"
          subtitle="A multimodal accessibility platform that brings EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface."
          role="Lead UX Designer & Frontend Developer"
          timeline="Hackalytics 2025"
          tools={["Electron", "TypeScript", "Figma"]}
          tags={["Accessibility", "UX Design", "Hackathon", "Frontend"]}
          links={[
            { label: "GitHub", href: "https://github.com/kwaiidev/conduit", kind: "github" },
            { label: "Demo", href: "https://devpost.com/software/conduit-y8gqoj?ref_content=my-projects-tab&ref_feature=my_projects", kind: "devpost" },
            { label: "Figma", href: "https://figma.com", kind: "figma" },
          ]}
          overview="Conduit is a multimodal accessibility platform that unifies EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface."
        />
      </main>
      <Footer />
    </div>
  );
}



