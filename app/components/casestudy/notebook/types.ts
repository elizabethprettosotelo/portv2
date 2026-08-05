export type CaseStudyLink = {
  label: string;
  href: string;
};

export type CaseStudyMetaItem = {
  label: string;
  value: string;
};

export type MediaAsset = {
  src?: string;
  alt?: string;
  caption?: string;
  placeholder?: string;
};

export type AnnotatedCallout = {
  step: string;
  x: number;
  y: number;
  label: string;
};

export type FlowStep = {
  label: string;
  detail?: string;
  friction?: string;
  highlight?: boolean;
};

export type GoalItem = {
  label: string;
  description: string;
};

export type ProblemIssue = {
  title: string;
  description: string;
  screenshot?: MediaAsset;
};

export type DesignChapter = {
  id: string;
  number: string;
  title: string;
  challenge: string;
  decision: string;
  reasoning: string;
  visual?: MediaAsset;
  note?: string;
};

export type CaseStudySectionBase = {
  id: string;
  label: string;
};

export type IntroSection = CaseStudySectionBase & {
  kind: "intro";
  description: string;
  valueStatement: string;
};

export type ContextSection = CaseStudySectionBase & {
  kind: "context";
  paragraphs: string[];
  emphasis: string;
  diagram?: MediaAsset;
};

export type ProblemSection = CaseStudySectionBase & {
  kind: "problem";
  statement: string;
  consequences: string[];
  issues?: ProblemIssue[];
  evidence?: string;
  visual?: MediaAsset;
};

export type GoalsSection = CaseStudySectionBase & {
  kind: "goals";
  mainGoal: string;
  supportingGoals: GoalItem[];
};

export type FlowSection = CaseStudySectionBase & {
  kind: "flow";
  intro: string;
  steps: FlowStep[];
  note?: string;
};

export type ChaptersSection = CaseStudySectionBase & {
  kind: "chapters";
  intro: string;
  chapters: DesignChapter[];
  iterations?: {
    title: string;
    caption: string;
  }[];
  decision?: {
    title: string;
    problem: string;
    decision: string;
    reasoning: string;
    note?: string;
    visual?: MediaAsset;
  };
};

export type FinalSection = CaseStudySectionBase & {
  kind: "final";
  summary: string;
  highlights: string[];
  visuals: MediaAsset[];
  links?: CaseStudyLink[];
};

export type AccessibilitySection = CaseStudySectionBase & {
  kind: "accessibility";
  intro: string;
  items: string[];
};

export type OutcomesSection = CaseStudySectionBase & {
  kind: "outcomes";
  summary: string;
  reflection: string;
  nextSteps: string[];
  links?: CaseStudyLink[];
};

export type CaseStudySection =
  | IntroSection
  | ContextSection
  | ProblemSection
  | GoalsSection
  | FlowSection
  | ChaptersSection
  | FinalSection
  | AccessibilitySection
  | OutcomesSection;

export type CaseStudyDocumentData = {
  title: string;
  description: string;
  valueStatement: string;
  meta: CaseStudyMetaItem[];
  categories?: string[];
  heroMedia?: MediaAsset;
  sections: CaseStudySection[];
  returnHref: string;
  returnLabel: string;
};
