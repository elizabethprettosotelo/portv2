import type { Metadata } from "next";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import CaseStudyPage from "../../../components/casestudy/editorial/CaseStudyPage";
import { ucfhere } from "../../../components/casestudy/editorial/ucfhere";

export const metadata: Metadata = {
  title: "UCFHere Case Study",
  description: "A case study about redesigning UCFHere so students know when attendance counted and how to recover when it did not.",
  openGraph: {
    title: "UCFHere Case Study",
    description: "Redesigning UCFHere for clearer check-ins, recovery paths, and attendance history.",
    images: ["/ucfhere/final/overview.png"],
  },
};

export default function UcfHereCaseStudyPage() {
  return (
    <div className="flex min-h-screen max-w-full flex-col bg-[#FAF9F6]">
      <Navbar />
      <main className="site-main max-w-full flex-1 pt-16 md:pt-0" style={{ marginLeft: "var(--sidebar-width, 0px)" }}>
        <CaseStudyPage study={ucfhere} />
      </main>
      <Footer />
    </div>
  );
}
