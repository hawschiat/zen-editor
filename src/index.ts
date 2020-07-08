export interface EditorConfiguration {}

export function init(el: HTMLDivElement): void {
  el.classList.add("zen-container");
  // Initialize editor element
  const editor = createEditor();
  // Initialize toolbar element
  const toolbar = createToolbar();
  el.appendChild(editor);
  el.appendChild(toolbar);
}

function createEditor(): HTMLDivElement {
  const editor = document.createElement("div");
  editor.classList.add("zen-editor");
  editor.setAttribute("contentEditable", "true");
  document.execCommand("defaultParagraphSeparator", false, "p");
  return editor;
}

function createToolbar(): HTMLDivElement {
  const toolbar = document.createElement("div");
  toolbar.classList.add("zen-toolbar");
  toolbar.appendChild(createIconButton("format_bold"));
  toolbar.appendChild(createIconButton("format_italic"));
  toolbar.appendChild(createIconButton("format_underline"));
  toolbar.appendChild(createIconButton("strikethrough_s"));
  return toolbar;
}

function createIconButton(
  iconName: string,
  onClick: (ev: MouseEvent) => any = () => {}
): HTMLElement {
  const btn = document.createElement("div");
  btn.classList.add("toolbar-btn");
  const icon = document.createElement("i");
  icon.classList.add("material-icons");
  icon.textContent = iconName;
  icon.onclick = onClick;
  btn.appendChild(icon);
  return btn;
}
