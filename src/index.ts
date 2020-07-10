import stylesText from "./styles/editor.scss";
import toolbarStylesText from "./styles/toolbar.scss";

interface EditorConfiguration {}

class ZenEditor extends HTMLElement {
  toolbar: ZenToolbar;
  private __hovered = false;
  private __focused = false;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    //Attach styles
    const editorStyle = document.createElement("style");
    editorStyle.type = "text/css";
    editorStyle.appendChild(document.createTextNode(stylesText as string));
    shadow.appendChild(editorStyle);

    // Initialize toolbar element
    shadow.appendChild(
      (this.toolbar = document.createElement("zen-toolbar") as ZenToolbar)
    );

    // Initialize editor element
    const editor = this.createEditor();
    shadow.appendChild(editor);

    this.onfocus = () => (this.focused = true);
    this.onblur = () => (this.focused = false);
    this.toolbar.addEventListener("bold-clicked", this.boldSelection);
  }

  get hovered() {
    return this.__hovered;
  }
  set hovered(isHovered: boolean) {
    this.__hovered = isHovered;
    this.toggleToolbar();
  }

  get focused() {
    return this.__focused;
  }
  set focused(isFocused: boolean) {
    this.__focused = isFocused;
    this.toggleToolbar();
  }

  private toggleToolbar() {
    if (this.hovered || this.focused) {
      this.toolbar.setAttribute("show", "true");
    } else {
      this.toolbar.removeAttribute("show");
    }
  }

  private createEditor(): HTMLDivElement {
    const editor = document.createElement("div");
    editor.classList.add("zen-editor");
    editor.setAttribute("contentEditable", "true");
    editor.onmouseenter = () => (this.hovered = true);
    editor.onmouseleave = () => (this.hovered = false);
    editor.onfocus = () => (this.focused = true);
    editor.onblur = () => (this.focused = false);
    document.onselectionchange = () => this.selectionHandler();
    return editor;
  }

  private boldSelection() {
    document.execCommand("bold");
  }

  private selectionHandler() {
    Object.entries(this.toolbar.common).forEach(([k, v]) =>
      v.removeAttribute("activated")
    );

    const selection = document.getSelection();
    if (selection) {
      let shouldToggleBold = true;

      Array.from(Array(selection.rangeCount).keys()).forEach((i) => {
        const range = selection.getRangeAt(i);
        const descendants = this.getDescendants(range.commonAncestorContainer);
        if (
          !descendants.some((node) =>
            ["STRONG", "B"].some((k) => node.nodeName === k)
          )
        ) {
          shouldToggleBold = false;
        }
      });

      if (shouldToggleBold) {
        document.getElementById("bold-btn")?.setAttribute("activated", "true");
      }
    }
  }

  private getDescendants(node: Node, acc?: Node[]): Node[];
  private getDescendants(node: Node[], acc?: Node[]): Node[];

  private getDescendants(node: Node | Node[], acc: Node[] = []): Node[] {
    if (node instanceof Node) {
      return this.getDescendants(Array.from(node.childNodes), acc);
    }

    if (node.length < 1) return acc;

    const currentNode = node.pop();
    if (currentNode) {
      acc.push(currentNode);
      node.concat(Array.from(currentNode.childNodes));
    }
    return this.getDescendants(node, acc);
  }
}

class ZenToolbar extends HTMLElement {
  common: {
    boldButton: HTMLButtonElement;
    italicButton: HTMLButtonElement;
    underlineButton: HTMLButtonElement;
    strikethroughButton: HTMLButtonElement;
  };
  isBoldToggled = false;

  constructor() {
    super();
    // Create shadow root
    const shadow = this.attachShadow({ mode: "open" });

    //Attach styles
    const fontStyle = document.createElement("link");
    fontStyle.rel = "stylesheet";
    fontStyle.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    shadow.appendChild(fontStyle);
    const toolbarStyle = document.createElement("style");
    toolbarStyle.type = "text/css";
    toolbarStyle.appendChild(
      document.createTextNode(toolbarStylesText as string)
    );
    shadow.appendChild(toolbarStyle);

    // Initialize common buttons
    const boldButton = this.createIconButton(
      "bold-btn",
      "format_bold",
      this.boldBtnClicked
    );
    const italicButton = this.createIconButton("italic-btn", "format_italic");
    const underlineButton = this.createIconButton(
      "underline-btn",
      "format_underline"
    );
    const strikethroughButton = this.createIconButton(
      "strikethrough-btn",
      "strikethrough_s"
    );

    // Assign reference
    this.common = {
      boldButton,
      italicButton,
      underlineButton,
      strikethroughButton,
    };

    shadow.appendChild(boldButton);
    shadow.appendChild(italicButton);
    shadow.appendChild(underlineButton);
    shadow.appendChild(strikethroughButton);
  }

  private createIconButton(
    id: string,
    iconName: string,
    onClick: (ev: MouseEvent) => any = () => {}
  ): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.id = id;
    btn.classList.add("toolbar-btn", "material-icons");
    btn.textContent = iconName;
    btn.onclick = onClick;
    return btn;
  }

  private boldBtnClicked() {
    this.dispatchEvent(new Event("bold-clicked"));
  }
}

// Define custom components
customElements.define("zen-editor", ZenEditor);
customElements.define("zen-toolbar", ZenToolbar);

// Attach Material icons stylesheet to DOM
const fontStyle = document.createElement("link");
fontStyle.rel = "stylesheet";
fontStyle.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(fontStyle);
