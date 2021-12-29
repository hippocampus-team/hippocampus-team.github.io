import { LitElement, CSSResultGroup, html } from "lit";
import { property } from "lit/decorators.js";
import scopedStyles from "./styles.module.scss";
import { componentStyles, defineComponent } from "~src/global";

export default (): void => defineComponent("c-header", CardsList);
export class CardsList extends LitElement {
    @property({ type: String }) text: string = "";
    @property({ type: String }) subtext: string = "";
    @property({ type: Boolean }) secondary: boolean = false;

    render() {
        return html`
            <div class="header-wrapper">
                ${!this.secondary ? html`
                    <h3 class="header-subtext">${this.subtext}</h3>
                    <h1 class="header-text">${this.text}</h1>
                ` : html`
                    <h3 class="header-subtext">${this.subtext}</h3>
                    <h2 class="header-text">${this.text}</h2>
                `}
            </div>`;
    }

    static get styles(): CSSResultGroup {
        return [...componentStyles, scopedStyles as never];
    }
}
