import type { Metadata } from "next";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import CaseStudyPage from "../../components/casestudy/editorial/CaseStudyPage";
import { chopchop } from "../../components/casestudy/editorial/chopchop";

export const metadata: Metadata = {
  title: "Chop Chop Case Study",
  description: "A case study about designing a multiplayer cooking race across a shared screen and each player's phone.",
  openGraph: {
    title: "Chop Chop Case Study",
    description: "Designing a multiplayer cooking race that gets a room to look up from their phones.",
    images: ["/chopchop/hero.png"],
  },
};

export default function ChopChopCaseStudyPage() {
  return (
    <div className="flex min-h-screen max-w-full flex-col bg-[#FAF9F6]">
      <Navbar />
      <main className="site-main max-w-full flex-1 pt-16 md:pt-0" style={{ marginLeft: "var(--sidebar-width, 0px)" }}>
        <CaseStudyPage study={chopchop} />
      </main>
      <Footer />
    </div>
  );
}
