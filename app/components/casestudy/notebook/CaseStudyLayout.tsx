import type { ReactNode } from "react";
import CaseStudyNavigation from "./CaseStudyNavigation";
import type { CaseStudySection } from "./types";

type CaseStudyLayoutProps = {
  sections: CaseStudySection[];
  children: ReactNode;
};

export default function CaseStudyLayout({ sections, children }: CaseStudyLayoutProps) {
  return (
    <section className="w-full pb-20">
      <CaseStudyNavigation sections={sections} />
      <div className="mx-auto w-full max-w-[min(80vw,76rem)] px-4 md:px-8">
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
