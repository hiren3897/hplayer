import shaka from 'shaka-player/dist/shaka-player.ui';

/**
 * Backward button feature is used to skip backward the video X seconds with custom seconds configurable to be skipped.
 * @type {BackwardButton}
 * @extends {shaka.ui.Element} shaka.ui.Element
 * @export
 */
const BackwardButton = class extends shaka.ui.Element {

  /**
   * Backward Button Config
   */
  backwardConfig_;

  /**
   * HTMLButtonElement
   * @private
   */
  backwardButton_

  /**
   * Backward seconds display UI value
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

    this.backwardConfig_ = this.controls.getPlayer().backward_button;

    // The actual button that will be displayed
    this.backwardButton_ = document.createElement('button');
    this.backwardButton_.classList.add('backward-button');
    this.backwardButton_.classList.add('shaka-tooltip');

    const backwardIcon = document.createElement('span');
    backwardIcon.classList.add('hexa-player-icons');
    backwardIcon.classList.add('md-25');
    // backwardIcon.style.transform = 'scale(1.1)';
    backwardIcon.textContent = 'replay';
    backwardIcon.style.color = this.backwardConfig_?.color;
    this.displaySeconds_ = document.createElement('strong');
    this.displaySeconds_.classList.add('backward-seconds');
    // populating seconds on UI
    this.displaySeconds_.textContent = this.backwardConfig_.backwardSeconds;
    this.backwardButton_.appendChild(backwardIcon);
    backwardIcon.appendChild(this.displaySeconds_);
    this.parent.appendChild(this.backwardButton_);

    // tooltip
    this.backwardButton_.setAttribute('data-i18n-aria-label-key', 'backward-btn-title');
    this.backwardButton_.setAttribute('data-i18n-aria-label-opt', `{ "seconds": "${this.backwardConfig_.backwardSeconds}s" }`);

    // Listen for clicks on the backward button to skip the video to x seconds
    this.eventManager.listen(this.backwardButton_, 'click', () => {
      this.skipBackward()
    });
  }

  /**
   * Skip seconds to backward
   */
  skipBackward() {
    this.video.currentTime = this.video.currentTime - this.backwardConfig_.backwardSeconds
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {BackwardButton.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
BackwardButton.Factory = class {
  create(rootElement, controls) {
    return new BackwardButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'backward_button',
  new BackwardButton.Factory());
