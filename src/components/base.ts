import { LitElement, PropertyValues } from 'lit-element';
import '@boulevard/vampire';

/**
 * Extension of LitElement which renders element in light dom
 */
export abstract class LightCustomElement extends LitElement implements CustomElement {
	public onRenderedCallback : Function | undefined = undefined;

	// Override this method to use light dom instead of shadow
	protected createRenderRoot() : Element | ShadowRoot {
		return this;
	}

	protected async firstUpdated(changedProperties : PropertyValues) {
		super.firstUpdated(changedProperties);

		new Promise((r) => setTimeout(r, 0)).then(() => {
			if (this.onRenderedCallback) this.onRenderedCallback();
		});
	}
}

export interface CustomElement extends HTMLElement {
	onRenderedCallback : Function | undefined;
}
