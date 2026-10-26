import type { CaseStudy, Placeholder } from "./types";

// Asset IDs (C1, C2...) match the asset list in the "Chop Chop draft" tab of
// Case Study Worksheets. Replace each slot(...) with a real image as you make it.

const slot = (asset: string, label: string, shape: Placeholder["shape"], caption?: string): Placeholder => ({
  asset,
  label,
  shape,
  caption,
});

export const chopchop: CaseStudy = {
  project: "Chop Chop",
  title: "Getting a room to look up from their phones",
  summary: "A Jackbox-style cooking race where each phone is a controller and the shared screen is the kitchen.",
  meta: [
    { label: "Role", value: "Frontend developer, interaction and UI designer" },
    { label: "Team", value: "2 developers, 1 designer, me" },
    { label: "Timeline", value: "36-hour hackathon, Sept 2026" },
    { label: "Tools", value: "TypeScript, Vite, Tailwind, Claude Design" },
    { label: "Status", value: "Playable hackathon build" },
  ],
  hero: slot("C1", "Host screen mid-round, with two phones in front of it", "wide"),
  stats: [
    { value: "36h", label: "from idea to playable build" },
    { value: "2", label: "screens that only work together" },
    { value: "3", label: "prep gestures: swipe, swirl, tap" },
    { value: "3", label: "sabotages for last place" },
  ],
  overview: [
    {
      label: "Context",
      text: "Chop Chop is a free, fast-paced party game for friends hanging out. Everyone plays on their own phone while the game runs on a shared screen.",
    },
    {
      label: "Challenge",
      text: "Phone-based party games can turn a room quiet, with everyone staring down at their own screen.",
    },
    {
      label: "Objective",
      text: "How might we design a phone-controlled game that keeps players looking up at the shared screen, and at each other?",
    },
    {
      label: "Outcome",
      text: "A playable build in 36 hours, with a two-screen layout, three prep gestures, and a catch-up sabotage system.",
    },
  ],
  sections: [
    {
      id: "the-game",
      nav: "The game",
      eyebrow: "The game",
      title: "Shop, prep, cook, repeat",
      blocks: [
        {
          type: "text",
          text: "Each round, a recipe card goes up on the host screen. Players race to finish it in two phases: shop for the ingredients on your phone, then swipe, swirl, and tap your phone to chop, stir, and cook. Finish a recipe and the next card comes up. The player with the most points when the timer runs out wins.",
        },
        {
          type: "sequence",
          steps: [
            { title: "Recipe card", text: "The next recipe appears on the host screen for everyone.", slot: slot("C2", "Recipe card on the host screen", "wide") },
            { title: "Shop", text: "Buy the ingredients on your phone before someone else does.", slot: slot("C6", "Store screen on the phone", "phone") },
            { title: "Prep", text: "Swipe, swirl, and tap to chop, stir, and cook.", slot: slot("C6", "Prep gesture pad on the phone", "phone") },
          ],
        },
        {
          type: "video",
          youtubeId: "WBjhtHPg7YY",
          start: 4,
          title: "Watch a round of Chop Chop",
          caption: "Gameplay from the hackathon build.",
        },
      ],
    },
    {
      id: "two-screens",
      nav: "Screens",
      eyebrow: "Two screens",
      title: "Splitting the game so neither screen works alone",
      blocks: [
        {
          type: "text",
          text: "The biggest design decision was what goes on each screen. I split the game so players couldn't rely on just one.",
        },
        {
          type: "cards",
          items: [
            { title: "On the host screen", text: "Each player's grocery list, progress, points, the round timer, and gesture instructions." },
            { title: "On your phone", text: "The store, the gesture pad, and the sabotage menu." },
          ],
        },
        { type: "quote", text: "You look up to see what to buy, then down to buy it." },
        {
          type: "text",
          text: "That back-and-forth keeps everyone's heads up and in the same moment. The host screen also shows where everyone else is. Shopping lists update live as players grab items, move through recipe steps, and finish cards, with sound and visual cues for each. You can hear and see a friend pulling ahead.",
        },
        {
          type: "figures",
          layout: "wide",
          items: [
            slot("C4", "Host screen and phone side by side, labeled with what lives where", "wide"),
            slot("C5", "Host screen during a round, with live progress for each player", "wide"),
          ],
        },
      ],
    },
    {
      id: "progression",
      eyebrow: "Progression",
      title: "Two phases, one obstacle",
      blocks: [
        {
          type: "text",
          text: "Splitting each recipe into shopping and prep gave the game a sense of progress. It also set up the main obstacle: if someone steals your ingredients, you have to go back to the store before you can keep cooking.",
        },
      ],
    },
    {
      id: "competition",
      nav: "Competition",
      eyebrow: "Competition",
      title: "Keeping last place in the game",
      blocks: [
        {
          type: "text",
          text: "The first concept was cooperative. We switched to free-for-all to make it more competitive and more fun. But in a free-for-all, whoever falls behind early can check out. So the last-place player gets one of three sabotages at random:",
        },
        {
          type: "cards",
          numbered: true,
          items: [
            { title: "Freeze", text: "Lock one player out for a moment." },
            { title: "Steal", text: "Take ingredients from one player, sending them back to the store." },
            { title: "Blackout", text: "Slow everyone else down at once." },
          ],
        },
        {
          type: "text",
          text: "It worked. In one playtest, the player in last place hit Blackout while everyone else was still shopping. It slowed the whole room down long enough for them to catch up.",
        },
        {
          type: "figures",
          layout: "phones",
          items: [
            slot("C7", "Sabotage menu on the phone", "phone", "Sabotage menu"),
            slot("C7", "Freeze on the host screen", "phone", "Freeze"),
            slot("C7", "Blackout on the host screen", "phone", "Blackout"),
          ],
        },
      ],
    },
    {
      id: "gestures",
      nav: "Gestures",
      eyebrow: "Gestures",
      title: "Teaching gestures without a tutorial",
      blocks: [
        {
          type: "text",
          text: "There's no separate tutorial. Instructions are built into the game: each gesture appears on both the host screen and the phone, with an example illustration and a guide showing where to swipe or tap.",
        },
        {
          type: "figures",
          layout: "phones",
          items: [
            slot("C8", "Swipe gesture guide", "phone", "Swipe"),
            slot("C8", "Swirl gesture guide", "phone", "Swirl"),
            slot("C8", "Tap gesture guide", "phone", "Tap"),
          ],
        },
        {
          type: "text",
          text: "Playtesting surfaced the biggest issue. Players understood what to do, but gesture recognition was too strict, so real attempts didn't count. The problem wasn't the instructions. It was how much room the input gave people. We loosened recognition before the end of the hackathon so real attempts registered.",
        },
      ],
    },
    {
      id: "credits",
      nav: "Wrap-up",
      eyebrow: "Credits",
      title: "Who made what",
      blocks: [
        {
          type: "text",
          text: "I built the entire frontend. I designed the screens together with our other designer, in constant back-and-forth, and took the lead on the host screen. Two developers built the gesture recognition and the real-time rooms that connect phones to the host screen. The game art was generated with AI by our other designer. I used Claude Design to set up the design system we built from.",
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
              title: "Design the attention, not just the screens",
              text: "Deciding what goes on each screen shaped how the room felt more than any single layout.",
            },
            {
              title: "Leave room in the input",
              text: "Correct gestures failed until we loosened recognition. Next time I'd test gestures on real phones in the first few hours, not the last.",
            },
            {
              title: "Give the losing player a job",
              text: "Sabotage made last place part of the game instead of the end of it.",
            },
          ],
        },
      ],
    },
  ],
  next: { label: "UCFHere", href: "/projects/ucfhere/case-study" },
};
