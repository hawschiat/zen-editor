export interface EditorConfiguration {}

let isBoldToggled = false;

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
  return editor;
}

function createToolbar(): HTMLDivElement {
  const toolbar = document.createElement("div");
  toolbar.classList.add("zen-toolbar");
  toolbar.appendChild(
    createIconButton("bold-btn", "format_bold", boldSelection)
  );
  toolbar.appendChild(createIconButton("italic-btn", "format_italic"));
  toolbar.appendChild(createIconButton("underline-btn", "format_underline"));
  toolbar.appendChild(createIconButton("strikethrough-btn", "strikethrough_s"));
  return toolbar;
}

function createIconButton(
  id: string,
  iconName: string,
  onClick: (ev: MouseEvent) => any = () => {}
): HTMLElement {
  const btn = document.createElement("button");
  btn.id = id;
  btn.classList.add("toolbar-btn", "material-icons");
  btn.textContent = iconName;
  btn.onclick = onClick;
  return btn;
}

function boldSelection() {
  document.execCommand("bold");
}
