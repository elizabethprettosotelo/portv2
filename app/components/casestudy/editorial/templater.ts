import type { CaseStudy, Figure } from "./types";

// Images come from the
// "Templater LTI Redesign" Figma file; the two clips are Eli's screen recordings of the live picker.

const img = (file: string, alt: string, width: number, height: number, caption?: string): Figure => ({
  src: `/templater/${file}`,
  alt,
  caption,
  width,
  height,
});

/** Dense diagrams that are worth zooming into get the visible hover cue. */
const diagram = (file: string, alt: string, width: number, height: number, caption?: string): Figure => ({
  ...img(file, alt, width, height, caption),
  detail: true,
});

/** Every thumbnail is drawn in the same 550 by 700 frame. */
const thumb = (file: string, alt: string, caption?: string): Figure => img(`thumbs/${file}.png`, alt, 550, 700, caption);

/** Canvas screenshots, placed in the same 550 by 700 frame as the thumbnails so the two compare at the same size. */
const shot = (file: string, alt: string, caption?: string): Figure => img(`before/canvas-${file}-framed.png`, alt, 550, 700, caption);

const oldPicker = img(
  "before/original-picker.png",
  "The original Templater window over the Canvas page editor: Template Embedder, Select a template to insert into your page, and ten gold buttons with only a name on each",
  1320,
  1030,
);

