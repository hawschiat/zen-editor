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
  const selection = document.getSelection();
  const preservedRange = [];
  if (selection && !selection.isCollapsed) {
    // If range is selected
    for (var i = 0; i < selection.rangeCount; i++) {
      const range = selection.getRangeAt(i);
      // Handle bolding operation
      console.log(range);
      if (range.startContainer.isSameNode(range.endContainer)) {
        // Simplest case, the selected range belongs to the same container
        if (range.startContainer.parentNode?.nodeName === "STRONG") {
          // Unbold text if parent belongs to <strong>
          if (range.startContainer.textContent) {
            const textNode = document.createTextNode(
              range.startContainer.textContent
            );
            const nextNode = range.startContainer.parentNode.nextSibling;
            if (nextNode) {
              range.commonAncestorContainer.insertBefore(textNode, nextNode);
            } else {
              range.commonAncestorContainer.appendChild(textNode);
            }
            // Remove bolded node
            range.commonAncestorContainer.removeChild(
              range.startContainer.parentNode
            );
            preservedRange.push(
              document.createRange().selectNodeContents(textNode)
            );
          }
        }
        range.surroundContents(document.createElement("strong"));
      } else {
        // Traverse through the siblings until the endContainer node
        let currentNode: Node | null | undefined = range.startContainer;
        while (currentNode) {
          if (currentNode.parentNode?.nodeName !== "STRONG") {
            // Create a new range for this node
            const currRange = document.createRange();
            if (currentNode.isSameNode(range.startContainer)) {
              currRange.setStart(currentNode, range.startOffset);
            } else {
              currRange.setStartBefore(currentNode);
            }
            if (currentNode.isSameNode(range.endContainer)) {
              currRange.setEnd(currentNode, range.endOffset);
            } else {
              currRange.setEndAfter(currentNode);
            }
            currRange.surroundContents(document.createElement("strong"));
            currRange.detach();
          } else {
          }

          if (currentNode.isSameNode(range.endContainer)) {
            break;
          }
          currentNode = currentNode.parentNode?.nextSibling;
        }
      }
    }
  } else {
    if (isBoldToggled) {
      isBoldToggled = false;
      document.getElementById("bold-btn")?.classList.remove("toggled");
    } else {
      isBoldToggled = true;
      document.getElementById("bold-btn")?.classList.add("toggled");
    }
  }
}
