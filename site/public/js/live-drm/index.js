const options = {
  basic: {
    source: 'https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
    // drm_licence: "http:/drm/license" // First method <1>
  },
  player_configurations: {
    drm: { // Second method <2>
      advanced: {
        'com.widevine.alpha': {
          audioRobustness: 'SW_SECURE_CRYPTO',
          videoRobustness: 'SW_SECURE_CRYPTO'
        }
      }
    }
  },
};
