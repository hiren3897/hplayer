import shaka from 'shaka-player/dist/shaka-player.ui';
import { createButton, createHTMLElement } from '../util/domUtils';
import { mozillaLanguageMapping } from '../const';

/**
 * Custom Multi Audio language feature
 * @type {CustomAudioLanguages}
 * @extends {shaka.ui.Element} shaka.ui.Element
 * @export
 */
const CustomAudioLanguages = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    this.customAudiolanguageConfig_ = this.controls.getPlayer().custom_audio_languages;
    this.createCustomAudioButton();
    this.createCustomAudioMenu();

    for (const tag of this.customAudiolanguageConfig_) {
      this.createSourceTag(tag);
      this.mutateAudioLanguageMenu(tag);
    }

    this.eventManager.listen(this.customAudiolanguageButton_, 'click', () => {
      this.toggleMenu();
    });

    this.eventManager.listen(window, 'click', () => {
      this.customAudiolanguageMenu_.classList.add('hide-custom-audio-menu');
    });
  }

  createCustomAudioButton() {
    this.customAudiolanguageButton_ = createButton();
    this.customAudiolanguageButton_.classList.add('custom-audio-languages-button');
    this.customAudiolanguageButton_.classList.add('shaka-tooltip');
    this.customAudiolanguageButton_.setAttribute('data-i18n-aria-label-key', 'custom-audio-language-title');

    const customAudioLanguageButtonIcon_ = createHTMLElement('span');
    customAudioLanguageButtonIcon_.classList.add('hexa-player-icons');
    customAudioLanguageButtonIcon_.classList.add('md-25');
    customAudioLanguageButtonIcon_.textContent = 'headphones';
    customAudioLanguageButtonIcon_.style.color = this.backwardConfig_?.color;
    this.customAudiolanguageButton_.appendChild(customAudioLanguageButtonIcon_);

    this.parent.appendChild(this.customAudiolanguageButton_);
  }

  createCustomAudioMenu() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('element-wrapper');
    this.customAudiolanguageMenu_ = createHTMLElement('div');
    this.customAudiolanguageMenu_.classList.add('custom-audio-languages-menu');
    this.customAudiolanguageMenu_.classList.add('hide-custom-audio-menu');
    wrapper.appendChild(this.customAudiolanguageMenu_);
    this.customAudiolanguageButton_.appendChild(wrapper);
  }

  createSourceTag(tagInfo) {
    const tag = createHTMLElement('source');
    tag.id = tagInfo.code;
    tag.src = tagInfo.url;
    this.video.appendChild(tag);
  }

  mutateAudioLanguageMenu(menuInfo) {
    const languageButton = createButton();
    languageButton.classList.add('custom-audio-languages-menu-button');
    languageButton.setAttribute('code', menuInfo.code);

    const buttonLabel = createHTMLElement('label');
    buttonLabel.classList.add('custom-audio-label');
    buttonLabel.textContent = mozillaLanguageMapping[menuInfo.code].nativeName;
    buttonLabel.setAttribute('code', menuInfo.code);

    languageButton.appendChild(buttonLabel);

    languageButton.addEventListener('click', (e) => {
      this.onSelectLanguageHandler(e);
    });

    const selectedIcon = createHTMLElement('span');
    selectedIcon.classList.add('hexa-player-icons');
    selectedIcon.classList.add('custom-audio-icon');
    selectedIcon.classList.add('md-25');
    selectedIcon.textContent = 'done';
    selectedIcon.setAttribute('code', menuInfo.code);
    if (menuInfo.default) {
      selectedIcon.style.display = 'block';
    } else {
      selectedIcon.style.display = 'none';
    }
    languageButton.appendChild(selectedIcon);

    this.customAudiolanguageMenu_.appendChild(languageButton);
  }

  toggleMenu() {
    this.customAudiolanguageMenu_.classList.toggle('hide-custom-audio-menu');
  }

  onSelectLanguageHandler(event) {
    const localVideoPlayer = this.controls.getLocalVideo();
    const oldCurrentTime = localVideoPlayer.currentTime;
    const selectedLangauge = event.target.getAttribute('code');
    const selectedSource = this.video.querySelector(`#${selectedLangauge}`);
    localVideoPlayer.src = selectedSource.src;
    localVideoPlayer.load();
    localVideoPlayer.currentTime = oldCurrentTime;
    localVideoPlayer.play();

    this.resetAudioSelectedIcons();
    this.customAudiolanguageMenu_.querySelector(`span[code='${selectedLangauge}']`).style.display = 'block';
  }

  resetAudioSelectedIcons() {
    const allIcons = this.customAudiolanguageMenu_.querySelectorAll('.custom-audio-icon');
    for (const icon of allIcons) {
      icon.style.display = 'none';
    }
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ChaptersVOD.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
CustomAudioLanguages.Factory = class {
  create(rootElement, controls) {
    return new CustomAudioLanguages(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */
  'custom_audio_languages',
  new CustomAudioLanguages.Factory()
);
