import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import PendingCaseStudyPage from "../../components/casestudy/PendingCaseStudyPage";

export default function PallitPage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#F3EDE2]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="Pallit"
          subtitle="A font and color-palette pairing generator created during my first hackathon."
          role="Design Placeholder"
          timeline="Pending"
          tools={["Figma", "Next.js"]}
          tags={["Product Design", "Pending", "Hackathon"]}
          overview="Choosing typography and colors that feel cohesive can be difficult, especially for designers beginning a new project. Pallit generates complementary font and color combinations to give users a faster starting point for their visual direction."
          summaryCards={[
            {
              number: "01",
              title: "Problem",
              copy: "Choosing typography and colors that feel cohesive can be difficult, especially for designers beginning a new project.",
            },
            {
              number: "02",
              title: "Solution",
              copy: "Pallit generates complementary font and color combinations to give users a faster starting point for their visual direction.",
            },
            {
              number: "03",
              title: "Outcome",
              copy: "Created an approachable design tool where typography and color find their match, while gaining my first experience designing and building under hackathon constraints.",
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
