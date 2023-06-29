import { UAParser } from 'ua-parser-js';
import { drmServerTypes, mimeTypes } from './const';
import shaka from 'shaka-player/dist/shaka-player.ui';

/**
 *
 * @param {!string} url Certificate URL
 * @return {Promise<Uint8Array>}
 */
export const getFairPlayCert = async(url) => {
  const response = fetch(`${url}`);
  const res = await Promise.race([response]);
  const cert = await res.arrayBuffer();
  return new Uint8Array(cert);
};

/**
 *
 * @return {{drmType: string, browser: string}}
 */
export const selectStreamFormat = function() {
  const ua = new UAParser().getResult();
  let browser = 'Non-DRM browser';
  let drmType = 'No Type';
  let noDrmType = ['hls', 'dash'];

  // eslint-disable-next-line no-mixed-operators
  if (ua.os.name === 'Android' && ua.os.version >= 4.3 && ua.device.type === 'mobile' && ua.browser.name === 'Chrome' || ua.browser.name === 'Opera' || ua.browser.name === 'Firefox') {
    if (ua.browser.name === 'Chrome' && parseInt(ua.browser.version) > 35) {
      browser = `${ua.browser.name}`;
      drmType = 'dashwidevine';
      noDrmType = ['hls', 'dash'];
    } else if (ua.browser.name === 'Firefox' && parseInt(ua.browser.version) > 51) {
      browser = `${ua.browser.name}`;
      drmType = 'dashwidevine';
      noDrmType = ['hls', 'dash'];
    } else if (ua.browser.name === 'Opera') {
      browser = `${ua.browser.name}`;
      drmType = 'dashwidevine';
      noDrmType = ['hls', 'dash'];
    } else {
      browser = `${ua.browser.name}`;
      drmType = 'dashwidevine';// TODO if not match any criteria what we provide.
      noDrmType = ['hls', 'dash'];
    }
    // eslint-disable-next-line no-mixed-operators
  } else if (ua.os.name === 'Android' && ua.os.version >= 4.3 && ua.device.type === 'tablet' && ua.browser.name === 'Chrome' || ua.browser.name === 'Opera' || ua.browser.name === 'Firefox') {
    // eslint-disable-next-line no-mixed-operators
    if (ua.browser.name === 'Chrome' && parseInt(ua.browser.version) > 35 || ua.browser.name === 'Firefox' && parseInt(ua.browser.version) > 51) {
      browser = `${ua.browser.name}`;
      drmType = 'dashwidevine';
      noDrmType = ['hls', 'dash'];
    } else if (ua.browser.name === 'Opera') {
      browser = `${ua.browser.name}`;
      drmType = 'dashwidevine';
      noDrmType = ['hls', 'dash'];
    } else {
      browser = `${ua.browser.name}`;
      drmType = 'dashwidevine'; // TODO if not match any criteria what we provide.
      noDrmType = ['hls', 'dash'];
    }
    // eslint-disable-next-line no-mixed-operators
  } else if (ua.os.name === 'iOS' && ua.device.type === 'mobile' && ua.browser.name === 'Safari' && parseFloat(ua.browser.version) >= 13) {
    browser = `${ua.browser.name}`;
    drmType = 'hls';
    noDrmType = ['hls'];
    // eslint-disable-next-line no-mixed-operators
  } else if (ua.os.name === 'iOS' && ua.device.type === 'tablet' && ua.browser.name === 'Safari' && parseFloat(ua.browser.version) >= 13) {
    browser = `${ua.browser.name}`;
    drmType = 'hls';
    noDrmType = ['hls'];
    // eslint-disable-next-line no-mixed-operators
  } else if (ua.os.name === 'iOS' && ua.device.type === 'mobile' && ua.browser.name === 'Chrome' && parseInt(ua.browser.version) > 35) {
    browser = `${ua.browser.name}`;
    drmType = 'hls';
    noDrmType = ['hls'];
    // eslint-disable-next-line no-mixed-operators
  } else if (ua.os.name === 'iOS' && ua.device.type === 'tablet' && ua.browser.name === 'Chrome' && parseInt(ua.browser.version) > 35) {
    browser = `${ua.browser.name}`;
    drmType = 'hls';
    noDrmType = ['hls'];
    // eslint-disable-next-line no-mixed-operators
  } else if (ua.browser.name === 'Chrome' || ua.browser.name === 'Chromium' || ua.browser.name === 'Opera' || ua.browser.name === 'Firefox' && parseInt(ua.browser.version) > 51) {
    // eslint-disable-next-line no-mixed-operators
    if (ua.browser.name === 'Chrome' && parseInt(ua.browser.version) > 35 || ua.browser.name === 'Firefox' && parseInt(ua.browser.version) > 51 || (ua.browser.name === 'Opera')) {
      browser = `${ua.browser.name}`;
      drmType = 'dashwidevine';
      noDrmType = ['dash', 'hls'];
    }
  } else if (ua.os.name === 'Windows' && parseFloat(ua.os.version) >= 8.1 && (ua.browser.name === 'Edge' && parseInt(ua.browser.version) > 80)) {
    browser = `${ua.browser.name}`;
    drmType = 'dashplayready';
    noDrmType = ['dash', 'hls']; // todo check for hls support
  } else if (ua.os.name === 'Android' && ua.os.version >= 4.3 && ua.browser.name === 'Samsung Browser') {
    browser = `${ua.browser.name}`;
    drmType = 'dashwidevine';
    noDrmType = ['dash'];
    // eslint-disable-next-line no-mixed-operators
  } else if (ua.os.name === 'Mac OS' && ua.browser.name === 'Safari' && parseFloat(ua.browser.version) >= 13) {
    browser = `${ua.browser.name}`;
    drmType = 'hlsfairplay';
    noDrmType = ['hls', 'dash'];
  } else if (ua.os.name === 'iOS') {
    browser = 'Safari';
    drmType = 'hlsfairplay';
    noDrmType = ['hls'];
  } else {
    browser = 'unknown';
    drmType = 'hls';
    noDrmType = ['hls'];
  }

  return {
    browser,
    drmType,
    noDrmType
  };
};
/**
 *
 * @param {!string} drmServerName supported drm type
 * @param {!string} url - drm license url link.
 * @return {Promise<{}>}
 */
