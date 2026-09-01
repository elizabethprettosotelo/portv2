export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "devpost" | "demo" | "figma" | "custom";
};

export const LINK_CONFIG: Record<
  ProjectLink["kind"],
  { icon: string; bg: string; text: string; hoverBg: string }
> = {
  github: {
    icon: "⌥",
    bg: "bg-[#250D47]/8",
    text: "text-[#250D47]",
    hoverBg: "hover:bg-[#250D47] hover:text-[#F0F1E3]",
  },
  devpost: {
    icon: "◈",
    bg: "bg-[#8EB522]/22",
    text: "text-[#250D47]",
    hoverBg: "hover:bg-[#8EB522] hover:text-[#250D47]",
  },
  demo: {
    icon: "▶",
    bg: "bg-[#8EB522]/22",
    text: "text-[#250D47]",
    hoverBg: "hover:bg-[#8EB522] hover:text-[#250D47]",
  },
  figma: {
    icon: "✦",
    bg: "bg-[#9AB1EB]/28",
    text: "text-[#250D47]",
    hoverBg: "hover:bg-[#9AB1EB] hover:text-[#250D47]",
  },
  custom: {
    icon: "→",
    bg: "bg-[#250D47]/8",
    text: "text-[#250D47]",
    hoverBg: "hover:bg-[#250D47] hover:text-[#F0F1E3]",
  },
};

export type ProjectOverview = {
  role?: string;
  timeline?: string;
  tools?: string[];
  summary: string;
  highlights?: string[];
  status?: "complete" | "in-progress";
};



