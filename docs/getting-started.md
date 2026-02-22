# Getting Started

The Retold Content System is a local markdown editor and documentation viewer. Install it once with npm and point it at any folder of markdown files.

## Installation

Install globally from npm:

```bash
npm install -g retold-content-system
```

This gives you two equivalent CLI commands: `retold-content-system` and `rcs`.

## Quick Start

Create a folder with some markdown files and serve it:

```bash
mkdir my-docs
cd my-docs
echo "# Hello World" > README.md
rcs serve
```

The server starts on a random port between 7000 and 7999 and prints the URLs for both the reader and the editor:

```
  Retold Content System running on http://localhost:7042
  Reader:  http://localhost:7042/
  Editor:  http://localhost:7042/edit.html
```

Open the **Reader** URL for a pict-docuserve documentation viewer, or the **Editor** URL for the full editing environment.

## Choosing a Port

Pass `-p` to pin the server to a specific port:

```bash
rcs serve -p 8080
```

## Pointing at a Different Folder

Provide a content path as the first argument:

```bash
rcs serve ~/projects/my-wiki
```

If the target directory has a `content/` subfolder, the server uses that automatically. This means running `rcs serve` from a project root that has a `content/` directory does the right thing without extra arguments.

## What Gets Served

The content system sets up three static routes and several API endpoints:

| Route | Purpose |
|-------|---------|
| `/` | Documentation reader (pict-docuserve) |
| `/edit.html` | Content editor application |
| `/content/*` | Raw content files (markdown, images, etc.) |
| `/uploads/*` | Uploaded images |
| `/api/filebrowser/*` | File listing API |
| `/api/content/read/*` | File content read API |
| `/api/content/save/*` | File content save API |
| `/api/content/upload-image` | Image upload endpoint |

## Next Steps

- Read the [Editor Guide](editor-guide.md) for a walkthrough of the editing UI
- See the [CLI Reference](cli.md) for all command-line options
- Learn about [Documentation Topics](topics.md) for managing help topic manifests
