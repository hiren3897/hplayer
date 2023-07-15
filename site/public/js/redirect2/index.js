const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
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
      name: 'redirect',
      visible: true,
      data: {
        auto_second: 10,
        title: 'Big Buck Bunny',
        url: 'redirect.html',
        thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
      }
    }
  ]
};
