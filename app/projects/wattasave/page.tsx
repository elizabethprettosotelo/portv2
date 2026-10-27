import type { Metadata } from "next";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import PendingCaseStudyPage from "../../components/casestudy/PendingCaseStudyPage";

export const metadata: Metadata = {
  title: "Wattasave",
  description: "A savings and budgeting concept that helps people build better money habits without traditional finance-app clutter.",
  openGraph: {
    title: "Wattasave",
    description: "Turning everyday routines into cleaner, cheaper energy choices.",
    images: ["/wattasave/preview.png"],
  },
};

export default function WattaSavePage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#FAF9F6]">
      <Navbar />
      <main
        className="site-main flex-1 pt-16 md:pt-0 max-w-full bg-[#FAF9F6]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <PendingCaseStudyPage
          title="Wattasave"
          subtitle="A savings and budgeting concept that helps people build better money habits without the clutter of traditional finance apps."
          role="Product Designer"
          timeline="Recent concept"
          tools={["Figma", "Design Systems", "Mobile UI"]}
          tags={["Fintech", "UI Design", "Hackathon", "Frontend"]}
          links={[
            { label: "Demo", href: "https://devpost.com/software/wattasave", kind: "demo" },
          ]}
          overview="Wattasave is a savings and budgeting concept designed to help people build better money habits without the usual clutter and pressure of traditional finance apps."
        />
      </main>
      <Footer />
    </div>
  );
}



