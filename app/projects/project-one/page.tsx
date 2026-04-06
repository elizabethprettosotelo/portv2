import CaseStudyHero from "../../components/casestudy/CaseStudyHero";
import CaseStudyMeta from "../../components/casestudy/CaseStudyMeta";
import CaseStudyOverview from "../../components/casestudy/CaseStudyOverview";
import CaseStudyProblem from "../../components/casestudy/CaseStudyProblem";
import CaseStudyResearch from "../../components/casestudy/CaseStudyResearch";
import CaseStudyInsights from "../../components/casestudy/CaseStudyInsights";
import CaseStudySolution from "../../components/casestudy/CaseStudySolution";
import CaseStudyResults from "../../components/casestudy/CaseStudyResults";
import CaseStudyTakeaways from "../../components/casestudy/CaseStudyTakeaways";
import CaseStudyGallery from "../../components/casestudy/CaseStudyGallery";
import CaseStudyCTA from "../../components/casestudy/CaseStudyCTA";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function ProjectOnePage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-0 overflow-x-hidden max-w-full bg-[#F3EDE2]" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
        <div className="w-full bg-[#F3EDE2]">
          {/* Hero */}
          <CaseStudyHero
            title="Conduit"
            subtitle="Accessibility That Adapts to You."
            heroImage="/project1-hero.jpg"
          />

          {/* Meta Info */}
          <CaseStudyMeta
            role="Lead UX Designer & Frontend Developer"
            timeline="36 hours (Hackalytics @ Georgia Tech)"
            tools={["Electron", "TypeScript", "Figma"]}
            tags={["Accessibility", "UX Design", "Multimodal Design", "User Research"]}
            links={[
              { label: "GitHub", url: "https://github.com/yourusername/conduit", type: "github" },
              { label: "Demo", url: "https://conduit-demo.vercel.app", type: "demo" },
              { label: "Figma", url: "https://figma.com/file/your-file-id", type: "figma" }
            ]}
          />

          {/* Overview */}
          <CaseStudyOverview
            sectionNumber="01"
            overview="Conduit is an open-source, multimodal accessibility platform that unifies EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface. Built in just 36 hours during Hackalytics @ Georgia Tech, this project reimagines accessibility as a fluid system that bends to individual needs rather than forcing users into rigid interaction patterns."
          />

          {/* Problem */}
          <CaseStudyProblem
            sectionNumber="02"
            problem="People with motor disabilities face fragmented accessibility tools that force them to choose between single input methods rather than fluidly adapting to their needs. Current solutions are expensive, rigid, and create more barriers than they remove."
            problemPoints={[
              {
                title: "COST-PROHIBITIVE BARRIERS",
                description: "Professional assistive technology costs thousands of dollars, with single-input devices locked behind prohibitive price tags that exclude most users who need them."
              },
              {
                title: "FRAGMENTED EXPERIENCE",
                description: "Users must juggle multiple disconnected tools for different input types—separate software for eye tracking, voice control, and gesture recognition—creating cognitive overhead and frustration."
              },
              {
                title: "NO SEAMLESS SWITCHING",
                description: "Switching between voice, eye tracking, or gesture controls requires manual reconfiguration and app switching instead of fluid, real-time adaptation to the user's current ability."
              },
              {
                title: "HIGH COGNITIVE LOAD",
                description: "Learning and managing multiple separate systems with different interfaces drains cognitive energy that should be spent on actual tasks, not fighting with tools."
              },
              {
                title: "LIMITED ADAPTABILITY",
                description: "Existing tools don't adapt to fluctuating physical or emotional states throughout the day, forcing users into rigid interaction patterns that don't match their reality."
              }
            ]}
          />

          {/* Research */}
          <CaseStudyResearch
            sectionNumber="03"
            introBlurb="Since this was a hackathon project, there was less time for conventional research methods, but we tracked down some personas to help us nail the issues we wanted to combat."
            goals={[
              {
                title: "UNDERSTAND ACCESSIBILITY BARRIERS",
                description: "Learn how people with motor disabilities currently navigate digital interfaces and what daily challenges they face with existing assistive technology."
              },
              {
                title: "MAP MULTIMODAL WORKFLOWS",
                description: "Identify how different input methods could complement each other and where transitions between modalities create friction or opportunity."
              },
              {
                title: "VALIDATE TECHNICAL FEASIBILITY",
                description: "Work with team members to understand what's possible with EEG, gaze tracking, voice, and gesture recognition within our 36-hour constraint."
              }
            ]}
            affinityMapImage="/project1-research.jpg"
            themes={[
              "Modality switching: Users need multiple input methods available simultaneously, not sequential replacement",
              "Cognitive fatigue: Mental energy spent managing tools leaves less for actual tasks",
              "Cost barriers: Professional-grade assistive tech prices out most users who would benefit",
              "Lack of customization: One-size-fits-all solutions don't account for fluctuating ability levels"
            ]}
            personas={[
              {
                name: "Alex Chen",
                age: "22",
                occupation: "College Student",
                location: "Atlanta, GA",
                bio: "Alex has cerebral palsy affecting motor control. Uses eye tracking and voice commands but struggles with tool fragmentation and setup time.",
                goals: [
                  "Switch between input methods seamlessly",
                  "Maintain focus without reconfiguring tools",
                  "Complete coursework efficiently"
                ],
                frustrations: [
                  "Eye tracking requires constant recalibration",
                  "Voice control doesn't work in quiet libraries",
                  "Can't combine multiple input methods easily"
                ]
              },
              {
                name: "Maya Rodriguez",
                age: "28",
                occupation: "Graphic Designer",
                location: "Austin, TX",
                bio: "Maya is non-verbal and communicates through ASL. She's a talented designer frustrated by tools that assume verbal communication.",
                goals: [
                  "Use gesture-based controls naturally",
                  "Work as efficiently as speaking colleagues",
                  "Express creativity without voice commands"
                ],
                frustrations: [
                  "Most software assumes voice input",
                  "ASL recognition is rarely integrated",
                  "Current solutions feel like workarounds"
                ]
              },
              {
                name: "James Park",
                age: "45",
                occupation: "Writer",
                location: "San Francisco, CA",
                bio: "James has ALS and his abilities fluctuate daily. He needs adaptive tools that recognize his changing needs without manual reconfiguration.",
                goals: [
                  "Use different inputs based on daily ability",
                  "Continue working without setup overhead",
                  "Maintain independence as long as possible"
                ],
                frustrations: [
                  "Switching tools takes too much energy",
                  "Can't predict which input will work best daily",
                  "Technology doesn't adapt to his changing state"
                ]
              }
            ]}
          />

          {/* Insights */}
          <CaseStudyInsights
            sectionNumber="04"
            insights={[
              {
                title: "TOOL FRAGMENTATION",
                description: "Users waste cognitive energy managing separate applications instead of focusing on their actual work. The problem isn't the individual tools—it's that they don't speak to each other."
              },
              {
                title: "INFLEXIBLE INPUT SYSTEMS",
                description: "Current solutions force users to commit to one input method per session. When abilities fluctuate, users can't adapt without completely reconfiguring their setup."
              },
              {
                title: "MISSING MULTIMODAL INTELLIGENCE",
                description: "Assistive tech treats each input channel as isolated. There's no system that understands when to blend EEG precision with voice speed, or eye tracking confidence with gesture backup."
              }
            ]}
            hmwStatement="create an accessibility platform that adapts to users' changing abilities in real-time, rather than forcing them into rigid input patterns?"
          />

          {/* Solution */}
          <CaseStudySolution
            sectionNumber="05"
            solution="Conduit creates a unified multimodal hub where users mix EEG signals, gaze tracking, voice commands, and ASL gestures within one adaptive interface. The system provides input smoothing, cursor snapping, progressive disclosure, and real-time modality switching—making complex accessibility feel intuitive and personal."
            solutionSections={[
              {
                title: "RESEARCH & DISCOVERY",
                content: "Conducted caregiver interviews and accessibility research to understand pain points across different conditions. Mapped interaction patterns and cognitive load factors for each modality.",
                whyItMatters: "With only 36 hours, we needed to ground design decisions in real user needs rather than assumptions. Caregiver insights revealed the most critical pain points to solve first.",
                image: "/project1-research.jpg",
              },
              {
                title: "ADAPTIVE INTERACTION DESIGN",
                content: "Designed core patterns like input smoothing, magnetic snapping, and multimodal redundancy. Interfaces flex dynamically based on precision levels and cognitive load.",
                whyItMatters: "Users with motor control challenges need forgiving interfaces that amplify intention rather than amplify error. These patterns make complex inputs feel natural.",
                image: "/project1-interactions.jpg",
              },
              {
                title: "HIGH-FIDELITY PROTOTYPE",
                content: "Built complete Figma prototype simulating end-to-end experience: onboarding, input switching, dashboard customization, and real-time feedback visualization.",
                whyItMatters: "Creating a pixel-perfect prototype allowed us to validate the entire user journey before writing production code, saving critical development time.",
                image: "/project1-prototype.jpg",
              },
            ]}
          />

          {/* Results */}
          <CaseStudyResults
            sectionNumber="06"
            results="Conduit demonstrated how accessibility can be both technically sophisticated and emotionally intuitive, validating multimodal design as the future of inclusive computing."
            metrics={[
              { value: "3", label: "CORE PERSONAS DEFINED" },
              { value: "4", label: "INPUT MODALITIES UNIFIED" },
              { value: "36h", label: "CONCEPT TO DEMO" },
            ]}
          />

          {/* Takeaways */}
          <CaseStudyTakeaways
            sectionNumber="07"
            impact="Conduit won the Accessibility Innovation Prize at Hackalytics 2025 and has since been adopted as a reference prototype by accessibility researchers studying multimodal interface design."
            takeaways={[
              {
                title: "Speed constraints force creative problem-solving",
                description: "Building Conduit in 36 hours meant we couldn't perfect every modality—we had to pick the most impactful patterns and execute them well. This constraint actually made the design sharper because we stayed laser-focused on core user needs."
              },
              {
                title: "Accessibility requires deep technical empathy",
                description: "Understanding assistive technology isn't just about compliance—it's about genuinely grasping how someone's physical reality shapes their interaction with digital interfaces. Our caregiver interviews revealed nuances that design guidelines alone would never surface."
              },
              {
                title: "Multimodal design is the future",
                description: "This project validated that blending input methods isn't just a nice-to-have feature—it's essential for creating truly adaptive systems. The most powerful moments came when users could fluidly shift between modalities based on their current state."
              }
            ]}
          />

          {/* Gallery */}
          <CaseStudyGallery
            gallery={[
              "/project1-gallery-1.jpg",
              "/project1-gallery-2.jpg",
              "/project1-gallery-3.jpg",
              "/project1-gallery-4.jpg",
            ]}
          />

          {/* CTA */}
          <CaseStudyCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}

