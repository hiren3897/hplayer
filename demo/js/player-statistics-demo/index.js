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
      'fullscreen',
      'overflow_menu'
    ],
    statisticsList: [
      'width',
      'height',
      'corruptedFrames',
      'decodedFrames',
      'droppedFrames',
      'drmTimeSeconds',
      'licenseTime',
      'liveLatency',
      'loadLatency',
      'bufferingTime',
      'manifestTimeSeconds',
      'estimatedBandwidth',
      'streamBandwidth',
      'maxSegmentDuration',
      'pauseTime',
      'playTime',
      'completionPercent',
    ],
    overflowMenuButtons: [
      'statistics',
    ],
  }
};
