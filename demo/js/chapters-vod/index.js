const options = {
  basic: {
    source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    chaptersData: {
      url: 'assets/text-track-en.vtt',
      lang: 'en'
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
      name: 'chapters_vod',
      visible: true,
      data: {
        chapterMarkerColor: '#ff0017'
      }
    }
  ]
};
