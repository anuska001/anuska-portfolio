# Implementation Plan — Google Drive & Local PDF Support for Case Studies

Integrate direct Google Drive and Google Slides embed support into the Project Drawer case study view, while maintaining seamless support for local PDF files uploaded to `case-studies/`.

---

## 1. Context & Architecture

The user requested the ability to include a Google Drive link instead of having to manually upload a local PDF each time updates are made to their slide deck or case study document.
Based on the clarifying answers:
- **Presentation Mode**: Direct Google Drive embed with a quick "Open in Drive" link.
- **Dual Support**: Projects can display either a live Google Drive embed or a local PDF file from `case-studies/`, or gracefully fall back to a reserved presentation placeholder.

---

## 2. Proposed Changes

### A. Data Model (`src/types.ts`)
- Add `driveUrl?: string` to the `Project` interface (alongside `pdfUrl?: string`).
- Add optional `embedType?: 'drive' | 'pdf'` for explicit priority if both are specified.

### B. Google Drive Embed Utility (`src/utils/googleDrive.ts`)
- Implement a robust URL parser and embed converter:
  - Google Drive Files (`https://drive.google.com/file/d/{ID}/view...` or `.../open?id={ID}`) $\rightarrow$ `https://drive.google.com/file/d/{ID}/preview`
  - Google Slides (`https://docs.google.com/presentation/d/{ID}/edit...`) $\rightarrow$ `https://docs.google.com/presentation/d/{ID}/embed?start=false&loop=false&delayms=3000`
  - Google Docs (`https://docs.google.com/document/d/{ID}/edit...`) $\rightarrow$ `https://docs.google.com/document/d/{ID}/preview`
  - Generic or already formatted embed URLs preserved.

### C. Embedded Presentation Viewer (`src/components/ProjectDrawer.tsx` / `GoogleDriveEmbed.tsx`)
- When `project.driveUrl` is present:
  - Render a responsive, clean, high-resolution iframe embed (16:9 aspect ratio standard for presentation slide decks).
  - Include an elegant header bar with a Google Drive indicator badge, presentation title, and an "Open in Google Drive" external link button (with open icon).
  - Add a smooth loading state with an animated spinner while the Google Drive preview loads.
- When `project.pdfUrl` is present (and no `driveUrl`):
  - Render the existing high-resolution canvas `PdfViewer` component with "Open in New Tab" link.
- When both are configured:
  - Provide a subtle segmented toggle `[Google Drive | PDF Document]` allowing the viewer to switch between the live cloud deck and the local archival PDF.
- When neither is configured:
  - Display the reserved presentation space with clear instructions on how to add either a `driveUrl` or `pdfUrl` in `src/content.ts`.

### D. Content & Demonstration Configuration (`src/content.ts`)
- Keep Project 2 configured with the user's current case study (with sample `driveUrl` placeholder and local PDF fallback).
- Ensure Project 1 and Project 3 retain clear placeholder configuration for easy editing.

---

## 3. Verification Plan

- **Automated Verification**:
  - Run `compile_applet` to verify TypeScript typings and build integrity.
  - Run `lint_applet` to verify ESLint compliance.
- **Functional Checks**:
  - Open Project 2 drawer: verify embed rendering, responsive resizing, and external open link.
  - Verify seamless fallback when switching between projects with Drive links, local PDFs, or placeholder states.
