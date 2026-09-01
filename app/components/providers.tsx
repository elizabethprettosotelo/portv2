"use client";

import { ReactNode } from "react";
import { HoverProvider } from "../contexts/HoverContext";
import { ProjectSectionsProvider } from "../contexts/ProjectSectionsContext";
import { NavbarProvider } from "../contexts/NavbarContext";
import SmoothCursor from "./smooth-cursor";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NavbarProvider>
      <SmoothCursor />
      <HoverProvider>
        <ProjectSectionsProvider>
          {children}
        </ProjectSectionsProvider>
      </HoverProvider>
    </NavbarProvider>
  );
}
