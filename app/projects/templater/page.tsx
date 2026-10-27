import type { Metadata } from "next";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import CaseStudyPage from "../../components/casestudy/editorial/CaseStudyPage";
import { templater } from "../../components/casestudy/editorial/templater";

export const metadata: Metadata = {
  title: "Templater Case Study",
  description: "A case study about helping instructors see Canvas page templates before importing them into a course.",
  openGraph: {
    title: "Templater Case Study",
    description: "Showing professors what they are picking before they pick it.",
    images: ["/templater/placeholder.svg"],
  },
};

export default function TemplaterCaseStudyPage() {
  return (
    <div className="flex min-h-screen max-w-full flex-col bg-[#FAF9F6]">
      <Navbar />
      <main className="site-main max-w-full flex-1 pt-16 md:pt-0" style={{ marginLeft: "var(--sidebar-width, 0px)" }}>
        <CaseStudyPage study={templater} />
      </main>
      <Footer />
    </div>
  );
}
