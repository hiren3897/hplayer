const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
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
      name: 'forward_button',
      visible: true,
      data: {
        forwardSeconds: 20,
        color: 'yellow'
      },
      position: 2
    }
  ]
};