export const getDrmServer = function(drmServerName, url) {
  const drmServer = {};
  drmServer[drmServerName] = url;
  return drmServer;
};

/**
 *
 * @param {string} drmType Client DRM type
 * @param {!string} licenseUrl - drm license url link.
 * @return {Promise<{}>}
 */
export const getDrmConfig = function(drmType, licenseUrl) {
  if (drmType === 'dashwidevine') {
    return getDrmServer('com.widevine.alpha', licenseUrl);
  } else if (drmType === 'hlsfairplay') {
    return getDrmServer('com.apple.fps.1_0', licenseUrl);
  } else if (drmType === 'dashplayready') {
    return getDrmServer('com.microsoft.playready', licenseUrl);
  } else {
    return getDrmServer('', '');
  }
};

/**
 * Configure the drm licence url in the player
 * @param {string} drmUrl
 */
export const returnDrmUrlWithSupportType = (drmUrl) => {
  const drmType = selectStreamFormat();
  const url = getDrmConfig(drmType.drmType, drmUrl);
  return {
    drm: {
      servers: url
    }
  };
};

export const getMimeTypeForPayload = () => {
  let mimeType = '';
  const drmType = selectStreamFormat();
  for (const type of Object.keys(mimeTypes)) {
    if (type === drmType.drmType) {
      mimeType = mimeTypes[type];
    }
  }
  return mimeType;
};

export const getDrmServerNameForPayload = () => {
  let drmServerName = '';
  const drmType = selectStreamFormat();
  for (const type of Object.keys(drmServerTypes)) {
    if (type === drmType.drmType) {
      drmServerName = drmServerTypes[type];
    }
  }
  return drmServerName;
};

/**
 * Customised configuration specially for EZDRM provider
 * @param player
 */
export const applyFairplayEZDRMSettings = (player) => {
  shaka.polyfill.PatchedMediaKeysApple.install();
  const FairPlayUtils = shaka.util.FairPlayUtils;
  player.getNetworkingEngine()
    .registerRequestFilter(FairPlayUtils.ezdrmFairPlayRequest);
  player.getNetworkingEngine()
    .registerResponseFilter(FairPlayUtils.commonFairPlayResponse);
  player.configure('drm.initDataTransform',
    FairPlayUtils.ezdrmInitDataTransform);

  player.getNetworkingEngine().registerRequestFilter((type, request) => {
    if (type !== shaka.net.NetworkingEngine.RequestType.LICENSE) {
      return;
    }
    const uri = request.uris[0];
    const FairPlayUtils = shaka.util.FairPlayUtils;
    const contentId = FairPlayUtils.defaultGetContentId(request.initData);
    const newUri = uri.replace('^assetId^', contentId);
    request.uris = [newUri];
    request.headers['Content-Type'] = 'application/octet-stream';
  });
};
