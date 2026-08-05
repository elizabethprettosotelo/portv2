import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import PendingCaseStudyPage from "../../components/casestudy/PendingCaseStudyPage";

const UCFHERE_FIGMA_EMBED_URL =
  "https://embed.figma.com/proto/scJhVcSftznC0FFv8q2r0D/UCFHere?node-id=613-8793&p=f&scaling=scale-down&content-scaling=fixed&page-id=613%3A8155&starting-point-node-id=613%3A14304&embed-host=share";

export default function UcfHerePage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#F3EDE2]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="UCFHere"
          subtitle="Making university attendance clearer, more accessible, and more resilient across devices."
          role="Product Designer & Frontend Developer"
          timeline="Most recent project"
          tools={["Figma", "Next.js", "TypeScript"]}
          tags={["EdTech", "Accessibility", "Responsive Web"]}
          previewEmbedUrl={UCFHERE_FIGMA_EMBED_URL}
          previewEmbedTitle="UCFHere Figma prototype"
          links={[
            {
              label: "Figma Prototype",
              href: UCFHERE_FIGMA_EMBED_URL,
              kind: "figma",
            },
          ]}
          overview="UCFHere is the University of Central Florida's primary attendance and engagement platform, used by more than 50,000 students each month. Students use the application to scan course-specific QR codes, confirm attendance, and review attendance history through Canvas."
          summaryCards={[
            {
              number: "01",
              title: "Problem",
              copy: "Attendance is a small action with high consequences. When the scan path breaks, the experience can feel ambiguous instead of reassuring, especially inside a time-limited classroom moment.",
            },
            {
              number: "02",
              title: "Solution",
              copy: "I led an end-to-end redesign of the student experience, restructuring the navigation, redesigning the QR check-in flow, creating a responsive attendance record system, and designing recovery experiences for device and browser issues.",
            },
            {
              number: "03",
              title: "Outcome",
              copy: "The redesign centers the student around the scan, confirms success clearly, and gives specific recovery paths when the environment gets in the way.",
            },
          ]}
          footerNote="The full notebook case study is archived separately and can be brought back when I’m ready to finish the remaining chapters."
        />
      </main>
      <Footer />
    </div>
  );
}
