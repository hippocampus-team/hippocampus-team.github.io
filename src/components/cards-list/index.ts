import { LitElement, CSSResultGroup, html, PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import scopedStyles from "./styles.module.scss";
import { componentStyles, defineComponent } from "~src/global";
import { Project } from "~src/data-service";

import("~components/card").then(f => f.default());

export default (): void => defineComponent("c-cards-list", CardsList);
export class CardsList extends LitElement {
    @property({ type: Array }) cards!: Project[];

    private cardWidth: number = 640;

    @query(".cards-list", true) listElement!: HTMLElement;
    @query(".scroll-button-left", true) leftScrollButton!: HTMLElement;
    @query(".scroll-button-right", true) rightScrollButton!: HTMLElement;

    render() {
        return html`
            <div class="cards-list-wrapper">
                <div class="cards-list">
                    ${this.cards.map(card => html`
                        <c-card .content=${card}></c-card>
                    `)}
                </div>

                <div class="scroll-button scroll-button-left">
                    <span class="material-icons-round">keyboard_arrow_left</span>
                </div>

                <div class="scroll-button scroll-button-right">
                    <span class="material-icons-round">keyboard_arrow_right</span>
                </div>
            </div>`;
    }

    protected async firstUpdated(changedProperties: PropertyValues) {
        await super.firstUpdated(changedProperties);

        this.leftScrollButton.addEventListener("click", () => { this.moveScrollBy(-1); });
        this.rightScrollButton.addEventListener("click", () => { this.moveScrollBy(1); });
        this.leftScrollButton.classList.add("disabled");

        const observer = new IntersectionObserver(entries => this.playEntranceAnimation(entries), {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        });
        observer.observe(this);

        // TODO: Come up with a better solution
        setTimeout(() => {
            (this.leftScrollButton.querySelector("span") as HTMLElement).style.opacity = "1";
            (this.rightScrollButton.querySelector("span") as HTMLElement).style.opacity = "1";
        }, 1000);
    }

    moveScrollBy(n: number): void {
        const delta: number = this.cardWidth * n;
        this.updateScrollButtons(this.listElement.scrollLeft + delta);

        // eslint-disable-next-line no-restricted-syntax
        for (const item of this.listElement.children)
            item.classList.add("card--moving");
        setTimeout(() => this.listElement.scrollBy({ left: delta, top: 0, behavior: "smooth" }), 100);
        setTimeout(() => {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of this.listElement.children)
                item.classList.remove("card--moving");
        }, 400 + 100);
    }

    updateScrollButtons(scrollPos: number) {
        if (scrollPos <= 0) this.leftScrollButton.classList.add("disabled");
        else this.leftScrollButton.classList.remove("disabled");

        if (scrollPos >= this.listElement.scrollWidth - this.listElement.clientWidth) this.rightScrollButton.classList.add("disabled");
        else this.rightScrollButton.classList.remove("disabled");
    }

    playEntranceAnimation(entries: IntersectionObserverEntry[]) {
        const e = entries[0];
        if (e.isIntersecting) this.listElement.classList.add("screen--entered");
    }

    static get styles(): CSSResultGroup {
        return [...componentStyles, scopedStyles as never];
    }
}
