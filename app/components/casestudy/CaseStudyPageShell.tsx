"use client";

import type { ReactNode } from "react";
import CaseStudyStatusRail from "./CaseStudyStatusRail";

type CaseStudyPageShellProps = {
  children: ReactNode;
};

export default function CaseStudyPageShell({
  children,
}: CaseStudyPageShellProps) {
  return (
    <section className="w-full pb-16 md:pb-20">
      <div className="mx-auto w-full max-w-[min(80vw,72rem)] px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[110px_minmax(0,1fr)] lg:gap-10 items-start">
          <CaseStudyStatusRail />
          <div className="min-w-0">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
