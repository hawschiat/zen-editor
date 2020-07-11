import stylesText from "./styles/editor.scss";
import ZenToolbar from "./toolbar";

export default class ZenEditor extends HTMLElement {
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
    this.toolbar.addEventListener(ZenToolbar.BOLD_CLICKED_EVENT, () =>
      document.execCommand("bold")
    );
    this.toolbar.addEventListener(ZenToolbar.ITALIC_CLICKED_EVENT, () =>
      document.execCommand("italic")
    );
    this.toolbar.addEventListener(ZenToolbar.UNDERLINE_CLICKED_EVENT, () =>
      document.execCommand("underline")
    );
    this.toolbar.addEventListener(ZenToolbar.STRIKETHROUGH_CLICKED_EVENT, () =>
      document.execCommand("strikethrough")
    );
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

  /**
   * Trigger a process to either show or hide the toolbar
   */
  private toggleToolbar() {
    if (this.hovered || this.focused) {
      this.toolbar.setAttribute("show", "true");
    } else {
      this.toolbar.removeAttribute("show");
    }
  }

  /**
   * Initialize editor element
   */
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

  private selectionHandler() {
    Object.entries(this.toolbar.common).forEach(([k, v]) =>
      v.removeAttribute("activated")
    );

    const selection = document.getSelection();
    if (selection) {
      Array.from(Array(selection.rangeCount).keys()).forEach((i) => {
        const range = selection.getRangeAt(i);

        let nodesToCheck = [] as Node[];
        if (
          range.startContainer.isSameNode(range.endContainer) &&
          range.startContainer instanceof Text
        ) {
          const contentLength = range.startContainer.textContent
            ? range.startContainer.textContent.length
            : 0;
          if (range.startOffset < contentLength) {
            nodesToCheck = this.getAncestors(range.startContainer);
          }
        } else {
          nodesToCheck = this.getRangeNodes(range);
        }

        // Activate toolbar buttons if the current selected text has certain properties (bold, italic, etc.)
        nodesToCheck.forEach((node) => {
          if (
            ["STRONG", "B"].some((k) => node.nodeName === k && node.textContent)
          ) {
            this.toolbar.common.boldButton.setAttribute("activated", "true");
          }
          if (
            ["EM", "I"].some((k) => node.nodeName === k && node.textContent)
          ) {
            this.toolbar.common.italicButton.setAttribute("activated", "true");
          }
          if (node.nodeName === "U" && node.textContent) {
            this.toolbar.common.underlineButton.setAttribute(
              "activated",
              "true"
            );
          }
          if (node.nodeName === "STRIKE" && node.textContent) {
            this.toolbar.common.strikethroughButton.setAttribute(
              "activated",
              "true"
            );
          }
        });
      });
    }
  }

  /**
   * Retrive the list of ancestors from a node until the shadow root
   * @param node Node to start traversing from
   * @param acc Accumulated list of nodes
   */
  private getAncestors(node: Node, acc: Node[] = []): Node[] {
    if (
      node.parentNode === null ||
      this.shadowRoot === null ||
      node.parentNode.isSameNode(this.shadowRoot.activeElement)
    ) {
      return acc;
    }

    acc.push(node.parentNode);
    return this.getAncestors(node.parentNode, acc);
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

  /**
   * Retrives a list of nodes (including ancestors) according to the given range
   * @param range
   */
  private getRangeNodes(range: Range): Node[] {
    let nodeList = [] as Node[];
    let currentNode: Node | null = range.startContainer;
    while (currentNode) {
      if (currentNode.isSameNode(range.startContainer)) {
        if (
          currentNode.textContent &&
          currentNode.textContent.length > range.startOffset
        ) {
          nodeList = nodeList.concat([
            ...this.getAncestors(currentNode),
            currentNode,
          ]);
        }
      }

      // Text selection range has the text node itself as the start and end container
      // However, the siblings of text node can be an ancestor of the text node
      // We need to fetch the descendants to check if we have reached the end of the selection
      const descendants = this.getDescendants(currentNode);

      if (descendants.some((node) => node.isSameNode(range.endContainer))) {
        if (range.endOffset > 0) {
          nodeList = nodeList.concat([
            ...this.getAncestors(currentNode),
            currentNode,
            ...descendants,
          ]);
        }
        break;
      } else {
        nodeList = nodeList.concat([
          ...this.getAncestors(currentNode),
          currentNode,
          ...descendants,
        ]);
      }
      currentNode = currentNode.nextSibling;
    }
    return nodeList;
  }
}
