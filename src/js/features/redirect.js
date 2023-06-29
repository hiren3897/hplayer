import shaka from 'shaka-player/dist/shaka-player.ui';
import {
  createHTMLElement,
  createPlayAndStopButtons,
  getNextVideoPopupDialogTemplate
} from '../util/domUtils';

// global variables used for countdown settings
let stopTimer, backUpSeconds, seconds;

/**
 * Redirect feature. it redirects to another video on another page url.
 * @type {Redirect}
 * @extends {shaka.ui.Element} shaka.ui.Element
 * @export
 */
const Redirect = class extends shaka.ui.Element {

  /**
   * Redirect Configuration
   * @private
   */
  redirectConfig_;

  /**
   * Redirect Container
   * @private
   */
  redirectContainer_

  /**
   * Stops the redirect
   */
  stopRedirect

  /**
   * Redirect Timer seconds HTML Element
   */
  redirectTimerSecondsElement

  /**
   * Redirect Time Clock HTML Element
   */
  redirectTimerClockElement

  /**
   * Redirect Container Play Button
   */
  redirectPlayButton

  /**
   * Redirect Container Stop Button
   */
  redirectStopButton

  /**
   * Play Button
   * @private
   */
  playButton_


  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    // Redirect configuration data
    this.redirectConfig_ = this.controls.getPlayer().redirect;

    // Redirect container will hold the information about the next video or page.
    this.createRedirectContainer();

    // Populating the container
    if (this.redirectConfig_) {
      this.renderRedirectContainer();
    }

    // Create Play and stop button in redirect container
    if (this.redirectContainer_) {
      this.createRedirectStopAndPlayButton();
    }


    // variable to stop if redirect is stopped by the user
    this.stopRedirect = null;
    this.redirectTimerSecondsElement = document.querySelector('#hexa-redirect-seconds')
    this.redirectTimerClockElement = document.querySelector('#hexa-redirect-clock');

    // getting auto seconds for countdown
    seconds = backUpSeconds = this.redirectConfig_?.auto_second;

    // play button
    this.playButton_ = document.querySelector('.shaka-small-play-button');

    // listening the click event on share button to open and close the dialog
    this.eventManager.listen(this.video, 'ended', () => {
      const url = this.redirectConfig_?.url;
      if (this.redirectConfig_.auto_second > 0) {
        if (stopTimer) {
          clearInterval(stopTimer);
          stopTimer = null;
          seconds = backUpSeconds;
        }
        this.countDown();
        this.openRedirectContainer();
        this.redirectContainer_.style.pointerEvents = 'all';
        this.stopRedirect = setTimeout(() => {
          this.redirectToNextVideo(url);
        }, this.redirectConfig_?.auto_second * 1000);
      }

      if (this.redirectConfig_?.auto_second === 0) {
        this.redirectToNextVideo(url);
      }

      if (this.redirectConfig_?.auto_second === -1) {
        this.openRedirectContainer();
        this.redirectContainer_.style.pointerEvents = 'all';
        this.hideTimerContainer();
      }
    });

    this.eventManager.listen(this.redirectStopButton, 'click', () => {
      this.stopRedirectVideo(this.stopRedirect, stopTimer);
    });

    this.eventManager.listen(this.redirectPlayButton, 'click', () => {
      clearTimeout(this.stopRedirect);
      this.resetCountdownTimerAndUI(seconds, stopTimer, backUpSeconds);
      const url = this.redirectConfig_?.url;
      this.redirectToNextVideo(url);
      this.redirectContainer_.classList.add('hexa-hidden');
      this.redirectContainer_.style.pointerEvents = 'none';
      this.controls.getControlsContainer().style.pointerEvents = 'all'
    });

    if (this.playButton_) {
      this.playButton_.style.pointerEvents = 'all';
      this.eventManager.listen(this.playButton_, 'click', () => {
        const ariaLabel = this.playButton_.getAttribute('aria-label')
        if (ariaLabel && ariaLabel === 'Replay') {
          this.stopRedirectVideo(this.stopRedirect, stopTimer)
          this.controls.getControlsContainer().style.pointerEvents = 'all'
          if (!this.redirectContainer_.classList.contains('hexa-hidden')) {
            this.redirectContainer_.classList.add('hexa-hidden')
            this.redirectContainer_.style.pointerEvents = 'none';
          }
          this.resetCountdownTimerAndUI(seconds, stopTimer, backUpSeconds)
          this.video.currentTime = 0;
          this.video.play()
        }
      })
    }
  }

  createRedirectContainer() {
    this.redirectContainer_ = createHTMLElement('div');
    this.redirectContainer_.classList.add('redirect-container');
    this.redirectContainer_.classList.add('hexa-hidden');
    this.parent.appendChild(this.redirectContainer_);
  }

  createRedirectStopAndPlayButton() {
    const buttons = createPlayAndStopButtons()
    this.redirectPlayButton = buttons.playButtonElement;
    this.redirectStopButton = buttons.stopButtonElement;
    this.redirectContainer_.appendChild(this.redirectPlayButton)
    this.redirectContainer_.appendChild(this.redirectStopButton)
  }

  /**
     * Open Redirect container
     */
  openRedirectContainer() {
    this.redirectContainer_.classList.remove('hexa-hidden');
    this.redirectTimerClockElement.style.display = 'block';
    this.controls.getControlsContainer().style.pointerEvents = 'none'
  }

  /**
     * Render redirect container with the next video information
     */
  renderRedirectContainer() {
    const data = this.redirectConfig_;
    const html = getNextVideoPopupDialogTemplate(data)
    this.redirectContainer_.insertAdjacentHTML('afterbegin', html);
  }

  /**
     * Countdown timer
     */
  countDown() {
    const that = this
    stopTimer = setInterval(function() {
      seconds--;
      that.redirectTimerSecondsElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(stopTimer);
        seconds = backUpSeconds;
        that.redirectTimerSecondsElement.textContent = seconds;
      }
    }, 1000);
  }

  /**
     * Redirect to the video page
     * @param {string} url
     */
  redirectToNextVideo(url) {
    window.location.href = url;
  }

  /**
   * Stop the redirect video on user cancellation
   * @param stopRedirect
   * @param stopTimer
   */
  stopRedirectVideo(stopRedirect, stopTimer) {
    clearTimeout(stopRedirect);
    this.resetCountdownTimerAndUI(seconds, stopTimer, backUpSeconds);
    this.hideTimerContainer();
  }

  /**
     * Reset the countdown if it has been interrupted or ended.
     * @param seconds
     * @param stopTimer
     * @param resetSeconds
     */
  resetCountdownTimerAndUI(seconds, stopTimer, resetSeconds) {
    seconds = resetSeconds;
    this.redirectTimerSecondsElement.innerHTML = String(seconds);
    clearInterval(stopTimer);
    stopTimer = null;
  }

  hideTimerContainer() {
    this.redirectTimerClockElement.style.display = 'none';
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {Redirect.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
Redirect.Factory = class {
  create(rootElement, controls) {
    return new Redirect(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'redirect',
  new Redirect.Factory());
