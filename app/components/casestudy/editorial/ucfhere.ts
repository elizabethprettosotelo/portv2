import type { CaseStudy, Figure, Placeholder } from "./types";

// Asset IDs (A1, A2...) match the asset list in the "UCFHere draft" tab of
// Case Study Worksheets. Replace each slot(...) with a real image as you make it.

const phone = (file: string, alt: string, caption?: string): Figure => ({
  src: `/ucfhere/screenshots/${file}`,
  alt,
  caption,
  width: 586,
  height: 1268,
});

const illustration = (file: string, alt: string, caption: string): Figure => ({
  src: `/ucfhere/context/${file}`,
  alt,
  caption,
  width: 1080,
  height: 1350,
});

const slot = (asset: string, label: string, shape: Placeholder["shape"], caption?: string): Placeholder => ({
  asset,
  label,
  shape,
  caption,
});

const art = (file: string, alt: string, width: number, height: number, caption?: string): Figure => ({
  src: `/ucfhere/process/${file}`,
  alt,
  caption,
  width,
  height,
});

/** Dense diagrams that are worth zooming into get the visible hover cue. */
const diagram = (file: string, alt: string, width: number, height: number, caption?: string): Figure => ({
  ...art(file, alt, width, height, caption),
  detail: true,
});

/** Final high-fidelity screens exported from Figma at 3x, cropped to one phone screen. */
const screen = (file: string, alt: string, caption?: string): Figure => ({
  src: `/ucfhere/final/${file}`,
  alt,
  caption,
  width: 1206,
  height: 2622,
});

const oldCourseDetail = phone("ucfhere-course-detail.png", "Old UCFHere course detail: every class date in alternating yellow and white rows, with present or absent on the right");

const oldCourseList = phone("ucfherehappypath3.png", "Old UCFHere course list showing every course");

