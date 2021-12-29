import {html, property, customElement, query, PropertyValues} from 'lit-element';
import { CustomElement, LightCustomElement } from "../base";
import styles from "./styles.module.scss";
import "~c/card"
import { CardPayload } from "~c/card";

@customElement("c-cards-list")
export class CardsListElement extends LightCustomElement implements CardsList {
	@property({type: Array}) cards : CardPayload[] = [];

	private cardWidth : number = 640;

	@query(".cards-list", true) listElement! : HTMLElement;
	@query(".scroll-button-left", true) leftScrollButton! : HTMLElement;
	@query(".scroll-button-right", true) rightScrollButton! : HTMLElement;

	render() { return html`
		<div class="cards-list-wrapper">
			<div class="cards-list">
				${this.cards.map(card => html`
					<c-card title="${card.title}"
							text="${card.text}"
							.buttons="${card.buttons}"></c-card>
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

	static get styles() {
		return <any>styles;
	}

	protected async firstUpdated(changedProperties : PropertyValues) {
		await super.firstUpdated(changedProperties);

		this.leftScrollButton.addEventListener("click", () => { this.moveScrollBy(-1) });
		this.rightScrollButton.addEventListener("click", () => { this.moveScrollBy(1) });
		this.leftScrollButton.classList.add("disabled");

		let observer = new IntersectionObserver((entries) => this.playEntranceAnimation(entries), {
			root: null,
			rootMargin: '0px',
			threshold: 0.2
		});
		observer.observe(this);

		// TODO: Come up with a better solution
		setTimeout(() => {
			(this.leftScrollButton.querySelector("span") as HTMLElement).style.opacity = "1";
				(this.rightScrollButton.querySelector("span") as HTMLElement).style.opacity = "1";
		}, 1000)
	}

	moveScrollBy(n : number) : void {
		const delta : number = this.cardWidth * n;
		this.updateScrollButtons(this.listElement.scrollLeft + delta);

		for (const item of this.listElement.children)
			item.classList.add("card--moving");
		setTimeout(() => this.listElement.scrollBy({ left: delta, top: 0, behavior: 'smooth' }), 100)
		setTimeout(() => {
			for (const item of this.listElement.children)
				item.classList.remove("card--moving");
		}, 400 + 100)

	}

	updateScrollButtons(scrollPos : number) {
		console.log(scrollPos)
		if (scrollPos <= 0) this.leftScrollButton.classList.add("disabled");
		else this.leftScrollButton.classList.remove("disabled");

		if (scrollPos >= this.listElement.scrollWidth - this.listElement.clientWidth) this.rightScrollButton.classList.add("disabled");
		else this.rightScrollButton.classList.remove("disabled");
	}

	playEntranceAnimation(entries : IntersectionObserverEntry[]) {
		const e = entries[0]
		if (e.isIntersecting) this.listElement.classList.add("screen--entered");
	}
}

export interface CardsList extends CustomElement {
	cards : CardPayload[];
}