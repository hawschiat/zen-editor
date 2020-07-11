import ZenEditor from "./editor";
import ZenToolbar from "./toolbar";

interface EditorConfiguration {}

// Define custom components
customElements.define("zen-editor", ZenEditor);
customElements.define("zen-toolbar", ZenToolbar);

// Attach Material icons stylesheet to DOM
const fontStyle = document.createElement("link");
fontStyle.rel = "stylesheet";
fontStyle.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(fontStyle);
