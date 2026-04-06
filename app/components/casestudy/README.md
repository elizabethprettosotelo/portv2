# Case Study Components

Modular components for building custom case study pages. Each component can be used independently or combined to create flexible case study layouts.

## Components

### CaseStudyHero
Full-width hero section with image overlay.
- **Props**: `title`, `subtitle`, `heroImage`

### CaseStudyMeta
Project metadata bar with role, timeline, tools, and tags.
- **Props**: `role`, `timeline`, `tools[]`, `tags[]`

### CaseStudyOverview
Overview section with icon and content.
- **Props**: `overview`

### CaseStudyProblem
Problem statement section.
- **Props**: `problem`, `problemImage?`, `icon?`, `title?`
- **Includes**: Divider line above

### CaseStudySolution
Solution section with optional subsections.
- **Props**: `solution`, `solutionSections?[]`, `icon?`, `title?`
- **Includes**: Divider line above

### CaseStudyResults
Results section with optional metrics and image.
- **Props**: `results`, `metrics?[]`, `resultsImage?`, `icon?`, `title?`
- **Includes**: Divider line above

### CaseStudyGallery
Image gallery grid (2 columns).
- **Props**: `gallery[]`, `title?`
- **Includes**: Divider line above

### CaseStudyCTA
Call-to-action button (typically "Back to Projects").
- **Props**: `text?`, `href?`

## Usage

### Full Case Study (All Components)
```tsx
import CaseStudyHero from "../../components/casestudy/CaseStudyHero";
import CaseStudyMeta from "../../components/casestudy/CaseStudyMeta";
// ... import other components

<CaseStudyHero title="..." subtitle="..." heroImage="..." />
<CaseStudyMeta role="..." timeline="..." tools={[...]} tags={[...]} />
<CaseStudyOverview overview="..." />
<CaseStudyProblem problem="..." />
<CaseStudySolution solution="..." />
<CaseStudyResults results="..." />
<CaseStudyGallery gallery={[...]} />
<CaseStudyCTA />
```

### Minimal Case Study (Essential Components Only)
```tsx
<CaseStudyHero title="..." subtitle="..." heroImage="..." />
<CaseStudyMeta role="..." timeline="..." tools={[...]} tags={[...]} />
<CaseStudyProblem problem="..." />
<CaseStudySolution solution="..." />
<CaseStudyCTA />
```

### Custom Icons and Titles
```tsx
<CaseStudyProblem 
  title="The Challenge" 
  icon="🎯" 
  problem="..." 
/>
<CaseStudySolution 
  title="Our Approach" 
  icon="🚀" 
  solution="..." 
/>
```

## Examples

See:
- `projects/project-one/page.tsx` - Full case study with all sections
- `projects/project-two/page.tsx` - Minimal case study with custom icons
