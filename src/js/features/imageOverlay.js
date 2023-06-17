import { createHTMLElement } from '../util/domUtils';
import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import { generateBackgroundImageURL } from '../util/sharedUtils';

/**
 * To overlay image over video player.
 * @type {ImageOverlay}
 * @extends {shaka.ui.Element} shaka.ui.Element
 */

const ImageOverlay = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    // Image data config
    this.overlayImages = this.controls.getPlayer().image_overlay;
    this.images = this.overlayImages.imageUrls;

    this.backgroundImage = generateBackgroundImageURL(this.images);
    // Image Container
    this.imageContainer = createHTMLElement('div');
    this.imageContainer.classList.add('hexa-image-overlay');
    this.imageContainer.style.backgroundImage = this.backgroundImage.join(',');

    // for dynamic update from the player globally
    this.controls.getPlayer().image_overlay_container = this.imageContainer;

    this.eventManager.listen(this.player, 'loaded', () => {
      // append on the video player level
      const videoContainer = document.querySelector('.shaka-video-container');
      videoContainer.appendChild(this.imageContainer);
    });
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ImageOverlay.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
ImageOverlay.Factory = class {
  create(rootElement, controls) {
    return new ImageOverlay(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'image_overlay',
  new ImageOverlay.Factory());
