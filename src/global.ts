import globalStyles from "~styles/global.scss";
import globalPageStyles from "~src/pages/global-styles.scss";

export const componentStyles = [globalStyles];
export const pageStyles = [globalStyles, globalPageStyles];

export function defineComponent(tag: string, c: CustomElementConstructor): void {
    if (customElements.get(tag) === undefined) customElements.define(tag, c);
}
