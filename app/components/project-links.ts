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
    bg: "bg-[#45140C]/8",
    text: "text-[#45140C]",
    hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]",
  },
  devpost: {
    icon: "◈",
    bg: "bg-[#B5AD21]/22",
    text: "text-[#1F1712]",
    hoverBg: "hover:bg-[#A8A41F] hover:text-[#1F1712]",
  },
  demo: {
    icon: "▶",
    bg: "bg-[#B5AD21]/22",
    text: "text-[#45140C]",
    hoverBg: "hover:bg-[#A8A41F] hover:text-[#45140C]",
  },
  figma: {
    icon: "✦",
    bg: "bg-[#E5B1A4]/28",
    text: "text-[#45140C]",
    hoverBg: "hover:bg-[#D79E90] hover:text-[#45140C]",
  },
  custom: {
    icon: "→",
    bg: "bg-[#45140C]/8",
    text: "text-[#45140C]",
    hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]",
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
