const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  // Below is an example, everything is optional
  ui_configuration: {
    addBigPlayButton: true,
    controlPanelElements: [
      'play_pause',
      'time_and_duration',
      'spacer',
      'mute',
      'fullscreen',
      'volume',
      'overflow_menu'
    ],
    overflowMenuButtons: [
      'captions',
      'quality',
      'language',
      'picture_in_picture',
      'cast',
      'playback_rate'
    ]
  },
  player_configurations: {
    manifest: {
      hls: {
        useFullSegmentsForStartTime: true
      }
    }
  }
};
