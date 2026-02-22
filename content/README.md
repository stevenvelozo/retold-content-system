# Retold Content System

The Retold Content System is a markdown-based content management application built on the Retold ecosystem.

## Features

- **Reader Modereo** — Renders markdown content with full styling, code highlighting, and sidebar navigation
- **Editor Mode** — Edit markdown content in-place using a segmented CodeMirror-based editor
- **Image Upload** — Drag, paste, or pick images; they upload to the server and insert as URLs
- **Live Preview** — See rendered markdown alongside the editor in real-time
- **File Management** — Browse and edit any markdown file in the content directory

## Architecture

The system combines two Retold components:

1. **Orator** — A Node.js web server (built on Restify) that serves static files and provides REST APIs for content management
2. **Pict** — A browser-side MVC framework that powers both the reader and editor applications

The reader application extends `pict-docuserve` for documentation viewing. The editor application uses `pict-section-markdowneditor` for markdown editing.

## Quick Start

```bash
cd app/retold-content-system
npm install
npm run build-all
npm start
```

![Squirrel-003-Processed-10k](/uploads/1771723928061-Squirrel-003-Processed-10k.png)

Then open:
- Reader: http://localhost:8086/
- Editor: http://localhost:8086/edit.html
