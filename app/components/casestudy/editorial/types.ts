// Content model for case studies.
// Every case study follows the same shape so they read as a set:
// hero -> stats -> summary -> story sections -> reflections.
//
// Visual slots can be a real image (Figure) or a placeholder (Slot) that
// shows the asset ID and what goes there. Swap placeholders for real images
// as you make them, and turn SHOW_PLACEHOLDERS off before shipping.

export type Figure = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Dense diagrams get a visible hover cue (lift and expand arrow). Everything else still opens on click, quietly. */
  detail?: boolean;
};

export type Placeholder = {
  /** Asset ID from the asset list, like "A8". */
  asset: string;
  label: string;
  shape: "phone" | "wide" | "square";
  caption?: string;
};

export type Slot = Figure | Placeholder;

export type ListItem = string | { lead: string; text: string };

export type PathStep =
  | { slot: Slot; label: string; broken?: boolean }
  /** One frame split on the diagonal: the top-left half is the outcome when the student recovers, the bottom-right when they don't. */
  | { split: { recovered: Figure; recoveredLabel: string; failed: Figure; failedLabel: string }; label: string };

export type PathTone = "neutral" | "negative" | "positive" | "worst";

export type SheetLevel = {
  name: string;
  kind: "nudge" | "half" | "full";
  /** Level color and its light tint, matching the error flowchart. */
  color: string;
  tint: string;
  /** A real screen for this level. When set, it replaces the coded mock. */
  image?: { src: string; alt: string; width: number; height: number };
  mock: { title: string; body?: string; meta?: string; steps?: string[]; primary?: string; secondary?: string; footnote?: string };
  /** Short count shown as a badge, like "5 errors". */
  count: string;
  /** Which of the error categories this level handles. */
  usedBy: string[];
  /** Keep the same labels, in the same order, on every level so the rows line up. */
  rows: { label: string; text: string }[];
};

export type Card = {
  title: string;
  text: string;
  /** Optional color coding: a top bar and a tag pinned to the bottom. */
  accent?: string;
  tint?: string;
  tag?: string;
};

export type Block =
  | { type: "text"; text: string }
  | { type: "subhead"; text: string }
  | { type: "list"; items: ListItem[]; ordered?: boolean }
  | { type: "quote"; text: string }
  /** A short aside in a tinted box: a title and one or more paragraphs. */
  | { type: "box"; title: string; text: string[] }
  /** A numbered outcome heading, like "01 More organized", with a line of text under it. */
  | { type: "countHead"; n: string; title: string; text: string }
  /** A looping screen recording in a phone frame, optionally next to a short note. */
  /** ratio (like "1600 / 730") keeps a wide recording at its own shape instead of 16:9. */
  | { type: "clip"; src: string; poster: string; label: string; caption?: string; wide?: boolean; ratio?: string }
  /** Short clips side by side, each with a title and a line of text. A Slot stands in until the recording exists. */
  | { type: "clips"; items: { title: string; text: string; clip?: { src: string; poster: string; label: string }; slot?: Slot }[] }
  | { type: "figures"; items: Slot[]; layout: "phones" | "wide" | "illustrations" | "pair" | "split" | "stackPhone"; caption?: string }
  /** labels replaces the default "Before" and "After" pills, for comparisons that aren't old versus new. */
  | { type: "beforeAfter"; title?: string; before: Slot[]; after: Slot[]; caption?: string; labels?: [string, string] }
  | {
      type: "paths";
      rows: { title: string; verdict: string; tone: PathTone; note: string; steps: PathStep[]; wide?: boolean }[];
    }
  | { type: "sequence"; steps: { title: string; text: string; slot: Slot }[] }
  /** feature: dark, high-contrast cards for the core principles. */
  | { type: "cards"; items: Card[]; numbered?: boolean; feature?: boolean }
  | { type: "compare"; title?: string; caption?: string; options: { title: string; verdict: "no" | "yes"; text: string; slot: Slot }[] }
  | { type: "chips"; items: string[] }
  /** Short sub-points that read better side by side than stacked. */
  | { type: "columns"; items: { title: string; text: string }[] }
  | {
      type: "errorTypes";
      items: { title: string; count?: number; errors: string[] }[];
    }
  | { type: "video"; youtubeId: string; title: string; start?: number; caption?: string }
  | { type: "sheetSpec"; levels: SheetLevel[]; rules?: { title: string; text: string }[] }
  | { type: "legend"; items: { status: "present" | "tardy" | "absent" | "excused"; label: string; text: string }[] };

export type Section = {
  id: string;
  /** Short label above the headline, also used in the side nav. */
  eyebrow: string;
  /** The headline states the point of the section. */
  title: string;
  /** Short label for the side nav. Only sections with one appear there, so related sections group under one entry. */
  nav?: string;
  /** 3 makes this a subsection of the nearest level-2 section above it: an h3 heading, indented in the side nav. */
  level?: 2 | 3;
  blocks: Block[];
};

export type CaseStudy = {
  project: string;
  title: string;
  summary: string;
  meta: { label: string; value: string }[];
  hero?: Slot;
  stats?: { value: string; label: string }[];
  overview: { label: string; text: string }[];
  sections: Section[];
  next?: { label: string; href: string };
};
