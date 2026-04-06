"use client";

import { ReactNode } from "react";
import { HoverProvider } from "../contexts/HoverContext";
import { ProjectSectionsProvider } from "../contexts/ProjectSectionsContext";
import { NavbarProvider } from "../contexts/NavbarContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NavbarProvider>
      <HoverProvider>
        <ProjectSectionsProvider>
          {children}
        </ProjectSectionsProvider>
      </HoverProvider>
    </NavbarProvider>
  );
}
