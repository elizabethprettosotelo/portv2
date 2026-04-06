import CaseStudyHero from "../../components/casestudy/CaseStudyHero";
import CaseStudyMeta from "../../components/casestudy/CaseStudyMeta";
import CaseStudyOverview from "../../components/casestudy/CaseStudyOverview";
import CaseStudyProblem from "../../components/casestudy/CaseStudyProblem";
import CaseStudySolution from "../../components/casestudy/CaseStudySolution";
import CaseStudyPersona from "../../components/casestudy/CaseStudyPersona";
import CaseStudyResults from "../../components/casestudy/CaseStudyResults";
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
          />

          {/* Overview */}
          <CaseStudyOverview
            overview={`Conduit is an open-source, multimodal accessibility platform that unifies EEG, gaze tracking, voice detection, and ASL recognition into one adaptive interface.

Built in just 36 hours during Hackalytics @ Georgia Tech, this project reimagines accessibility as a fluid system that bends to individual needs rather than forcing users into rigid interaction patterns.`}
          />

          {/* Problem */}
          <CaseStudyProblem
            problem={`Modern accessibility tools create fragmented experiences:

• Cost-prohibitive and locked into single-input methods
• Difficult to customize for individual needs
• No seamless switching between voice, eye tracking, or gesture
• High cognitive load from learning multiple systems
• Limited adaptability to changing physical/emotional states`}
            problemImage="/project1-problem.jpg"
          />

          {/* Personas */}
          <CaseStudyPersona
            title="User Personas"
            personas={[
              {
                name: "Alex Chen",
                age: "22",
                occupation: "College Student",
                location: "Atlanta, GA",
                quote: "I just want technology to work with me, not against me.",
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
                quote: "My hands speak—technology should listen.",
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
                quote: "Some days I can type, some days I can't. My tools should adapt.",
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

          {/* Solution */}
          <CaseStudySolution
            solution={`Conduit creates a unified multimodal hub where users mix EEG signals, gaze tracking, voice commands, and ASL gestures within one adaptive interface.

The system provides input smoothing, cursor snapping, progressive disclosure, and real-time modality switching—making complex accessibility feel intuitive and personal.`}
            solutionSections={[
              {
                title: "Research & Discovery",
                content: `Conducted caregiver interviews and accessibility research to understand pain points across different conditions. Mapped interaction patterns and cognitive load factors for each modality.`,
                image: "/project1-research.jpg",
              },
              {
                title: "Adaptive Interaction Design",
                content: `Designed core patterns like input smoothing, magnetic snapping, and multimodal redundancy. Interfaces flex dynamically based on precision levels and cognitive load.`,
                image: "/project1-interactions.jpg",
              },
              {
                title: "High-Fidelity Prototype",
                content: `Built complete Figma prototype simulating end-to-end experience: onboarding, input switching, dashboard customization, and real-time feedback visualization.`,
                image: "/project1-prototype.jpg",
              },
            ]}
          />

          {/* Results */}
          <CaseStudyResults
            results={`Conduit demonstrated how accessibility can be both technically sophisticated and emotionally intuitive, validating multimodal design as the future of inclusive computing.`}
            metrics={[
              { value: "3", label: "Core Personas Defined" },
              { value: "4", label: "Input Modalities Unified" },
              { value: "100%", label: "Hackathon Prototype Completeness" },
            ]}
            resultsImage="/project1-results.jpg"
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

