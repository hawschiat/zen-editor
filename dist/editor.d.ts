import ZenToolbar from "./toolbar";
export default class ZenEditor extends HTMLElement {
    toolbar: ZenToolbar;
    private __hovered;
    private __focused;
    constructor();
    get hovered(): boolean;
    set hovered(isHovered: boolean);
    get focused(): boolean;
    set focused(isFocused: boolean);
    /**
     * Trigger a process to either show or hide the toolbar
     */
    private toggleToolbar;
    /**
     * Initialize editor element
     */
    private createEditor;
    private selectionHandler;
    /**
     * Retrive the list of ancestors from a node until the shadow root
     * @param node Node to start traversing from
     * @param acc Accumulated list of nodes
     */
    private getAncestors;
    private getDescendants;
    /**
     * Retrives a list of nodes (including ancestors) according to the given range
     * @param range
     */
    private getRangeNodes;
}
