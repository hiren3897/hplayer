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
        tagWebVtt: 'https://demoplayer.hexaglobe.net/demo/hexa-player-demo/tags2.vtt'
      }
    }
  ]
};
