import { featuresConfig } from './const';
import { selectStreamFormat } from './drmConfigurations';

function checkChaptersVODConfig(feature, chaptersVodFeatureConfig) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!chaptersVodFeatureConfig.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkSubtitlesConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    for (const data of feature.data) {
      if (!data.hasOwnProperty(property)) {
        advanceFeatureConfigCorrect_ = false;
        console.error(`No ${property} configuration found for feature ${feature.name}`);
        return advanceFeatureConfigCorrect_;
      }
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkCustomButtonsConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    for (const data of feature.data) {
      if (!data.hasOwnProperty(property)) {
        advanceFeatureConfigCorrect_ = false;
        console.error(`No ${property} configuration found for feature ${feature.name}`);
        return advanceFeatureConfigCorrect_;
      }
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkSinglePropertyConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkExpressModeConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkPlaylistConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  for (const property of featuresConfig[feature.name].videoPlaylistProperties) {
    for (const data of feature.data?.videos) {
      if (!data.hasOwnProperty(property)) {
        advanceFeatureConfigCorrect_ = false;
        console.error(`No video ${property} configuration in playlist found for feature ${feature.name}`);
        return advanceFeatureConfigCorrect_;
      }
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkShareConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;

  // if no media property is configured
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
    // if not any media is configured in medias property
    if (!feature.data?.medias[0]) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No medias configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkCustomisedPlaybackConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;

  // if no speeds property is configured
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data[0].hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
    // if no playback rates is configured in speeds property
    if (!feature.data[0]?.speeds[0]) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No playback rates configuration found in speeds property for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkSwitchChannelConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  // if no channel list data is configured in channels property
  if (!feature.data?.channels.length) {
    advanceFeatureConfigCorrect_ = false;
    console.error(`No channels data found for feature ${feature.name}`);
    return advanceFeatureConfigCorrect_;
  }

  for (const property of featuresConfig[feature.name].channelProperties) {
    for (const data of feature.data?.channels) {
      if (!data.hasOwnProperty(property)) {
        advanceFeatureConfigCorrect_ = false;
        console.error(`No channel ${property} configuration in channels list found for feature ${feature.name}`);
        return advanceFeatureConfigCorrect_;
      }
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkPopupListConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  // if no channel list data is configured in channels property
  if (!feature.data?.list.length) {
    advanceFeatureConfigCorrect_ = false;
    console.error(`No list data found for feature ${feature.name}`);
    return advanceFeatureConfigCorrect_;
  }

  for (const property of featuresConfig[feature.name].listProperties) {
    for (const data of feature.data?.list) {
      if (!data.hasOwnProperty(property)) {
        advanceFeatureConfigCorrect_ = false;
        console.error(`No list ${property} configuration found in list for feature ${feature.name}`);
        return advanceFeatureConfigCorrect_;
      }
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkChaptersLiveConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  // if no channel list data is configured in channels property
  if (!feature.data?.chapters.length) {
    advanceFeatureConfigCorrect_ = false;
    console.error(`No chapters data found for feature ${feature.name}`);
    return advanceFeatureConfigCorrect_;
  }

  for (const property of featuresConfig[feature.name].chaptersProperties) {
    for (const data of feature.data?.chapters) {
      if (!data.hasOwnProperty(property)) {
        advanceFeatureConfigCorrect_ = false;
        console.error(`No list ${property} configuration found in chapters for feature ${feature.name}`);
        return advanceFeatureConfigCorrect_;
      }
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkImageOverlayConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }

  // function check if at least one image URL is configured in the imageUrls []
  if (!feature.data.imageUrls[0]) {
    advanceFeatureConfigCorrect_ = false;
    console.error(`No image url configured to overlay for feature ${feature.name}`);
    return advanceFeatureConfigCorrect_;
  }
  return advanceFeatureConfigCorrect_;
}

function checkManageAlertsConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }

  // function check if at least one topics URL is configured in the topics []
  if (!feature.data.topics[0]) {
    advanceFeatureConfigCorrect_ = false;
    console.error(`No topic url configured to be subscribed for feature ${feature.name}`);
    return advanceFeatureConfigCorrect_;
  }
  return advanceFeatureConfigCorrect_;
}

function checkRedirectConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkDvrModeConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  return advanceFeatureConfigCorrect_;
}

function checkAutoDisconnectConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  return advanceFeatureConfigCorrect_;
}
function checkTagsConfig(feature) {
  let advanceFeatureConfigCorrect_ = true;
  for (const property of featuresConfig[feature.name].requiredProperties) {
    if (!feature.data.hasOwnProperty(property)) {
      advanceFeatureConfigCorrect_ = false;
      console.error(`No ${property} configuration found for feature ${feature.name}`);
      return advanceFeatureConfigCorrect_;
    }
  }
  return advanceFeatureConfigCorrect_;
}

/**
 * Check advance features configurations and return a correct flag to configure a feature or not
 * if error it will throw the error in the console related to the property not configured correct.
 * @param feature
 * @param chapterVodFeatureConfig - chapter VOD config is in basic {}
 * @return {*|boolean}
 */
export function checkAdvanceFeatureConfig(feature, chapterVodFeatureConfig = null) {
  switch (feature.name) {
    case 'chapters_vod':
      return checkChaptersVODConfig(feature, chapterVodFeatureConfig);
    case 'subtitles':
      return checkSubtitlesConfig(feature);
    case 'custom_buttons':
      return checkCustomButtonsConfig(feature);
    case 'forward_button':
    case 'backward_button':
    case 'auto_pip':
      return checkSinglePropertyConfig(feature);
    case 'express_mode':
      return checkExpressModeConfig(feature);
    case 'playlist':
      return checkPlaylistConfig(feature);
    case 'share':
      return checkShareConfig(feature);
    case 'playback_speed':
      return checkCustomisedPlaybackConfig(feature);
    case 'switch_channels':
      return checkSwitchChannelConfig(feature);
    case 'popup_list':
      return checkPopupListConfig(feature);
    case 'image_overlay':
      return checkImageOverlayConfig(feature);
    case 'manage_alerts':
      return checkManageAlertsConfig(feature);
    case 'redirect':
      return checkRedirectConfig(feature);
    case 'chapters_live':
      return checkChaptersLiveConfig(feature);
    case 'dvr_mode_button':
      return checkDvrModeConfig(feature);
    case 'auto_disconnect':
      return checkAutoDisconnectConfig(feature);
    case 'tags':
      return checkTagsConfig(feature);
      // features without properties
    case 'snapshot':
    case 'big_live_button':
    case 'small_live_button':
    case 'thumbnail_track_live':
    case 'thumbnail_track_vod':
    case 'time_tooltip':
    case 'custom_audio_languages':
      return true;
    default:
      return false;
  }
}

function getSupportedFormat(basic) {
  const supportedFormat = selectStreamFormat();
  if (!basic?.availableFormats || !basic?.availableFormats[0]) {
    console.error('No stream formats provided');
    return;
  }

  if (basic?.drmProtected) {
    /* for stream info with DRM protected */
    return basic.availableFormats.filter((format) => format === supportedFormat.drmType)[0];
  } else {
    /**
     * Without DRM
     * because we have event01 urls having only hls and region url have dash/hls
     */
    for (const format of basic.availableFormats) {
      for (const supportedFormat_ of supportedFormat.noDrmType) {
        if (format === supportedFormat_) {
          return supportedFormat_;
        }
      }
    }
  }
}

function makeStreamInfoUrl(basic) {
  return `${basic?.source}?format=${getSupportedFormat(basic)}`;
}

/**
 *
 * @param uri
 * @return {Promise<any>}
 */
async function fetchStreamInfoUri(uri) {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      const data = await response.json();
      return {
        geoBlockingStatusCode: response.status,
        msg: data.msg
      };
    }
    const streamInfo = await response.json();
    if (streamInfo.status === 'ko') {
      console.error(`${streamInfo.msg} stream urls available.`);
      return;
    }

    return {
      ...streamInfo,
      source: streamInfo.primary
        ? streamInfo.primary
        : streamInfo.backup ??
          streamInfo.stream_url_pri
          ? streamInfo.stream_url_pri
          : streamInfo.stream_url_bkp
    };
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥`);
  }
}

/**
 *
 * @return {Promise<*>}
 */
export async function getSourceInfo(basic) {
  return await fetchStreamInfoUri(makeStreamInfoUrl(basic));
}
