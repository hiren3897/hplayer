import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import { createHTMLElement } from '../util/domUtils';
import {UAParser} from "ua-parser-js";
import {ThumbnailService} from "./services/thumbnailService";

/**
 * To preview thumbnail on the timeline scrubbing
 * shaka-player now supports to get the thumbnail track images for
 * live streams if and only if the manifest contains thumbnails tracks init.
 * Procedure to get the images URLs in shaka-player API
 * player.getImageTracks()
 * await player.getThumbnails(trackId, time)
 * shaka.extern.Thumbnail

 * Then we have the image URLs and metadata to position the image where we want in the UI.
 * Once we will have the URLs of image I have already worked on thumbnails for VOD player, but it's a bad way because as it does functionality on clientside.
 * I am going to take the samples of manifest files and try implementing a methodology to preview thumbnails.
 * Once I have the output for thumbnails using outside manifest we can take inspiration from that manifest and update ours to have a best solution.

 * Problem Statements

 * Our Equidia manifest doesn't contains the thumbnails in the manifest,
 * so we have to complete this before rendering it in the UI.
 * @type {ThumbnailTrackLive}
 * @extends shaka.ui.Element
 */
const ThumbnailTrackLive = class extends shaka.ui.Element {


  /**
   * UA parser to detect platform;
   * @private
   */
  ua_;

  /**
   * thumbnail Service
   * @private
   */
  thumbnailService_;

  /**
   *
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    this.shakaSeekbar_ = null;
    this.imageTracks_ = null;
    this.position_ = null;

    // Thumbnail Container
    this.thumbnailLiveContainer_ = createHTMLElement('div');
    this.thumbnailLiveContainer_.classList.add('thumbnail-live-container');

    // Thumbnail Image
    this.thumbnailLiveImage_ = createHTMLElement('div');
    this.thumbnailLiveImage_.id = 'hexa-live-thumb';
    this.thumbnailLiveImage_.classList.add('hexa-live-thumbnail-image');

    // SeekTime Element
    this.seekTimeLabel_ = createHTMLElement('span');
    this.seekTimeLabel_.classList.add('seekbar-thumb-tooltip');
    this.thumbnailLiveContainer_.appendChild(this.seekTimeLabel_);

    // Append in thumbnail container
    this.thumbnailLiveContainer_.appendChild(this.thumbnailLiveImage_);

    this.ua_ = (new UAParser()).getResult();

    // Append Container in shaka-control parent element
    this.parent.appendChild(this.thumbnailLiveContainer_);

    this.eventManager.listen(this.player, 'loaded', () => {
      this.imageTracks_ = this.getThumbnailImageTrack();
      this.thumbnailService_ = new ThumbnailService(this.player, this.controls)
      this.shakaSeekbar_ = this.thumbnailService_.getSeekBar()

      if (this.shakaSeekbar_) {
        this.shakaSeekbar_.style.cursor = 'pointer';

        this.eventManager.listen(this.shakaSeekbar_, 'mousemove', async (e) => {
          // Gets the currentTime position on hover
          this.position_ = this.thumbnailService_.getCurrentPosition(e);
          this.thumbnailLiveContainer_.style.display = 'block';
          await this.showSingleTrackThumbnail(e, this.position_);
        });

        this.eventManager.listen(this.shakaSeekbar_, 'touchmove',
            async (event) => {
          // Gets the currentTime position on hover
          this.position_ = this.thumbnailService_.getCurrentPosition(event);
          this.thumbnailLiveContainer_.style.display = 'block';
          await this.showSingleTrackThumbnail(e, this.position_);
        });

        this.eventManager.listen(this.shakaSeekbar_, 'mouseleave', () => {
          this.thumbnailLiveContainer_.style.display = 'none';
        });

        this.eventManager.listen(this.shakaSeekbar_, 'touchend', () => {
          this.thumbnailLiveContainer_.style.display = 'none';
        });
      }
    });
  }

  getThumbnailImageTrack() {
    const imageTracks = this.player.getImageTracks();
    return imageTracks[0];
  }

  /**
   * Show the thumbnails form the Manifest Scheme API
   * @param event
   * @param position
   * @return {Promise<void>}
   */
  async showSingleTrackThumbnail(event, position) {
    if (!this.video || !this.player) {
      return;
    }
    if (!this.thumbnailLiveContainer_) {
      return;
    }

    if (this.imageTracks_) {
      this.thumbnailLiveImage_.draggable = false;
      const thumbnail = await this.player.getThumbnails(this.imageTracks_.id, position);
      if (!thumbnail) {
        return;
      }
      this.seekTimeLabel_.textContent = this.thumbnailService_.formatTime(position);
      const uri = thumbnail.uris;
      const url = uri[0];
      this.thumbnailLiveImage_.style.backgroundImage = 'url(' + url + ')';
      this.thumbnailLiveImage_.style.height = thumbnail.height + 'px';
      this.thumbnailLiveImage_.style.width = thumbnail.width + 'px';
      this.handleThumbnailNavigationUI(event, 70)
    } else {
      return;
    }
    this.thumbnailLiveContainer_.style.display = 'block';
  }

  handleThumbnailNavigationUI(event, rightOffsetLimit) {
    const clientX = this.thumbnailService_.getClientX(event);
    const thumbnailContainerLeftPosition = this.thumbnailService_.getMouseLeftPosition(clientX,
        this.shakaSeekbar_.getBoundingClientRect().left,
        this.shakaSeekbar_.offsetWidth);
    const leftPositionInt = thumbnailContainerLeftPosition.split('%');

    /**
     * It keeps a trace on the thumbnail container's left position,
     * to not allow the container to go outside the video container
     * In fullscreen and non-fullscreen mode
     */
    if (document.fullscreenElement) {
      const onFullscreenFixedThumbnailContainerRightPosition = 87;
      if (Math.round(parseInt(leftPositionInt[0])) > onFullscreenFixedThumbnailContainerRightPosition) {
        this.thumbnailLiveContainer_.style.left = `${onFullscreenFixedThumbnailContainerRightPosition}%`;
      } else {
        this.thumbnailLiveContainer_.style.left = thumbnailContainerLeftPosition;
      }
    } else {
      const onNoFullscreenFixedThumbnailContainerRightPosition = rightOffsetLimit;
      if (Math.round(parseInt(leftPositionInt[0])) > onNoFullscreenFixedThumbnailContainerRightPosition) {
        this.thumbnailLiveContainer_.style.left = `${onNoFullscreenFixedThumbnailContainerRightPosition}%`;
      } else {
        this.thumbnailLiveContainer_.style.left = thumbnailContainerLeftPosition;
      }
    }
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ThumbnailTrackLive.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
ThumbnailTrackLive.Factory = class {
  create(rootElement, controls) {
    return new ThumbnailTrackLive(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'thumbnail_track_live',
  new ThumbnailTrackLive.Factory());
