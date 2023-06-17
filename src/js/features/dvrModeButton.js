import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import {createButton, createHTMLElement} from "../util/domUtils";
import {getUrlExtension} from "../util/sharedUtils";
import {Localization} from "../localization";

/**
 * DVR Mode Button
 *
 * @type {DvrModeButton}
 * @extends {shaka.ui.Element} shaka.ui.Element
 */
const DvrModeButton = class extends shaka.ui.Element {

  /**
   * DVR mode button
   * @private
   */
  dvrModeButton_;

  /**
   * DVR mode configurations
   * @private
   */
  dvrModeConfig_;

  /**
   * DVR mode state
   * @private
   */
  dvrModeActive_;

  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    this.dvrModeConfig_ = this.controls.getPlayer()?.dvr_mode_button;

    this.dvrModeActive_ = this.dvrModeConfig_?.dvrModeActive

    this.createDvrModeButton();

    /**
     * HLS live stream playlist don't have a good seek range info.
     * So no dvr mode button can be supported.
     */
    this.eventManager.listenOnce(this.player, 'loaded', () => {
      if (getUrlExtension(this.player.getAssetUri()) === 'm3u8') {
        this.dvrModeButton_.style.display = 'none';
        console.warn('No DVR mode button available for HLS live streams.')
      }
    })

    if (!this.dvrModeActive_) {
      this.onDvrModeOff()
    } else {
      this.dvrModeButton_.classList.toggle('dvr-mode-button-active')
      this.dvrModeButton_.setAttribute('data-i18n-aria-label-opt', '{ "status" : "on" }');
      this.updateLocalization(this.dvrModeButton_)
    }

    this.eventManager.listen(this.dvrModeButton_, 'click', () => {
      if (!this.dvrModeActive_) {
        this.onDvrModeOn()
        this.dvrModeActive_ = true
        this.dvrModeButton_.classList.toggle('dvr-mode-button-active')
      } else {
        this.onDvrModeOff()
        this.dvrModeActive_ = false
        this.dvrModeButton_.classList.toggle('dvr-mode-button-active')
      }
    })

  }

  createDvrModeButton() {
    this.dvrModeButton_ = createButton();
    this.dvrModeButton_.classList.add('hexa-dvr-mode-button');
    this.dvrModeButton_.classList.add('shaka-tooltip');
    const dvrModeButtonIcon = createHTMLElement('span')
    dvrModeButtonIcon.classList.add('hexa-player-icons')
    dvrModeButtonIcon.classList.add('md-25')
    dvrModeButtonIcon.textContent = 'fiber_dvr'
    this.dvrModeButton_.appendChild(dvrModeButtonIcon)
    this.dvrModeButton_.setAttribute('data-i18n-aria-label-key', 'dvr-mode-btn-title');
    this.dvrModeButton_.setAttribute('data-i18n-aria-label-opt', '{ "status" : "off" }');
    this.parent.appendChild(this.dvrModeButton_)
  }

  onDvrModeOn() {
    this.player.configure({
      manifest: {
        availabilityWindowOverride: 10800
      }
    })
    this.dvrModeButton_.setAttribute('data-i18n-aria-label-opt', '{ "status" : "on" }');
    this.updateLocalization(this.dvrModeButton_)
  }

  onDvrModeOff() {
    this.player.configure({
      manifest: {
        availabilityWindowOverride: this.dvrModeConfig_.noDvrModeTime
      }
    })
    this.dvrModeButton_.setAttribute('data-i18n-aria-label-opt', '{ "status" : "off" }');
    this.updateLocalization(this.dvrModeButton_)
  }

  updateLocalization(element) {
    const updateLocalizationEvent = new Event(Localization.UPDATE_LOCALIZATION);
    updateLocalizationEvent.ariaLabelElement = element;
    this.controls.dispatchEvent(updateLocalizationEvent);
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {DvrModeButton.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
};
 */
DvrModeButton.Factory = class {
  create(rootElement, controls) {
    return new DvrModeButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'dvr_mode_button',
  new DvrModeButton.Factory());
