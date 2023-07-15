const options = {
  basic: {
    source: 'https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
    // drm_licence: `${process.env.DRM}`
  },
  player_configurations: {
    drm: {
      advanced: {
        'com.widevine.alpha': {
          audioRobustness: 'SW_SECURE_CRYPTO',
          videoRobustness: 'SW_SECURE_CRYPTO'
        }
      }
    }
  },
  ui_configuration: {
    controlPanelElements: [
      'play_pause',
      'time_and_duration',
      'spacer',
      'mute',
      'volume',
      'fullscreen'
    ]
  },
  advanced_features: [
    {
      name: 'big_live_button',
      visible: true
    }
  ]
};
