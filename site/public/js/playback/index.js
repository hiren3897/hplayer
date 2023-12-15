const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://alchetron.com/cdn/big-buck-bunny-6636a6ca-0538-4211-a422-2b82ba76d7e-resize-750.jpeg'
  },
  ui_configuration: {
    controlPanelElements: [
      'play_pause',
      'time_and_duration',
      'spacer',
      'mute',
      'volume',
      'playback_rate',
      'fullscreen',
      'overflow_menu'
    ],
    overflowMenuButtons: [
      'playback_rate'
    ],
    playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.233, 3.11],
  }
};
