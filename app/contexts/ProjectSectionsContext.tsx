'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ProjectSection = {
  id: string;
  label: string;
};

type ProjectSectionsContextType = {
  sections: ProjectSection[];
  registerSection: (section: ProjectSection) => void;
  unregisterSection: (id: string) => void;
  clearSections: () => void;
};

const ProjectSectionsContext = createContext<ProjectSectionsContextType | undefined>(undefined);

export function ProjectSectionsProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<ProjectSection[]>([]);

  const registerSection = (section: ProjectSection) => {
    setSections((prev) => {
      // Avoid duplicates
      if (prev.some(s => s.id === section.id)) return prev;
      return [...prev, section];
    });
  };

  const unregisterSection = (id: string) => {
    setSections((prev) => prev.filter(s => s.id !== id));
  };

  const clearSections = () => {
    setSections([]);
  };

  return (
    <ProjectSectionsContext.Provider value={{ sections, registerSection, unregisterSection, clearSections }}>
      {children}
    </ProjectSectionsContext.Provider>
  );
}

export function useProjectSections() {
  const context = useContext(ProjectSectionsContext);
  if (context === undefined) {
    throw new Error('useProjectSections must be used within a ProjectSectionsProvider');
  }
  return context;
}
