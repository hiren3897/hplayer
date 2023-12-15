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
  }
  /*  advanced_features: [
    {
      name: 'manage_alerts',
      visible: true,
      data: {
        serverUrl: 'https://localhost:4431/.well-known/mercure',
        topics: [
          'http://example.com/books/{id}',
          'http://example.com/books/{id}',
          'http://example.com/books/{id}'
        ],
        onScreenTime: 5
      }
    }
  ] */
};
