# Zen Editor

A simplistic, pure JS-based WYSIWYG editor built as a [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). View the demo [here](https://hawschiat.github.io/zen-editor/).

This version contains two custom elements - `zen-editor` and `zen-toolbar`. To use the editor, simply load `index.js` from the `dist` folder and put `<zen-editor></zen-editor>` anywhere in the body of your HTML file.

#### Component Design

##### Editor

The editor is simply a `<div>` element with `contenteditable` attribute set to `true`. It has a selection handler attached, which gets fired everytime a user selects its content. The handler detects the properties of the selected text (bolded, italicized, etc.) by traversing the DOM tree and match the node names (element tag names). It then activates the corresponding buttons in the toolbar.

Currently, the editor only supports four commands - _bold_, _italic_, _underline_ and _strikethrough_. The commands are executed using `document.execCommand`. However, I plan to build custom functions for those commands since `document.execCommand` is already labeled as [obsolete](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand).

##### Toolbar

The toolbar contains buttons for the aforementioned commands. Each button uses a [Material Design icon](https://material.io/resources/icons/) and dispatches a custom event on click, which will then be handled by the editor.
