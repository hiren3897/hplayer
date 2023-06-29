import shaka from 'shaka-player/dist/shaka-player.ui';
import {ChapterService} from './services/chapterService'
import {createButton, createHTMLElement} from "../util/domUtils";

/**
 * Add a chapter support in the video timeline for better navigation in the video.
 * @type {ChaptersLive}
 * @extends {shaka.ui.Element} shaka.ui.Element
 */
const ChaptersLive = class extends shaka.ui.Element {

  /**
   * Live Chapters
   * @private
   */
  liveChapters_;

  /**
   * Live Chapter Configuration
   * @private
   */
  liveChapterConfig_;

  /**
   * Live Chapter markers container
   * @private
   */
  liveChapterMarkerContainer_;

  /**
   * Live chapter title element
   * @private
   */
  liveChapterTitleElement_

  /**
   * Chapter Service
   * @private
   */
  chapterService_

  /**
   * Shaka seek range container
   * @private
   */
  shakaRangeContainer_

  /**
   * Shaka Seek bar
   * @private
   */
  shakaSeekbar_

  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    this.liveChapterConfig_ = this.controls.getPlayer()?.chapters_live;

    this.liveChapters_ = this.controls.getPlayer()?.chapters_live?.chapters;

    this.createLiveChapterMarkersContainer();

    this.createLiveChapterTitleElement();

    this.createNavigationButtons();

    if (this.liveChapterConfig_) {
      this.liveChapterConfig_.startOverChapterOnClick = this.liveChapterConfig_?.startOverChapterOnClick ?? false;
    }

    Number.prototype.between = function(a, b) {
      var min = Math.min.apply(Math, [a, b]),
          max = Math.max.apply(Math, [a, b]);
      return this > min && this < max;
    };

    // keep a trace of chapter currently on timeline
    this.eventManager.listen(this.controls, 'timeandseekrangeupdated', () => {
      this.liveChapters_ = this.onUpdateFilterChapters();
      this.onHoverApplyNavigationButtonTooltips();
    })


    /**
     * Marks the chapters on timeline with const position
     */
    this.eventManager.listen(this.player, 'loaded', () => {
      this.shakaSeekbar_ = this.controls.getControlsContainer().querySelector('.shaka-seek-bar');
      this.shakaRangeContainer_ = this.controls.getControlsContainer().querySelector('.shaka-seek-bar-container');
      this.shakaRangeContainer_.insertBefore(this.liveChapterMarkerContainer_, this.shakaRangeContainer_.childNodes[0]);
      this.chapterService_ = new ChapterService(this.liveChapters_, this.player, this.controls);
      this.chapterService_.markChaptersOnTimeline('hexa-live-chapter-markers');

      if (this.shakaSeekbar_) {
        /**
         * Get the time on mousemove on timeline
         * Display the Chapter title on above the timeline
         */
        this.eventManager.listen(this.shakaSeekbar_, 'mousemove', (event) => {
          let displayChapterTitle = false;
          const currentPosition = this.chapterService_.getCurrentPosition(event);
          if (typeof (this.liveChapters_) !== "undefined") {
            for (const [index, chapter] of this.liveChapters_.entries()) {
              if (currentPosition > chapter.startTime && currentPosition < chapter.endTime) {
                displayChapterTitle = true;
                this.liveChapterTitleElement_.textContent = `${chapter.title} ${chapter.startTimeAsUnitFormat ? `(${chapter.startTimeAsUnitFormat})` : ''}`;
                this.liveChapterTitleElement_.style.display = "block";
                if (this.controls.getControlsContainer().querySelector(`[id='${chapter.title.replace(/'/g, "\\'")}']`)) {
                  this.controls.getControlsContainer().querySelector(`[id='${chapter.title.replace(/'/g, "\\'")}']`).style.transform = 'scaleY(2.5)';
                }
              }
              if (!displayChapterTitle) {
                this.liveChapterTitleElement_.textContent = '';
                this.liveChapterTitleElement_.style.display = "none";
                if (this.controls.getControlsContainer().querySelector(`[id='${chapter.title.replace(/'/g, "\\'")}']`)) {
                  this.controls.getControlsContainer().querySelector(`[id='${chapter.title.replace(/'/g, "\\'")}']`).style.transform = 'scaleY(1)';
                }
              }
            }
          }
        })

        if (this.liveChapterConfig_?.startOverChapterOnClick) {
          /**
           * On Click, it takes to the start point of the chapter
           */
          this.eventManager.listen(this.shakaSeekbar_, 'click', (event) => {
            const currentPosition = this.chapterService_.getCurrentPosition(event);
            if (typeof (this.liveChapters_) !== "undefined") {
              for (const [index, chapter] of this.liveChapters_.entries()) {
                if (!chapter.clicked) {
                  if (currentPosition > chapter.startTime && currentPosition < chapter.endTime) {
                    this.video.currentTime = chapter.startTime;
                  }
                }
              }
            }
          })
        }


        this.eventManager.listen(this.shakaSeekbar_, 'mouseleave', (event) => {
          this.liveChapterTitleElement_.textContent = '';
          this.liveChapterTitleElement_.style.display = "none";
          this.controls.getControlsContainer().querySelectorAll('.hexa-live-chapter-markers > *').forEach(el => el.style.transform = 'scaleY(1)');
        })

        /**
         * For Mobile devices only
         */
        this.eventManager.listen(this.shakaSeekbar_, 'touchmove', (event) => {
          let displayChapterTitle = false;
          const currentPosition = this.chapterService_.getCurrentPosition(event);
          if (typeof (this.liveChapters_) !== "undefined") {
            for (const [index, chapter] of this.liveChapters_.entries()) {
              if (currentPosition > chapter.startTime && currentPosition < chapter.endTime) {
                displayChapterTitle = true;
                this.liveChapterTitleElement_.textContent = `${chapter.title} ${chapter.startTimeAsUnitFormat ? `(${chapter.startTimeAsUnitFormat})` : ''}`;
                this.liveChapterTitleElement_.style.display = "block";
                if (this.controls.getControlsContainer().querySelector(`[id='${chapter.title.replace(/'/g, "\\'")}']`)) {
                  this.controls.getControlsContainer().querySelector(`[id='${chapter.title.replace(/'/g, "\\'")}']`).style.transform = 'scaleY(2.5)';
                }
              }
              if (!displayChapterTitle) {
                this.liveChapterTitleElement_.textContent = '';
                this.liveChapterTitleElement_.style.display = "none";
                if (this.controls.getControlsContainer().querySelector(`[id='${chapter.title.replace(/'/g, "\\'")}']`)) {
                  this.controls.getControlsContainer().querySelector(`[id='${chapter.title.replace(/'/g, "\\'")}']`).style.transform = 'scaleY(1)';
                }
              }
            }
          }
        })

        this.eventManager.listen(this.shakaSeekbar_, 'touchend', (event) => {
          this.liveChapterTitleElement_.textContent = '';
          this.liveChapterTitleElement_.style.display = "none";
          this.controls.getControlsContainer().querySelectorAll('.hexa-live-chapter-markers > *').forEach(el => el.style.transform = 'scaleY(1)');
        })
      }
    })

    this.eventManager.listen(this.nextLiveChapterButton_, 'click', (e) => {
      const lastChapter = this.liveChapters_[this.liveChapters_.length - 1];
      const activeChapter = this.liveChapters_[this.getActiveChapterIndex()];
      if (this.video.currentTime > lastChapter.startTime || lastChapter === activeChapter) {
        /**
         * Removed because the current client doesn't want the notification
         * Maybe interesting for another client
         */
        // const notificationEvent = new Event(NotificationService.LOAD_NOTIFICATION);
        // notificationEvent.notificationConfig = {
        //   title: 'INFO',
        //   style: 'hexa-notification-info', // a css class
        //   message: this.generateNoChapterAvailableMessage('next'),
        //   actions: ['close'],
        //   seconds: 1.5
        // };
        // this.controls.dispatchEvent(notificationEvent);
        return;
      }

      this.liveChapters_ = this.liveChapters_.filter((chapter) => chapter.onTimeline === true)
      for (const [index, chapter] of this.liveChapters_.entries()) {
        if (chapter.startTime > this.video.currentTime) {
          this.skipTime(chapter.startTime);
          this.setActiveChapter(index);
          return;
        }
      }

    })

    this.eventManager.listen(this.previousLiveChapterButton_, 'click', () => {
      this.liveChapters_ = this.liveChapters_.filter((chapter) => chapter.onTimeline === true);
      const firstChapter = this.liveChapters_[0];
      if (firstChapter?.active || firstChapter === undefined) {
        /**
         * Removed because the current client doesn't want the notification
         * Maybe interesting for another client
         */
        // const notificationEvent = new Event(NotificationService.LOAD_NOTIFICATION);
        // notificationEvent.notificationConfig = {
        //   title: 'INFO',
        //   style: 'hexa-notification-info', // a css class
        //   message: this.generateNoChapterAvailableMessage('prev'),
        //   actions: ['close'],
        //   seconds: 1.5
        // };
        // this.controls.dispatchEvent(notificationEvent);
        return;
      }

      for (const [index, chapter] of this.liveChapters_.reverse().entries()) {
        if (chapter.endTime < this.video.currentTime) {
          this.skipTime(chapter.startTime);
          this.setActiveChapter(index);
          return;
        }
      }
    })

  }

  /**
   * Create Next and Previous chapter navigation buttons.
   */
  createNavigationButtons() {
    this.previousLiveChapterButton_ = createButton();
    this.previousLiveChapterButton_.classList.add('previous-chapter-button');
    this.previousLiveChapterButton_.classList.add('shaka-tooltip');
    const previousIcon_ = createHTMLElement('span');
    previousIcon_.classList.add('hexa-player-icons');
    previousIcon_.classList.add('md-25');
    previousIcon_.textContent = 'chevron_left';
    this.previousLiveChapterButton_.appendChild(previousIcon_);
    this.parent.appendChild(this.previousLiveChapterButton_);

    // Next Chapter button
    this.nextLiveChapterButton_ = createButton();
    this.nextLiveChapterButton_.classList.add('next-chapter-button');
    this.nextLiveChapterButton_.classList.add('shaka-tooltip');
    const nextIcon_ = createHTMLElement('span');
    nextIcon_.classList.add('hexa-player-icons');
    nextIcon_.classList.add('md-25');
    nextIcon_.textContent = 'chevron_right';
    this.nextLiveChapterButton_.appendChild(nextIcon_);
    this.parent.appendChild(this.nextLiveChapterButton_);
  }

  /**
   * Create Live Chapter marker container
   */
  createLiveChapterMarkersContainer() {
    this.liveChapterMarkerContainer_ = createHTMLElement('div')
    this.liveChapterMarkerContainer_.classList.add('hexa-live-chapter-markers');
  }

  /**
   * Create Chapter Title Element
   */
  createLiveChapterTitleElement() {
    this.liveChapterTitleElement_ = createHTMLElement('div');
    this.liveChapterTitleElement_.classList.add('hexa-live-chapter-title');
    this.liveChapterTitleElement_.style.display = "none";
    this.controls.getControlsContainer().appendChild(this.liveChapterTitleElement_)
  }

  /**
   * Update the chapters status
   * isOnTimeline & active or not on timeupdate event
   * @return {*}
   */
  onUpdateFilterChapters() {
    const chapters = this.chapterService_.getLatestChapters().map((chapter) => ({...chapter, clicked: false}));
    if (!chapters.length) {
      this.nextLiveChapterButton_.style.display = 'none';
      this.previousLiveChapterButton_.style.display = 'none';
      return;
    } else {
      this.nextLiveChapterButton_.style.display = 'block';
      this.previousLiveChapterButton_.style.display = 'block';
    }
    const seek = this.player.seekRange();
    for (const [index, chapter] of chapters.entries()) {
      // Check if the chapter both start and end time of the chapter is between seek start and end range
      chapter.onTimeline = !!(chapter.startTime.between(seek.start, seek.end) && chapter.endTime.between(seek.start, seek.end));

      // Check if the chapter is started and the end time is not yet available but chapter is on timeline
      if (chapter.startTime.between(seek.start, seek.end) && !chapter.endTime.between(seek.start, seek.end)) {
        chapter.onTimeline = true;
      }

      // Check if the chapter has passed the timeline in th past but the end time is still displayed
      // then if previous button clicked then we go to the start time of seek range
      if (!chapter.startTime.between(seek.start, seek.end) && chapter.endTime.between(seek.start, seek.end)) {
        chapter.onTimeline = true;
        chapter.startTime = seek.start;
      }

      // if chapter start and stop time are same then false
      if (chapter.startTime === chapter.endTime) {
        chapter.onTimeline = false;
      }
      chapter.active = !!(this.video.currentTime.between(chapter.startTime, chapter.endTime));
      chapter.clicked = !!chapter.active;
    }
    // {public} Track of active chapter.
    this.controls.getPlayer().activeChapter = chapters.find((chp) => chp.active === true)
    return chapters;
  }

  /**
   * Get Active chapter from the chapters
   * @return {*}
   */
  getActiveChapterIndex() {
    return this.liveChapters_.findIndex((chapter) => chapter.active === true);
  }

  /**
   * Set Active chapter.
   * @param chapterIndex
   */
  setActiveChapter(chapterIndex) {
    this.liveChapters_.forEach((chapter) => {
      chapter.active = false;
    })
    this.liveChapters_[chapterIndex].active = true;
  }

  /**
   * skip to time in timeline
   * @param time
   */
  skipTime(time) {
    this.video.play();
    this.video.pause();
    this.video.currentTime = time;
    this.video.play();
  }


  /**
   * Applies the button tooltip on navigation button hover
   * Next and Previous button
   */
  onHoverApplyNavigationButtonTooltips() {
    if (this.liveChapters_[this.liveChapters_.length -1].endTime < this.video.currentTime) {
      const lastChapter = this.liveChapters_[this.liveChapters_.length -1];
      this.nextLiveChapterButton_.setAttribute('aria-label', this.chapterService_.generateNoChapterAvailableMessage('next'));
      this.previousLiveChapterButton_.setAttribute('aria-label', lastChapter.title);
    }

    if (this.liveChapters_[0].endTime > this.video.currentTime) {
      const firstChapter = this.liveChapters_[0];
      this.nextLiveChapterButton_.setAttribute('aria-label', firstChapter.title);
      this.previousLiveChapterButton_.setAttribute('aria-label', this.chapterService_.generateNoChapterAvailableMessage('prev'));
    }

    if (typeof (this.liveChapters_) !== "undefined") {
      for (const [index, chapter] of this.liveChapters_.entries()) {
        if (this.video.currentTime.between(chapter.startTime, chapter.endTime)) {
          this.nextLiveChapterButton_.setAttribute('aria-label', this.liveChapters_[index + 1]?.title ?? this.chapterService_.generateNoChapterAvailableMessage('next'));
          this.previousLiveChapterButton_.setAttribute('aria-label', this.liveChapters_[index - 1]?.title ?? this.chapterService_.generateNoChapterAvailableMessage('prev'));
        } else {
          if (chapter.startTime > this.video.currentTime) {
            this.nextLiveChapterButton_.setAttribute('aria-label', chapter.title);
            return;
          }
          if (this.video.currentTime > chapter.endTime) {
            this.previousLiveChapterButton_.setAttribute('aria-label', chapter.title);
          }
        }
      }
    }
  }

};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ChaptersLive.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
ChaptersLive.Factory = class {
  create(rootElement, controls) {
    return new ChaptersLive(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'chapters_live',
  new ChaptersLive.Factory());