export const templater: CaseStudy = {
  project: "Templater",
  title: "Letting professors see a page before it lands in their course",
  summary:
    "Redesigning the template picker inside UCF's Canvas courses, so professors can tell what they're importing before they import it.",
  meta: [
    { label: "Role", value: "UX designer and front-end developer" },
    { label: "Team", value: "Me, with UCF's lead instructional designer" },
    { label: "Tools", value: "Figma, HTML, CSS, JavaScript" },
  ],
  hero: img(
    "hero-thumbnails.png",
    "All 14 Templater thumbnails in the order they appear in the picker: two home pages, course overview, module page, module overview, module summary, content pages A and B, combined module content page, two course schedules, video containers, style elements, and the Yellowdig overview",
    2496,
    980,
  ),
  stats: [
    { value: "14", label: "templates, each with a hand-drawn thumbnail" },
    { value: "6", label: "sections instead of one row of buttons" },
    { value: "1.5", label: "months of design and build" },
    { value: "0", label: "frameworks: plain HTML, CSS, and JavaScript" },
  ],
  overview: [
    {
      label: "Context",
      text: "Templater lives inside Canvas, UCF's learning management system. Professors open it from the page editor to drop UCF-branded pages, like a course home page or a module overview, into their course.",
    },
    {
      label: "Problem",
      text: "Every template was a gold button with a name on it. The only way to see a template was to import it into your course.",
    },
    {
      label: "Objective",
      text: "How might we let professors see what a template looks like before it lands in their course?",
    },
    {
      label: "Outcome",
      text: "A picker grouped by what professors are building, with a hand-drawn thumbnail for every template. I designed and built it, and it's live in production.",
    },
  ],
  sections: [
    {
      id: "context",
      nav: "Context",
      eyebrow: "Context",
      title: "A head start that nobody could see",
      blocks: [
        {
          type: "text",
          text: "Professors build their course pages in Canvas's rich text editor. Templater is a small window inside that editor. It holds pages UCF's Center for Distributed Learning already designed to university guidelines: home pages, module pages, content pages, schedules, and guides.",
        },
        {
          type: "columns",
          items: [
            { title: "Who uses it", text: "Professors setting up a course, especially ones who don't know where to start." },
            { title: "Where it lives", text: "A window that opens on top of Canvas's page editor. Nothing outside the course." },
            { title: "When they find it", text: "Professors are often pointed to it during faculty orientation." },
            { title: "What they want", text: "Either real course content in a clean layout, or UCF's guidelines and syllabus info without rewriting them." },
          ],
        },
      ],
    },
    {
      id: "problem",
      nav: "Problem",
      eyebrow: "The problem",
      title: "Ten gold buttons, and no way to look first",
      blocks: [
        {
          type: "text",
          text: "UCF's lead instructional designer brought me the request. Professors kept telling her the same thing after orientation: they couldn't see what they were importing.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "The original picker. Each template is a button with a name and nothing else.",
          items: [oldPicker],
        },
        {
          type: "text",
          text: "So professors guessed. They picked a name, imported the template, and looked at it in the editor. If it wasn't what they wanted, they selected everything, deleted it by hand, and went back to the buttons to guess again.",
        },
        {
          type: "figures",
          layout: "wide",
          items: [
            diagram(
              "process/import-delete-loop.png",
              "The old loop in three steps: guess from a button name, import the template to see it, then select all and delete it, with an arrow back to the buttons labeled Repeat until something fits",
              2200,
              870,
            ),
          ],
        },
        { type: "quote", text: "The only way to preview a template was to put it in your course." },
        { type: "text", text: "The missing preview was the loudest problem, but the buttons had quieter ones too:" },
        {
          type: "cards",
          items: [
            {
              title: "Names that don't explain",
              text: "Course Schedule M and Course Schedule W were told apart by one letter. Module Page Template, Module Introduction, and Module Summary Template sat side by side with no hint of how they differed.",
            },
            {
              title: "One long row",
              text: "Course setup pages, module pages, and schedules were mixed together, so nothing told a professor which kind of page they were looking at.",
            },
            {
              title: "No easy undo",
              text: "A wrong pick didn't just cost a click. It left a full page of content in the editor that had to be cleared by hand.",
            },
          ],
        },
      ],
    },
    {
      id: "goals",
      eyebrow: "Goals",
      title: "Two kinds of success",
      blocks: [
        {
          type: "text",
          text: "Before sketching, I looked through every template and the tool itself. There wasn't much to the tool, so most of my time went into the templates: what was on each page, and what made one different from the next. Then I wrote down what success had to look like for both groups who depend on Templater.",
        },
        {
          type: "columns",
          items: [
            {
              title: "For professors",
              text: "See what a template is before importing it. No more import, look, delete, and try again.",
            },
            {
              title: "For the CDL team",
              text: "Something easy to keep up. Adding a template later shouldn't mean redesigning the picker or making special rules for it.",
            },
          ],
        },
      ],
    },
    {
      id: "principles",
      nav: "The fixes",
      eyebrow: "The fixes",
      title: "Four rules I designed by",
      blocks: [
        { type: "text", text: "Those two goals turned into four rules. Every decision below traces back to at least one." },
        {
          type: "cards",
          feature: true,
          items: [
            { title: "Show it before they pick it", text: "Every template gets a picture of the page it makes." },
            { title: "Group by the job", text: "Course setup, modules, content pages, and schedules each get their own section." },
            { title: "One card fits every template", text: "A new template never needs a new layout." },
            { title: "Fit the window", text: "Everything has to work inside Canvas's small Templater window." },
          ],
        },
      ],
    },
    {
      id: "lofi",
      level: 3,
      nav: "Lo-fis",
      eyebrow: "Exploring",
      title: "Sorting before styling",
      blocks: [
        {
          type: "text",
          text: "My first lo-fis did the sorting. I split the ten buttons into three groups: course setup templates, module templates, and course schedule templates. Each template became a card with a picture, a name, a one-line description, and a button to import it.",
        },
        {
          type: "text",
          text: "Two ideas didn't make it. The first gave every template a big preview. It looked great on its own and didn't fit in Templater's window at all. The second matched each card's shape to its template, with tall cards for module pages and wide ones for schedules. It was nice to look at, but someone on the team would have had to decide the shape of every new template before adding it.",
        },
        {
          type: "beforeAfter",
          title: "Lo-fi prototypes",
          labels: ["A shape per group", "One card"],
          before: [
            img(
              "process/lofi-mixed-cards.png",
              "Lo-fi with course setup templates in wide cards and module templates in tall cards, each card with a picture placeholder, name, description, and button",
              1200,
              1640,
            ),
          ],
          after: [
            img(
              "process/lofi-one-card.png",
              "Later lo-fi where module templates use the same card as the course setup templates: picture on the left, name, description, and button on the right",
              1250,
              1870,
            ),
          ],
          caption: "The module templates moved into the same card as everything else.",
        },
        {
          type: "text",
          text: "I placed the lo-fis inside a real Canvas page at two screen sizes, so I could check that the cards still read in the window professors actually see.",
        },
        {
          type: "figures",
          layout: "split",
          items: [
            img(
              "process/embed-large.png",
              "Lo-fi picker inside the Templater window on a Canvas New Page screen, on a larger screen",
              1910,
              1116,
              "Larger screen",
            ),
            img(
              "process/embed-small.png",
              "The same lo-fi picker inside the Templater window on a smaller screen",
              1890,
              1099,
              "Smaller screen",
            ),
          ],
        },
      ],
    },
    {
      id: "pushback",
      level: 3,
      nav: "Thumbnails",
      eyebrow: "Pushing back",
      title: "Why I didn't use screenshots",
      blocks: [
        {
          type: "text",
          text: "I shared the lo-fis with the lead instructional designer. She liked the groups, the clean cards, and the content on them. The picture boxes were still empty, and when I said I'd design thumbnails for them, she said that wasn't necessary: I could just screenshot each template in Canvas.",
        },
        {
          type: "text",
          text: "It was a fair, fast answer, so I tried it. Then I hit the problem with Canvas's editor. It's finicky, and the screenshots showed it.",
        },
        {
          type: "cards",
          items: [
            {
              title: "Broken pieces",
              text: "Some sections of a template's code don't import cleanly, so the screenshot shows an empty box or a layout that's cut off.",
            },
            {
              title: "Placeholder copy",
              text: "Some pages are mostly instructions to the professor, like a note to insert your headshot on the meet-your-instructor page.",
            },
            {
              title: "Too little to see",
              text: "Text-heavy pages turn into a gray blur at card size, and they look nothing like the page a professor would end up with.",
            },
          ],
        },
        {
          type: "beforeAfter",
          labels: ["Canvas screenshot", "Thumbnail"],
          before: [
            shot("home-2", "Screenshot of Home Page 2 in Canvas: the instructor photo is an empty box and the bottom half of the page is blank"),
            shot("course-expectations", "Screenshot of Course Expectations in Canvas: a full page of small text with a few highlighted placeholders"),
          ],
          after: [
            thumb("home-2", "Home Page 2 thumbnail: banner, instructor photo, course details, and the gold footer"),
            thumb("course-expectations", "Course Expectations thumbnail: section titles with numbered and bulleted gray bars"),
          ],
          caption: "Two of the screenshots I tested, next to the thumbnails I drew for the same templates.",
        },
        { type: "quote", text: "A screenshot showed what Canvas could render. A thumbnail showed what the page was for." },
        {
          type: "box",
          title: "Making both",
          text: [
            "Instead of arguing for thumbnails, I made two versions of the picker: one with screenshots of the real templates, and one with thumbnails I drew myself. I brought both back to her. Side by side, she agreed the thumbnails were cleaner and made it easier for professors to tell what each template would add before importing it.",
          ],
        },
      ],
    },
    {
      id: "rules",
      level: 3,
      eyebrow: "The thumbnails",
      title: "Fourteen small pictures, one set of rules",
      blocks: [
        {
          type: "text",
          text: "A thumbnail has to say what a page is for in the time it takes to scan a card. So each one keeps the parts that make a template recognizable and drops the rest.",
        },
        {
          type: "figures",
          layout: "wide",
          items: [
            diagram(
              "process/page-to-thumbnail.png",
              "The Course Overview page in Canvas next to its thumbnail, with four numbered callouts: titles stay as real words, a video block stays a video block, the gold callout keeps its icon, and body copy turns into gray bars",
              2060,
              900,
            ),
          ],
        },
        {
          type: "columns",
          items: [
            { title: "Same frame", text: "Every thumbnail is drawn at 550 by 700, so cards line up whatever template is inside them." },
            { title: "Real titles, no real copy", text: "Headings stay as words so a professor can read them. Body text becomes gray bars, so no one tries to read placeholder copy." },
            { title: "Keep the signature pieces", text: "Banners, gold callouts, video blocks, and tables sit where they sit on the real page. They're what tell two similar templates apart." },
            { title: "Two colors and a gray", text: "UCF gold and black carry the brand. Everything else is a light gray, so the signature pieces stand out." },
          ],
        },
        { type: "subhead", text: "Drawn from one kit" },
        {
          type: "text",
          text: "Callouts, icons, and video blocks repeat across templates, so I drew them once and reused them. Course Overview, Module Overview, and the Yellowdig overview all use the same callout with a different icon. Those shared pieces are templates of their own, too: professors can embed the video containers or the style elements by themselves.",
        },
        {
          type: "figures",
          layout: "pair",
          items: [
            thumb("style", "Style elements: gold callouts facing left and right, and the icon set in black on white and white on black", "Style elements"),
            thumb("video", "Video container elements: three video block layouts, one in UCF gold", "Video containers"),
          ],
        },
      ],
    },
    {
      id: "solution",
      level: 3,
      eyebrow: "The final picker",
      title: "See it, then pick it",
      blocks: [
        {
          type: "text",
          text: "In the final picker, every template is a card with its thumbnail, a name, a short description of what's on the page, and an Embed Template button. Course schedules and element templates use the same card as everything else.",
        },
        {
          type: "beforeAfter",
          before: [{ ...oldPicker, caption: "Names only" }],
          after: [
            img(
              "live-picker.png",
              "The live Templater window: the Templater heading, then Course Setup with cards for Home Page Option 1 and Home Page Option 2, each with a thumbnail, a description, and an Embed Template button",
              666,
              512,
              "See it before you pick it",
            ),
          ],
        },
        {
          type: "text",
          text: "The lo-fis had three groups. The final picker has six:",
        },
        { type: "chips", items: ["Course Setup", "Module Templates", "Content Pages", "Course Schedule", "Element Templates", "Other"] },
      ],
    },
    {
      id: "build",
      nav: "Build",
      eyebrow: "Building it",
      title: "Built for a window I don't control",
      blocks: [
        {
          type: "text",
          text: "I built the picker myself in plain HTML, CSS, and JavaScript. Templater runs as an embed inside Canvas's editor, so it had to stay light and couldn't lean on a framework or outside libraries.",
        },
        {
          type: "text",
          text: "Keeping it plain also served the second goal. The picker is the same card repeated, so adding a template is one more card and one more thumbnail, drawn with the same rules.",
        },
        // TODO(Eli): one line on accessibility if it applies, like alt text on thumbnails or keyboard access to the cards.
      ],
    },
    {
      id: "outcome",
      nav: "Outcome",
      eyebrow: "Outcome",
      title: "Live in Canvas",
      blocks: [
        {
          type: "text",
          text: "The redesign shipped to production in spring 2026, about a month and a half after I started. It's the same Templater professors are pointed to at orientation, now with a picture for every template.",
        },
        // TODO(Eli): any feedback since launch, from the lead instructional designer or professors, goes here.
        {
          type: "countHead",
          n: "01",
          title: "More visible",
          text: "Professors see every template before it touches their course, so a wrong pick no longer means clearing a page by hand.",
        },
        {
          type: "clip",
          wide: true,
          ratio: "1600 / 730",
          src: "/templater/motion/clickthrough.mp4",
          poster: "/templater/motion/clickthrough-poster.jpg",
          label: "Screen recording: on a new Canvas page, the professor opens Templater from the editor, scrolls through the template cards, embeds Home Page Option 1, and the finished home page fills the editor",
        },
        {
          type: "countHead",
          n: "02",
          title: "More organized",
          text: "Six sections, grouped by what a professor is building, instead of one row of look-alike buttons.",
        },
        {
          type: "clip",
          wide: true,
          ratio: "666 / 512",
          src: "/templater/motion/picker-scroll.mp4",
          poster: "/templater/motion/picker-scroll-poster.jpg",
          label: "Screen recording: scrolling the Templater window from Course Setup through Module Templates, Content Pages, Course Schedule, and Element Templates to Other",
        },
        {
          type: "countHead",
          n: "03",
          title: "Easier to maintain",
          text: "One card and one set of thumbnail rules cover every template, so the team can add more without redesigning anything.",
        },
      ],
    },
    {
      id: "reflections",
      eyebrow: "Reflections",
      title: "What I learned",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Make both, then compare",
              text: "Telling a stakeholder why screenshots wouldn't work would have been an opinion. Putting both pickers side by side made it an easy call.",
            },
            {
              title: "Maintenance is a user need too",
              text: "The card shapes I liked best would have made the team's job harder every time a template was added. The people who keep a tool running are users of the design.",
            },
            {
              title: "Design for the box you're in",
              text: "Templater's window set the limits for everything. Checking the lo-fis inside a real Canvas page kept the design inside the space professors actually have.",
            },
            {
              title: "Measure next time",
              text: "I don't have usage numbers from before or after launch. Next time, I'd track how often a template gets imported and then deleted, so I can show the loop actually closed.",
            },
          ],
        },
      ],
    },
  ],
  next: { label: "Read the UCFHere case study", href: "/projects/ucfhere/case-study" },
};
