const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: 'https://picsum.photos/640/360',
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
      name: 'thumbnails',
      visible: true,
      data: [
        {
          debounced_delay: 100,
        }
      ]
    },
    {
      name: 'playlist',
      visible: true,
      data: [{
        auto_second: 3,
        videos: [
          {
            title: 'Big Buck bunny',
            description: 'The first Blender Open Movie from 2006',
            source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnail: 'https://picsum.photos/640/360'
          },
          {
            title: 'For Bigger Blazes',
            description: 'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.',
            source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
            thumbnailOnHover: 'https://i.imgur.com/7V1qHS1.gif'
          },
          {
            title: 'Elephant Dream',
            description: 'The first Blender Open Movie from 2006',
            source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
            thumbnailOnHover: 'https://i.imgur.com/nlqurbU.gif'
          },
        ]
      }]
    }
  ]
};
