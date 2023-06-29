import shaka from 'shaka-player/dist/shaka-player.ui';
import { createButton, createHTMLElement } from '../util/domUtils';

// variables for canvas image manipulations
let w, h, ratio;

/**
 * This is a ScreenShot feature that is used to take snapshots of the video live while running the video.
 *  and Download it or set it as a video thumbnail in the video player.
 * @type {ScreenShot}
 * @extends shaka.ui.Element
 */
const ScreenShot = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    // The actual snapshot button that will be displayed
    this.snapButton_ = createButton();
    this.snapButton_.classList.add('snapshot-button');
    this.snapButton_.classList.add('shaka-tooltip');
    const snapIcon = document.createElement('span');
    snapIcon.classList.add('hexa-player-icons');
    snapIcon.textContent = 'photo_camera';
    this.snapButton_.appendChild(snapIcon);
    this.parent.appendChild(this.snapButton_);

    const video = this.controls.getVideoContainer().children[0];
    // required to handle : DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported
    video.setAttribute('crossorigin', 'anonymous');

    // the canvas element in the dialog on with the image will be rendered
    this.canvas_ = createHTMLElement('canvas');
    this.canvas_.id = 'canvas';
    this.canvas_.classList.add('snapshot');
    // this.snapButton_.appendChild(this.canvas_);
    // Get a handle on the 2d context of the canvas element
    this.context = this.canvas_.getContext('2d');

    // Tooltip
    this.snapButton_.setAttribute('data-i18n-aria-label-key', 'screenshot-btn-title');

    // Listen for clicks on the button to capture a snap of video and display it in the container.
    this.eventManager.listen(this.snapButton_, 'click', (e) => {
      if (e.target === snapIcon) {
        this.snap(video);
      }
    });

    video.addEventListener('loadedmetadata', () => {
      // Calculate the ratio of the video's width to height
      ratio = video.clientWidth / video.clientHeight;
      // Define the required width as 100 pixels smaller than the actual video's width
      w = video.clientWidth - 100;
      // Calculate the height based on the video's width and the ratio
      h = parseInt(w / ratio, 10);
      // Set the canvas width and height to the values just calculated
      this.canvas_.width = w;
      this.canvas_.height = h;
    }, false);
  }

  /**
   * @function
   * @memberOf ScreenShot
   * @description - It captures the current video screen and Draw the image on HTMLCanvasElement using canvas context.
   * @param {!HTMLVideoElement} video takes the latest screen on video
   */
  snap(video) {
    this.context.fillRect(0, 0, w, h);
    // Grab the image from the video
    this.context.drawImage(video, 0, 0, w, h);
    this.directDownload();
  }

  directDownload() {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = this.canvas_.toDataURL();
    link.click();
    // eslint-disable-next-line no-unused-expressions
    link.delete;
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ScreenShot.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */

ScreenShot.Factory = class {
  create(rootElement, controls) {
    return new ScreenShot(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'snapshot',
  new ScreenShot.Factory());
