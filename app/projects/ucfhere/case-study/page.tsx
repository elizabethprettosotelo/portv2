import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import CaseStudyDocument from "../../../components/casestudy/notebook/CaseStudyDocument";
import CaseStudyLayout from "../../../components/casestudy/notebook/CaseStudyLayout";
import NotebookHero from "../../../components/casestudy/notebook/NotebookHero";
import { ucfhereCaseStudy } from "../../../components/casestudy/notebook/ucfhere-content";

export default function UcfHereCaseStudyPage() {
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 max-w-full bg-[#F3EDE2]"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <NotebookHero study={ucfhereCaseStudy} />
        <CaseStudyLayout sections={ucfhereCaseStudy.sections}>
          <CaseStudyDocument study={ucfhereCaseStudy} />
        </CaseStudyLayout>
      </main>
      <Footer />
    </div>
  );
}
