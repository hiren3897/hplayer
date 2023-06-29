import shaka from 'shaka-player/dist/shaka-player.ui';
import { ThumbnailService } from './services/thumbnailService';
import { createHTMLElement } from '../util/domUtils';

/**
 * Time Tooltips
 * @type {TimeTooltip}
 * @extends {shaka.ui.Element} shaka.ui.Element
 * @export
 */
const TimeTooltip = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    this.eventManager.listenOnce(this.player, 'loaded', () => {
      this.controls.getVideoContainer().style.overflow = 'hidden';
      this.thumbnailService_ = new ThumbnailService(this.player, this.controls);
      this.seekbar_ = this.thumbnailService_.getSeekBar();
      this.shakaRangeContainer_ = this.controls.getControlsContainer().querySelector('.shaka-seek-bar-container');

      if (this.seekbar_) {
        this.addToolTipContainer();
        this.seekbar_.style.cursor = 'pointer';
      }

      /**
       * For Browser level
       */
      this.eventManager.listen(this.seekbar_, 'mousemove', (event) => {
        this.onTouchSeek(event);
      });

      this.eventManager.listen(this.seekbar_, 'mouseleave', () => {
        this.onTouchLeave();
      });

      /**
       * For Mobile Level
       */
      this.eventManager.listen(this.seekbar_, 'touchmove', (event) => {
        this.onTouchSeek(event);
      });

      this.eventManager.listen(this.seekbar_, 'touchend', () => {
        this.onTouchLeave();
      });
    });
  }

  addToolTipContainer() {
    this.tooltipContainer = createHTMLElement('span');
    this.tooltipContainer.classList.add('hexa-time-tooltip');
    this.tooltipContainer.style.display = 'none';
    this.shakaRangeContainer_.appendChild(this.tooltipContainer);
  }

  getLeftPosition(event) {
    const clientX = this.thumbnailService_.getClientX(event);

    if (clientX >= document.querySelector('.shaka-seek-bar').getBoundingClientRect().right - this.tooltipContainer.getBoundingClientRect().width) {
      return (`calc(100% - ${this.tooltipContainer.getBoundingClientRect().width}px`);
    } else {
      return this.thumbnailService_.getMouseLeftPosition(clientX,
        this.seekbar_.getBoundingClientRect().left,
        this.seekbar_.offsetWidth);
    }
  }

  onTouchSeek(event) {
    const position = this.thumbnailService_.getCurrentPosition(event);
    this.tooltipContainer.style.display = '';
    this.tooltipContainer.textContent = this.thumbnailService_.formatTime(position);
    this.tooltipContainer.style.left = this.getLeftPosition(event).toString();
  }

  onTouchLeave() {
    this.tooltipContainer.style.display = 'none';
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ChaptersVOD.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
TimeTooltip.Factory = class {
  create(rootElement, controls) {
    return new TimeTooltip(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */
  'time_tooltip',
  new TimeTooltip.Factory()
);
