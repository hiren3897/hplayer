const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://picsum.photos/640/360'
  },
  advanced_features: [
    {
      name: 'playlist',
      visible: true,
      data: {
        withPlaylist: true,
        withNextVideoPopup: true,
        loop: true,
        auto_second: 10,
        videos: [
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
          {
            title: 'For Bigger Meltdowns',
            description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster\'s big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast',
            source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
            thumbnailOnHover: 'https://i.imgur.com/fFatpRT.gif'
          },
          {
            title: 'For Bigger Escape',
            description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman\'s escapes aren\'t quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.',
            source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
            thumbnailOnHover: 'https://i.imgur.com/9ro3R3I.gif'
          },
          {
            title: 'For Bigger Joyrides',
            description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.',
            source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
            thumbnailOnHover: 'https://i.imgur.com/fRbZ0DR.gif'
          },
          {
            title: 'For Bigger Fun',
            description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.',
            source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
            thumbnailOnHover: 'https://i.imgur.com/qWg35rZ.gif'
          }
        ]
      }
    }
  ]
};
