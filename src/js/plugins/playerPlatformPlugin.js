import { UAParser } from 'ua-parser-js';
import { selectStreamFormat } from '../drmConfigurations';
import { extractUrl } from '../util/sharedUtils';

/**
 *
 * @param playerPlatformConfig
 * @param videoId
 * @return {Promise<any>}
 */
const loadPlayerPlatformManifest = async(playerPlatformConfig, videoId) => {
  const endpoint = playerPlatformConfig.endpoint; // https://equidia-vodce-p-api.hexaglobe.net/video/info/
  const publicKey = playerPlatformConfig.publicKey; // 01NdvIX6xNbihxxc3U52RDBX9novEE47lA1ZmEDw
  const hash = playerPlatformConfig.hash; // 5d14e0c68ccdd850c11764ca09d8031a8d72308a0c27b4f2674a831b7421d6a0
  const expiresAt = playerPlatformConfig.expiresAt; // 1631711351

  const response = await fetch(endpoint + '/' + videoId + '/' + publicKey + '/' + hash + '/' + expiresAt);
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
  }

  return await response.json();
};

/**
 * PlayerPlatform parser utils. Choose a mp4 video file url from available in manifest.
 * @param playerPlatformManifest
 * @param maxFormat
 * @return {*}
 */
const getMp4Video = (playerPlatformManifest, maxFormat) => {
  const listFormat = [720, 540, 480, 360, 240];
  for (let i = 0; i <= listFormat.length; i++) {
    if (listFormat[i] <= maxFormat) {
      if (typeof (playerPlatformManifest.mp4[listFormat[i]]) !== 'undefined') {
        return playerPlatformManifest.mp4[listFormat[i]];
      }
    }
  }
  throw new Error('Erreur getMp4Video');
};

/**
 * PlayerPlatform parser utils. Choose a thumbnail file url from available in manifest.
 * @param playerPlatformManifest
 * @param thumbnailType
 */
const getThumbnailUrl = (playerPlatformManifest, thumbnailType) => {
  if (!playerPlatformManifest?.vtt_thumbnails) {
    return;
  }
  return playerPlatformManifest.vtt_thumbnails[thumbnailType];
};

/**
 * Player platform manifest parser
 * Choose between hls and mp4 file.
 * @param playerPlatformManifest
 * @return {*}
 */
const playerPlatformManifestParser = (playerPlatformManifest) => {
  const ua = (new UAParser()).getResult();

  if (typeof (playerPlatformManifest.hls) !== 'undefined') {
    return playerPlatformManifest.hls;
  }

  /**
     * Arbitrary resolution chosen for device type
     * Unable to add the list of mp4 in the resolution select of shaka player
     */
  if (typeof (playerPlatformManifest.mp4) !== 'undefined') {
    if (ua.device.type === 'mobile') {
      return getMp4Video(playerPlatformManifest, 480);
    } else if (ua.device.type === 'tablet') {
      return getMp4Video(playerPlatformManifest, 540);
    } else {
      return getMp4Video(playerPlatformManifest, 720);
    }
  }

  throw new Error('Erreur selectFlux');
};

export const loadPlayerPlatformPlugin = async(asset, playerPlatformConfiguration) => {
  let mimeType;
  const videoId = extractUrl(asset.source);
  const playerPlatformManifest = await loadPlayerPlatformManifest(playerPlatformConfiguration, videoId);
  const supportedDrm = selectStreamFormat();
  if (supportedDrm.browser === 'Mac OS' || supportedDrm.browser === 'Safari') {
    mimeType = 'application/x-mpegURL';
  } else {
    mimeType = 'video/mp4';
  }
  return {
    source: playerPlatformManifestParser(playerPlatformManifest),
    mimeType: mimeType
  };
};

export const getPlayerPlatformThumbnailsConfig = async(asset, playerPlatformConfiguration) => {
  const videoId = extractUrl(asset.source);
  const playerPlatformManifest = await loadPlayerPlatformManifest(playerPlatformConfiguration, videoId);
  return {
    name: 'thumbnail_track_vod',
    visible: true,
    data: {
      withWebVtt: true,
      webVttInfo: {
        url: getThumbnailUrl(playerPlatformManifest, playerPlatformConfiguration.thumbnailType),
        lang: 'en',
        mimeType: 'text/vtt'
      }
    }
  };
};