export const ucfhere: CaseStudy = {
  project: "UCFHere",
  title: "Making sure showing up always counts",
  summary:
    "Redesigning UCF's attendance app so students know when their attendance counted, and how to recover when it doesn't.",
  meta: [
    { label: "Role", value: "UX Designer (sole designer)" },
    { label: "Team", value: "1 designer, 1 engineer" },
    { label: "Tools", value: "Figma, Figma Make, Claude Design" },
  ],
  hero: {
    src: "/ucfhere/final/overview.png",
    alt: "The redesigned UCFHere screens side by side: scanner, camera error sheet, confirmation, dashboard, course list, and a course's week view",
    width: 4138,
    height: 1551,
  },
  stats: [
    { value: "15K", label: "students checking in" },
    { value: "26", label: "error states mapped" },
    { value: "3", label: "levels of help, one pattern" },
    { value: "25", label: "people in prototype walkthroughs" },
  ],
  overview: [
    {
      label: "Context",
      text: "UCFHere is UCF's attendance app. About 15,000 students use it to check in to class by scanning three QR codes in a row.",
    },
    {
      label: "Problem",
      text: "When a scan failed, students couldn't tell why. Every error looked the same, and some looked like nothing at all.",
    },
    {
      label: "Objective",
      text: "How might we help students recover from a failed scan on their own, before the attendance window closes?",
    },
    {
      label: "Outcome",
      text: "One error pattern covering 26 failure states, a new dashboard, and a reorganized attendance history. Validated in walkthroughs with 25 people and handed off to development.",
    },
  ],
  sections: [
    {
      id: "context",
      nav: "Context",
      eyebrow: "Context",
      title: "Showing up shouldn't be the hard part",
      blocks: [
        {
          type: "text",
          text: "Professors use UCFHere instead of sign-in sheets. At some point during class, a set of QR codes appears on screen, and students scan three in a row to check in. Some professors use it every class. Others only use it on exam days, to match who was in the room against who turned in an exam.",
        },
        {
          type: "figures",
          layout: "illustrations",
          items: [
            illustration("context-3.png", "Illustration of QR codes displayed on a classroom screen", "Codes go up in class"),
            illustration("context-2.png", "Illustration of a student holding up a phone to scan", "Students scan three in a row"),
            illustration("context-1.png", "Illustration of a phone showing a green check mark", "Attendance is recorded"),
          ],
        },
        {
          type: "text",
          text: "The interaction is short, but the stakes aren't. If the scan fails and the professor doesn't offer a backup, the student is marked absent, even though they were sitting in class.",
        },
      ],
    },
    {
      id: "problem",
      nav: "Problem",
      eyebrow: "The problem",
      title: "Every error looked the same, and some looked like nothing at all",
      blocks: [
        {
          type: "text",
          text: "The lead engineer who maintains UCFHere brought me a specific problem: the app had almost no error handling. I started by walking through what students actually saw, when it worked and when it didn't.",
        },
        {
          type: "paths",
          rows: [
            {
              title: "The happy path",
              verdict: "Neutral",
              tone: "neutral",
              note: "Attendance is recorded, but the confirmation flashes by. Students land in a cluttered list, unsure it counted.",
              steps: [
                { slot: phone("ucfherehappypath1.png", "Old UCFHere scanner reading a QR code"), label: "Scan" },
                { slot: phone("ucfherehappypath2-redacted.png", "Old UCFHere brief success screen"), label: "Brief success" },
                { slot: oldCourseList, label: "Every course, ever" },
              ],
            },
            {
              title: "The unhappy path",
              verdict: "Negative",
              tone: "negative",
              note: "The error doesn't say why or what to do. Some students guess right on a second try. The rest give up, and attendance is never recorded.",
              steps: [
                { slot: phone("ucfherehappypath1.png", "Old UCFHere scanner reading a QR code"), label: "Scan" },
                {
                  slot: phone("ucfheresadpath2-redacted.png", "Old UCFHere error screen saying the student is enrolled in the course but not this section, with only an OK button"),
                  label: "Error",
                },
                {
                  label: "Try again",
                  split: {
                    recovered: phone("ucfherehappypath2-redacted.png", "the brief success screen"),
                    recoveredLabel: "Figures it out",
                    failed: oldCourseList,
                    failedLabel: "Gives up",
                  },
                },
              ],
            },
            {
              title: "The worst path",
              verdict: "Worst",
              tone: "worst",
              note: "The camera is blocked, so the scanner stays black. There's no error and nothing to try. The student can't tell what's wrong, can't fix it, and leaves marked absent.",
              steps: [
                { slot: phone("ucfheresadpath.png", "Old UCFHere scanner showing a black camera preview"), label: "Black screen" },
                { slot: phone("ucfheresadpath.png", "The same black scanner after trying again"), label: "Still black" },
                { slot: oldCourseList, label: "Never recorded", broken: true },
              ],
            },
          ],
        },
        {
          type: "box",
          title: "The black screen",
          text: [
            "Students assumed the app was broken. But behind the scenes, UCFHere could already detect the browser, the operating system, and whether camera access was on. None of that ever reached the screen.",
          ],
        },
        { type: "quote", text: "UCFHere already knew what was wrong. It just had no way to tell the student." },
        {
          type: "text",
          text: "The black screen was the loudest problem, but the same walkthrough turned up quieter ones too:",
        },
        {
          type: "cards",
          items: [
            {
              title: "“Error”",
              text: "When something else failed, like scanning a code for the wrong section, students got a generic error and an OK button.",
            },
            {
              title: "“Did it count?”",
              text: "Even when it worked, the success screen flashed by. Many students scanned again, and only felt sure when a second screen said they'd already checked in.",
            },
            {
              title: "Two long lists, no summary",
              text: "History showed every class a student had ever taken, then every date as its own row, with no summary at either level.",
            },
            {
              title: "Color alone",
              text: "Present, tardy, and absent were told apart only by color.",
            },
          ],
        },
        { type: "subhead", text: "Every course, then every date" },
        {
          type: "figures",
          layout: "phones",
          items: [
            phone("ucfherehappypath2-redacted.png", "Old UCFHere brief success screen", "The brief success"),
            { ...oldCourseList, caption: "List one: every course" },
            { ...oldCourseDetail, caption: "List two: every date" },
          ],
        },
        {
          type: "text",
          text: "Students open their attendance to answer one question: did today count, and am I okay in this class? The old screens never answered it. The first list included classes that never used UCFHere and semesters long past. Tapping a course opened every class date in alternating yellow and white rows. To know where they stood, students had to scroll and count.",
        },
        { type: "quote", text: "All of the data was there. None of it was organized around what students needed to know." },
      ],
    },
    {
      id: "research",
      nav: "Research",
      eyebrow: "Research",
      title: "Finding the pattern in the support tickets",
      blocks: [
        {
          type: "text",
          text: "I started with the support tickets. Most students reported the same thing: they tried to scan and UCFHere was broken. A large share of those tickets had the same fix, which was turning on camera access in the browser or phone settings. The rest split into two much smaller groups: vague errors, where something real went wrong but the message never said what, and actual errors, like a dropped connection.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "Ticket wording is paraphrased.",
          items: [
            diagram("A6-ticket-types.svg", "A typical ticket saying UCFHere is broken splits into three real causes: a blocked camera, which made up a large share, and two much smaller groups, vague errors that never explained what went wrong and actual errors like a dropped connection", 1584, 626),
          ],
        },
        {
          type: "text",
          text: "I also talked with coworkers who are UCF students and use the app every week. They described the same black screen, the same re-scanning, and the same worry about losing attendance points. Some of them had.",
        },
        { type: "subhead", text: "Checking in when the scan fails" },
        {
          type: "text",
          text: "I turned what I heard into a current-state journey map: one student's path through a blocked camera, before the redesign. The stress builds after the scan, at the black screen, and never comes back down.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "Thoughts are paraphrased.",
          items: [
            diagram("A18-journey-map.svg", "Journey map of a student checking in when the scan fails, from arriving in class to filing a ticket, with an emotion curve that drops at the black screen", 1664, 725),
          ],
        },
        {
          type: "text",
          text: "Then I ran a heuristic evaluation of the existing screens against Nielsen's usability heuristics, and found nine issues across five screens. The most severe sat exactly where the tickets pointed: the scanner and the error screen.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "Student names are blurred.",
          items: [
            diagram("A19-heuristic-evaluation.svg", "Heuristic evaluation of five old UCFHere screens with numbered markers, and a table listing each issue, the heuristic it breaks, and its severity on a 1 to 5 scale: one 5/5 usability disaster, two 4/5 major, five 3/5 minor, and one 2/5 cosmetic", 1320, 1318),
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
        { type: "text", text: "The research pointed to the same few gaps every time, so I turned them into rules. Every decision below traces back to at least one." },
        {
          type: "cards",
          feature: true,
          items: [
            { title: "Say what the app already knows", text: "If UCFHere can detect the problem, the student sees it in plain words." },
            { title: "Keep the fix next to the problem", text: "Recovery happens on the scanner, not on a separate page." },
            { title: "No dead ends", text: "Every state, error or success, has a clear next step." },
            { title: "Make success obvious", text: "No one should have to scan twice to feel sure." },
          ],
        },
      ],
    },
    {
      id: "mapping",
      level: 3,
      nav: "Errors",
      eyebrow: "Mapping the problem",
      title: "Mapping every way a check-in can fail",
      blocks: [
        {
          type: "text",
          text: "Before designing any screens, I listed every way a check-in could go wrong. I ended up with 26 error states in six categories, each with its own kind of trouble:",
        },
        {
          type: "errorTypes",
          items: [
            {
              title: "Camera and permissions",
              errors: ["The camera is blocked, missing, or busy, so the scanner can't see anything."],
            },
            {
              title: "QR detection",
              errors: ["The camera works, but the code isn't framed well enough to read."],
            },
            {
              title: "Interrupted sequence",
              errors: ["The scan stops before every code is captured."],
            },
            {
              title: "QR validity",
              errors: ["A code gets read, but it's not the right one for this class."],
            },
            {
              title: "Check-in",
              errors: ["The scan works, but the student can't be checked in."],
            },
            {
              title: "Network and system",
              errors: ["The connection or the server drops out before attendance is saved."],
            },
          ],
        },
        {
          type: "text",
          text: "For each one, I wrote down what the student sees, what they can do about it, and where they go if that doesn't work. I also settled a few rules along the way. Try again always restarts the whole scan, because the codes regenerate constantly and partial scans can't be saved. And not every error needs troubleshooting. Only camera errors do.",
        },
        { type: "subhead", text: "Twenty-six ways to say “uh oh”" },
        {
          type: "text",
          text: "Here's the whole map. Start at the top, where a student opens the app, and follow any “no” to see where it leads. Every branch ends at the screen that catches it, and almost all of them loop right back to Try again. Click it to zoom in.",
        },
        {
          type: "figures",
          layout: "wide",
          items: [
            diagram("A7-error-flowchart.svg", "Flowchart of all 26 UCFHere scan error states, grouped into six categories, each leading to a nudge, half sheet, or full sheet", 1806, 1883),
          ],
        },
      ],
    },
    {
      id: "why-a-sheet",
      level: 3,
      eyebrow: "Why a sheet",
      title: "Keeping the fix where the problem is",
      blocks: [
        {
          type: "text",
          text: "With every failure mapped, the first decision was where an error should show up at all. I considered a popup and a separate error page. Both would have worked, but both pull students away from the scanner at the exact moment they're trying to finish.",
        },
        {
          type: "compare",
          title: "Lo-fi prototypes",
          caption: "The three options, redrawn as lo-fis for this case study.",
          options: [
            {
              title: "Popup",
              verdict: "no",
              text: "Has to be dismissed before you can continue. One more tap when you're in a hurry.",
              slot: art("A10-popup.png", "Lo-fi popup over a dimmed scanner", 1206, 2622),
            },
            {
              title: "Separate page",
              verdict: "no",
              text: "Takes students off the scanner, so they lose track of where the error happened.",
              slot: art("A10-separate-page.png", "Lo-fi separate error page that replaces the scanner", 1206, 2622),
            },
            {
              title: "Bottom sheet",
              verdict: "yes",
              text: "Rises from the scanner. Keeps context, and puts the fix right next to the problem.",
              slot: art("A10-bottom-sheet.png", "Lo-fi bottom sheet rising over the paused scanner", 1206, 2622),
            },
          ],
        },
        { type: "text", text: "Popups aren't always wrong. A sheet just fit a fast, repeated, camera-based task better, and it left room for a next step after success too: Continue to Dashboard or Scan another QR code." },
      ],
    },
    {
      id: "iteration",
      level: 3,
      eyebrow: "Iteration",
      title: "Cutting the wall of text",
      blocks: [
        {
          type: "text",
          text: "My first sheet put every troubleshooting step in one place. It covered everything, and that was the problem. It was a wall of text, and most students only needed one line to fix their issue.",
        },
        {
          type: "beforeAfter",
          title: "Lo-fi prototypes",
          before: [
            art("A11-first-version.png", "First version of the camera error: a tall sheet with detected device, three numbered troubleshooting steps, a camera toggle illustration, and Try again", 804, 1748),
          ],
          after: [
            art("A11-final-half-sheet.png", "Final half sheet for the camera error: one sentence on what happened, a Try again button, and a Troubleshoot link, with the scanner still visible above", 804, 1748),
          ],
        },
        {
          type: "text",
          text: "So I split it in two. A short sheet gives enough context for students who can fix it themselves: one sentence, Try again, and Troubleshoot. The detailed steps moved to a second, optional sheet for students who need more help. That split turned out to work for every error, not just the camera.",
        },
        // TODO(Eli): add the A/B test back here with its result, e.g. "I A/B tested both versions, and ..."
      ],
    },
    {
      id: "solution",
      level: 3,
      eyebrow: "The solution",
      title: "One pattern for 26 errors",
      blocks: [
        {
          type: "text",
          text: "Going back to the map, the 26 errors had very different causes, but from the student's side, every one fell into one of three situations:",
        },
        {
          type: "cards",
          items: [
            {
              title: "The scan is still possible",
              text: "The code is out of frame, too far away, or blurry. The student only needs a hint while the camera keeps going.",
              accent: "#1C7C76",
              tint: "#E1F1EF",
              tag: "Needs a hint",
            },
            {
              title: "Something blocks the scan",
              text: "A camera permission, the wrong code, or a dropped connection. The student needs to know what happened and how to try again.",
              accent: "#C4512C",
              tint: "#F8E6DE",
              tag: "Needs a fix",
            },
            {
              title: "The check-in can't happen",
              text: "The student is already checked in, or isn't on the roster. There's nothing to retry, so they need a clear way out.",
              accent: "#5B45A8",
              tint: "#E9E4F6",
              tag: "Needs a way out",
            },
          ],
        },
        {
          type: "text",
          text: "That meant I didn't need 26 screens. I needed one interaction flow every error could follow, with a path back to the scanner from every step.",
        },
        { type: "subhead", text: "The interaction flow" },
        {
          type: "figures",
          layout: "wide",
          items: [
            diagram("A9-interaction-flow.svg", "Interaction flow: scan result branches into attendance issues, framing issues, and blocking errors, with Try again returning to the scanner at every step", 1871, 727),
          ],
        },
        {
          type: "text",
          text: "Try again is always the main action, and it returns to the scanner from every step. Everything deeper is optional. That flow became three levels of the same sheet, and each level only appears when the one before it isn't enough.",
        },
        {
          type: "sheetSpec",
          levels: [
            {
              name: "Nudge",
              kind: "nudge",
              color: "#1C7C76",
              tint: "#E1F1EF",
              image: { src: "/ucfhere/final/sheet-nudge.png", alt: "Nudge: the scanner keeps running, with Move closer to the QR code under the greeting", width: 804, height: 1748 },
              mock: { title: "Move closer to the code" },
              count: "5 errors",
              usedBy: ["QR detection"],
              rows: [
                { label: "Shows when", text: "The camera can't read a code yet." },
                { label: "The scanner", text: "Keeps running. Nothing to dismiss." },
                { label: "What it says", text: "One short hint, with no buttons." },
                { label: "What's next", text: "No read after 15 seconds opens a half sheet." },
              ],
            },
            {
              name: "Half sheet",
              kind: "half",
              color: "#C4512C",
              tint: "#F8E6DE",
              image: { src: "/ucfhere/final/sheet-half-camera.png", alt: "Half sheet over the paused scanner: Camera access needed, with Try again, Troubleshoot, and a support link", width: 804, height: 1748 },
              mock: {
                title: "Camera access is blocked",
                body: "Your browser is blocking the camera, so UCFHere can't scan. Allow camera access for this site, then try again.",
                primary: "Try again",
                secondary: "Troubleshoot",
                footnote: "Still stuck? Visit UCFHere Support",
              },
              count: "18 errors",
              usedBy: ["Camera and permissions", "Interrupted sequence", "QR validity", "Network and system", "QR detection, after 15 seconds"],
              rows: [
                { label: "Shows when", text: "An error blocks the scan." },
                { label: "The scanner", text: "Pauses, but stays visible behind the sheet." },
                { label: "What it says", text: "What happened, in one sentence." },
                { label: "What's next", text: "Try again, or Troubleshoot for camera errors." },
              ],
            },
            {
              name: "Full sheet",
              kind: "full",
              color: "#5B45A8",
              tint: "#E9E4F6",
              image: { src: "/ucfhere/final/sheet-full-not-enrolled.png", alt: "Full sheet: You're not on this roster, with the course the code is for, what you can do, and Back to dashboard", width: 804, height: 1748 },
              mock: {
                meta: "Detected: iPhone · Safari",
                title: "Fix: camera access is blocked",
                steps: ["Tap the aA icon in the address bar.", "Tap Website Settings.", "Set Camera to Allow.", "Come back and tap Try again."],
                primary: "Try again",
                footnote: "Not iPhone with Safari? Self-diagnose",
              },
              count: "3 errors",
              usedBy: ["Check-in", "Troubleshoot, from camera errors"],
              rows: [
                { label: "Shows when", text: "The student taps Troubleshoot, or can't check in." },
                { label: "The scanner", text: "Covered by the sheet." },
                { label: "What it says", text: "Steps for their phone and browser, or a scanning guide." },
                { label: "What's next", text: "Try again, Self-diagnose, or Back to dashboard." },
              ],
            },
          ],
        },
        {
          type: "text",
          text: "In the final designs, every sheet shares one layout: a status icon, a plain-language title, one sentence on what happened, and the next step as the main button. Full sheets add the details a student needs to sort it out, like which course or section a code belongs to. The final set is one nudge, three half sheets, and three full sheets.",
        },
        {
          type: "figures",
          layout: "wide",
          items: [
            diagram("A21-sheet-set.svg", "Seven final screens: a framing nudge over the live scanner; half sheets for camera access, an interrupted scan, and no connection; full sheets for already checked in, not on the roster, and wrong section", 1682, 581),
          ],
        },
      ],
    },
    {
      id: "dashboard",
      level: 3,
      nav: "Dashboard",
      eyebrow: "The dashboard",
      title: "Giving the app a home",
      blocks: [
        {
          type: "text",
          text: "UCFHere never had a home screen. After a scan, students landed straight in the course list. Nothing in the app had a clear place, and students had no sense of where they were or what to do next.",
        },
        {
          type: "beforeAfter",
          before: [diagram("A20-ia-before.svg", "Old sitemap: three tabs, a scanner with a dead-end error, and a history of every course and every date", 1106, 1009, "Every screen hangs off a list.")],
          after: [diagram("A20-ia-after.svg", "New sitemap: the dashboard at the center, linking to scanning, the confirmation banner, recent attendance, and settings", 1106, 1009, "The dashboard is the center.")],
        },
        {
          type: "text",
          text: "I added a dashboard that brings the main tasks together: scanning, a confirmation of the latest check-in, recent attendance, and a way into each course. Scanning, the most common action, comes first.",
        },
        { type: "subhead", text: "Answering “did it count?” before they ask" },
        {
          type: "text",
          text: "After a successful scan, the confirmation sheet takes over the screen. Then, back on the dashboard, a banner confirms which class they were marked present for. That second confirmation is what replaces the old habit of scanning again just to check.",
        },
        {
          type: "beforeAfter",
          before: [
            phone("ucfherehappypath2-redacted.png", "Old UCFHere success screen that flashes by after a scan", "Flashes by"),
            { ...oldCourseList, caption: "Then every course, ever" },
          ],
          after: [
            screen("confirmation.png", "Confirmation screen: You've been marked Present, with the time, course, section, and a confirmation number", "The scan succeeds"),
            screen("dashboard.png", "Dashboard with a banner confirming the student was just marked present, above the Scan QR Code card and recent attendance", "The dashboard confirms it"),
          ],
        },
        {
          type: "text",
          text: "The tradeoff is one extra screen between opening the app and the course list. Since checking in is the main reason students open the app, I decided that was worth it.",
        },
      ],
    },
    {
      id: "history",
      level: 3,
      nav: "History",
      eyebrow: "Attendance history",
      title: "From every class you've ever taken to this semester at a glance",
      blocks: [
        {
          type: "text",
          text: "The old history showed everything at once, at the same level of detail. I reworked both lists from overview to detail, one at a time.",
        },
        { type: "subhead", text: "The course list" },
        {
          type: "text",
          text: "The course list now shows only this semester, each course with a small bar summarizing attendance. Past semesters are still there, one dropdown away.",
        },
        {
          type: "beforeAfter",
          before: [{ ...oldCourseList, caption: "Every course, ever" }],
          after: [
            screen("course-list.png", "New course list showing this semester's courses, each with an attendance bar and present and tardy counts", "This semester"),
            screen("course-list-dropdown.png", "Course list with the semester dropdown open, listing past semesters", "Pick a semester"),
            screen("course-list-spring-2026.png", "Course list after picking Spring 2026, showing that semester's two courses with their attendance bars", "Spring 2026"),
          ],
        },
        { type: "subhead", text: "The course page" },
        {
          type: "text",
          text: "Tapping a course used to open every class date as one long list. Now each course page has three views: All for totals at a glance, Week to find a specific day, and Month to spot patterns.",
        },
        {
          type: "beforeAfter",
          before: [{ ...oldCourseDetail, caption: "Every date, one row each" }],
          after: [
            screen("course-all.png", "Course page in All view: totals for present, tardies, absences, and excused, then every class date", "All"),
            screen("course-week.png", "Course page in Week view: one week with a status icon under each day", "Week"),
            screen("course-month.png", "Course page in Month view: a calendar with a colored dot under each class day", "Month"),
          ],
        },
      ],
    },
    {
      id: "accessibility",
      level: 3,
      nav: "Accessibility",
      eyebrow: "Accessibility",
      title: "Designing for more than recall",
      blocks: [
        {
          type: "text",
          text: "The heuristic evaluation turned up a few places where students had to remember what something meant instead of seeing it: three unlabeled status dots on the error screen, and yellow history rows that didn't mean anything. I didn't want the redesign to repeat that anywhere.",
        },
        {
          type: "text",
          text: "So every status says what it is in three ways: a word, an icon, and a pattern on the attendance bar, with solid for present, stripes for tardy, and halftone dots for absent. That also keeps status readable without color. The legend sits right under the bar and only lists the statuses a student actually has.",
        },
        {
          type: "figures",
          layout: "stackPhone",
          items: [
            diagram("A15-status-color.png", "Attendance bar: 17 present in solid green, 2 tardy in yellow with diagonal stripes, 1 absent in red with halftone dots, and a legend that repeats each pattern", 1338, 438),
            diagram("A15-status-gray.png", "The same attendance bar in grayscale: the solid, striped, and dotted swatches still tell the statuses apart", 1338, 438),
            screen("course-list.png", "Course list where each course card has the patterned attendance bar and its legend"),
          ],
        },
        { type: "subhead", text: "Text that grows" },
        {
          type: "text",
          text: "Settings has a three-step text size control. The largest step scales every label on the page, and rows grow to fit instead of cutting words off.",
        },
        {
          type: "figures",
          layout: "pair",
          items: [
            screen("settings.png", "Settings at the default text size, with language, a three-step text size control, and a theme picker", "Default"),
            screen("settings-large-text.png", "The same settings page at the largest text size: every label is bigger and the rows grow to fit", "Largest"),
          ],
        },
        { type: "subhead", text: "Dark mode" },
        {
          type: "text",
          text: "Every screen has a dark version that follows the phone, or the theme picker in Settings. The greens and reds are lightened so status text stays readable on dark backgrounds.",
        },
        {
          type: "figures",
          layout: "pair",
          items: [
            screen("dark-dashboard.png", "Dashboard in dark mode with the check-in banner, the Scan QR Code card, and recent attendance", "Dashboard"),
            screen("dark-course-list.png", "Course list in dark mode with patterned attendance bars", "Course list"),
          ],
        },
      ],
    },
    {
      id: "outcome",
      nav: "Outcome",
      eyebrow: "Outcome",
      title: "A more trustworthy, recovery-ready experience",
      blocks: [
        {
          type: "text",
          text: "I walked 25 people through the full prototype: coworkers who are UCF students, instructional designers, and engineers. They moved through scanning, error recovery, the dashboard, and attendance history.",
        },
        // TODO(Eli): one or two real findings from the walkthroughs go here, e.g. how many recovered from the camera error without help, or a quote.
        {
          type: "countHead",
          n: "01",
          title: "More organized",
          text: "This semester first, past semesters one dropdown away, and every course page summarized before it's listed.",
        },
        {
          type: "clip",
          src: "/ucfhere/motion/courses.mp4",
          poster: "/ucfhere/motion/courses-poster.jpg",
          label: "Animation: switching semesters, opening a course, viewing one check-in's details, filtering by Absent and Tardy, then switching to Week and Month",
        },
        {
          type: "countHead",
          n: "02",
          title: "More accessible",
          text: "Clearer feedback, text that grows, and a dark theme that keeps everything readable.",
        },
        {
          type: "clips",
          items: [
            {
              title: "Did it count?",
              text: "Success is confirmed twice, on the scanner and again on the dashboard. That fixes the visibility of system status issue from the heuristic evaluation.",
              clip: {
                src: "/ucfhere/motion/check-in.mp4",
                poster: "/ucfhere/motion/check-in-poster.jpg",
                label: "Animation: the three codes check off, the confirmation rises, the student continues to the dashboard, and a banner confirms the check-in before fading away",
              },
            },
            {
              title: "Text size",
              text: "The largest of three steps scales every label, and rows grow to fit.",
              clip: {
                src: "/ucfhere/motion/text-size.mp4",
                poster: "/ucfhere/motion/text-size-poster.jpg",
                label: "Animation: tapping the largest text size, and the Settings page reloading with bigger text",
              },
            },
            {
              title: "Dark mode",
              text: "Follows the phone or the theme picker, with status colors tuned for dark backgrounds.",
              clip: {
                src: "/ucfhere/motion/dark-mode.mp4",
                poster: "/ucfhere/motion/dark-mode-poster.jpg",
                label: "Animation: picking Dark in Settings, the page fading to dark, then going back to the dark dashboard",
              },
            },
          ],
        },
        {
          type: "countHead",
          n: "03",
          title: "More reliable",
          text: "A blocked camera is no longer a dead end. Students get from the error to a fix to a confirmed check-in without leaving the scanner flow.",
        },
        {
          type: "clip",
          wide: true,
          src: "/ucfhere/motion/reliable.mp4",
          poster: "/ucfhere/motion/reliable-poster.jpg",
          label: "Animation: from the dashboard, the student taps Scan QR Code and the camera is blocked. Troubleshoot detects their phone and browser, they allow the camera in Safari, scan again with a nudge to move closer, get checked in, and land back on the dashboard with a confirmation banner",
        },
        { type: "subhead", text: "Handed off and headed to build" },
        {
          type: "text",
          text: "The redesign is handed off to development. The current version stays in production until the new one is built. Once it launches, the clearest measure will be support tickets, especially camera and permission tickets.",
        },
        {
          type: "figures",
          layout: "wide",
          items: [
            {
              src: "/ucfhere/final/all-screens.png",
              alt: "The final UCFHere screens as they sit in the Figma file: troubleshooting along the top, then scanning, confirmation, the dashboard, the course list, every course view, and settings, with the error sheets below. The dark versions sit to the right in the same layout",
              width: 7000,
              height: 4421,
              detail: true,
            },
          ],
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
            { title: "Design for failure first", text: "The happy path took a fraction of the time. The real work was in the 26 ways it could go wrong." },
            {
              title: "Build the matrix before the screens",
              text: "Mapping every error first meant I designed one system instead of 26 one-off screens, and nothing fell through the cracks.",
            },
            {
              title: "Structure builds trust",
              text: "Most of the “did it count?” anxiety came from information architecture, not visuals. Giving things a clear place did more than any visual polish.",
            },
            {
              title: "Test beyond my own circle",
              text: "My walkthroughs were with coworkers who already knew the app. Before launch, I'd put it in front of students who've never seen it.",
            },
          ],
        },
      ],
    },
  ],
};
