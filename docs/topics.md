# Documentation Topics

The Topics system manages `.pict_documentation_topics.json` files -- JSON manifests that map topic codes to documentation files. These manifests are used by applications with built-in help systems to link context-sensitive help codes to specific markdown files and line numbers.

## Topics File Format

A topics file is a JSON object where each key is a unique topic code:

```json
{
    "Getting-Started": {
        "TopicCode": "Getting-Started",
        "TopicHelpFilePath": "guides/getting-started.md",
        "TopicTitle": "Getting Started Guide"
    },
    "Max-Function": {
        "TopicCode": "Max-Function",
        "TopicHelpFilePath": "functions/func-reference-max.md",
        "TopicTitle": "Max function",
        "RelevantMarkdownLine": 23
    }
}
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `TopicCode` | Yes | A unique string identifier for the topic. Used as the lookup key by applications. |
| `TopicHelpFilePath` | Yes | Relative path from the content root to the markdown file for this topic. |
| `TopicTitle` | Yes | Human-readable title for the topic. |
| `RelevantMarkdownLine` | No | Line number in the markdown file where the relevant content begins. Used for scrolling to context. |

## Using the Topics Panel

Open the Topics tab by pressing `F4` or `Cmd+Shift+T` / `Ctrl+Shift+T`, or by clicking the **Topics** tab in the sidebar.

### Loading a Topics File

On first launch, the editor attempts to load `.pict_documentation_topics.json` from the content root. If the file does not exist, the panel shows an empty state with two options:

- **Load .pict_documentation_topics.json** -- Creates the default file and opens it
- **Select file...** -- Enter a custom path to a topics JSON file anywhere in your content folder

The topics file path is persisted in your browser settings and restored on future visits.

### Adding Topics

Click the **+ Add Topic** button at the bottom of the topic list. A new row appears in edit mode with empty fields. Fill in the topic code, title, and file path, then click **Save**.

### Quick Topic from Cursor (F4)

While editing a markdown file, press `F4` to create a topic pre-filled with:

- **TopicHelpFilePath** set to the current file
- **RelevantMarkdownLine** set to your cursor's line number
- **TopicTitle** set to the first heading found in the document

The Topics tab opens with the new entry in edit mode so you can adjust the topic code and title before saving.

### Editing Topics

Click the pencil icon on any topic row to switch it to inline edit mode. The row expands to show fields for all four properties. Click **Save** to commit changes or **Cancel** to discard.

If you change a topic code, the editor checks for uniqueness. Duplicate codes are not allowed.

### Deleting Topics

Click the trash icon on a topic row. A browser confirmation dialog appears. Once confirmed, the topic is removed and the file is saved.

### Navigating to a Topic's File

Click the arrow icon on a topic row to open that topic's linked file in the editor. If the topic has a `RelevantMarkdownLine`, the editor scrolls to that line after opening the file.

### Closing the Topics File

Click the **X** button in the topics panel header to unload the topics file and return to the empty state. The topics file itself is not deleted -- it remains on disk.

## Integration with Applications

Applications that use `.pict_documentation_topics.json` can load the manifest and look up topics by code to show context-sensitive help. For example, a form builder might use `TopicCode` values to link each field to a help article, then open the documentation reader at the relevant file and line.

The content system's reader app (served at `/`) can display any markdown file from the content folder, making it a natural companion for the topics manifest.
