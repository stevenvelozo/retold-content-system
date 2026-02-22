# Editor Guide

The content editor is a browser-based application for editing markdown files and other text content. Open it by navigating to `/edit.html` on your running content system server.

## Layout

The editor has three main areas:

- **Top Bar** -- Shows the application name, current file name, save status, word/character stats, and action buttons (Save, Close).
- **Sidebar** -- A collapsible panel on the left with three tabs: Files, Reference, and Topics.
- **Editor Pane** -- The main editing area, which switches between a markdown editor and a code editor depending on the file type.

## File Browser

The **Files** tab in the sidebar shows the directory tree of your content folder. Click any file to open it in the editor. The browser supports:

- Navigating into subfolders by clicking folder names
- Breadcrumb navigation to move back up the directory tree
- A **New File** button (`+`) to create new markdown files
- An **Upload Image** button to add images to the current directory

### Creating a New File

Click the `+` button in the sidebar header. A form appears where you enter the filename. The file is created in the directory you are currently browsing. If you include a path separator (e.g. `guides/setup.md`), intermediate directories are created automatically.

### Uploading Images

Click the upload button (or press `Cmd+Shift+U` / `Ctrl+Shift+U`) to open the upload overlay. Drag an image onto the drop zone or click to select a file. The image is uploaded to the folder you are currently browsing, and a markdown image reference is copied to your clipboard for easy pasting into your document.

### Hidden Files

By default the file browser hides dotfiles and other hidden files. To show them, open the **Settings** gear icon in the sidebar and check **Show Hidden Files**.

## Markdown Editor

When you open a `.md` file, the editor loads a full CodeMirror-based markdown editing environment. Features include:

- Syntax highlighting for markdown
- Line numbers
- Word wrap (toggleable in settings)
- Editing controls toolbar with bold, italic, heading, link, image, list, code, and blockquote buttons
- Auto-segmentation that splits long documents into editable sections at heading boundaries

### Editing Controls

The toolbar above the editor provides one-click formatting. Select text and click a button to wrap it, or click with no selection to insert a template. Available controls:

| Button | Action |
|--------|--------|
| **B** | Bold (`**text**`) |
| *I* | Italic (`*text*`) |
| H1-H3 | Insert heading |
| Link | Insert `[text](url)` |
| Image | Insert `![alt](url)` |
| List | Insert bulleted list item |
| Code | Insert inline code or fenced code block |
| Quote | Insert blockquote |

### Auto-Segmentation

For long markdown files, enable **Auto-Segment Markdown** in the settings panel. This splits the document at heading boundaries into independently scrollable editor segments. You can set the segmentation depth (H1 only, H1-H2, etc.) to control how finely the document is divided. Each segment gets its own CodeMirror editor instance.

## Code Editor

Non-markdown text files (JSON, HTML, CSS, JavaScript, YAML, and 190+ other languages) open in a CodeJar-based code editor with highlight.js syntax highlighting. The editor automatically detects the language from the file extension.

The code editor supports:

- Syntax highlighting for the detected language
- Tab indentation
- Line numbers
- Auto-closing brackets and quotes
- Word wrap (toggleable independently from the markdown editor)

## Saving Files

Press `Cmd+S` (Mac) or `Ctrl+S` (Windows/Linux) to save the current file. The top bar shows save status:

- A gold **\*** next to the filename indicates unsaved changes
- **Saving...** appears during the save request
- **Saved** appears briefly on success
- **Save failed** appears if something goes wrong

The **Save** button only appears when you have unsaved changes.

## Closing Files

Press `Escape` or click the **Close** button in the top bar to close the current file. If you have unsaved changes, a confirmation dialog appears asking whether to discard changes or cancel.

The confirmation dialog supports keyboard shortcuts:

- `Y` -- Discard changes and close
- `N` or `Escape` -- Cancel and return to editing

## Sidebar Tabs

### Files Tab

The default tab showing the file browser tree. See the File Browser section above.

### Reference Tab

Press `F1` to toggle the Reference tab, which shows a live rendered preview of the current markdown file. The reference panel updates every time you save. This is useful for checking how your markdown renders while editing.

The reference panel includes a **View in Reader** link that opens the current file in the documentation reader (`/` route) in a new tab.

### Topics Tab

Press `F4` or `Cmd+Shift+T` / `Ctrl+Shift+T` to open the Topics tab. This panel manages `.pict_documentation_topics.json` files -- JSON manifests that map topic codes to help file paths and titles. See [Documentation Topics](topics.md) for details.

## Settings

Click the gear icon in the sidebar header to open the settings flyout. Available settings:

### Markdown Settings

- **Auto-Segment Markdown** -- Split documents at heading boundaries
- **Segmentation Depth** -- How deep to segment (H1, H2, H3)
- **Show Editing Controls** -- Toggle the formatting toolbar
- **Word Wrap** -- Enable word wrap in the markdown editor
- **Auto Content Preview** -- Automatically show the Reference panel

### Code Editor Settings

- **Word Wrap (Code)** -- Enable word wrap in the code editor

### Media Preview Settings

- **Auto-Preview Images** -- Show image thumbnails in the file browser
- **Auto-Preview Video** -- Show video players for video files
- **Auto-Preview Audio** -- Show audio players for audio files

### File Browser Settings

- **Show Hidden Files** -- Include dotfiles and hidden files in the file browser

Settings are persisted in your browser's localStorage and restored on each visit.
