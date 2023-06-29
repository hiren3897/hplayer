import shaka from 'shaka-player/dist/shaka-player.ui';
/**
 * This is a small live button on the edge of seekbar to go back to live stream. it is only for Live player.
 * @type {SmallLiveButton}
 * @extends {shaka.ui.Element}
 */
const SmallLiveButton = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    // The actual live button that will be displayed
    this.liveButton_ = document.createElement('button');
    this.liveButton_.classList.add('player-live-button');
    this.liveButton_.classList.add('shaka-tooltip');
    this.liveButton_.textContent = 'Live';
    this.parent.appendChild(this.liveButton_);

    // tooltip
    this.liveButton_.setAttribute('data-i18n-aria-label-key', 'live-btn-title');

    this.eventManager.listen(this.video, 'timeupdate', () => {
      if (this.video.currentTime < this.player.seekRange().end - 5) {
        this.liveButton_.classList.remove('player-live-button-red');
        this.liveButton_.classList.add('player-live-button');
        this.liveButton_.disabled = false;
        this.liveButton_.style.cursor = 'pointer';
      } else {
        this.liveButton_.classList.add('player-live-button-red');
        this.liveButton_.disabled = true;
        this.liveButton_.style.cursor = 'auto';
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

    // listen to the click event and set the player to the live edge
    this.eventManager.listen(this.liveButton_, 'click', () => {
      if (this.player.getPlaybackRate() !== 1) {
        this.video.playbackRate = 1;
      }
      if (this.player.isLive()) {
        this.player.goToLive();
      }
    });
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {SmallLiveButton.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
SmallLiveButton.Factory = class {
  create(rootElement, controls) {
    return new SmallLiveButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'small_live_button',
  new SmallLiveButton.Factory());
