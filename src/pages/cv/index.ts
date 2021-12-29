import { html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { pageStyles } from "~src/global";
import scopedStyles from "./styles.module.scss";
import { baseUrl, CV, fetchContent } from "~src/data-service";

import("~components/button").then(f => f.default());
import("~components/header").then(f => f.default());
import("~components/cards-list").then(f => f.default());

@customElement("cv-page")
export default class CVPage extends LitElement {
    @state() isNameCorrect: boolean = true;
    @state() name: string = "";
    @state() cv: CV | null = null;

    render(): TemplateResult {
        return html`
            ${this.isNameCorrect && this.cv ? html`
                <div class="app-container">
                    <div class="app-bg"></div>

                    <div class="hello-section section in-grid">
                        <div class="top-bar">
                            <p class="special-for-label">Общая версия</p>

                            <c-button class="pdf-button" secondary
                                      text="PDF Версия" .link=${`${baseUrl}/${this.name}/cv.pdf`}
                                      icon="contact_page"></c-button>
                        </div>

                        <c-header .text=${this.cv.general.name}
                                  subtext="Портфолио"></c-header>

                        <p class="bio-text">${this.cv.general.bio}</p>

                        <c-button @click=${CVPage.scrollToMainSection}
                                  text="Супер! Какие проекты?"
                                  icon="arrow_downward"></c-button>

                        <div class=${`art art-${this.name}`}></div>
                    </div>

                    <div class="cards-section section">
                        <c-header class="projects-header in-grid" secondary
                                  text="Проекты и Опыт работы"
                                  subtext="Сейчас покажу..."></c-header>

                        <c-cards-list class="projects-cards-list" .cards=${this.cv.projects}></c-cards-list>

                        <c-header class="education-header in-grid" secondary
                                  text="Достижения и Образование"
                                  subtext="Далее Академ"></c-header>

                        <c-cards-list class="education-cards-list" .cards=${this.cv.education}></c-cards-list>

                        <div class="art"></div>
                    </div>

                    <div class="contacts-section section in-grid">
                        <c-header class="contacts-header" secondary
                                  text="Контакты"
                                  subtext="И наконец"></c-header>

                        <div class="contact-record">
                            <c-button .link=${`tg://resolve?domain=${this.cv.general.contacts.telegram}`}
                                      text="Написать в Telegram"
                                      icon="send"></c-button>

                            <p>${`@${this.cv.general.contacts.telegram}`}</p>
                        </div>

                        <div class="contact-record">
                            <c-button .link=${`mailto:${this.cv.general.contacts.email}`}
                                      text="Написать на почту"
                                      icon="mail"></c-button>

                            <p>${this.cv.general.contacts.email}</p>
                        </div>

                        <div class="contact-record">
                            <c-button .link=${`https://github.com/${this.cv.general.contacts.github}`}
                                      text="Посмотреть GitHub"
                                      icon="pest_control"></c-button>
                        </div>

                        <div class="art art-2"></div>
                        <div class="art art-1"></div>
                        <div class="art art-0"></div>
                    </div>
                </div>
            ` : html`
                <div class="wrong-name-banner">
                    <p class="wrong-name-text">Вы ошиблись адресом.</p>
                </div>
            `}
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();
        const url = window.location.pathname.split("/");
        this.name = url[url.length - 1];
        fetchContent(this.name).then(cv => {
            this.cv = cv;
        }).catch(() => {
            this.isNameCorrect = false;
        });
    }

    private static scrollToMainSection(): void {
        const scroller = document.querySelector("html") as HTMLElement;
        scroller.scrollTo({ left: 0, top: window.innerHeight - 120, behavior: "smooth" });
    }

    static get styles(): CSSStyleSheet[] {
        return [...pageStyles, scopedStyles as never];
    }
}
