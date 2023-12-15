const options = {
  basic: {
    source: 'https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
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
  advanced_features: [
    {
      name: 'dvr_mode_button',
      visible: true,
      data: {
        noDvrModeTime: 30,
        dvrModeActive: true
      }
    }
  ]
};
