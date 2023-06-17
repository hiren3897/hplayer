import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';

/**
 * Fast-Forward button feature is used to forward the video X seconds with custom seconds configurable to be skipped.
 * @type {ForwardButton}
 * @extends shaka.ui.Element
 */
const ForwardButton = class extends shaka.ui.Element {

  /**
   * Forward Button Config
   * @private
   */
  forwardConfig_;

  /**
   * HTMLButtonElement
   * @private
   */
  forwardButton_

  /**
   * Forward Button Child Icon Element
   * @private
   */
  forwardIcon_

  /**
   * Forward seconds display UI value
   * @private
   */
  displaySeconds_

  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    this.forwardConfig_ = this.controls.getPlayer().forward_button;

    // The actual forward button that will be displayed
    this.forwardButton_ = document.createElement('button');
    this.forwardButton_.classList.add('forward-button');
    this.forwardButton_.classList.add('shaka-tooltip');
    // forward button icon
    this.forwardIcon_ = document.createElement('span');
    this.forwardIcon_.classList.add('hexa-player-icons');
    this.forwardIcon_.classList.add('md-25');
    this.forwardIcon_.style.transform = 'scaleX(-1)';
    this.forwardIcon_.textContent = 'replay';
    this.forwardIcon_.style.color = this.forwardConfig_.color;
    this.forwardButton_.appendChild(this.forwardIcon_);
    this.displaySeconds_ = document.createElement('strong');
    this.displaySeconds_.classList.add('forward-seconds');
    this.forwardIcon_.appendChild(this.displaySeconds_);
    this.parent.appendChild(this.forwardButton_);

    // tooltip
    this.forwardButton_.setAttribute('data-i18n-aria-label-key', 'forward-btn-title');
    this.forwardButton_.setAttribute('data-i18n-aria-label-opt', `{ "seconds": "${this.forwardConfig_.forwardSeconds}s" }`);

    // populating seconds on UI
    this.displaySeconds_.textContent = this.forwardConfig_.forwardSeconds;

    // skips the video forward for X seconds
    this.eventManager.listen(this.forwardButton_, 'click', () => {
      this.skipForward()
    });
  }

  skipForward() {
    this.video.currentTime = this.video.currentTime + this.forwardConfig_.forwardSeconds
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ForwardButton.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
ForwardButton.Factory = class {
  create(rootElement, controls) {
    return new ForwardButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'forward_button',
  new ForwardButton.Factory());

