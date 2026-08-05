export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "devpost" | "demo" | "figma" | "custom";
};

export const LINK_CONFIG: Record<
  ProjectLink["kind"],
  { icon: string; bg: string; text: string; hoverBg: string }
> = {
  github: { icon: "⌥", bg: "bg-[#45140C]/8", text: "text-[#45140C]", hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]" },
  devpost: { icon: "◈", bg: "bg-[#45140C]/8", text: "text-[#45140C]", hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]" },
  demo: { icon: "▶", bg: "bg-[#B5AD21]/15", text: "text-[#45140C]", hoverBg: "hover:bg-[#B5AD21] hover:text-[#45140C]" },
  figma: { icon: "✦", bg: "bg-[#E5B1A4]/20", text: "text-[#45140C]", hoverBg: "hover:bg-[#E5B1A4] hover:text-[#45140C]" },
  custom: { icon: "→", bg: "bg-[#45140C]/8", text: "text-[#45140C]", hoverBg: "hover:bg-[#45140C] hover:text-[#F3EDE2]" },
};

export type ProjectOverview = {
  role?: string;
  timeline?: string;
  tools?: string[];
  summary: string;
  highlights?: string[];
  status?: "complete" | "in-progress";
};
