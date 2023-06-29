import shaka from 'shaka-player/dist/shaka-player.ui';
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
 * @type {ThumbnailTrackVod}
 * @extends shaka.ui.Element
 */
const ThumbnailTrackVod = class extends shaka.ui.Element {



    /**
     * Thumbnail Configuration
     * @private
     */
    thumbnailTrackVodConfig_;

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

        this.thumbnailTrackVodConfig_ = this.controls.getPlayer().thumbnail_track_vod;
        this.shakaSeekbar_ = null;
        this.imageTracks_ = null;
        this.position_ = null;

        if (this.thumbnailTrackVodConfig_) {
            this.thumbnailTrackVodConfig_.webVttInfo = this.thumbnailTrackVodConfig_.webVttInfo ?? undefined
            this.thumbnailTrackVodConfig_.withWebVtt = this.thumbnailTrackVodConfig_.withWebVtt ?? false
        }

        this.webVttParsedData_ = null
        // Thumbnail Container
        this.thumbnailVodContainer_ = createHTMLElement('div');
        this.thumbnailVodContainer_.classList.add('thumbnail-vod-container');

        // Thumbnail Image
        this.thumbnailVodImage_ = createHTMLElement('div');
        this.thumbnailVodImage_.id = 'hexa-vod-thumb';
        this.thumbnailVodImage_.classList.add('hexa-vod-thumbnail-image');

        // SeekTime Element
        this.seekTimeLabel_ = createHTMLElement('span');
        this.seekTimeLabel_.classList.add('seekbar-thumb-tooltip');
        this.thumbnailVodContainer_.appendChild(this.seekTimeLabel_);

        // Append in thumbnail container
        this.thumbnailVodContainer_.appendChild(this.thumbnailVodImage_);

        this.ua_ = (new UAParser()).getResult();

        // Append Container in shaka-control parent element
        this.parent.appendChild(this.thumbnailVodContainer_);

        this.eventManager.listen(this.player, 'loaded', async () => {
            this.thumbnailService_ = new ThumbnailService(this.player, this.controls)
            if (this.thumbnailTrackVodConfig_.withWebVtt) {
                this.imageTracks_ = await this.thumbnailService_
                    .getThumbnailsTrack(this.thumbnailTrackVodConfig_.webVttInfo);
            } else {
                this.imageTracks_ = this.getThumbnailImageTrack();
            }

            this.shakaSeekbar_ = this.thumbnailService_.getSeekBar();
            if (this.shakaSeekbar_) {
                this.shakaSeekbar_.style.cursor = 'pointer';
            }

            /**
             * For Browser level
             */
            this.eventManager.listen(this.shakaSeekbar_, 'mousemove', (event) => {
                const mousePosition = this.thumbnailService_.getCurrentPosition(event)
                this.thumbnailVodContainer_.style.display = 'block';
                this.showThumbnailsFromSource(event, mousePosition)
            })

            this.eventManager.listen(this.shakaSeekbar_, 'mouseleave', (event) => {
                this.thumbnailVodContainer_.style.display = 'none';
            })

            /**
             * For Mobile Level
             */
            this.eventManager.listen(this.shakaSeekbar_, 'touchmove', (event) => {
                const touchPosition = this.thumbnailService_.getCurrentPosition(event)
                this.thumbnailVodContainer_.style.display = 'block';
                this.showThumbnailsFromSource(event, touchPosition)
            })

            this.eventManager.listen(this.shakaSeekbar_, 'touchend', (event) => {
                this.thumbnailVodContainer_.style.display = 'none';
            })
        })

    }

    getThumbnailImageTrack() {
        const imageTracks = this.player.getImageTracks();
        return imageTracks[0];
    }

    async showThumbnailsFromSource(event, position) {
        if (!this.video || !this.player) {
            return;
        }
        if (!this.thumbnailVodContainer_) {
            return;
        }

        if (this.imageTracks_) {
            this.thumbnailVodImage_.draggable = false;
            const thumbnail = await this.player.getThumbnails(this.imageTracks_.id, position);
            const uri = thumbnail.uris;
            if (typeof (thumbnail) == "undefined") {
                return;
            }
            const url = uri[0]
            this.seekTimeLabel_.textContent = this.thumbnailService_.formatTime(thumbnail.startTime);

            this.thumbnailVodImage_.style.backgroundImage = 'url(' + url + ')';
            this.thumbnailVodImage_.style.height = thumbnail.height + 'px';
            this.thumbnailVodImage_.style.width = thumbnail.width + 'px';
            if (this.thumbnailTrackVodConfig_.withWebVtt) {
                this.thumbnailVodImage_.style.backgroundPositionX = `${thumbnail.positionX}px`;
                this.thumbnailVodImage_.style.backgroundPositionY = `-${thumbnail.positionY}px`;
            } else {
                this.thumbnailVodImage_.style.backgroundPositionX = `-${thumbnail.positionX}px`;
                this.thumbnailVodImage_.style.backgroundPositionY = `${thumbnail.positionY}px`;
            }
            let leftPos = event.clientX - 50 - this.shakaSeekbar_.offsetLeft;
            // Handle overflow
            if (leftPos < 0) {
                leftPos = 0;
            } else if (leftPos + 180 > this.shakaSeekbar_.offsetWidth) {
                leftPos = this.shakaSeekbar_.offsetWidth - 180;
            }
            this.thumbnailVodContainer_.style.left = `${leftPos}px`
            this.thumbnailVodContainer_.style.display = 'block';
        }
    }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ThumbnailTrackVod.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
ThumbnailTrackVod.Factory = class {
    create(rootElement, controls) {
        return new ThumbnailTrackVod(rootElement, controls);
    }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
    /* This name will serve as a reference to the button in the UI configuration object */ 'thumbnail_track_vod',
    new ThumbnailTrackVod.Factory());
