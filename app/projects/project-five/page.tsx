import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import PendingCaseStudyPage from "../../components/casestudy/PendingCaseStudyPage";

export default function ProjectFivePage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#F3EDE2]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="Tariffix"
          subtitle="A Chrome extension that calculates estimated tariff costs live while users browse products on e-commerce websites."
          role="Designer & Frontend Developer"
          timeline="Bitcamp 2024"
          tools={["Next.js", "Figma", "Monorepo"]}
          tags={["Frontend", "Hackathon"]}
          links={[
            { label: "GitHub", href: "https://github.com/Adr1an04/Tariffix", kind: "github" },
            { label: "Figma", href: "https://www.figma.com/design/VQeyiEWBKz8l6L7JDHwgqj/Tarrifix?node-id=0-1&p=f&t=aJdtyxYEZDz6tN2L-0", kind: "figma" },
            { label: "Demo", href: "https://devpost.com/software/tariffix", kind: "demo" },
          ]}
          overview="Shoppers often cannot tell how tariffs may affect an item's final price until late in the purchasing process. Tariffix surfaces estimated tariff costs directly on product pages, making international pricing easier to understand while shopping."
          summaryCards={[
            {
              number: "01",
              title: "Problem",
              copy: "Shoppers often cannot tell how tariffs may affect an item's final price until late in the purchasing process.",
            },
            {
              number: "02",
              title: "Solution",
              copy: "Tariffix surfaces estimated tariff costs directly on product pages, making international pricing easier to understand while shopping.",
            },
            {
              number: "03",
              title: "Outcome",
              copy: "Created a more transparent purchasing experience that helps users anticipate additional costs before checkout.",
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
