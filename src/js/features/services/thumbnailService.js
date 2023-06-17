import {UAParser} from "ua-parser-js";

export class ThumbnailService {

    /**
     * shaka.Player
     * @private
     */
    player_;

    /**
     * {shaka.ui.Controls}
     * @private
     */
    controls_;

    /**
     * Shaka-Seek-Bar
     * @private
     */
    seekBar_

    /**
     * UA parser to detect platform;
     * @private
     */
    ua_;

    constructor(player, controls) {
        this.player_ = player
        this.controls_ = controls

        this.seekBar_ = this.controls_.getControlsContainer().querySelector('.shaka-seek-bar');

        this.ua_ = (new UAParser()).getResult();

        this.parsedData = []
    }

    getClientX(event) {
        let clientX;
        if (this.isIOS()) {
            clientX = event.changedTouches[0].clientX;
        } else if(this.isIpadOS()) {
            clientX = event.changedTouches[0].clientX;
        } else {
            clientX = event.clientX;
        }
        return clientX
    }

    isIOS = () => {
        if (/iPad|iPhone|iPod/.test(navigator.platform)) {
            return true;
        } else {
            return navigator.maxTouchPoints &&
                navigator.maxTouchPoints > 2 &&
                /MacIntel/.test(navigator.platform);
        }
    }

    isIpadOS = () => {
        return navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(navigator.platform);
    }

    formatTime(secs) {
        const date = new Date(secs * 1000);
        let hours, minutes, seconds;
        hours = date.getHours();
        if (secs >= 3600) {
            hours = (hours >= 10) ? hours : '0' + hours;
        } else {
            hours = '00';
        }
        minutes = date.getMinutes();
        minutes = (minutes >= 10) ? minutes : '0' + minutes;
        seconds = date.getSeconds();
        seconds = (seconds >= 10) ? seconds : '0' + seconds;
        return hours +
            ":" + minutes +
            ":" + seconds;
    }

    getMouseLeftPosition(
        mouseX,
        pbLeft,
        pbWidth,
    ) {
        return ((mouseX - pbLeft) / pbWidth) * 100 + '%';
    }

    getCurrentPosition(e) {
        const seekBarRect = this.seekBar_.getBoundingClientRect();
        const min = parseFloat(this.seekBar_.min);
        const max = parseFloat(this.seekBar_.max);
        let position;
        if (this.isIOS()) {
            position = e.changedTouches[0].clientX - seekBarRect.left;
        } else if(this.isIpadOS()) {
            position = e.changedTouches[0].clientX - seekBarRect.left;
        } else {
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

    getSeekBar() {
        return this.seekBar_
    }

    async getThumbnailsTrack(webVttInfo) {
        console.log(webVttInfo)
        await this.player_.addThumbnailsTrack(`${webVttInfo.url}`, `${webVttInfo.mimeType}`);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.player_.getImageTracks()[0]);
            }, 1.5 * 1000); // it by defaults requires a delay of 1.5 seconds to get the chapters
        });
    }
}
