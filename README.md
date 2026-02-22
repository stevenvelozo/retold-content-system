# Retold Content System

A markdown content editor and documentation viewer built on the [Retold](https://github.com/stevenvelozo/retold) ecosystem. Point it at any folder of markdown files and get a local editing environment with a file browser, rich markdown editor, syntax-highlighted code editor, live preview, image uploads, and documentation topics management.

## Install

```bash
npm install -g retold-content-system
```

## Quick Start

```bash
mkdir my-docs && cd my-docs
echo "# Hello" > README.md
rcs serve
```

Open the printed URL in your browser. The reader is at `/` and the editor is at `/edit.html`.

## CLI

The package installs two equivalent commands: `retold-content-system` and `rcs`.

### `rcs serve [content-path] [-p port]`

Start the content system server.

| Argument / Option | Description |
|-------------------|-------------|
| `[content-path]` | Path to the content folder (default: current directory) |
| `-p, --port` | Port number (default: random 7000-7999) |

```bash
# Serve current directory on a random port
rcs serve

# Serve a specific folder on port 8080
rcs serve ~/my-wiki -p 8080
```

If the directory contains a `content/` subfolder, it is used automatically.

## Editor Features

- **File Browser** -- Tree view sidebar with folder navigation, new file creation, and image uploads
- **Markdown Editor** -- CodeMirror-based editor with formatting toolbar, auto-segmentation at heading boundaries, and word wrap
- **Code Editor** -- CodeJar + highlight.js editor for JSON, HTML, CSS, YAML, and 190+ languages
- **Live Preview** -- Reference panel showing rendered markdown, toggled with F1
- **Topics Panel** -- Manage `.pict_documentation_topics.json` manifests linking topic codes to files and line numbers
- **Settings** -- Configurable segmentation depth, word wrap, media preview, hidden files, and more (persisted in localStorage)

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl+S` | Save |
| `Escape` | Close file (with unsaved-changes confirmation) |
| `F1` | Toggle Reference panel |
| `F2` | Toggle sidebar |
| `F3` / `Cmd/Ctrl+Shift+U` | Upload image |
| `F4` / `Cmd/Ctrl+Shift+T` | Topics tab (creates linked topic from cursor in markdown) |

## Documentation Reader

The root URL (`/`) serves a pict-docuserve documentation viewer. If your content folder includes `cover.md`, `_sidebar.md`, and `_topbar.md`, the reader uses them for navigation. Otherwise it renders markdown files directly.

## Architecture

Built on these Retold modules:

- **[Orator](https://github.com/stevenvelozo/orator)** -- HTTP server with Restify
- **[Pict](https://github.com/stevenvelozo/pict)** -- MVC framework for the browser applications
- **[pict-docuserve](https://github.com/stevenvelozo/pict-docuserve)** -- Documentation reader/viewer
- **[pict-section-markdowneditor](https://github.com/stevenvelozo/pict-section-markdowneditor)** -- CodeMirror markdown editor component
- **[pict-section-code](https://github.com/stevenvelozo/pict-section-code)** -- CodeJar code editor component
- **[pict-section-filebrowser](https://github.com/stevenvelozo/pict-section-filebrowser)** -- File browser component
- **[pict-service-commandlineutility](https://github.com/stevenvelozo/pict-service-commandlineutility)** -- CLI framework

## Development

```bash
# Clone and install
git clone https://github.com/stevenvelozo/retold.git
cd retold/app/retold-content-system
npm install

# Build everything (CodeMirror bundle, CodeJar bundle, application bundle)
npm run build-all

# Start the dev server
npm start
```

The build uses [Quackage](https://github.com/stevenvelozo/quackage) for the main application bundle and esbuild for the CodeMirror and CodeJar editor bundles.

## Documentation

Full documentation is in the `docs/` folder and can be viewed with the content system itself:

```bash
rcs serve docs/
```

## License

MIT
