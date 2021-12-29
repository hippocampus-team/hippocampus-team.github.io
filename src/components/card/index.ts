import { LitElement, CSSResultGroup, html } from "lit";
import { property } from "lit/decorators.js";
import scopedStyles from "./styles.module.scss";
import { componentStyles, defineComponent } from "~src/global";
import { Project } from "~src/data-service";

import("~components/button").then(f => f.default());

export default (): void => defineComponent("c-card", Card);
export class Card extends LitElement {
    @property({ type: Object }) content!: Project;

    render() {
        return html`
            <div class="card-wrapper">
                <h4 class="card-title">${this.content.title}</h4>
                <p class="card-text">${this.content.text}</p>

                ${this.content.buttons.length === 0 ? html`` : html`
                    <div class="card-buttons-wrapper">
                        ${this.content.buttons.map(link => html`
                            <c-button class="card-button"
                                      text="${link.text}"
                                      link="${link.link}"></c-button>
                        `)}
                    </div>
                `}
            </div>`;
    }

    static get styles(): CSSResultGroup {
        return [...componentStyles, scopedStyles as never];
    }
}
