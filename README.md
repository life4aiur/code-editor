# CodeEditor

A React-based embeddable code editor with live HTML/CSS/JS preview.

## Features

- Live HTML, CSS, and JavaScript editing
- Real-time preview with console output
- Embeddable as a standalone widget
- JSON import/export of editor state

## Usage

### 1. Build the UMD Bundle

```sh
npm install
npm run build
```

This will generate `dist/code-editor.umd.js`.

### 2. Embed in Your Webpage

Add the following to your HTML:

```html
<div id="editor-container"></div>
<script src="dist/code-editor.umd.js"></script>
<script>
  // Provide scripts and styles for the preview iframe
  const scripts = [
    // Example: "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"
  ];
  const styles = [
    // Example: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  ];

  // Initialize the embedded editor
  const editor = new CodeEditor('#editor-container', {
    scripts, // Array of JS URLs for the preview iframe
    styles   // Array of CSS URLs for the preview iframe
  });
</script>
```

### 3. Editor State Import/Export

- **Export:** Click the Save button to download the current state as a JSON file.
- **Import:** Click the Upload button and select a previously saved JSON file to restore the editor state.

---

For development and contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).
