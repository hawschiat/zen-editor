export default class ZenToolbar extends HTMLElement {
    static BOLD_CLICKED_EVENT: string;
    static ITALIC_CLICKED_EVENT: string;
    static UNDERLINE_CLICKED_EVENT: string;
    static STRIKETHROUGH_CLICKED_EVENT: string;
    common: {
        boldButton: HTMLButtonElement;
        italicButton: HTMLButtonElement;
        underlineButton: HTMLButtonElement;
        strikethroughButton: HTMLButtonElement;
    };
    isBoldToggled: boolean;
    constructor();
    private createIconButton;
    private btnClicked;
}
