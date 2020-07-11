import toolbarStylesText from "./styles/toolbar.scss";

export default class ZenToolbar extends HTMLElement {
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
      (ev) => {
        this.boldBtnClicked(ev);
      }
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
    clickHandler: (ev: MouseEvent) => any = () => {}
  ): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.id = id;
    btn.classList.add("toolbar-btn", "material-icons");
    btn.textContent = iconName;
    btn.onmousedown = clickHandler;
    return btn;
  }

  private boldBtnClicked(e: MouseEvent) {
    this.dispatchEvent(new CustomEvent("bold-clicked", { bubbles: true }));
    e.preventDefault();
  }
}
