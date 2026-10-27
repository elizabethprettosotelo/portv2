import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import CaseStudyPage from "../../components/casestudy/editorial/CaseStudyPage";
import { templater } from "../../components/casestudy/editorial/templater";

export default function TemplaterCaseStudyPage() {
  return (
    <div className="flex min-h-screen max-w-full flex-col bg-[#FAF9F6]">
      <Navbar />
      <main className="max-w-full flex-1 pt-16 md:pt-0" style={{ marginLeft: "var(--sidebar-width, 0px)" }}>
        <CaseStudyPage study={templater} />
      </main>
      <Footer />
    </div>
  );
}
