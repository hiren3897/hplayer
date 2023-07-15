const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
      'fullscreen',
      'overflow_menu'
    ],

  },

  advanced_features: [
    {
      name: 'subtitles',
      visible: true,
      data: [
        {
          url: 'assets/text-track-en.vtt',
          language: 'en',
          mimeType: 'text/vtt',
        },
        {
          url: 'assets/text-track-fr.vtt',
          language: 'fr',
          mimeType: 'text/vtt',
        }
      ]
    }
  ]
};
