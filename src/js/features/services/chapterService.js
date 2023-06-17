import {createHTMLElement} from "../../util/domUtils";
import {multiLanguageMessagePhrases} from "../../const";
import {getLanguageCode} from "../../util/sharedUtils";

export class ChapterService {

    static UPDATE_CHAPTERS = 'update_chapters'

    /**
     * Chapters
     * @private
     */
    chapters_;

    /**
     * Shaka Player
     *  @private {?shaka.player}
     */
    player_

    /**
     *
     * @private {?shaka.ui.Controls}
     */
    controls_

    /**
     * Live Chapters Marker Color
     * @private
     */
    chaptersMarkerColor_;

    /**
     * Shaka-Seek-Bar
     * @private
     */
    seekBar_

    constructor(chapters, player, controls) {
        this.chapters_ = chapters

        this.player_ = player;

        this.controls_ = controls;

        this.seekBar_ = this.controls_.getControlsContainer().querySelector('.shaka-seek-bar');

        this.chaptersMarkerColor_ = this.controls_.getPlayer()?.chapters_live?.chapterMarkerColor ?? this.controls_.getPlayer()?.chapters_vod?.chapterMarkerColor;

        this.controls_.addEventListener(ChapterService.UPDATE_CHAPTERS, (event) => {
            if (event.keepOldChapters) {
                this.chapters_ = [
                    ...this.chapters_,
                    ...event.chapters
                ]
            } else {
                this.chapters_ = event.chapters
            }
            //this.clearChapters('hexa-live-chapter-markers');
            this.markChaptersOnTimeline('hexa-live-chapter-markers')
        })
    }

    /**
     * Mark the chapters on timeline
     * @param chaptersMarkersContainerName - Live or VOD
     * @param className
     */
    markChaptersOnTimeline(chaptersMarkersContainerName, className = 'chapter') {
        const chapterMarkerContainer = this.controls_.getControlsContainer().querySelector(`.${chaptersMarkersContainerName}`);

        if (!this.chapters_.length) {
            chapterMarkerContainer.style.background = 'transparent';
            return
        }
        const seekRange = this.player_.seekRange();
        const seekRangeSize = seekRange.end - seekRange.start;
        const gradient = ['to right'];
        const pointsAsFractions = [];
        for (const [i, chapter] of this.chapters_.entries()) {
            if (chapter.startTime >= seekRange.start && chapter.startTime < seekRange.end) {
                if (chapter.endTime && chapter.endTime > seekRange.end) {
                    continue;
                }
                const startDist = chapter.startTime - seekRange.start;
                const startFrac = (startDist / seekRangeSize) || 0;
                // For points with no endpoint assume a 1% length: not too much,
                // but enough to be visible on the timeline.
                let endFrac;
                if (!chapter.endTime) {
                    const nextStartDist = this.chapters_[i + 1].startTime - seekRange.start;
                    endFrac = (nextStartDist / seekRangeSize) || 0;
                } else {
                    const endDist = chapter.endTime - seekRange.start;
                    endFrac = (endDist / seekRangeSize) || 0;
                }

                pointsAsFractions.push({
                    start: startFrac,
                    end: endFrac,
                    chapterTitle: chapter.title,
                    color: chapter.color ?? this.chaptersMarkerColor_
                });
            }
        }
        for (const [index, point] of pointsAsFractions.entries()) {
            if (this.chapters_) {
                this.createDivMarkers(point, index, chaptersMarkersContainerName, className)
            }
        }
    }

    /**
     * Creates the localized text for the chapters' navigation messages.
     * @param chapterPrefix
     * @returns {*}
     */
    generateNoChapterAvailableMessage(chapterPrefix) {
        if (!chapterPrefix) {
            return;
        }
        for (const message of multiLanguageMessagePhrases) {
            if (getLanguageCode(navigator.language) === message.language) {
                return message.messages[chapterPrefix];
            }
        }
    }

    /**
     * @param {string} color
     * @param {number} fract
     * @return {string}
     * @private
     */
    makeColor_(color, fract) {
        return color + ' ' + (fract * 100) + '%';
    }

