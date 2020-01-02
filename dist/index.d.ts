declare class DialogBox extends HTMLElement {
    static get observedAttributes(): string[];
    constructor(opts?: {
        confirmBtn?: {
            include?: boolean;
            lbl?: string;
        };
        cancelBtn?: {
            include?: boolean;
            lbl?: string;
        };
        closeOnConfirm?: boolean;
    });
    connectedCallback(): void;
    set open(newState: boolean);
    get open(): boolean;
    set closeOnConfirm(newState: boolean);
    get closeOnConfirm(): boolean;
    set confirmLbl(newLbl: string);
    get confirmLbl(): string;
    set confirmBtn(newState: boolean);
    get confirmBtn(): boolean;
    set cancelBtn(newState: boolean);
    get cancelBtn(): boolean;
    set cancelLbl(newLbl: string);
    get cancelLbl(): string;
    private _cancelBtnRef?;
    private _confirmBtnRef?;
    private _confirmBtnClickEvent;
    private _cancelBtnClickEvent;
    private _handleCancelBtnClick;
    private _handleConfirmBtnClick;
}

export default DialogBox;
