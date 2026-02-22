# CLI Reference

The Retold Content System installs two equivalent commands: `retold-content-system` and the shorthand `rcs`. All examples below use `rcs`.

## serve

Start the content system server for a content folder.

```bash
rcs serve [content-path] [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `[content-path]` | Path to the markdown content folder. Defaults to the current directory. |

### Options

| Option | Description |
|--------|-------------|
| `-p, --port [port]` | Port to serve on. Defaults to a random port between 7000 and 7999. |

### Examples

**Serve the current directory on a random port:**

```bash
rcs serve
```

**Serve a specific folder on port 8080:**

```bash
rcs serve ~/my-docs -p 8080
```

**Serve a project with a content/ subfolder:**

```bash
cd ~/my-project
rcs serve
```

If the current directory contains a `content/` subfolder, the server automatically uses that as the content root. No extra path argument is needed.

### Output

On startup the server prints a banner with all relevant paths and URLs:

```
  Retold Content System running on http://localhost:7042
  Content: /Users/you/my-docs
  Uploads: /Users/you/my-docs/uploads
  Assets:  /path/to/retold-content-system/web-application
  Reader:  http://localhost:7042/
  Editor:  http://localhost:7042/edit.html
```

Press `Ctrl+C` to stop the server.

### Server API

The server exposes a set of REST endpoints that both the reader and editor applications use:

**File Browser**

- `GET /api/filebrowser/list` -- List files and folders in the content directory
- `GET /api/filebrowser/list/*` -- List files in a subdirectory
- `PUT /api/filebrowser/settings` -- Toggle file browser options (e.g. show hidden files)

**Content**

- `GET /api/content/read/*` -- Read the raw content of a file
- `PUT /api/content/save/*` -- Save content to a file (create or overwrite)
- `POST /api/content/upload-image` -- Upload an image file into the content folder

**Static Routes**

- `/` -- The pict-docuserve documentation reader
- `/edit.html` -- The content editor application
- `/content/*` -- Raw content files served directly
- `/uploads/*` -- Uploaded image files

## Usage with npx

If you prefer not to install globally, run directly with npx:

```bash
npx retold-content-system serve ~/my-docs -p 9000
```

## Programmatic Use

The server setup is also available as a module for embedding in other Node.js applications:

```javascript
const setupServer = require('retold-content-system/source/cli/ContentSystem-Server-Setup.js');

setupServer(
    {
        ContentPath: '/path/to/content',
        UploadPath: '/path/to/content/uploads',
        DistPath: '/path/to/retold-content-system/web-application',
        Port: 8080
    },
    function (pError, pServerInfo)
    {
        if (pError)
        {
            console.error('Failed to start:', pError);
            return;
        }
        console.log('Server running on port', pServerInfo.Port);
    });
```

The callback receives an object with `Fable`, `Orator`, and `Port` properties for further customization.
