import type { CaseStudyDocumentData } from "./types";

export const ucfhereCaseStudy: CaseStudyDocumentData = {
  title: "UCFHere",
  description: "Making university attendance clearer, more accessible, and more resilient across devices.",
  valueStatement:
    "UCFHere now centers the student around the scan, confirms success clearly, and gives specific recovery paths when the environment gets in the way.",
  meta: [
    { label: "Role", value: "UX Designer" },
    { label: "Organization", value: "UCF Center for Distributed Learning" },
    { label: "Timeline", value: "June-July 2026 design sprint; implementation ongoing" },
    { label: "Platform", value: "Responsive web application and Canvas integration" },
    { label: "Tools", value: "Figma, Claude Design, Figma Make" },
    { label: "Responsibilities", value: "Information architecture, user flows, prototyping, interaction design, responsive design, accessibility, error handling, developer collaboration" },
  ],
  categories: ["Edtech", "Accessibility", "UX Design", "Responsive Web"],
  heroMedia: {
    placeholder: "Full product walkthrough — visual coming soon",
  },
  returnHref: "/projects",
  returnLabel: "Back to all project overviews",
  sections: [
    {
      kind: "intro",
      id: "overview",
      label: "Overview",
      description:
        "UCFHere is the University of Central Florida's primary attendance and engagement platform, used by more than 50,000 students each month. Students use the application to scan course-specific QR codes, confirm attendance, and review attendance history through Canvas.",
      valueStatement:
        "I led an end-to-end redesign of the student experience, restructuring the navigation, redesigning the QR check-in flow, creating a responsive attendance record system, and designing recovery experiences for device and browser issues.",
      paragraphs: [
        "Scanning a class QR code is a tiny interaction on paper, but it happens inside a very short window and carries real consequences if it fails. A student who is unsure whether attendance has been recorded is not just dealing with a UI problem; they are dealing with a class-time problem.",
        "The application had to support more than the scanner itself. Students also needed a way to review attendance records, understand their current status within individual courses, access settings, and get help if something went wrong.",
      ],
      contextCards: [
        { placeholder: "Context card 1" },
        { placeholder: "Context card 2" },
        { placeholder: "Context card 3" },
      ],
      emphasis:
        "The redesign needed to answer three questions at almost every stage: what is happening, was the action successful, and what should the student do next?",
      diagram: {
        placeholder: "System context — UCFHere, Canvas, and the classroom device flow",
      },
    },
    {
      kind: "problem",
      id: "problem",
      label: "The problem",
      flow: {
        intro:
          "Before proposing any fix, I mapped the full student journey rather than treating the QR scanner as an isolated screen. The central flow was open UCFHere, scan a course QR code, receive confirmation, and then either scan again or return to the dashboard.",
        note:
          "The highest-friction point is not the scan itself; it is the moment when the student cannot tell whether the failure is temporary, device-specific, or final. That single moment defined the central problem.",
        steps: [
          {
            label: "Open UCFHere",
            detail: "Students enter through a task-focused dashboard or the scan flow directly.",
          },
          {
            label: "Scan a course QR code",
            detail: "The camera and code reader need to feel immediate and unambiguous.",
            friction: "Permission prompts, unsupported browsers, and unreadable codes can interrupt the flow before the scan even starts.",
            highlight: true,
          },
          {
            label: "Receive confirmation",
            detail: "Successful scans need a clear, unmistakable confirmation state.",
            friction: "A success message that is too subtle can leave students uncertain about whether attendance was recorded.",
          },
          {
            label: "Return to dashboard or scan again",
            detail: "Students should have a clear next action after the scan finishes.",
          },
        ],
      },
      statement:
        "Attendance is a small action with high consequences. When the scan path breaks, the experience can feel ambiguous instead of reassuring, especially when the student is inside a time-limited classroom moment.",
      consequences: [
        "Camera permissions, unsupported browser behavior, failed QR scans, connectivity problems, and unclear confirmation states can all look and feel similar to the student.",
        "A generic error message is not enough when the real issue may be a device permission, a browser limitation, or an unreadable QR code.",
        "Students also need a clear path from attendance confirmation back into their history, settings, or support without getting trapped in a dead end.",
      ],
      issues: [
        {
          title: "Camera permission friction",
          description:
            "Students need a clear explanation and recovery path when the browser blocks camera access before scanning can even begin.",
          screenshot: {
            placeholder: "Camera permission — denied state",
          },
        },
        {
          title: "Unclear scan failures",
          description:
            "Failed QR scans should tell students what went wrong and how to try again without making the error feel generic.",
          screenshot: {
            placeholder: "Failed scan — retry state",
          },
        },
        {
          title: "Uncertain confirmation state",
          description:
            "After a successful scan, the interface still has to make the result obvious so students do not leave confused.",
          screenshot: {
            placeholder: "Success confirmation state",
          },
        },
      ],
      evidence:
        "Students could encounter disabled camera permissions, unsupported browser behavior, failed QR scans, connectivity problems, or uncertainty about whether their attendance had actually been recorded.",
      pathComparison: {
        screens: {
          happy: [
            { src: "/ucfhere/screenshots/ucfherehappypath1.png", alt: "UCFHere scanner reading a classroom QR code", caption: "Scan QR code" },
            { src: "/ucfhere/screenshots/ucfherehappypath2.png", alt: "UCFHere confirmation that attendance has been recorded", caption: "Confirm attendance" },
            { src: "/ucfhere/screenshots/ucfherehappypath3.png", alt: "UCFHere attendance history showing the course list", caption: "Review history" },
          ],
          unhappy: [
            { src: "/ucfhere/screenshots/ucfheresadpath.png", alt: "UCFHere scanner with a black camera preview", caption: "Open app" },
            { src: "/ucfhere/screenshots/ucfheresadpath2.png", alt: "UCFHere session enrollment error, dimmed and crossed out", caption: "Scan error" },
            { src: "/ucfhere/screenshots/ucfherehappypath3.png", alt: "UCFHere attendance history, dimmed and crossed out to show the interrupted path", caption: "Review history" },
          ],
        },
        happy: [
          "The app opens and camera access is available.",
          "The course QR code scans without interruption.",
          "Attendance is recorded, but subtle feedback can still leave students unsure.",
        ],
        unhappy: [
          "The app opens, but a camera, browser, or connection issue interrupts the flow.",
          "An unclear error leaves the student without a useful next step.",
          "The student cannot complete the scan or reach confirmation.",
        ],
      },
    },
    {
      kind: "goals",
      id: "goals",
      label: "Project goals",
      mainGoal: "Make the primary attendance flow fast, clear, and easy to trust.",
      supportingGoals: [
        {
          label: "Prioritize the primary student action",
          description:
            "Scanning a QR code is the most time-sensitive action in the product and should remain the dominant action throughout the experience.",
        },
        {
          label: "Create unmistakable system feedback",
          description:
            "Students should never have to wonder whether a scan worked or whether attendance was submitted successfully.",
        },
        {
          label: "Design beyond the happy path",
          description:
            "Permission errors, failed scans, connectivity issues, and unsupported environments need distinct explanations and recovery actions.",
        },
        {
          label: "Improve access to attendance information",
          description:
            "Students need a clearer way to review attendance by course, understand attendance status, and move between recent and historical records.",
        },
      ],
    },
    {
      kind: "chapters",
      id: "approach",
      label: "The process",
      intro:
        "I iterated between low-fidelity flows and high-fidelity interaction prototypes to pressure-test hierarchy, spacing, content density, and system behavior. Each round was reviewed with the CDL engineering team and project stakeholders before moving forward, which surfaced edge cases - like camera-permission recovery on older Android browsers - well before implementation.",
      iterations: [
        {
          title: "Dashboard hierarchy",
          caption:
            "Reduced competing visual weight so the scan action, attendance status, and secondary destinations are easier to read at a glance.",
        },
        {
          title: "Scan confirmation",
          caption:
            "Explored success states that stay in context instead of sending students to a disconnected success page.",
        },
        {
          title: "Error recovery",
          caption:
            "Separated camera, browser, code, and network failures so the interface can tell students what happened and what to do next.",
        },
        {
          title: "Attendance records",
          caption:
            "Reworked the record view around course selection and predictable scrolling for quicker verification on mobile.",
        },
      ],
      decision: {
        title: "Keep success in context",
        problem:
          "A separate success page would confirm the scan, but it would also break the student out of the moment and make the flow feel heavier than it needs to be.",
        decision:
          "Use a bottom-sheet style confirmation above the scanner so the student stays oriented while still receiving unmistakable feedback.",
        reasoning:
          "This keeps the interaction honest about what just happened, preserves the connection to the original scan, and gives the student two clear next actions without forcing a full page change.",
        note:
          "This is one of the most important recovery decisions because it turns confirmation into part of the flow instead of a separate destination.",
        visual: {
          placeholder: "Scan confirmation — bottom sheet",
        },
      },
      chapters: [
        {
          id: "feedback",
          number: "6.1",
          title: "System feedback and error recovery",
          challenge:
            "The application needed to communicate success and failure in a way that students could understand instantly while they were still in the middle of the attendance action.",
          decision:
            "I treated feedback as a system, not a message, and created distinct states for success, camera permission issues, browser issues, invalid scans, and connectivity problems.",
          reasoning:
            "Students should never be left guessing whether the issue is temporary, whether the environment is unsupported, or whether attendance already went through.",
          note:
            "The strongest improvement here is specificity: each state explains the problem and the recovery action in plain language.",
          mediaRows: [
            {
              kind: "screens",
              items: [
                { placeholder: "System feedback screen 1" },
                { placeholder: "System feedback screen 2" },
                { placeholder: "System feedback screen 3" },
              ],
            },
          ],
        },
        {
          id: "beyond-happy-path",
          number: "6.2",
          title: "Designing beyond the successful path",
          challenge:
            "Many classroom tools only look polished when everything works correctly, but attendance is most stressful when something breaks.",
          decision:
            "I designed the failure states as first-class flows, building a matrix that maps every technical issue to a specific interface message, recovery action, and support path.",
          reasoning:
            "A generic 'try again' loop would not help if the actual problem was a denied permission or unsupported device.",
          note:
            "Every message in this matrix was checked against a real failure scenario - denied permission, unsupported browser, dropped connection - rather than written as a generic catch-all.",
          mediaRows: [
            {
              kind: "screens",
              items: [
                { placeholder: "Recovery screen 1" },
                { placeholder: "Recovery screen 2" },
              ],
            },
            {
              kind: "screens",
              items: [
                { placeholder: "Recovery screen 3" },
                { placeholder: "Recovery screen 4" },
              ],
            },
            {
              kind: "graph",
              items: [
                { placeholder: "Error recovery graph" },
              ],
            },
            {
              kind: "banner",
              items: [
                { placeholder: "Error recovery banner" },
              ],
            },
          ],
        },
        {
          id: "attendance-records",
          number: "6.3",
          title: "Reworking attendance records",
          challenge:
            "The attendance history needed to support quick verification without turning into a long, undifferentiated list of dates.",
          decision:
            "I reorganized the records around the student's course structure, with a clearer weekly view and a broader monthly overview.",
          reasoning:
            "Students should be able to confirm a recent check-in quickly and still understand longer-term patterns when needed.",
          note:
            "The page also favors normal page scrolling over nested scrolling containers so the interaction feels more predictable on mobile.",
          mediaRows: [
            {
              kind: "screens",
              items: [
                { placeholder: "Attendance screen 1" },
                { placeholder: "Attendance screen 2" },
              ],
            },
            {
              kind: "screens",
              items: [
                { placeholder: "Attendance screen 3" },
                { placeholder: "Attendance screen 4" },
              ],
            },
            {
              kind: "focus",
              items: [
                { placeholder: "Attendance screen / focus card 1" },
                { placeholder: "Attendance screen / focus card 2" },
              ],
            },
            {
              kind: "screens",
              items: [
                { placeholder: "Attendance screen 5" },
                { placeholder: "Attendance screen 6" },
                { placeholder: "Attendance screen 7" },
              ],
            },
            {
              kind: "focus",
              items: [
                { placeholder: "Attendance screen / focus card 3" },
                { placeholder: "Attendance screen / focus card 4" },
              ],
            },
          ],
        },
        {
          id: "responsive-accessible",
          number: "6.4",
          title: "Responsive and accessible behavior",
          challenge:
            "UCFHere is used in active classroom environments across many device sizes and browser setups, so the interface has to stay stable under imperfect conditions.",
          decision:
            "I designed the experience to keep keyboard focus visible, make touch targets large enough, keep status messages readable without relying on color alone, and preserve camera-based alternatives when scanning is unavailable.",
          reasoning:
            "Accessibility is part of the interaction architecture, not a final visual check, especially for an action that students may need to complete quickly.",
          note:
            "Accessibility requirements were checked against WCAG 2.1 AA guidance throughout the design process, not audited afterward as a final pass.",
          mediaRows: [
            {
              kind: "screens",
              items: [
                { placeholder: "Responsive and accessible screen 1" },
                { placeholder: "Responsive and accessible screen 2" },
                { placeholder: "Responsive and accessible screen 3" },
              ],
            },
          ],
          checklist: [
            "Clear keyboard focus states and touch-target sizing",
            "Status communication that does not rely only on color",
            "Screen-reader-friendly labels for icons and scanning controls",
            "Responsive layouts without clipped or hidden actions",
            "Predictable page-level scrolling instead of nested scroll containers",
            "Visible alternatives when camera-based interaction is unavailable",
          ],
        },
      ],
    },
    {
      kind: "final",
      id: "final",
      label: "Final product",
      summary:
        "The final experience centers the primary scan action, clarifies what is happening during the scan, and gives students a better path through both success and failure states.",
      highlights: [
        "A dashboard centered on the most likely student action.",
        "Clear success confirmation that stays in context.",
        "Specific recovery flows for camera, browser, and connectivity issues.",
        "Attendance records organized for faster verification and less friction.",
      ],
      visuals: [
        { placeholder: "Dashboard overview" },
        { placeholder: "Mobile scan state" },
      ],
    },
    {
      kind: "outcomes",
      id: "outcomes",
      label: "Outcomes and reflection",
      summary:
        "This redesign established a more cohesive foundation for UCFHere's student-facing experience. It simplified navigation, made the scan action easier to locate, clarified successful attendance submission, replaced generic errors with condition-specific recovery flows, and improved attendance record organization.",
      reflection:
        "Decisions throughout were pressure-tested with the CDL engineering team and reviewed with project stakeholders before implementation, which caught real edge cases - including camera-permission recovery on older Android browsers - before they reached a single student. The biggest takeaway was that a reliable experience does more than help people succeed; it helps them understand what happened when they cannot succeed immediately and gives them a clear path forward. Because implementation and evaluation are ongoing, I am not attaching unverified numerical claims to this redesign.",
      nextSteps: [
        "Add implementation screenshots once the updated UI is in the codebase.",
        "Validate camera and browser behavior across more classroom devices.",
        "Expand the error matrix as browser requirements change.",
      ],
      links: [
        { label: "Return to all projects", href: "/projects" },
        { label: "Next project: Wattasave", href: "/projects/wattasave" },
        { label: "Contact me", href: "mailto:elizabethprettosotelo@gmail.com" },
      ],
    },
  ],
};
