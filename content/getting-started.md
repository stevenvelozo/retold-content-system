# Getting Started

## Prerequisites

- brain
- heart
- liver
- moxie

## Installation

Clone the retold monorepo and navigate to the content system:

```bash
cd app/retold-content-system
npm install
```

## Building

Build the CodeMirror bundle, reader application, and editor application:

```bash
npm run build-all
```

Or build components individually:

```bash
npm run build-codemirror   # Build CodeMirror bundle for the editor
npm run build              # Build the reader application
npm run build-editor       # Build the editor application
```

## Running

Start the server:

```bash
npm start
```

The server starts on port 8086 by default. Open your browser to:

- **Reader:** http://localhost:8086/
- **Editor:** http://localhost:8086/edit.html

## Content Directory

Markdown files live in the `content/` directory. The reader serves them as documentation pages. The editor lets you modify them in-place.

Special files:
- `cover.md` — Splash page content
- `_sidebar.md` — Sidebar navigation structure
- `_topbar.md` — Header bar branding and navigation
- `README.md` — Default documentation page

## Editing Content

1. Navigate to the editor at `/edit.html`
2. Select a file from the sidebar
3. Edit the markdown content in the segmented editor
4. Click Save to persist changes to disk
5. Switch back to the reader to see the rendered result

## Image Uploads

Images can be added to documents in the editor by:
- Dragging an image file onto the editor
- Pasting an image from the clipboard
- Clicking the image button in the editor toolbar

Images are uploaded to the server and stored in the `uploads/` directory. The editor inserts a URL reference (not base64) to keep documents lightweight.