    /**
     *  Clear the chapter from the timeline
     * @param chaptersMarkersContainerName
     */
    clearChapters(chaptersMarkersContainerName) {
        // const chapterMarkerContainer = this.controls_.getControlsContainer().querySelector(`.${chaptersMarkersContainerName}`);
        // chapterMarkerContainer.style.background = 'none';
        const chapterMarkerParentContainer = this.controls_.getControlsContainer().querySelector(`.${chaptersMarkersContainerName}`)
        let lc  = chapterMarkerParentContainer.lastElementChild
        while (lc) {
            chapterMarkerParentContainer.removeChild(lc)
            lc = chapterMarkerParentContainer.lastElementChild
        }
    }

    isIOS = () => {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            return true;
        } else {
            return navigator.maxTouchPoints &&
                navigator.maxTouchPoints > 2 &&
                /MacIntel/.test(navigator.platform);
        }
    }

    isAndroid = () => {
        return /android/i.test(navigator.userAgent);
    }

    isIpadOS = () => {
        return navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(navigator.platform);
    }

    /**
     * Return the current click position from the timeline.
     * @param e
     * @return {number}
     */
    getCurrentPosition(e) {
        const seekBarRect = this.seekBar_.getBoundingClientRect();
        const min = parseFloat(this.seekBar_.min);
        const max = parseFloat(this.seekBar_.max);
        let position;
        if (this.isIOS()) {
            position = e.changedTouches[0].clientX - seekBarRect.left;
        } else if(this.isIpadOS()) {
            position = e.changedTouches[0].clientX - seekBarRect.left;
        } else if (this.isAndroid()) {
            position = e.changedTouches[0].clientX - seekBarRect.left;
        }
        else {
            position = e.clientX - seekBarRect.left;
        }
        const scale = (max - min) / seekBarRect.width;

        let realPosition = (min + scale * position);
        if (realPosition < min) {
            realPosition = min;
        } else if (realPosition > max) {
            realPosition = max;
        }
        return Math.round(realPosition);
    }


    /**
     * Return latest chapters
     * @return {*}
     */
    getLatestChapters() {
        return this.chapters_
    }

    /**
     * Create A div markers for the chapters
     * @param chapter
     * @param index
     * @param className
     * @param chapterContainerName
     */
    createDivMarkers(chapter, index, chapterContainerName, className) {
        const allChapterChildren = this.controls_.getControlsContainer().querySelectorAll(`.${chapterContainerName} > *`);
        const chapterDiv = createHTMLElement('div');
        chapterDiv.classList.add(`${className}_${index}`)
        chapterDiv.style.position = 'absolute'
        chapterDiv.style.left = `${chapter.start * 100}%`
        chapterDiv.style.background = `${chapter.color ?? this.chaptersMarkerColor_}`
        chapterDiv.style.height = '100%'
        if (className === 'tags') {
            chapterDiv.classList.add('hexa-tag-marker');
            chapterDiv.classList.add('shaka-tooltip');
            chapterDiv.style.setProperty('--before-border-left', `25px solid ${chapter.color}`);
            if (chapter.start > 0.5) {
                chapterDiv.style.setProperty('--after-translate-x', `translateX(calc(-100% + 30px))`);
            } else {
                chapterDiv.style.setProperty('--after-translate-x', `translateX(-30px)`);
            }
            chapterDiv.setAttribute('aria-label', `${chapter.chapterTitle}`)
            chapterDiv.id = `${chapter.chapterTitle}`;
        } else {
            chapterDiv.style.width = `${chapter.end * 100 - chapter.start * 100 - 0.14}%`;
            chapterDiv.setAttribute('chapterTitle', `${chapter.chapterTitle}`)
            chapterDiv.id = `${chapter.chapterTitle}`;
        }
        chapterDiv.setAttribute('chapterTitle', `${chapter.chapterTitle}`)
        chapterDiv.id = `${chapter.chapterTitle}`;

        for (const child of allChapterChildren) {
            if (child.id === chapterDiv.id) {
                child.style.left = `${chapter.start * 100}%`
                child.style.width = `${chapter.end * 100 - chapter.start * 100 - 0.14}%`
                return
            }
        }
        this.controls_.getControlsContainer().querySelector(`.${chapterContainerName}`).appendChild(chapterDiv)
    }

}
