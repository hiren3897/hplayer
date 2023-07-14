import shaka from 'shaka-player/dist/shaka-player.ui';
import { createHTMLElement } from '../util/domUtils';
import Hplayer from '../hPlayer';

/**
 * This the Thumbnails feature.
 * It take snapshot from a hidden videoPlayer to generate thumbnails when user hover mouse on seekbar.
 *
 * @type {Thumbnails}
 * @extends shaka.ui.Element
 */
const Thumbnails = class extends shaka.ui.Element {
  /**
   *
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    // Thumbnails Container
    this.thumbnailsContainer_ = createHTMLElement('div');
    this.thumbnailsContainer_.classList.add('thumbnails-container');

    this.parent.appendChild(this.thumbnailsContainer_);

    // the canvas element in the dialog on with the image will be rendered
    // FIXME use the duplicated player, video might not be the same size resolution
    // Wait for duplicated player to be ready and use it rather than the original hplayer
    this.canvas_ = createCanvas(this.controls.getVideo());
    this.thumbnailsContainer_.appendChild(this.canvas_);
    // Get a handle on the 2d context of the canvas element

    // SeekTime Element
    this.seekTimeLabel_ = createHTMLElement('p');
    this.thumbnailsContainer_.appendChild(this.seekTimeLabel_);

    // Throttle the drawing of thumbnails, for performance and network
    this.debouncedDelay = this.controls.getPlayer().thumbnails[0].debounce_delay;
    // Used to apply a filter(one time) on previous thumbnail while waiting for the next one.
    this.debounceOverlay = true;
    // Timeout to draw next thumbnail
    this.timeoutNextDrawing = null;

    this.eventManager.listen(this.controls, Hplayer.ASSET_LOADED, e => {
      this.createDuplicatePlayer();
    });

    // SeekBar only available after the video has started.
    this.eventManager.listenOnce(this.video, 'play', () => {
      this.shakaSeekbar_ = document.querySelector('.shaka-seek-bar');
      this.shakaSeekbar_.style.cursor = 'pointer';
      // Show thumbnail when mouse is hovering the seek bar
      this.shakaSeekbar_.addEventListener('mousemove', (e) => {
        const cursorPosition = Math.round(this.getCurrentPosition(e));
        // Formatting the current time label in hh:mm:ss
        const showHour = this.video.duration >= 3600;
        this.seekTimeLabel_.textContent = this.buildTimeString(cursorPosition, showHour);
        this.thumbnailsContainer_.style.display = 'block';
        if (this.timeoutNextDrawing) {
          clearTimeout(this.timeoutNextDrawing);
          if (this.debounceOverlay) {
            // Option 1
            // clear previous thumbnail while mouse over the seekbar
            // this.canvas_.getContext('2d').clearRect(0, 0, this.canvas_.width, this.canvas_.height);

            // Option 2
            // Apply a overlay with 0.5 opacity to previous thumbnail
            // while waiting for green light(throttle delay) for new thumbnail
            // const ctx = this.canvas_.getContext('2d');
            // ctx.globalAlpha = 0.5;
            // ctx.fillStyle = "white";
            // ctx.fillRect(0, 0, this.canvas_.width, this.canvas_.height);
            this.debounceOverlay = false;
          }
        }
        this.timeoutNextDrawing = setTimeout(() => {
          this.drawThumbnail(this.videoPlayer, this.canvas_, cursorPosition);
          this.timeoutNextDrawing = null;
          this.debounceOverlay = true;
        }, this.debouncedDelay);
      });
      // Hide thumbnail on mouse leaving the Sikh bar
      this.shakaSeekbar_.addEventListener('mouseleave', () => {
        this.thumbnailsContainer_.style.display = 'none';
      });
    });
  }

  /**
   * Create a hplayer duplicate, to be able to change its currentTime and generate thumbnails from it.
   * TODO, check if when changing source the ole duplicatePlayer is completely destroyed
   */
  createDuplicatePlayer() {
    this.videoContainer = createHTMLElement('div');
    this.videoPlayer = createHTMLElement('video');
    this.videoContainer.appendChild(this.videoPlayer);
    this.duplicatedPlayer = new Hplayer(
      this.videoPlayer,
      this.videoContainer,
      { basic: { ...this.controls.options.basic } }
    );
    this.duplicatedPlayer.init_();
    this.duplicatedPlayer.video_.muted = true;
  }

  /**
   * Video time from cursor hovering the timeline
   * @param e
   * @return {number}
   */
  getCurrentPosition(e) {
    const seekBarRect = this.shakaSeekbar_.getBoundingClientRect();
    const min = parseFloat(this.shakaSeekbar_.min);
    const max = parseFloat(this.shakaSeekbar_.max);

    const position = e.clientX - seekBarRect.left;
    const scale = (max - min) / seekBarRect.width;

    let realPosition = (min + scale * position);
    if (realPosition < min) {
      realPosition = min;
    } else if (realPosition > max) {
      realPosition = max;
    }

    return realPosition;
  }

  /**
   * Builds a time string, e.g., 01:04:23, from |displayTime|.
   *
   * @param {number} displayTime (in seconds)
   * @param {boolean} showHour
   * @return {string}
   */
  buildTimeString(displayTime, showHour) {
    const h = Math.floor(displayTime / 3600);
    const m = Math.floor((displayTime / 60) % 60);
    let s = Math.floor(displayTime % 60);
    if (s < 10) {
      s = '0' + s;
    }
    let text = m + ':' + s;
    if (showHour) {
      if (m < 10) {
        text = '0' + text;
      }
      text = h + ':' + text;
    }
    return text;
  }

  /**
   * @function
   * @memberOf Thumbnails
   * @description - It captures the current video screen and Draw the image on HTMLCanvasElement using canvas context.
   * @param {!HTMLVideoElement} video takes the latest screen on video
   * @param {!HTMLCanvasElement} canvas it is HTMLCanvasElement.getContext() object
   * @param {!Event} e
   */
  drawThumbnail(video, canvas, cursorPosition) {
    video.currentTime = cursorPosition;
    const context = canvas.getContext('2d');
    // Define the size of the rectangle that will be filled (basically the entire element)
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Grab the image from the video
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ScreenShot.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */

Thumbnails.Factory = class {
  create(rootElement, controls) {
    return new Thumbnails(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'thumbnails',
  new Thumbnails.Factory());

/**
 *
 * @param {!HTMLMediaElement} video
 */
function createCanvas(video) {
  const canvas_ = document.createElement('canvas');
  canvas_.classList.add('thumbnail');

  const ratio = video.clientWidth / video.clientHeight;
  // Define the required width as 100 pixels smaller than the actual video's width
  canvas_.width = video.clientWidth - 100;
  // Calculate the height based on the video's width and the ratio
  canvas_.height = Math.round(canvas_.width / ratio);

  return canvas_;
}
