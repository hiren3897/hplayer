import shaka from 'shaka-player/dist/shaka-player.ui';

/**
 * Auto PictureInPicture feature.
 * It auto activates the PIP like video at the bottom right of the screen when, scroll event is triggered.
 * @type {AutoPictureInPicture}
 * @extends {shaka.ui.Element} shaka.ui.Element
 */
const AutoPictureInPicture = class extends shaka.ui.Element {

  /**
   * Auto PIP config
   * @private
   */
  autoPipConfig_;

  /**
   * Shaka Video Container
   * @private
   */
  videoContainer_

  /**
   * It holds the threshold in pixels to trigger PIP when the video is scrolled XX%
   * @private
   */
  thresholdPositionInPixels_

  /**
   *
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    this.autoPipConfig_ = this.controls.getPlayer().auto_pip;

    // Shaka video container
    this.videoContainer_ = this.controls.getVideoContainer();

    this.eventManager.listenOnce(this.player, 'loaded', async() => {
      // threshold is the y coordinate of the videoContainer + a percentage of the height of the videoContainer
      this.thresholdPositionInPixels_ = this.getThresholdPositionInPixels() + this.videoContainer_.getBoundingClientRect().top;
      this.eventManager.listen(document, 'scroll', (e) => {
        e.preventDefault();
        this.autoPictureInPicture(window.scrollY, this.thresholdPositionInPixels_);
      });
    });
  }

  /**
   * Activates and Deactivate the auto PIP.
   * @param scrollPosition - the scroll event postion windown.scrollY
   * @param clientThreshold - client required threshold in pixels
   */
  autoPictureInPicture(scrollPosition, clientThreshold) {
    if (scrollPosition > clientThreshold) {
      this.videoContainer_.classList.add('hexa-fixed-piped-video');
    } else {
      this.videoContainer_.classList.remove('hexa-fixed-piped-video');
    }
  }

  /**
   * Converts percent into pixels
   * Pixel (Px) = (Percent * Base)/100
   * @return {number}
   */
  getThresholdPositionInPixels() {
    const threshold = this.autoPipConfig_.threshold ? this.autoPipConfig_.threshold : '30%';
    const percent = parseInt(threshold.split('%')[0]);
    return (percent * this.videoContainer_.offsetHeight) / 100;
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {AutoPictureInPicture.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
AutoPictureInPicture.Factory = class {
  create(rootElement, controls) {
    return new AutoPictureInPicture(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'auto_pip',
  new AutoPictureInPicture.Factory());
