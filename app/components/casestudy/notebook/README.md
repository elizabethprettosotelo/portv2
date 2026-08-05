# Notebook Case Study System

This folder contains the reusable editorial case-study system used by `UCFHere`.

## Structure

- `CaseStudyLayout` keeps the page in a two-column editorial grid with a sticky navigation rail.
- `NotebookHero` renders the project title, summary, metadata, tags, and the large hero media slot.
- `CaseStudyDocument` turns the typed content schema into the actual sections.
- `CaseStudyNavigation` tracks the active section with `IntersectionObserver` and provides a mobile jump control.
- `MediaFrame` handles placeholder media and an accessible lightbox when a real image is provided.

## Content Schema

The content lives in [`ucfhere-content.ts`](./ucfhere-content.ts) and is typed with `CaseStudyDocumentData`.

Section kinds currently supported:

- `intro`
- `context`
- `problem`
- `goals`
- `flow`
- `chapters`
- `final`
- `accessibility`
- `outcomes`

## Where to Replace Copy and Media

- Update the hero text, metadata, and tags in [`ucfhere-content.ts`](./ucfhere-content.ts).
- Replace placeholder visuals by adding `src`, `alt`, and `caption` values to the relevant `MediaAsset` objects.
- The page-level return links live in the same data file so future case studies can swap them without touching layout code.

## Reuse Notes

To create another editorial case study, duplicate the content file, swap the values, and keep the same renderer components.
The reusable components are designed so future projects can add new media, new process chapters, or a different final-outcome block without rewriting the layout.
