import { getFairPlayCert, selectStreamFormat } from '../drmConfigurations';
import { drmSupportMatrix, streamInfoGlobalErrorMessages } from '../const';

/**
 * Generate css style.backgroundImage URl
 * @param images
 * @return {*[]}
 */
export function generateBackgroundImageURL(images) {
  const urls = [];
  for (const image of images) {
    urls.push(`url(${image ?? ''})`);
  }
  return urls;
}

/**
 * Removes the plugin prefix and returns URL
 * @param url
 * @return {string}
 */
export const extractUrl = (url) => {
  const parts = url.split(':');
  return parts.slice(1).join(':');
};

export const configureHlsFairplayCertificate = async(player, certificateUri) => {
  const playerConfig = player.getConfiguration();
  const fairplayCertUint8 = await getFairPlayCert(certificateUri ?? '');
  playerConfig.drm = {
    advanced: {
      'com.apple.fps.1_0': {
        serverCertificate: fairplayCertUint8,
        videoRobustness: 'SW_SECURE_CRYPTO',
        audioRobustness: 'SW_SECURE_CRYPTO'
      }
    }
  };
  player.configure(playerConfig);
};

export const checkPlatformDrmSupport = (url, options) => {
  if (!url) {
    return false;
  }
  const supportedDrm = selectStreamFormat();
  const urlExtension = getUrlExtension(url);

  // fix for player-platform plugin. to be ignored platform check if configured
  if (options.basic.source.startsWith('player-platform')) {
    return true;
  }

  if (!options.basic?.drmProtected) {
    return true;
  }

  // because if the url directly loaded from the source and not from the plugin
  // we don't check the DRM because they are directly loaded without drm
  if (!options.basic?.livePlugin) {
    return true;
  }

  for (const [drmType, matrix] of Object.entries(drmSupportMatrix)) {
    if (supportedDrm.drmType === drmType &&
      matrix.browsers.find(el => el === supportedDrm.browser) &&
      matrix.extention === urlExtension) {
      return true;
    }
  }
};

export function getUrlExtension(url) {
  return url.split(/[#?]/)[0].split('.').pop().trim();
}

export function getLanguageCode(language) {
  return language.split('-')[0];
}

export const getErrorMessage = (status) => {
  if (!status) {
    return;
  }
  for (const message of streamInfoGlobalErrorMessages) {
    if (getLanguageCode(navigator.language) === message.language) {
      return message.messages[status];
    }
  }
};

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and replace the Array if new is configured
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function mergeDeep(...objects) {
  const isObject = obj => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = oVal;
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

export function getCurrentPosition(e, seekBar) {
  const seekBarRect = seekBar.getBoundingClientRect();
  const min = parseFloat(seekBar.min);
  const max = parseFloat(seekBar.max);

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
 * Mark the chapters on timeline
 * @param player
 * @param startTime
 * @param endTime
 */
export function markVODOnTimeline(player, startTime, endTime) {
  const seekRange = player.seekRange();
  const seekRangeSize = seekRange.end - seekRange.start;
  const gradient = ['to right'];
  const pointsAsFractions = [];
  const startDist = startTime - seekRange.start;
  const startFrac = (startDist / seekRangeSize) || 0;
  // For points with no endpoint assume a 1% length: not too much,
  // but enough to be visible on the timeline.
  let endFrac;
  if (!endTime) {
    const nextStartDist = startTime - seekRange.start;
    endFrac = (nextStartDist / seekRangeSize) || 0;
  } else {
    const endDist = endTime - seekRange.start;
    endFrac = (endDist / seekRangeSize) || 0;
  }
  pointsAsFractions.push({
    start: startFrac,
    end: endFrac
  });
  for (const point of pointsAsFractions) {
    gradient.push(makeColor_('transparent', point.start));
    gradient.push(makeColor_('red', point.start));
    gradient.push(makeColor_('red', point.end));
    gradient.push(makeColor_('transparent', point.end));
  }

  const style = `.shaka-video-container .shaka-seek-bar-container { background: linear-gradient(${gradient.join(',')}) !important}`;
  addStyle(style);
}

/**
 * @param {string} color
 * @param {number} fract
 * @return {string}
 * @private
 */
export function makeColor_(color, fract) {
  return color + ' ' + (fract * 100) + '%';
}

/**
 * Function to add style element
 * To only make the seek bar transparent if Chapters in configured in the player
 */
export function addStyle(styles) {
  /* Create style document */
  const css = document.createElement('style');

  if (css.styleSheet) { css.styleSheet.cssText = styles; } else { css.appendChild(document.createTextNode(styles)); }

  /* Append style to the tag name */
  document.getElementsByTagName('head')[0].appendChild(css);
}

/**
 * Builds a time string, e.g., 01:04:23, from |displayTime|.
 *
 * @param {number} displayTime (in seconds)
 * @param {boolean} showHour
 * @return {string}
 */
export function buildTimeString(displayTime, showHour) {
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

export const regexTest = (word, phrase) => {
  const regExp = new RegExp(word, 'i');
  return regExp.test(phrase);
};

/**
 * Depending on the value of display, sets/removes the css class of element to
 * either display it or hide it.
 *
 * @param {Element} element
 * @param {boolean} display
 */
export const setTooltipsDisplay = (element, display) => {
  if (!element) {
    return;
  }

  if (!display) {
    // Removing a non-existent class doesn't throw, so, even if
    // the element is not hidden, this should be fine.
    element.classList.remove('shaka-tooltips-on');
  } else {
    element.classList.add('shaka-tooltips-on');
  }
};
