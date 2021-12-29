import { LitElement, CSSResultGroup, html } from "lit";
import { property } from "lit/decorators.js";
import scopedStyles from "./styles.module.scss";
import { componentStyles, defineComponent } from "~src/global";

export default (): void => defineComponent("c-button", Button);
export class Button extends LitElement {
    @property({ type: String }) text: string = "";
    @property({ type: Boolean }) secondary: boolean = false;
    @property({ type: String }) icon: string | undefined = undefined;
    @property({ type: String }) link: string | undefined = undefined;

    render() {
        return html`
            ${this.link ? html`
                <a class="button-wrapper ${this.secondary ? "button-secondary" : ""}" href="${this.link}"
                   target="_blank">
                    ${this.icon ? html`<span class="button-icon material-icons-round">${this.icon}</span>` : html``}
                    <span class="button-text">${this.text}</span>
                </a>
            ` : html`
                <button class="button-wrapper ${this.secondary ? "button-secondary" : ""}">
                    ${this.icon ? html`<span class="button-icon material-icons-round">${this.icon}</span>` : html``}
                    <span class="button-text">${this.text}</span>
                </button>
            `}`;
    }

    static get styles(): CSSResultGroup {
        return [...componentStyles, scopedStyles as never];
    }
}
