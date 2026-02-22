# Keyboard Shortcuts

All keyboard shortcuts work while the editor is focused. On Mac, `Cmd` is the modifier; on Windows and Linux, use `Ctrl`.

## File Operations

| Shortcut | Action |
|----------|--------|
| `Cmd+S` / `Ctrl+S` | Save the current file |
| `Escape` | Close the current file (prompts if unsaved) |

## Close Confirmation Dialog

When closing a file with unsaved changes, the confirmation dialog responds to:

| Key | Action |
|-----|--------|
| `Y` | Discard changes and close |
| `N` | Cancel (keep editing) |
| `Escape` | Cancel (keep editing) |

## Sidebar Navigation

| Shortcut | Action |
|----------|--------|
| `F1` | Toggle the Reference (preview) panel |
| `F2` | Toggle the sidebar open/closed |
| `F3` or `Cmd+Shift+U` / `Ctrl+Shift+U` | Open the image upload form |
| `F4` or `Cmd+Shift+T` / `Ctrl+Shift+T` | Open Topics tab (creates a linked topic if in a markdown file) |

## F4 Context-Aware Behavior

When pressed while editing a markdown file, `F4` does more than just switch tabs. It:

1. Reads the current cursor line number in the markdown editor
2. Extracts the first heading from the document as a default title
3. Creates a new topic entry linked to the current file and line number
4. Opens the Topics tab with the new entry in edit mode

When pressed while editing a non-markdown file or with no file open, `F4` simply switches the sidebar to the Topics tab.
