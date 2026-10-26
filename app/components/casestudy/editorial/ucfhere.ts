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

const oldCourseDetail: Figure = {
  src: "/ucfhere/screenshots/ucfhere-course-detail.png",
  alt: "Old UCFHere course detail: every class date in alternating yellow and white rows, with present or absent on the right",
  width: 1125,
  height: 1902,
};

const oldCourseList = phone("ucfherehappypath3.png", "Old UCFHere course list showing every course");

export const ucfhere: CaseStudy = {
  project: "UCFHere",
  title: "Making sure showing up always counts",
  summary:
    "Redesigning UCF's attendance app so students know when their attendance counted, and how to recover when it doesn't.",
  meta: [
    { label: "Role", value: "UX Designer (sole designer)" },
    { label: "Team", value: "1 designer, 1 engineer" },
    { label: "Timeline", value: "June–August 2026" },
    { label: "Tools", value: "Figma, Figma Make, Claude" },
    { label: "Status", value: "Handed off to development" },
  ],
  // TODO A1: swap for the new scanner with the half sheet open, next to the dashboard.
  hero: {
    src: "/ucfhere/frame-2.png",
    alt: "Redesigned UCFHere screens: the dashboard with a scan card and recent check-ins, and a course page with all, week, and month attendance views",
    width: 1920,
    height: 1080,
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
        { type: "subhead", text: "Two moments that go wrong" },
        {
          type: "cards",
          items: [
            {
              title: "Exam day",
              text: "A student opens UCFHere and the scanner is black. Their camera permission is off, but nothing says so. The professor is strict, and there's no sign-in sheet. They're marked absent for an exam they sat in the room for.",
            },
            {
              title: "The second scan",
              text: "A student scans, sees a quick flash of success, and lands on a list of every class they've ever taken. Unsure it worked, they scan again just to check.",
            },
          ],
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
              wide: true,
              note: "The camera is blocked, so the scanner stays black. There's no error and nothing to try. The student can't tell what's wrong, can't fix it, and leaves marked absent.",
              steps: [
                { slot: phone("ucfheresadpath.png", "Old UCFHere scanner showing a black camera preview"), label: "Black screen" },
                { slot: phone("ucfheresadpath.png", "The same black scanner after trying again"), label: "Still black" },
                { slot: oldCourseList, label: "Never recorded", broken: true },
              ],
            },
          ],
        },
        { type: "subhead", text: "The black screen" },
        {
          type: "text",
          text: "The worst case was when students couldn't scan at all. If a browser or camera permission was off, the scanner just showed a black screen. No error, no message. Students assumed the app was broken.",
        },
        { type: "quote", text: "UCFHere already knew what was wrong. It just had no way to tell the student." },
        {
          type: "text",
          text: "It could detect the browser, the operating system, and whether camera access was on. None of that ever reached the screen.",
        },
        {
          type: "columns",
          items: [
            {
              title: "“Error”",
              text: "When a scan did go through but something else failed, like scanning a code for the wrong section, students got a generic error with no explanation of what to do next.",
            },
            {
              title: "“Did it count?”",
              text: "Even when everything worked, students weren't sure. The app flashed a brief success screen, then dropped them into a list of every course. Many scanned again just to make sure, and only felt better when a second screen told them they'd already checked in.",
            },
          ],
        },
        { type: "subhead", text: "Two lists deep, and still no answer" },
        {
          type: "text",
          text: "Students open their attendance to answer one question: did today count, and am I okay in this class? The old screens never answered it. The first list showed every class a student had ever taken at UCF, including classes that never used UCFHere and semesters long past. Finding this semester meant scrolling past all of it.",
        },
        {
          type: "text",
          text: "Tapping a course didn't summarize anything either. It opened a second list of every class date in alternating yellow and white rows, with a small “present” or “absent” at the edge. To know where they stood, students had to scroll and count.",
        },
        { type: "quote", text: "All of the data was there. None of it was organized around what students needed to know." },
        {
          type: "figures",
          layout: "pair",
          caption: "Every course ever taken, then every date as a list, with no summary at either level.",
          items: [oldCourseList, oldCourseDetail],
        },
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
          text: "I started with the support tickets. Most students reported the same thing: they tried to scan and UCFHere was broken. A large share of those tickets had the same fix, which was turning on camera access in the browser or phone settings. Most of the rest came from other errors that weren't explained clearly.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "What the tickets said versus what was actually wrong. The ticket wording is paraphrased.",
          items: [
            diagram("A6-ticket-types.svg", "A typical ticket saying UCFHere is broken splits into two real causes: a blocked camera, which made up a large share, and errors that weren't explained, which made up most of the rest", 1584, 568),
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
          caption: "Built from support tickets and conversations with students who use UCFHere. Thoughts are paraphrased.",
          items: [
            diagram("A18-journey-map.svg", "Journey map of a student checking in when the scan fails, from arriving in class to filing a ticket, with an emotion curve that drops at the black screen", 1664, 725),
          ],
        },
        {
          type: "text",
          text: "Then I ran a heuristic evaluation of the existing screens against Nielsen's usability heuristics. The most severe problems sat exactly where the tickets pointed: the scanner and the error screen.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "Nine issues across five screens, rated by severity. Student names are blurred.",
          items: [
            diagram("A19-heuristic-evaluation.svg", "Heuristic evaluation of five old UCFHere screens with numbered markers, and a table listing each issue, the heuristic it breaks, and its severity: three critical, five major, one minor", 1320, 1246),
          ],
        },
        { type: "subhead", text: "That gave me three priorities" },
        {
          type: "cards",
          numbered: true,
          items: [
            { title: "Tell students what went wrong", text: "The app already had the information. It needed to share it." },
            { title: "Give every error a way forward", text: "No dead ends, and no “error” with no next step." },
            { title: "Make success obvious", text: "Students shouldn't have to scan twice to feel sure." },
          ],
        },
      ],
    },
    {
      id: "principles",
      eyebrow: "Design principles",
      title: "Four rules I designed by",
      blocks: [
        {
          type: "cards",
          numbered: true,
          items: [
            { title: "Say what the app already knows", text: "If UCFHere can detect the problem, the student should see it in plain words." },
            { title: "Keep the fix next to the problem", text: "Recovery happens on the scanner, not on a separate page." },
            { title: "No dead ends", text: "Every state, error or success, has a clear next step." },
            { title: "Make success obvious", text: "No one should have to scan twice to feel sure." },
          ],
        },
        { type: "text", text: "Every decision below traces back to at least one of these." },
      ],
    },
    {
      id: "mapping",
      nav: "Errors",
      eyebrow: "Mapping the problem",
      title: "Mapping every way a check-in can fail",
      blocks: [
        {
          type: "text",
          text: "Before designing any screens, I listed every way a check-in could go wrong. I ended up with 26 error states in six categories:",
        },
        {
          type: "errorTypes",
          items: [
            {
              title: "Camera and permissions",
              count: 6,
              errors: ["Blocked by the browser", "Permission denied before", "Blocked by phone settings", "No camera found", "Camera already in use", "Browser can't reach the camera"],
            },
            {
              title: "QR detection",
              count: 5,
              errors: ["No code detected", "Code out of frame", "Code too blurry", "Code too small or far", "Code too close"],
            },
            {
              title: "Interrupted sequence",
              count: 2,
              errors: ["Only the 1st code scanned", "Only the 1st and 2nd scanned"],
            },
            {
              title: "QR validity",
              count: 4,
              errors: ["Invalid code", "Code for a different class", "Code for a different section", "Code for a different date"],
            },
            {
              title: "Check-in",
              count: 3,
              errors: ["Already checked in", "Not enrolled in the course", "Not in this section"],
            },
            {
              title: "Network and system",
              count: 5,
              errors: ["No internet connection", "Weak connection", "Request timed out", "Server unavailable", "Unknown error"],
            },
          ],
        },
        {
          type: "text",
          text: "For each one, I wrote down what the student sees, what they can do about it, and where they go if that doesn't work. I also settled a few rules along the way. Try again always restarts the whole scan, because the codes regenerate constantly and partial scans can't be saved. And not every error needs troubleshooting. Only camera and interrupted-sequence errors do.",
        },
        { type: "subhead", text: "The error flow for “Scan the QR code”" },
        {
          type: "figures",
          layout: "wide",
          caption: "All 26 error states, from opening the app to a confirmed check-in. Click to zoom in and follow any path.",
          items: [
            diagram("A7-error-flowchart.svg", "Flowchart of all 26 UCFHere scan error states, grouped into six categories, each leading to a nudge, half sheet, or full sheet", 1806, 1883),
          ],
        },
        { type: "quote", text: "This matrix became the backbone of the whole redesign." },
      ],
    },
    {
      id: "solution",
      eyebrow: "The solution",
      title: "One pattern for 26 errors",
      blocks: [
        {
          type: "text",
          text: "Once all 26 errors were mapped, a pattern emerged. They had very different causes, but from the student's side, every one of them fell into one of three situations:",
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
          caption: "Try again is always the main action, and it returns to the scanner from every step. Each deeper step is optional. *Troubleshoot only appears for camera and interrupted-sequence errors.",
          items: [
            diagram("A9-interaction-flow.svg", "Interaction flow: scan result branches into attendance issues, framing issues, and blocking errors, with Try again returning to the scanner at every step", 1871, 727),
          ],
        },
        {
          type: "text",
          text: "I built that flow as a bottom sheet attached to the scanner, with three levels. Each level only appears when the one before it isn't enough.",
        },
        {
          type: "sheetSpec",
          levels: [
            {
              name: "Nudge",
              kind: "nudge",
              color: "#1C7C76",
              tint: "#E1F1EF",
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
                { label: "What's next", text: "Try again, or Troubleshoot for camera and sequence errors." },
              ],
            },
            {
              name: "Full sheet",
              kind: "full",
              color: "#5B45A8",
              tint: "#E9E4F6",
              mock: {
                meta: "Detected: iPhone · Safari",
                title: "Fix: camera access is blocked",
                steps: ["Tap the aA icon in the address bar.", "Tap Website Settings.", "Set Camera to Allow.", "Come back and tap Try again."],
                primary: "Try again",
                footnote: "Not iPhone with Safari? Self-diagnose",
              },
              count: "3 errors",
              usedBy: ["Check-in", "Troubleshoot, from camera and sequence errors"],
              rows: [
                { label: "Shows when", text: "The student taps Troubleshoot, or can't check in." },
                { label: "The scanner", text: "Covered by the sheet." },
                { label: "What it says", text: "Steps for their phone and browser, or a scanning guide." },
                { label: "What's next", text: "Try again, Self-diagnose, or Back to dashboard." },
              ],
            },
          ],
          rules: [
            { title: "Try again leads", text: "Every error a student can recover from puts Try again first. Deeper help is optional." },
            { title: "Try again starts over", text: "Codes regenerate constantly, so partial scans aren't kept. A new scan starts at code 1." },
            { title: "Support comes last", text: "The support page link only appears at the end of self-diagnose." },
          ],
        },
        {
          type: "text",
          text: "In the final designs, every sheet shares one layout: a status icon, a plain-language title, one sentence on what happened, and the next step as the main button. Full sheets add the details a student needs to sort it out, like which course or section a code belongs to.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "One nudge, three half sheets, and three full sheets for check-in problems.",
          items: [
            diagram("A21-sheet-set.svg", "Seven final screens: a framing nudge over the live scanner; half sheets for camera access, an interrupted scan, and no connection; full sheets for already checked in, not on the roster, and wrong section", 1612, 571),
          ],
        },
      ],
    },
    {
      id: "why-a-sheet",
      eyebrow: "Why a sheet",
      title: "Keeping the fix where the problem is",
      blocks: [
        {
          type: "text",
          text: "I considered a popup and a separate error page. Both would have worked, but both pull students away from the scanner at the exact moment they're trying to finish.",
        },
        {
          type: "compare",
          options: [
            {
              title: "Popup",
              verdict: "no",
              text: "Has to be dismissed before you can continue. One more tap when you're in a hurry.",
              slot: art("A10-popup.png", "Lo-fi popup over a dimmed scanner", 1170, 2532),
            },
            {
              title: "Separate page",
              verdict: "no",
              text: "Takes students off the scanner, so they lose track of where the error happened.",
              slot: art("A10-separate-page.png", "Lo-fi separate error page that replaces the scanner", 1170, 2532),
            },
            {
              title: "Bottom sheet",
              verdict: "yes",
              text: "Rises from the scanner. Keeps context, and puts the fix right next to the problem.",
              slot: art("A10-bottom-sheet.png", "Lo-fi bottom sheet rising over the paused scanner", 1170, 2532),
            },
          ],
        },
        {
          type: "list",
          items: [
            { lead: "It keeps context.", text: "Students can see where the error happened." },
            { lead: "It doesn't interrupt.", text: "Nothing to dismiss before trying again." },
            { lead: "The fix sits next to the problem.", text: "“Turn on camera access” or “Try again” is right there." },
            { lead: "There are no dead ends.", text: "Every error has a next step, and so does success: Scan another code or Go to dashboard." },
          ],
        },
        { type: "text", text: "Popups aren't always wrong. A sheet just fit a fast, repeated, camera-based task better." },
      ],
    },
    {
      id: "iteration",
      eyebrow: "Iteration",
      title: "Cutting the wall of text",
      blocks: [
        {
          type: "text",
          text: "My first version put every troubleshooting step right in the expanded sheet. It covered everything, and that was the problem. It was a wall of text, and most students only needed one line to fix their issue.",
        },
        {
          type: "beforeAfter",
          before: [
            art("A11-first-version.png", "First version of the camera error: a tall sheet with detected device, three numbered troubleshooting steps, a camera toggle illustration, and Try again", 804, 1748, "Every troubleshooting step, right in the sheet."),
          ],
          after: [
            art("A11-final-half-sheet.png", "Final half sheet for the camera error: one sentence on what happened, a Try again button, and a Troubleshoot link, with the scanner still visible above", 804, 1748, "One sentence, Try again, and Troubleshoot if they need more."),
          ],
        },
        {
          type: "text",
          text: "I split it up. The half sheet gives enough context for students who can fix it themselves. The detailed steps moved into the optional full sheet, for students who need more help.",
        },
      ],
    },
    {
      id: "dashboard",
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
          type: "figures",
          layout: "pair",
          items: [
            screen("confirmation.png", "Confirmation screen: You've been marked Present, with the time, course, section, and a confirmation number", "The scan succeeds"),
            screen("dashboard.png", "Dashboard with a banner confirming the student was just marked present for COP3330, above the Scan QR Code card and recent attendance", "The dashboard confirms it"),
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
      nav: "History",
      eyebrow: "Attendance history",
      title: "From every class you've ever taken to this semester at a glance",
      blocks: [
        {
          type: "text",
          text: "The old history showed everything at once, at the same level of detail. I reorganized it from overview to detail. The course list now shows only this semester, each course with a small bar summarizing attendance. Past semesters are still there in a dropdown.",
        },
        {
          type: "beforeAfter",
          before: [oldCourseList, oldCourseDetail],
          after: [
            screen("course-list.png", "New course list showing this semester's courses, each with an attendance bar and present and tardy counts"),
            screen("course-list-dropdown.png", "Course list with the semester dropdown open, listing past semesters"),
          ],
        },
        { type: "text", text: "Each course page has three views: All for totals at a glance, Week to find a specific day, and Month to spot patterns." },
        {
          type: "figures",
          layout: "phones",
          items: [
            screen("course-all.png", "Course page in All view: totals for present, tardies, absences, and excused, then every class date", "All"),
            screen("course-week.png", "Course page in Week view: one week with a status icon under each day", "Week"),
            screen("course-month.png", "Course page in Month view: a calendar with a colored dot under each class day", "Month"),
          ],
        },
        { type: "subhead", text: "Four statuses" },
        {
          type: "legend",
          items: [
            { status: "present", label: "Present", text: "Scanned during the session" },
            { status: "tardy", label: "Tardy", text: "The professor marked you present after the session ended" },
            { status: "absent", label: "Absent", text: "Neither happened" },
            { status: "excused", label: "Excused", text: "The professor excused the absence" },
          ],
        },
      ],
    },
    {
      id: "accessibility",
      eyebrow: "Accessibility",
      title: "Designing for more than color",
      blocks: [
        {
          type: "text",
          text: "Attendance status is the most important information on these screens, so it couldn't depend on color. Each status on the attendance bar gets its own pattern as well as its own color: solid for present, stripes for tardy, halftone dots for absent. The legend repeats each pattern next to its label, and every status pill pairs an icon with a word.",
        },
        {
          type: "figures",
          layout: "wide",
          caption: "The attendance bar in color and in grayscale. The patterns still tell the statuses apart.",
          items: [
            diagram("A15-status-color.png", "Attendance bar: 17 present in solid green, 2 tardy in yellow with diagonal stripes, 1 absent in red with halftone dots, and a legend pairing each with an icon", 1260, 438),
            diagram("A15-status-gray.png", "The same attendance bar in grayscale: the solid, striped, and dotted segments and the icons still tell the statuses apart", 1260, 438),
          ],
        },
      ],
    },
    {
      id: "validation",
      nav: "Outcome",
      eyebrow: "Validation",
      title: "Putting it in front of 25 people",
      blocks: [
        {
          type: "text",
          text: "I walked 25 people through the full prototype: coworkers who are UCF students, instructional designers, and engineers. They could move through scanning, error recovery, the dashboard, and attendance history.",
        },
        {
          type: "figures",
          layout: "wide",
          items: [slot("A16", "Screen recording: scan, camera error, troubleshoot, try again, success", "wide")],
        },
      ],
    },
    {
      id: "outcome",
      eyebrow: "Outcome",
      title: "Handed off and headed to build",
      blocks: [
        {
          type: "text",
          text: "The redesign is handed off to development. The current version stays in production until the new one is built. Once it launches, the clearest measure will be support tickets, especially camera and permission tickets.",
        },
        {
          type: "figures",
          layout: "wide",
          items: [
            {
              src: "/ucfhere/final/overview.png",
              alt: "The final screens side by side: scanner, camera error sheet, confirmation, dashboard, course list, and a course's week view",
              width: 4138,
              height: 1551,
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
            // TODO: add "What I'd improve" once you pick one in the draft.
          ],
        },
      ],
    },
  ],
};
