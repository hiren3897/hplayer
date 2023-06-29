import shaka from 'shaka-player/dist/shaka-player.ui';

/**
 * This feature have a same functionality as small live button have but with a different appearance.
 * it is placed beside the big live button in the center of the video player.
 * It is used to go back to live video.
 * @type {BigLiveButton}
 * @extends {shaka.ui.Element} shaka.ui.Element
 */
const BigLiveButton = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    // The actual button that will be displayed
    this.bigLiveButton_ = document.createElement('button');
    this.bigLiveButton_.classList.add('big-player-live-button');
    this.bigLiveIcon_ = document.createElement('span');
    this.bigLiveIcon_.classList.add('hexa-player-icons');
    this.bigLiveIcon_.classList.add('shaka-tooltip');
    this.bigLiveIcon_.textContent = 'redo';
    this.bigLiveButton_.appendChild(this.bigLiveIcon_);
    this.parent.appendChild(this.bigLiveButton_);

    // tooltip
    this.bigLiveButton_.setAttribute('data-i18n-aria-label-key', 'live-btn-title');

    // Listen for clicks on the button to go to live
    this.eventManager.listen(this.bigLiveButton_, 'click', () => {
      if (this.player.getPlaybackRate() !== 1) {
        this.video.playbackRate = 1;
      }
      if (this.player.isLive()) {
        this.player.goToLive();
      }
    });

    /**
     * if seekbar is near the end edge change playback speed to normal
     */
    this.eventManager.listen(this.controls, 'timeandseekrangeupdated', () => {
      if (this.video.currentTime > this.player.seekRange().end - 5) {
        if (this.player.getPlaybackRate() !== 1) {
          this.video.playbackRate = 1;
        }
      }
    });

    // Listen for playing event on the video player to perform changes if any
    this.eventManager.listen(this.video, 'timeupdate', () => {
      if (this.video.currentTime < this.player.seekRange().end - 5) {
        this.bigLiveButton_.style.backgroundImage = 'linear-gradient(to top left, #bdbdbd, #d2d2d2)';
        this.bigLiveButton_.disabled = false;
        this.bigLiveButton_.style.cursor = 'pointer';
      } else {
        this.bigLiveButton_.style.backgroundImage = 'linear-gradient(to top left, #d70202, #e22727)';
        this.bigLiveButton_.disabled = true;
        this.bigLiveButton_.style.cursor = 'auto';
      }
    });

    /*
     * Adjust CSS for button when on fullscreen or not
     */
    document.addEventListener('fullscreenchange', (event) => {
      if (document.fullscreenElement) {
        this.bigLiveButton_.classList.remove('big-player-live-button');
        this.bigLiveButton_.classList.add('big-player-live-button-fullscreen');
        this.bigLiveIcon_.classList.add('hexa-fullscreen-icon');
      } else {
        this.bigLiveIcon_.classList.remove('hexa-fullscreen-icon');
        this.bigLiveButton_.classList.add('big-player-live-button');
        this.bigLiveButton_.classList.remove('big-player-live-button-fullscreen');
      }
    });
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {BigLiveButton.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
BigLiveButton.Factory = class {
  create(rootElement, controls) {
    return new BigLiveButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'big_live_button',
  new BigLiveButton.Factory());
