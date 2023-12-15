const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  ui_configuration: {
    enableTooltips: true
  },
  advanced_features: [
    {
      name: 'tags',
      visible: true,
      data: {
        tagWebVtt: 'assets/text-track-tags.vtt'
      }
    }
  ]
};
