import type { CaseStudy, Placeholder } from "./types";

// Draft. Asset IDs (T1, T2...) match the Templater asset list.
// Anything marked [confirm] is a guess or a gap: answer it in the Templater
// worksheet tab, then replace the text. Replace each slot(...) with a real image.

const slot = (asset: string, label: string, shape: Placeholder["shape"], caption?: string): Placeholder => ({
  asset,
  label,
  shape,
  caption,
});

export const templater: CaseStudy = {
  project: "Templater",
  title: "Showing professors what they're picking before they pick it",
  summary:
    "A Canvas template-import tool where every template button got a hand-made thumbnail, so instructors can see a page before they add it to their course.",
  meta: [
    { label: "Role", value: "UX designer and front-end developer" },
    { label: "Team", value: "[confirm] Who reviewed and deployed it" },
    { label: "Tools", value: "Figma, Next.js [confirm]" },
  ],
  hero: slot("T4", "All 13 template thumbnails in one grid", "wide"),
  stats: [
    { value: "13", label: "page templates designed" },
    { value: "13", label: "hand-made thumbnails" },
    { value: "1", label: "person on design and code" },
    { value: "Live", label: "in production since May 2026" },
  ],
  overview: [
    {
      label: "Context",
      text: "Templater lets instructors import ready-made page templates into their Canvas (Webcourses@UCF) courses. [confirm] Who maintains it, and where in Canvas it lives.",
    },
    {
      label: "Problem",
      text: "The template buttons were hard to tell apart, so instructors chose without knowing how a page would look or work.",
    },
    {
      label: "Objective",
      text: "How might we let instructors compare templates at a glance, before anything lands in their course?",
    },
    {
      label: "Outcome",
      text: "13 redesigned templates, each with its own thumbnail, designed and built by me and shipped to production.",
    },
  ],
  sections: [
    {
      id: "problem",
      nav: "Problem",
      eyebrow: "The problem",
      title: "Thirteen buttons, zero clues",
      blocks: [
        {
          type: "text",
          text: "Every template was a button with a name. [confirm] What did the old buttons actually say, and how did people end up picking the wrong one? One real example goes here: a professor importing a page, seeing it in their course, and deleting it to try again.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "The original template picker. [confirm]",
          items: [slot("T1", "The old template buttons, before thumbnails", "wide")],
        },
        {
          type: "text",
          text: "[confirm] How did you know this was a problem? Support requests, instructional designers, watching someone use it, or your own frustration.",
        },
      ],
    },
    {
      id: "approach",
      nav: "Approach",
      eyebrow: "The approach",
      title: "Let the page speak for itself",
      blocks: [
        {
          type: "text",
          text: "Instead of describing each template, I gave every button a small picture of the page it creates. Instructors can see the layout before they commit to it.",
        },
        {
          type: "text",
          text: "[confirm] Why thumbnails, and not longer descriptions, a live preview, or fewer templates? Name the option you came closest to choosing and why you didn't.",
        },
        { type: "subhead", text: "Rules for thirteen small pictures" },
        {
          type: "text",
          text: "[confirm] The rules you set so the thumbnails read as one family: how much detail each one shows, the grid, colors, and size. And how you made look-alike templates easy to tell apart.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "How a full page turns into a thumbnail. [confirm]",
          items: [slot("T3", "One template next to its thumbnail, with the simplification rules called out", "wide")],
        },
      ],
    },
    {
      id: "templates",
      nav: "Templates",
      eyebrow: "The templates",
      title: "Thirteen pages, one family",
      blocks: [
        {
          type: "text",
          text: "I designed all 13 page templates and their thumbnails. [confirm] What the templates are for, like a syllabus, module overview, or meet-your-instructor page.",
        },
        {
          type: "figures",
          layout: "wide",
          items: [slot("T4", "All 13 template thumbnails in one grid", "wide")],
        },
        {
          type: "beforeAfter",
          before: [slot("T1", "The old template buttons", "wide", "Names only.")],
          after: [slot("T2", "The new picker with thumbnails", "wide", "See it before you pick it.")],
        },
      ],
    },
    {
      id: "build",
      nav: "Build",
      eyebrow: "Building it",
      title: "Designing it, then shipping it",
      blocks: [
        {
          type: "text",
          text: "I built the templates and the picker myself. [confirm] The stack, what the code does, and how it got reviewed and deployed to production.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "Picking a template and adding it to a course. [confirm]",
          items: [slot("T5", "Short screen recording: choose a template, import it, see it in Canvas", "wide")],
        },
        {
          type: "text",
          text: "[confirm] Accessibility: does each thumbnail button have a text label or alt text, and does the picker work with a keyboard?",
        },
      ],
    },
    {
      id: "outcome",
      nav: "Outcome",
      eyebrow: "Outcome",
      title: "Live in courses",
      blocks: [
        {
          type: "text",
          text: "Templater shipped to production in May 2026. [confirm] Who can use it now, and any usage numbers or feedback since launch.",
        },
      ],
    },
    {
      id: "reflections",
      eyebrow: "Reflections",
      title: "What I learned",
      blocks: [
        {
          type: "list",
          items: [
            { lead: "[confirm] Lesson one.", text: "Something you'd tell another designer about making choices visible." },
            { lead: "[confirm] Lesson two.", text: "Something about designing and building the same feature." },
          ],
        },
      ],
    },
  ],
  next: { label: "Read the UCFHere case study", href: "/projects/ucfhere/case-study" },
};
