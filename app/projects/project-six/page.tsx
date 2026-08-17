import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import PendingCaseStudyPage from "../../components/casestudy/PendingCaseStudyPage";

export default function ProjectSixPage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#F3EDE2]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="Knight Hacks VIII Site"
          subtitle="The visual design and UI for the Knight Hacks VIII website, created to recruit participants and introduce them to the hackathon community."
          role="Frontend Developer"
          timeline="In progress"
          tools={["Next.js", "Tailwind", "Responsive UI"]}
          tags={["Frontend", "Responsive Design"]}
          links={[
            { label: "Demo", href: "https://2025.knighthacks.org/", kind: "demo" },
            { label: "Figma", href: "https://www.figma.com/design/w7k6OFPP8emqJeIRZULqBb/KHVIII?node-id=0-1&t=glZQk6NvaPThdUn6-1", kind: "figma" },
          ]}
          overview="The site needed to communicate essential event information while also capturing the energy, personality, and scale of Knight Hacks. I created an immersive visual system that combined clear information architecture with a distinctive event identity and engaging interface design."
          summaryCards={[
            {
              number: "01",
              title: "Problem",
              copy: "The site needed to communicate essential event information while also capturing the energy, personality, and scale of Knight Hacks.",
            },
            {
              number: "02",
              title: "Solution",
              copy: "I created an immersive visual system that combined clear information architecture with a distinctive event identity and engaging interface design.",
            },
            {
              number: "03",
              title: "Outcome",
              copy: "Produced more than a website - an invitation to our hackathon that helped the UCF community understand the event and feel part of its world.",
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
