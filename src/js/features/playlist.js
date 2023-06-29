import shaka from 'shaka-player/dist/shaka-player.ui';
import Hplayer from '../hPlayer';
import {
  createButton,
  createHTMLElement,
  createPlayAndStopButtons,
  getNextVideoPopupDialogTemplate
} from "../util/domUtils";

// global variables used for countdown settings
let stopTimer, backUpSeconds, seconds;
/**
 *
 * Playlist feature is used to play the next video after X seconds of interval when the video ends.
 * @type {PlaylistFeature}
 * @extends shaka.ui.Element
 * @export
 */
const PlaylistFeature = class extends shaka.ui.Element {

  /**
   * Selected video index
   */
  selectedVideoIndex;

  /**
   * Playlist configuration data
   * @private
   */
  playlistConfig_;

  /**
   * Playlist Container
   * @private
   */
  playListDialogContainer_;

  /**
   * Next Video popup container
   * @private
   */
  nextVideoPopUpContainer_

  /**
   * Playlist Button
   * @private
   */
  playlistButton_;

  /**
   * Next Video Popup dialog video card Element
   */
  nextVideoCardElement_

  /**
   * Next Video Popup dialog video card title Element
   */
  nextVideoCardTitleElement_

  /**
   * Redirect Timer seconds HTML Element
   */
  nextVideoPopupTimerSecondsElement

  /**
   * Redirect Time Clock HTML Element
   */
  nextVideoPopupTimerClockElement

  /**
   * Next Video popup dialog play button
   */
  nextVideoPopupPlayButton

  /**
   * Next Video popup dialog stop button
   */
  nextVideoPopupStopButton

  /**
   * PlayButton
   */
  playButton_

  /**
   *
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    this.selectedVideoIndex = 0;
    this.clearPopUpDialogInterval = null

    this.playlistConfig_ = this.controls.getPlayer().playlist;

    // videos container where we will append all the video child elements in playlist container.
    if (this.playlistConfig_.withPlaylist) {
      this.createPlaylistContainer();
      // button to open and close the dialog of video playlist.
      this.createPlaylistButton();
      this.renderVideosPlaylist();
    }

    // Create next video popup container
    if (this.playlistConfig_.withNextVideoPopup) {
      this.createNextVideoPopupContainer();
      this.renderNextVideoPopupDialog();
      this.createNextVideoPopupButtons();
      this.nextVideoCardElement_ = document.querySelector('.redirect-video-card')
      this.nextVideoCardTitleElement_ = document.querySelector('.redirect-video-card-title')
      this.nextVideoPopupTimerSecondsElement = document.querySelector('#hexa-redirect-seconds')
      this.nextVideoPopupTimerClockElement = document.querySelector('#hexa-redirect-clock');
      this.playButton_ = document.querySelector('.shaka-small-play-button');
    }

    if (this.playlistConfig_?.videos?.length) {
      this.updateHighlightedVideo()
    } else {
      console.error('No video playlist provided');
    }

    // getting auto seconds for countdown
    seconds = backUpSeconds = this.playlistConfig_?.auto_second;

    /**
     * Listen for the ended event on the video to play next video directly
     * @eventManager prototype
     */
    this.eventManager.listen(this.video, 'ended', () => {
      // last video played and loop is set to true then it start over.
      if (parseInt(this.selectedVideoIndex) === this.playlistConfig_?.videos?.length - 1) {
        if (this.playlistConfig_?.loop) {
          this.selectedVideoIndex = 0;
          if (this.playlistConfig_.withNextVideoPopup) {
            this.updateNextVideoPopupDialog(this.selectedVideoIndex--)
            this.openNextVideoPopUpContainer()
            this.clearPopUpDialogInterval = setInterval(() => {
              this.selectedVideoIndex++
              this.nextVideoPopUpContainer_.classList.add('hexa-hidden')
              this.nextVideoPopUpContainer_.style.pointerEvents = 'none';
              this.controls.getControlsContainer().style.pointerEvents = 'all'
              clearInterval(this.clearPopUpDialogInterval)
              this.loadVideo();
              this.resetCountdownTimerAndUI(seconds,stopTimer,backUpSeconds)
            }, this.playlistConfig_?.auto_second * 1000)
          } else {
            this.loadVideo();
          }

          return;
        } else {
          return; // if loop false stops the playback
        }
      }

      if (this.playlistConfig_.withNextVideoPopup) {
        this.openNextVideoPopUpContainer();
        this.clearPopUpDialogInterval = setInterval(() => {
          this.nextVideoPopUpContainer_.classList.add('hexa-hidden')
          this.nextVideoPopUpContainer_.style.pointerEvents = 'none';
          this.controls.getControlsContainer().style.pointerEvents = 'all'
          clearInterval(this.clearPopUpDialogInterval)
          this.selectedVideoIndex++;
          this.loadVideo();
          this.updateNextVideoPopupDialog(this.selectedVideoIndex)
          this.resetCountdownTimerAndUI(seconds,stopTimer,backUpSeconds)
        }, this.playlistConfig_?.auto_second * 1000)

      } else {
        this.selectedVideoIndex++;
        // On current video ends increment by 1 for next video play
        this.loadVideo();
      }

    });

    const playlists = this.playListDialogContainer_?.children;
    if (playlists) {
      for (const [index, videoCard] of Object.entries(playlists)) {
        videoCard.onclick = () => {
          const data = {
            source: this.playlistConfig_?.videos[index]?.source ?? undefined,
            poster: this.playlistConfig_?.videos[index]?.poster ?? undefined,
            chaptersData: this.playlistConfig_?.videos[index]?.chaptersData ?? undefined
          };
          this.loadAsset(data);
          this.controls.getControlsContainer().style.pointerEvents = 'all'
          this.selectedVideoIndex = parseInt(index);
          this.updateHighlightedVideo();
          if (this.playlistConfig_.withNextVideoPopup) {
            clearInterval(this.clearPopUpDialogInterval)
            this.clearPopUpDialogInterval = null
            this.updateNextVideoPopupDialog(index)
            this.resetCountdownTimerAndUI(seconds, stopTimer, backUpSeconds)
            if (!this.nextVideoPopUpContainer_.classList.contains('hexa-hidden')) {
              this.nextVideoPopUpContainer_.classList.add('hexa-hidden')
              this.nextVideoPopUpContainer_.style.pointerEvents = 'none';
            }
          }

        };
      }
    }

    // Play gif on hover of video card
    document.querySelectorAll('div.playlist-video-card')?.forEach((videoCard, index) => {
      if (videoCard) {
        this.eventManager.listen(videoCard, 'mouseenter', () => {
          if (this.playlistConfig_.videos[index]?.thumbnailOnHover) {
            videoCard.style.backgroundImage = `url(${this.playlistConfig_.videos[index]?.thumbnailOnHover})`;
          }
        });

        this.eventManager.listen(videoCard, 'mouseleave', () => {
          if (this.playlistConfig_.videos[index]?.thumbnail) {
            videoCard.style.backgroundImage = `url(${this.playlistConfig_.videos[index]?.thumbnail})`;
          }
        });
      }
    });

    if (this.playlistButton_) {
      this.eventManager.listen(this.playlistButton_, 'click', () => {
        this.openModal();
        this.scrollToActiveVideo();
      });
    }

    if (this.nextVideoPopUpContainer_) {
      this.eventManager.listen(this.nextVideoPopupStopButton, 'click', () => {
        clearInterval(this.clearPopUpDialogInterval)
        this.resetCountdownTimerAndUI(seconds, stopTimer, backUpSeconds);
        this.nextVideoPopupTimerClockElement.style.display = 'none';
      });

      this.eventManager.listen(this.nextVideoPopupPlayButton, 'click', () => {
        const data = {
          source: this.playlistConfig_?.videos[this.selectedVideoIndex + 1]?.source ??
              this.playlistConfig_?.videos[this.selectedVideoIndex]?.source ?? undefined,
          poster: this.playlistConfig_?.videos[this.selectedVideoIndex + 1]?.poster ??
              this.playlistConfig_?.videos[this.selectedVideoIndex]?.poster ?? undefined,
          chaptersData: this.playlistConfig_?.videos[this.selectedVideoIndex + 1]?.chaptersData ?? undefined
        };
        this.loadAsset(data);
        this.controls.getControlsContainer().style.pointerEvents = 'all'
        this.selectedVideoIndex++;
        this.updateHighlightedVideo();
        if (this.playlistConfig_.withNextVideoPopup) {
          clearInterval(this.clearPopUpDialogInterval)
          this.clearPopUpDialogInterval = null
          this.updateNextVideoPopupDialog(this.selectedVideoIndex)
          this.resetCountdownTimerAndUI(seconds, stopTimer, backUpSeconds)
          if (!this.nextVideoPopUpContainer_.classList.contains('hexa-hidden')) {
            this.nextVideoPopUpContainer_.classList.add('hexa-hidden')
            this.nextVideoPopUpContainer_.style.pointerEvents = 'none';
          }
        }
      });
    }

    if (this.playButton_) {
      this.playButton_.style.pointerEvents = 'all';
      this.eventManager.listen(this.playButton_, 'click', () => {
        const ariaLabel = this.playButton_.getAttribute('aria-label')
        if (ariaLabel && ariaLabel === 'Replay') {
          clearInterval(this.clearPopUpDialogInterval)
          this.clearPopUpDialogInterval = null
          this.resetCountdownTimerAndUI(seconds, stopTimer, backUpSeconds)
          this.controls.getControlsContainer().style.pointerEvents = 'all'
          if (!this.nextVideoPopUpContainer_.classList.contains('hexa-hidden')) {
            this.nextVideoPopUpContainer_.classList.add('hexa-hidden')
            this.nextVideoPopUpContainer_.style.pointerEvents = 'none';
          }
          this.video.currentTime = 0;
          this.video.play()
        }
      })
    }
  }

  /**
   * Create a playlist container
   */
  createPlaylistContainer() {
    this.playListDialogContainer_ = createHTMLElement('div')
    this.playListDialogContainer_.classList.add('playlist-dialog-container');
    this.playListDialogContainer_.classList.add('hexa-hidden');
    this.playListDialogContainer_.style.pointerEvents = 'none';
    this.parent.appendChild(this.playListDialogContainer_);
  }

  /**
   * Create a playlist container
   */
  createNextVideoPopupContainer() {
    this.nextVideoPopUpContainer_ = createHTMLElement('div')
    this.nextVideoPopUpContainer_.classList.add('redirect-container');
    this.nextVideoPopUpContainer_.classList.add('hexa-hidden');
    this.parent.appendChild(this.nextVideoPopUpContainer_);
  }

  /**
   * Create a playlist button.
   */
  createPlaylistButton() {
    this.playlistButton_ = createButton()
    this.playlistButton_.classList.add('player-notification-button');
    this.playlistButton_.classList.add('shaka-tooltip');
    const icon_ = document.createElement('span');
    icon_.classList.add('hexa-player-icons');
    icon_.classList.add('md-25');
    icon_.textContent = 'info';
    this.playlistButton_.appendChild(icon_);

    // tooltip
    this.playlistButton_.setAttribute('data-i18n-aria-label-key', 'playlist-btn-title');
    this.parent.appendChild(this.playlistButton_);
  }

  createNextVideoPopupButtons() {
    const buttons = createPlayAndStopButtons()
    this.nextVideoPopupPlayButton = buttons.playButtonElement;
    this.nextVideoPopupStopButton = buttons.stopButtonElement;
    this.nextVideoPopUpContainer_.appendChild(this.nextVideoPopupPlayButton)
    this.nextVideoPopUpContainer_.appendChild(this.nextVideoPopupStopButton)
  }

  /**
   * @description - to open the notification dialog container.
   */
  openModal() {
    this.playListDialogContainer_.classList.toggle('hexa-hidden');
    if (this.playListDialogContainer_.classList.contains('hexa-hidden')) {
      this.playListDialogContainer_.style.pointerEvents = 'none';
    } else {
      this.playListDialogContainer_.style.pointerEvents = 'all';
    }
  }

  /**
   * Get the video from the playlist
   * @param videoIndex
   * @return {{source: undefined, drmUrl: undefined, poster: undefined}}
   */
  getVideoFromPlaylist(videoIndex) {
    return {
      source: this.playlistConfig_.videos[videoIndex]?.source ?? undefined,
      drmUrl: this.playlistConfig_.videos[videoIndex]?.drmUrl ?? undefined,
      poster: this.playlistConfig_.videos[videoIndex]?.poster ?? undefined,
      chaptersData: this.playlistConfig_.videos[videoIndex]?.chaptersData ?? undefined,
    };
  }

  loadVideo() {
    const data = this.getVideoFromPlaylist(this.selectedVideoIndex);
    this.updateHighlightedVideo();
    this.loadAsset(data);
  }

  /**
   * Highlight Current Video
   */
  updateHighlightedVideo() {
    this.removeAllPlaylistHighlights();
    this.playListDialogContainer_?.children[this.selectedVideoIndex].classList.add('hexa-highlight-current-video');
  }

  loadAsset(asset) {
    const loadAssetEvent = new Event(Hplayer.LOAD_ASSET);
    loadAssetEvent.asset = asset;
    this.controls.dispatchEvent(loadAssetEvent);
  }

  /**
   * Remove all highlight marks from the playlist
   */
  removeAllPlaylistHighlights() {
    document.querySelectorAll('div.playlist-video-row').forEach(element => element.classList.remove('hexa-highlight-current-video'));
  }

  /**
   * On open playlist modal scroll to current video
   */
  scrollToActiveVideo() {
    if (this.playListDialogContainer_.children.length) {
      const firstVideoTopPosition = this.playListDialogContainer_.children[0]?.getBoundingClientRect().top;
      const currentVideoPlaying = this.playListDialogContainer_.children[this.selectedVideoIndex];
      this.playListDialogContainer_.scrollTo(currentVideoPlaying.getBoundingClientRect().x,
        currentVideoPlaying.getBoundingClientRect().y - firstVideoTopPosition);
    }
  }

  /**
   * Populate playlist
   */
  renderVideosPlaylist() {
    for (const data of this.playlistConfig_?.videos) {
      const html =
          `
        <div class="playlist-video-row">
            <div class="playlist-video-card" 
            style="background-image: url(${data.thumbnail})"
            ></div>
            <div class="playlist-video-title">
                ${data.title}
                <div class="playlist-video-desc">
                    ${data.description ?? ''}
                </div>
            </div>
            
        </div>
        `;
      this.playListDialogContainer_.insertAdjacentHTML('beforeend', html);
    }
  }

  renderNextVideoPopupDialog() {
    const containerConfig = {
      title: this.playlistConfig_?.videos[this.selectedVideoIndex + 1]?.title,
      thumbnail: this.playlistConfig_?.videos[this.selectedVideoIndex + 1]?.thumbnail,
      auto_second: this.playlistConfig_?.auto_second,
    }
    const html = getNextVideoPopupDialogTemplate(containerConfig)
    this.nextVideoPopUpContainer_.insertAdjacentHTML('afterbegin', html)
  }

  updateNextVideoPopupDialog() {
    this.nextVideoCardElement_.style.backgroundImage = `url(${this.playlistConfig_.videos[parseInt(this.selectedVideoIndex) + 1]?.thumbnail})`
    this.nextVideoCardTitleElement_.textContent = this.playlistConfig_.videos[parseInt(this.selectedVideoIndex) + 1]?.title
  }

  /**
   * Countdown timer
   */
  startNextVideoPopupCountDown() {
    const that = this;
    stopTimer = setInterval(function() {
      seconds--;
      that.nextVideoPopupTimerSecondsElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(stopTimer);
        seconds = backUpSeconds;
        that.nextVideoPopupTimerSecondsElement.textContent = seconds;
      }
    }, 1000);
  }

  openNextVideoPopUpContainer() {
    this.nextVideoPopUpContainer_.classList.remove('hexa-hidden')
    this.nextVideoPopUpContainer_.style.pointerEvents = 'all';
    this.nextVideoPopupTimerClockElement.style.display = 'block';
    this.controls.getControlsContainer().style.pointerEvents = 'none'
    if (stopTimer) {
      clearInterval(stopTimer);
      stopTimer = null;
      seconds = backUpSeconds;
    }
    this.startNextVideoPopupCountDown();
  }
  /**
   * Reset the countdown if it has been interrupted or ended.
   * @param seconds
   * @param stopTimer
   * @param resetSeconds
   */
  resetCountdownTimerAndUI(seconds, stopTimer, resetSeconds) {
    seconds = resetSeconds;
    this.nextVideoPopupTimerSecondsElement.textContent = String(seconds);
    clearInterval(stopTimer);
    stopTimer = null;
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {PlaylistFeature.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
PlaylistFeature.Factory = class {
  create(rootElement, controls) {
    return new PlaylistFeature(rootElement, controls);
  }
};

/**
 * Register our factory with the controls, so controls can create button instances.
 */
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'playlist',
  new PlaylistFeature.Factory());
