import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import PendingCaseStudyPage from "../../components/casestudy/PendingCaseStudyPage";

export default function TemplaterPage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#F3EDE2]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="Templater"
          subtitle="An internal faculty tool that helps instructors explore and select templates for their Canvas courses."
          role="Design Placeholder"
          timeline="Pending"
          tools={["Figma", "Next.js"]}
          tags={["UX Design"]}
          overview="The original interface made templates difficult to distinguish, forcing instructors to choose without clearly understanding how each option would look or function. I redesigned the experience with clearer navigation, polished template previews, and visual thumbnails that helped instructors compare their options."
          summaryCards={[
            {
              number: "01",
              title: "Problem",
              copy: "The original interface made templates difficult to distinguish, forcing instructors to choose without clearly understanding how each option would look or function.",
            },
            {
              number: "02",
              title: "Solution",
              copy: "I redesigned the experience with clearer navigation, polished template previews, and visual thumbnails that helped instructors compare their options.",
            },
            {
              number: "03",
              title: "Outcome",
              copy: "Reimagined how instructors build courses by turning template selection into a more visual, confident, and approachable process.",
            },
          ]}
          footerNote="Full case study coming soon."
        />
      </main>
      <Footer />
    </div>
  );
}
