import shaka from 'shaka-player/dist/shaka-player.ui';
import {createButton, createHTMLElement} from '../util/domUtils';
import Hplayer from '../hPlayer';
import {ChapterService} from './services/chapterService';
import {buildTimeString} from "../util/sharedUtils";
import {DEFAULT_CHAPTER_TOOLTIPS} from "../const";

/**
 * Chapter VOD feature is used to create and overlay the chapters information on the timeline.
 * @type {ChaptersVOD}
 * @extends {shaka.ui.Element} shaka.ui.Element
 * @export
 */
const ChaptersVOD = class extends shaka.ui.Element {

    /**
     * VOD chapter markers container
     * @private
     */
    vodChapterMarkerContainer_;

    /**
     * Shaka Seek bar
     * @private
     */
    shakaSeekbar_

    /**
     * Live chapter title element
     * @private
     */
    vodChapterTitleElement_

    /**
     * Next, Previous, last chapter tooltips and prefix data
     */
    chapterTips;

    /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
    constructor(parent, controls) {
        super(parent, controls);

        // ChaptersVOD configuration url
        this.chaptersData = this.controls.options.basic.chaptersData ?? null;
        this.chapterConfig = this.controls.getPlayer().chapters_vod ?? null;
        if (this.chaptersData && this.chapterConfig) {
            this.chapterTips = this.chapterConfig.chapterToolTips ?? DEFAULT_CHAPTER_TOOLTIPS;
        }

        Number.prototype.between = function (a, b) {
            var min = Math.min.apply(Math, [a, b]),
                max = Math.max.apply(Math, [a, b]);
            return this > min && this < max;
        };


        this.chapters = null;

        this.chapterService = null;

        this.createVODChapterMarkersContainer();

        this.createVodChapterTitleElement()

        // Previous Chapter button
        this.previousChapterButton_ = createButton();
        this.previousChapterButton_.classList.add('previous-chapter-button');
        const previousIcon_ = createHTMLElement('span');
        previousIcon_.classList.add('hexa-player-icons');
        previousIcon_.classList.add('md-25');
        previousIcon_.textContent = 'chevron_left';
        this.previousChapterButton_.appendChild(previousIcon_);
        this.parent.appendChild(this.previousChapterButton_);

        // Next Chapter button
        this.nextChapterButton_ = createButton();
        this.nextChapterButton_.classList.add('next-chapter-button');
        const nextIcon_ = createHTMLElement('span');
        nextIcon_.classList.add('hexa-player-icons');
        nextIcon_.classList.add('md-25');
        nextIcon_.textContent = 'chevron_right';
        this.nextChapterButton_.appendChild(nextIcon_);
        this.parent.appendChild(this.nextChapterButton_);

        // Last Chapter button
        this.lastChapterButton_ = createButton();
        this.lastChapterButton_.classList.add('last-chapter-button');
        const lastIcon_ = createHTMLElement('span');
        lastIcon_.classList.add('hexa-player-icons');
        lastIcon_.classList.add('md-25');
        lastIcon_.textContent = 'last_page';
        this.lastChapterButton_.appendChild(lastIcon_);
        this.parent.appendChild(this.lastChapterButton_);

        // Tooltips
        // Previous chapter button
        this.previousButtonTooltip_ = createHTMLElement('span');
        this.previousButtonTooltip_.classList.add('previous-chapter-button-tooltip');
        this.previousButtonTooltip_.classList.add('shaka-tooltip');
        this.previousChapterButton_.appendChild(this.previousButtonTooltip_);

        // Last chapter button
        this.lastButtonTooltip_ = createHTMLElement('span');
        this.lastButtonTooltip_.classList.add('last-chapter-button-tooltip');
        this.lastButtonTooltip_.classList.add('shaka-tooltip');
        this.lastChapterButton_.appendChild(this.lastButtonTooltip_);

        // Next chapter button
        this.nextButtonTooltip_ = createHTMLElement('span');
        this.nextButtonTooltip_.classList.add('next-chapter-button-tooltip');
        this.nextButtonTooltip_.classList.add('shaka-tooltip');
        this.nextChapterButton_.appendChild(this.nextButtonTooltip_);

        this.eventManager.listen(this.player, 'loaded', () => {
            this.shakaSeekbar_ = this.controls.getControlsContainer().querySelector('.shaka-seek-bar');
            this.shakaRangeContainer_ = this.controls.getControlsContainer().querySelector('.shaka-seek-bar-container')
            this.shakaRangeContainer_.insertBefore(this.vodChapterMarkerContainer_, this.shakaRangeContainer_.childNodes[0])
        })

        this.eventManager.listen(this.nextChapterButton_, 'click', () => {
            this.playNextChapter();
        });

        this.eventManager.listen(this.previousChapterButton_, 'click', () => {
            this.playPreviousChapter();
        });

        this.eventManager.listen(this.lastChapterButton_, 'click', () => {
            this.playLastChapter();
        });

        this.eventManager.listen(this.controls, 'timeandseekrangeupdated', () => {
            for (let i = this.chapters.length - 1; i >= 0; i--) {
                const start = this.chapters[i].startTime;
                const end = this.chapters[i].endTime;
                // set current Chapter active if the current time is between start and end of chapter.
                if (this.video.currentTime.between(start, end)) {
                    this.setActive(i);
                    // if last chapter then update the next button tooltip to no next chapter
                    if (this.video.currentTime > this.chapters[this.chapters.length - 1].startTime) {
                        this.nextButtonTooltip_.textContent = `${this.chapterTips.noNextChapter ?? DEFAULT_CHAPTER_TOOLTIPS.noNextChapter}`;
                    } else {
                        this.nextButtonTooltip_.textContent = `${this.chapterTips.nextChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.nextChapterPrefix}\n ${this.chapters[i + 1]?.title}`;
                    }
                    // if we navigate from last chapter, and we reach to the first chapter then there is previous chapter
                    // update the label to "no previous chapter"
                    if(typeof (this.chapters[i - 1]?.title) === 'undefined') {
                        this.previousButtonTooltip_.textContent = `${this.chapterTips.noPreviousChapter ?? DEFAULT_CHAPTER_TOOLTIPS.noPreviousChapter}`;
                        break;
                    }
                    this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix}\n ${this.chapters[i - 1]?.title}`;
                    break;
                } else {
                    // if current time is not on a chapter than reset all chapters to deactivate state
                    this.deactivateAllChapters()

                    // Update the labels to previous and next chapters again.
                    // get the nearest next chapter available to the current time.
                    const newNextChapter = this.getNextAvailableChapterIndex();
                    // if the nearest chapter is first chapter then "no previous chapter"
                    if(this.chapters[newNextChapter].id === '1') {
                        // update the previous button label
                        this.previousButtonTooltip_.textContent = `${this.chapterTips.noPreviousChapter ?? DEFAULT_CHAPTER_TOOLTIPS.noPreviousChapter}`;
                    } else { // if there is a previous chapter
                        // update the label to previous chapter
                        this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix}\n ${this.chapters[newNextChapter - 1]?.title}`;
                    }
                    // update the next button label
                    this.nextButtonTooltip_.textContent = `${this.chapterTips.nextChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.nextChapterPrefix}\n ${this.chapters[newNextChapter]?.title}`;
                }
            }
        })

        // specifically to handle the case where the current time is ahead of all the chapters.
        this.video.addEventListener('timeupdate', () => {
            // if currentTime is greater than the last chapter end time then reset the labels
            if (this.chapters[this.chapters.length - 1].endTime < this.video.currentTime) {
                this.nextButtonTooltip_.textContent = `${this.chapterTips.noNextChapter ?? DEFAULT_CHAPTER_TOOLTIPS.noNextChapter}`; // no next chapter
                this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix}\n 
                    ${this.chapters[this.chapters.length - 1]?.title}`; // update previous button label as a last chapter title.
            }

            // for hexaPlayer.getActiveChapter()
            this.controls.getPlayer().activeChapter = this.chapters.find((chp) => chp.status === 'active')
        })

        this.eventManager.listen(this.controls, Hplayer.ASSET_LOADED, async (e) => {
            const newChapterData = e.asset?.chaptersData;
            if (!newChapterData) {
                this.chapters = []
                this.manageNavigationButtons(false)
                return
            }
            if (newChapterData) {
                this.chapters = (await this.getChaptersData(`${newChapterData.url}`, `${newChapterData.lang}`, `${newChapterData.mimeType ?? 'text/vtt'}`))?.map(chapter => ({
                    ...chapter,
                    status: 'inactive'
                }));
                this.chapterService = new ChapterService(this.chapters, this.player, this.controls);
                this.chapterService.markChaptersOnTimeline('hexa-vod-chapter-markers');
                this.manageNavigationButtons()
                this.navigationButtonsLabelInitialState();

                if (this.shakaSeekbar_) {
                    /**
                     * Get the time on mousemove on timeline
                     * Display the Chapter title on above the timeline
                     */
                    this.eventManager.listen(this.shakaSeekbar_, 'mousemove', (event) => {
                        let displayChapterTitle = false;
                        const currentPosition = this.chapterService.getCurrentPosition(event)
                        for (const [index, chapter] of this.chapters.entries()) {
                            if (currentPosition > chapter.startTime && currentPosition < chapter.endTime) {
                                displayChapterTitle = true;
                                this.vodChapterTitleElement_.style.display = 'block';
                                this.vodChapterTitleElement_.textContent = `${chapter.title} (${buildTimeString(chapter.startTime, true)})`;
                                this.controls.getControlsContainer().querySelector(`.chapter_${index}`).style.transform = 'scaleY(2.5)';
                            }
                            if (!displayChapterTitle) {
                                this.vodChapterTitleElement_.style.display = 'none';
                                this.controls.getControlsContainer().querySelectorAll('.hexa-vod-chapter-markers > *').forEach(el => el.style.transform = 'scaleY(1)')
                            }
                        }
                    })
                    this.eventManager.listen(this.shakaSeekbar_, 'mouseleave', (event) => {
                        this.vodChapterTitleElement_.style.display = 'none';
                        this.controls.getControlsContainer().querySelectorAll('.hexa-vod-chapter-markers > *').forEach(el => el.style.transform = 'scaleY(1)')
                    })

                    /**
                     * For Mobile Level
                     */
                    this.eventManager.listen(this.shakaSeekbar_, 'touchmove', (event) => {
                        let displayChapterTitle = false;
                        const currentPosition = this.chapterService.getCurrentPosition(event)
                        for (const [index, chapter] of this.chapters.entries()) {
                            if (currentPosition > chapter.startTime && currentPosition < chapter.endTime) {
                                displayChapterTitle = true;
                                this.vodChapterTitleElement_.style.display = 'block';
                                this.vodChapterTitleElement_.textContent = `${chapter.title} (${buildTimeString(chapter.startTime, true)})`;
                                this.controls.getControlsContainer().querySelector(`.chapter_${index}`).style.transform = 'scaleY(2.5)';
                            }
                            if (!displayChapterTitle) {
                                this.vodChapterTitleElement_.style.display = 'none';
                                this.controls.getControlsContainer().querySelectorAll('.hexa-vod-chapter-markers > *').forEach(el => el.style.transform = 'scaleY(1)')
                            }
                        }
                    })

                    this.eventManager.listen(this.shakaSeekbar_, 'touchend', (event) => {
                        this.vodChapterTitleElement_.style.display = 'none';
                        this.controls.getControlsContainer().querySelectorAll('.hexa-vod-chapter-markers > *').forEach(el => el.style.transform = 'scaleY(1)')
                    })
                }
            }
        })
    }

    createVODChapterMarkersContainer() {
        this.vodChapterMarkerContainer_ = createHTMLElement('div');
        this.vodChapterMarkerContainer_.classList.add('hexa-vod-chapter-markers');
    }

    /**
     * Gets the chapters information for the chapter WebVtt URl.
     * @param chapterUrl
     * @param language
     * @param mimeType
     * @return {Promise<shaka.extern.Track>}
     */
    async getChaptersData(chapterUrl, language, mimeType) {
        await this.player.addChaptersTrack(`${chapterUrl}`, `${language}`, `${mimeType}`);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.player.getChapters(`${language}`));
            }, 1.5 * 1000); // it by defaults requires a delay of 1.5 seconds to get the chapters
        });
    }

    /**
     * Sets the chapter active
     * @param chapter
     */
    setActive(chapter) {
        this.chapters.forEach(function (value) {
            value.status = 'inactive';
        });
        this.chapters[chapter].status = 'active';
        this.controls.getPlayer().activeChapter = this.chapters.find((chp) => chp.status === 'active')
    }

    deactivateAllChapters() {
        this.chapters.forEach(function (value) {
            value.status = 'inactive';
        });
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
     * Next Chapter on click navigation
     */
    playNextChapter() {
        const activeChapter = this.chapters.findIndex(({status}) => status === 'active');
        // no active chapter found then get next chapter and skip to it.
        if (activeChapter === -1 ) {
            // if the current time is ahead of last chapter then skip
            if (this.chapters[this.chapters.length - 1].endTime < this.video.currentTime) {
                this.nextButtonTooltip_.textContent = `${this.chapterTips.noNextChapter ?? DEFAULT_CHAPTER_TOOLTIPS.noNextChapter}`;
                return
            }
            const nextAvailableChapter = this.getNextAvailableChapterIndex();
            this.setActive(nextAvailableChapter);
            this.skipTime(this.chapters[nextAvailableChapter].startTime);
            this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix} \n ${this.chapters[nextAvailableChapter - 1]?.title}`;
            this.nextButtonTooltip_.textContent = `${this.chapterTips.nextChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.nextChapterPrefix}\n ${this.chapters[nextAvailableChapter + 1]?.title}`;
        }

        if (activeChapter === 0) {
            this.setActive(1);
            this.skipTime(this.chapters[1].startTime);
            this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix}\n ${this.chapters[0]?.title}`;
            this.nextButtonTooltip_.textContent = `${this.chapterTips.nextChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.nextChapterPrefix}\n ${this.chapters[2]?.title}`;
        }
        if (activeChapter > 0 && activeChapter <= this.chapters.length - 2) {
            this.setActive(activeChapter + 1);
            this.skipTime(this.chapters[activeChapter + 1].startTime);
            this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix}\n ${this.chapters[activeChapter]?.title}`;
            this.nextButtonTooltip_.textContent = `${this.chapterTips.noNextChapter ?? DEFAULT_CHAPTER_TOOLTIPS.noNextChapter}`;
        }
    }

    /**
     * Previous Chapter on click navigation
     */
    playPreviousChapter() {
        const activeChapter = this.chapters.findIndex(({status}) => status === 'active');
        // if no active chapter then get the nearest previous chapter and skip time
        if (activeChapter === -1 && this.chapters[0].startTime < this.video.currentTime) {
            // if the current time is ahead of last chapter then mark last chapter as previous chapter
            if (this.chapters[this.chapters.length - 1].endTime < this.video.currentTime) {
                this.setActive(this.chapters.length - 1);
                this.skipTime(this.chapters[this.chapters.length - 1].startTime);
                this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix} \n ${this.chapters[this.chapters.length - 2]?.title}`;
                this.nextButtonTooltip_.textContent = `${this.chapterTips.noNextChapter ?? DEFAULT_CHAPTER_TOOLTIPS.noNextChapter}`;
                return
            }
            // Or skip to the nearest previous chapter
            const newPreviousChapter = this.getPreviousAvailableChapterIndex();
            this.setActive(newPreviousChapter - 1);
            this.skipTime(this.chapters[newPreviousChapter - 1].startTime);
            this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix} \n ${this.chapters[newPreviousChapter - 2]?.title}`;
            this.nextButtonTooltip_.textContent = `${this.chapterTips.nextChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.nextChapterPrefix}\n ${this.chapters[newPreviousChapter]?.title}`;
        }
        if (activeChapter === this.chapters.length - 1) {
            this.setActive(this.chapters.length - 2);
            this.skipTime(this.chapters[this.chapters.length - 2].startTime);
            this.nextButtonTooltip_.textContent = `${this.chapterTips.nextChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.nextChapterPrefix}\n ${this.chapters[this.chapters.length - 1]?.title}`;
            this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix}\n ${this.chapters[this.chapters.length - 3]?.title}`;
        }
        if (activeChapter > 0) {
            this.setActive(activeChapter - 1);
            this.skipTime(this.chapters[activeChapter - 1].startTime);
            this.nextButtonTooltip_.textContent = `${this.chapterTips.nextChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.nextChapterPrefix}\n ${this.chapters[activeChapter]?.title}`;
            this.previousButtonTooltip_.textContent = `${this.chapterTips.previousChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.previousChapterPrefix}\n ${this.chapters[activeChapter - 2]?.title ? this.chapters[activeChapter - 2]?.title : ''} `;
        }
    }

    /**
     * Last Chapter on click navigation
     */
    playLastChapter() {
        const lastChapterIndex = this.chapters.length - 1;
        this.setActive(lastChapterIndex);
        this.skipTime(this.chapters[lastChapterIndex].startTime);
    }

    /**
     * Create Chapter Title Element
     */
    createVodChapterTitleElement() {
        this.vodChapterTitleElement_ = createHTMLElement('div');
        this.vodChapterTitleElement_.classList.add('hexa-vod-chapter-title');
        this.controls.getControlsContainer().appendChild(this.vodChapterTitleElement_);
    }

    /**
     * Get Next Chapter Index
     * @returns {number}
     */
    getNextAvailableChapterIndex() {
        return this.chapters.findIndex(({startTime}) => startTime > this.video.currentTime);
    }

    /**
     * Get Previous Chapter Index
     * @returns {number}
     */
    getPreviousAvailableChapterIndex() {
        return this.chapters.findIndex(({endTime}) => endTime > this.video.currentTime);
    }

    /**
     * Activate and deactivate the navigation buttons
     * @param active
     */
    manageNavigationButtons(active = true) {
        if (!active) {
            this.nextChapterButton_.style.display = 'none';
            this.previousChapterButton_.style.display = 'none';
            this.lastChapterButton_.style.display = 'none';
            return
        }
        this.nextChapterButton_.style.display = 'block';
        this.previousChapterButton_.style.display = 'block';
        this.lastChapterButton_.style.display = 'block';
    }

    /**
     * Navigation button labels initial state.
     */
    navigationButtonsLabelInitialState() {
        this.previousButtonTooltip_.textContent = `${this.chapterTips.noPreviousChapter ?? DEFAULT_CHAPTER_TOOLTIPS.noPreviousChapter}`;
        this.nextButtonTooltip_.textContent = `${this.chapterTips.noNextChapter ?? DEFAULT_CHAPTER_TOOLTIPS.noNextChapter}`;
        this.lastButtonTooltip_.textContent = `${this.chapterTips.lastChapterPrefix ?? DEFAULT_CHAPTER_TOOLTIPS.lastChapterPrefix}\n ${this.chapters[this.chapters.length - 1]?.title}`;
    }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ChaptersVOD.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
ChaptersVOD.Factory = class {
    create(rootElement, controls) {
        return new ChaptersVOD(rootElement, controls);
    }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
    /* This name will serve as a reference to the button in the UI configuration object */ 'chapters_vod',
    new ChaptersVOD.Factory());
