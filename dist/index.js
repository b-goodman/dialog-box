var css = ".row{display:flex;justify-content:center}.row div:not(:last-of-type){margin:0 5px 0 0}.btn,::slotted(.btn){font-size:16px;min-width:70px;height:30px;padding:0 3px;border:1px solid #000;border-radius:3px;text-align:center;line-height:30px;cursor:pointer}.btn:active,::slotted(.btn:active){box-shadow:inset 1px 1px grey}.primary,::slotted(.primary){background:#d4e8ea}.secondary,::slotted(.secondary){background:#ead4d4}div#dialog-title,slot[name=dialog-title]{font-weight:600;font-size:18px}div#dialog-content,slot[name=dialog-content]::slotted(div){padding:10px}:host([open=true]) #box{display:unset}:host([open=true]) #mask{display:unset;opacity:.5}:host{font-family:sans-serif}:host #box{padding:5px;height:auto;left:50%;top:50%;transform:translate(-50%,-50%);border:1px solid #000;background:#fff;width:300px;max-height:300px;min-height:100px;z-index:999}:host #box,:host #mask{display:none;position:absolute}:host #mask{top:0;left:0;background-color:rgba(0,0,0,.5);opacity:0;width:100vw;height:100vh;z-index:998;transition:opacity .4s ease-out}";

class DialogBox extends HTMLElement {
    constructor(opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        super();
        this._confirmBtnClickEvent = new Event("confirmed");
        this._cancelBtnClickEvent = new Event("cancelled");
        this._handleCancelBtnClick = (_event) => {
            this.dispatchEvent(this._cancelBtnClickEvent);
            this.open = false;
        };
        this._handleConfirmBtnClick = (_event) => {
            if (this.closeOnConfirm) {
                this.open = false;
            }
            this.dispatchEvent(this._confirmBtnClickEvent);
        };
        if ((_b = (_a = opts) === null || _a === void 0 ? void 0 : _a.confirmBtn) === null || _b === void 0 ? void 0 : _b.include)
            this.confirmBtn = (_d = (_c = opts) === null || _c === void 0 ? void 0 : _c.confirmBtn) === null || _d === void 0 ? void 0 : _d.include;
        if ((_f = (_e = opts) === null || _e === void 0 ? void 0 : _e.confirmBtn) === null || _f === void 0 ? void 0 : _f.lbl)
            this.confirmLbl = (_h = (_g = opts) === null || _g === void 0 ? void 0 : _g.confirmBtn) === null || _h === void 0 ? void 0 : _h.lbl;
        if ((_k = (_j = opts) === null || _j === void 0 ? void 0 : _j.cancelBtn) === null || _k === void 0 ? void 0 : _k.include)
            this.cancelBtn = (_m = (_l = opts) === null || _l === void 0 ? void 0 : _l.cancelBtn) === null || _m === void 0 ? void 0 : _m.include;
        if ((_p = (_o = opts) === null || _o === void 0 ? void 0 : _o.cancelBtn) === null || _p === void 0 ? void 0 : _p.lbl)
            this.cancelLbl = (_r = (_q = opts) === null || _q === void 0 ? void 0 : _q.cancelBtn) === null || _r === void 0 ? void 0 : _r.lbl;
        if ((_s = opts) === null || _s === void 0 ? void 0 : _s.closeOnConfirm)
            this.closeOnConfirm = (_t = opts) === null || _t === void 0 ? void 0 : _t.closeOnConfirm;
        const template = document.createElement('template');
        template.innerHTML = `
            <style>${css}</style>
            <div id="box">

                <div id="dialog-content-wrapper">
                    <slot name="dialog-title"></slot>
                    <slot name="dialog-content"></slot>
                </div>

                ${this.querySelector("[slot='dialog-control']") === null
            ? `<div class="row">
                            ${this.confirmBtn ? `<div class="btn primary" id="confirm_btn">${this.confirmLbl}</div>` : ``}
                            ${this.cancelBtn ? `<div class="btn secondary" id="cancel_btn">${this.cancelLbl}</div>` : ``}
                        </div>`
            : `<slot name="dialog-control" class="row"></slot>`}
            </div>
            <div id="mask"></div>
        `;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        if (this.querySelector("[slot='dialog-title']") === null) {
            const title = document.createElement("div");
            title.slot = "dialog-title";
            title.innerText = ((_u = opts) === null || _u === void 0 ? void 0 : _u.title) || "";
            this.appendChild(title);
        }
        if (this.querySelector("[slot='dialog-content']") === null) {
            const content = document.createElement("div");
            content.slot = "dialog-content";
            content.innerText = ((_v = opts) === null || _v === void 0 ? void 0 : _v.content) || "";
            this.appendChild(content);
        }
        this._cancelBtnRef = shadowRoot.querySelector("#cancel_btn") || undefined;
        this._confirmBtnRef = shadowRoot.querySelector("#confirm_btn") || undefined;
        this._titleRef = this.querySelector("[slot='dialog-title']");
        this._contentRef = this.querySelector("[slot='dialog-content']");
    }
    static get observedAttributes() {
        return ["open"];
    }
    connectedCallback() {
        if (this._cancelBtnRef) {
            this._cancelBtnRef.addEventListener("click", this._handleCancelBtnClick);
        }
        if (this._confirmBtnRef) {
            this._confirmBtnRef.addEventListener("click", this._handleConfirmBtnClick);
        }
    }
    set open(newState) {
        this.setAttribute("open", JSON.stringify(newState));
    }
    get open() {
        return this.hasAttribute("open");
    }
    set closeOnConfirm(newState) {
        this.setAttribute("close-on-confirm", JSON.stringify(newState));
    }
    get closeOnConfirm() {
        return JSON.parse(this.getAttribute("close-on-confirm") || "true");
    }
    set confirmLbl(newLbl) {
        this.setAttribute("confirm-lbl", newLbl);
    }
    get confirmLbl() {
        return this.getAttribute("confirm-lbl") || "OK";
    }
    set confirmBtn(newState) {
        this.setAttribute("confirm-btn", JSON.stringify(newState));
    }
    get confirmBtn() {
        return JSON.parse(this.getAttribute("confirm-btn") || "true");
    }
    set cancelBtn(newState) {
        this.setAttribute("cancel-btn", JSON.stringify(newState));
    }
    get cancelBtn() {
        return JSON.parse(this.getAttribute("cancel-btn") || "true");
    }
    set cancelLbl(newLbl) {
        this.setAttribute("cancel-lbl", newLbl);
    }
    get cancelLbl() {
        return this.getAttribute("cancel-lbl") || "Cancel";
    }
    get dialogTitle() {
        return this._titleRef.innerHTML;
    }
    set dialogTitle(newTitle) {
        this._titleRef.innerText = newTitle;
    }
    get dialogContent() {
        return this._contentRef.innerHTML;
    }
    set dialogContent(newContent) {
        this._contentRef.innerHTML = newContent;
    }
}
window.customElements.define("dialog-box", DialogBox);

export default DialogBox;
