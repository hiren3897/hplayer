import en from '../assets/lang/en.json'
import fr from '../assets/lang/fr.json'

export class Localization {

    // The locale our app first shows
    defaultLocale_;

    // The active locale
    activeLocale_;

    // Gets filled with active locale translations
    translations_;

    /**
     * {shaka.ui.Controls}
     * @private
     */
    controls_

    static UPDATE_LOCALIZATION = 'update_localization'

    /**
     *
     * @param {shaka.ui.Controls} controls_
     */
    constructor(controls_) {

        this.defaultLocale_ = 'en';

        this.controls_ = controls_;

        this.activeLocale_ = this.browserLocales(true);

        // Retrieve translations JSON object for the given
        // locale over the network
        if (this.activeLocale_ === this.defaultLocale_) {
            this.translations_ = en;
        } else {
            //TODO get the activeLocale json from array of json lang
            this.defaultLocale_ = this.activeLocale_;
            this.translations_ = fr;
        }

        // setup the page
        this.setLocale();

        this.controls_.addEventListener(Localization.UPDATE_LOCALIZATION, (event) => {
            this.translateAriaLabel(event.ariaLabelElement)
        })
    }

    // Load translations for the given locale and translate
    // the page to this locale
    setLocale() {
        this.translatePage();
    }

    // Replace the inner text of each element that has a
    // data-i18n-key attribute with the translation corresponding
    // to its data-i18n-key
    translatePage() {
        document
            .querySelectorAll("[data-i18n-aria-label-key]")
            .forEach(element => {
                this.translateAriaLabel(element)
                //this.translateElement(element)
            });
    }

    // TODO in future if we predict to translate textContent of an element
    translateElement(element) {
        const key = element.getAttribute("data-i18n-key");
        element.innerText = this.translations_[key];
    }

    /**
     * Translate the aria label for the advanced features used to display the tooltips of the button
     * @param element
     */
    translateAriaLabel(element) {
        const key = element.getAttribute("data-i18n-aria-label-key");
        const translation = this.translations_[key]
        const options = JSON.parse(
            element?.getAttribute("data-i18n-aria-label-opt")
        );
        element.setAttributeNS(null, 'aria-label', options
            ? this.interpolate(translation, options)
            : translation)
    }

    // Convert a message like "Hello, {name}" to "Hello, Chad"
    // given the interpolations object {name: "Chad"}
    interpolate(message, interpolations) {

        return Object.keys(interpolations).reduce(
            (interpolated, key) =>
                interpolated.replace(
                    new RegExp(`{\s*${key}\s*}`, "g"),
                    this.translations_[interpolations[key]] ?? interpolations[key],
                ),
            message,
        );
    }

    /**
     * Retrieve user-preferred locales from the browser
     *
     * @param {boolean} languageCodeOnly - when true, returns
     * ["en", "fr"] instead of ["en-US", "fr-FR"]
     * @returns string | undefined
     */
    browserLocales(languageCodeOnly = false) {
        return navigator.languages.map((locale) =>
            languageCodeOnly ? locale.split("-")[0] : locale,
        )[0];
    }

}
