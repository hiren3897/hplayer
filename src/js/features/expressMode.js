import shaka from 'shaka-player/dist/shaka-player.ui';
import { UAParser } from 'ua-parser-js';
import { Localization } from '../localization';
import { createHTMLElement } from '../util/domUtils';


/**
 * Express-mode feature is used to run the video in express-mode between the start point and end point predefined in the player configurations.
 *
 * @type {expressMode}
 * @extends {shaka.ui.Element} shaka.ui.Element
 */
const expressMode = class extends shaka.ui.Element {

  /**
   * express mode start tag element
   * @private
   */
  expressModeStartTag_;

  /**
   * express mode end tag element
   * @private
   */
  expressModeEndTag_;

  /**
   * Express Speed label
   * @private
   */
  expressSpeedLabel_;

  /**
   *
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    this.expressData = this.controls?.getPlayer().express_mode;

    this.expressPlaybackActive = false;

    // The actual express button that will be displayed in the shaka UI container
    this.expressbutton_ = document.createElement('button');
    this.expressbutton_.classList.add('express-mode-button');
    this.expressbutton_.classList.add('shaka-tooltip');
    const icon = document.createElement('span');
    icon.classList.add('hexa-player-icons');
    icon.classList.add('md-25');
    icon.textContent = 'bolt';
    // icon.style.color = this.expressData?[0].color;
    this.expressbutton_.appendChild(icon);
    this.expressbutton_.setAttribute('data-i18n-aria-label-key', 'express-mode-btn-title');
    this.expressbutton_.setAttribute('data-i18n-aria-label-opt', '{ "status" : "off" }');
    this.parent.appendChild(this.expressbutton_);

    this.eventManager.listenOnce(this.player, 'loaded', () => {
      if (this.expressData) {
        this.expressConfig = evaluateSeconds(this.expressData?.begin.toString(), this.expressData?.end.toString(), this.video?.duration);
        this.createExpressStartAndEndTagMark()
        this.createExpressSpeedLabel()
      }
    })

    // on express button click it will start the express mode
    this.eventManager.listen(this.expressbutton_, 'click', () => {
      const ua = (new UAParser()).getResult();
      // fix for express mode bug on safari browser not able to handle 4x speed
      if (ua.browser.name === 'Safari') {
        this.expressData.express_speed = 2; // set always 2x for safari
        this.expressSpeedLabel_.textContent = `${this.expressData.express_speed}x`;
      }

      if (ua.browser.name === 'Mobile Safari') {
        this.expressData.express_speed = 2; // set always 2x for safari
        this.expressSpeedLabel_.textContent = `${this.expressData.express_speed}x`;
      }

      if (ua.os.name === 'iOS') {
        this.expressData.express_speed = 2; // set always 2x for Chrome On iOS
        this.expressSpeedLabel_.textContent = `${this.expressData.express_speed}x`;
      }

      this.expressPlaybackActive = !this.expressPlaybackActive;
      if (!this.expressPlaybackActive) { // on toggle of return to playback rate 1
        this.video.playbackRate = 1;
        this.expressbutton_.classList.remove('express-mode-active');
        this.expressbutton_.setAttribute('data-i18n-aria-label-opt', '{ "status" : "off" }');
        this.updateLocalization(this.expressbutton_);
        this.disActivateExpressUI()
        this.expressSpeedLabel_.style.display = 'none'
      } else {
        this.expressbutton_.classList.add('express-mode-active');
        this.expressbutton_.setAttribute('data-i18n-aria-label-opt', '{ "status" : "on" }');
        this.updateLocalization(this.expressbutton_);
        this.activateExpressUI()
        this.expressSpeedLabel_.style.display = 'none'
      }
    });

    this.eventManager.listen(this.video, 'timeupdate', () => {
      if (this.expressPlaybackActive) {
        if (this.video.playbackRate !== this.expressData?.express_speed &&
          this.video.currentTime > this.expressConfig.finalBegin &&
          this.video.currentTime < this.video.duration - this.expressConfig.finalEnd) {
          this.video.playbackRate = this.expressData?.express_speed;
          this.expressSpeedLabel_.style.display = 'block'
        } else if (this.video.playbackRate === this.expressData?.express_speed &&
          this.video.currentTime > this.expressConfig.finalBegin &&
          this.video.currentTime > this.video.duration - this.expressConfig.finalEnd) {
          this.video.playbackRate = 1;
          this.expressSpeedLabel_.style.display = 'none'
        } else if (this.video.playbackRate === this.expressData?.express_speed &&
          this.video.currentTime < this.expressConfig.finalBegin &&
          this.video.currentTime < this.video.duration - this.expressConfig.finalEnd) {
          this.video.playbackRate = 1;
          this.expressSpeedLabel_.style.display = 'none'
        }
      }
    });
  }

  updateLocalization(element) {
    const updateLocalizationEvent = new Event(Localization.UPDATE_LOCALIZATION);
    updateLocalizationEvent.ariaLabelElement = element;
    this.controls.dispatchEvent(updateLocalizationEvent);
  }

  /**
   * Create the start and stop tags in the UI
   */
  createExpressStartAndEndTagMark() {
    const tagPosition = this.calculateTagPositions()
    const seekBarElement = this.controls.getControlsContainer().querySelector('.shaka-seek-bar-container');
    this.expressModeStartTag_ = createHTMLElement('span');
    this.expressModeStartTag_.classList.add('hexa-player-icons');
    this.expressModeStartTag_.classList.add('hexa-express-start-tag')
    this.expressModeStartTag_.style.left = `${tagPosition.startFrac * 100}%`;
    this.expressModeStartTag_.style.display = 'none';
    this.expressModeStartTag_.classList.add('md-25');
    this.expressModeStartTag_.textContent = 'fast_forward';
    seekBarElement.appendChild(this.expressModeStartTag_)

    this.expressModeEndTag_ = createHTMLElement('span');
    this.expressModeEndTag_.classList.add('hexa-player-icons');
    this.expressModeEndTag_.classList.add('hexa-express-end-tag')
    this.expressModeEndTag_.style.left = `${tagPosition.endFrac * 100}%`
    this.expressModeEndTag_.style.display = 'none';
    this.expressModeEndTag_.classList.add('md-30');
    this.expressModeEndTag_.textContent = 'arrow_right';
    seekBarElement.appendChild(this.expressModeEndTag_)
  }

  activateExpressUI() {
    this.expressModeStartTag_.style.display = 'block'
    this.expressModeEndTag_.style.display = 'block'
  }

  disActivateExpressUI() {
    this.expressModeStartTag_.style.display = 'none'
    this.expressModeEndTag_.style.display = 'none'
  }

  /**
   * Calculate the tags marking position
   * @return {{endFrac: (number|number), startFrac: (number|number)}}
   */
  calculateTagPositions() {
    const seekRange = this.player.seekRange();
    const seekRangeSize = seekRange.end - seekRange.start;
    const startDist = this.expressConfig.finalBegin - seekRange.start;
    const startFrac = (startDist / seekRangeSize - 0.01) || 0;

    const endDist = this.video.duration - this.expressConfig.finalEnd - seekRange.start;
    const endFrac = (endDist / seekRangeSize - 0.025) || 0

    return {
      startFrac: startFrac,
      endFrac: endFrac
    }
  }

  /**
   * Creates a label to display the express speed when on express mode is active
   */
  createExpressSpeedLabel() {
    this.expressSpeedLabel_ = createHTMLElement('div');
    this.expressSpeedLabel_.classList.add('hexa-express-speed-label')
    this.expressSpeedLabel_.textContent = `${this.expressData.express_speed}x`;
    this.expressSpeedLabel_.style.fontSize = '15px';
    this.expressSpeedLabel_.style.fontWeight = 'bold';
    this.controls.getControlsContainer().appendChild(this.expressSpeedLabel_)
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {expressMode.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 * @example
 * ExpressModeButton.Factory = class {
    create(rootElement, controls) {
        return new ExpressModeButton(rootElement, controls);
    }
};
 */
expressMode.Factory = class {
  create(rootElement, controls) {
    return new expressMode(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'express_mode',
  new expressMode.Factory());

/**
 * @function
 * @memberOf expressMode
 * @description - ExpressMode feature to run the video from a specific point with a set speed in the player configuration
 * @param {string} begin -accepts values in %, minutes, second
 * @param {string} end - accepts values in %, minutes, seconds
 * @param {number} duration video.duration
 * @return {{finalEnd: number, finalBegin: number}}
 */
const evaluateSeconds = (begin, end, duration) => {
  // return default 5% if error parsing conf
  if (!begin.includes('%') && !begin.includes('s') ||
    !end.includes('%') && !end.includes('s')) {
    console.error('Error parsing values for express mode');
    return {
      finalBegin: 5 * duration / 100,
      finalEnd: 5 * duration / 100
    };
  }

  let finalBegin = parseInt(begin.substring(0, begin.length - 1));
  let finalEnd = parseInt(end.substring(0, end.length - 1));
  const isBeginPercentage = begin.substring(begin.length - 1) === '%';
  const isEndPercentage = end.substring(end.length - 1) === '%';

  if (isBeginPercentage) {
    finalBegin = finalBegin * duration / 100;
  }

  if (isEndPercentage) {
    finalEnd = finalEnd * duration / 100;
  }

  return {
    finalBegin,
    finalEnd
  };
};
