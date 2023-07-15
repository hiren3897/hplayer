const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://alchetron.com/cdn/big-buck-bunny-6636a6ca-0538-4211-a422-2b82ba76d7e-resize-750.jpeg'
  },
  ui_configuration: {
    controlPanelElements: [
      'play_pause',
      'mute'
    ]
  },
  advanced_features: [
    {
      name: 'switch_channels',
      visible: true,
      data: {
        ui: 'list',
        channels: [
          {
            name: 'C1 hgfdsasdfghjkl',
            url: 'https://hexaglobe-preprod2-p-cdn.hexaglobe.net/4482a3c9b73372fbe9684fbe6137c393/6113f19d/hexaglobe/preprod-website-web-1/hxgpreprod_fre.smil/playlist.m3u8',
            drmUrl: 'https://drmUrltothisvideo.com/csdkslsd',
            logo: 'https://picsum.photos/640/360'
          },
          {
            name: 'C2',
            url: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
            drmUrl: 'https://drmUrltothisvideo.com/csdkslsd',
            logo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg'
          },
          {
            name: 'C3',
            url: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
            drmUrl: 'https://drmUrltothisvideo.com/csdkslsd',
            logo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg'
          },
          {
            name: 'C4',
            url: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
            drmUrl: 'https://drmUrltothisvideo.com/csdkslsd',
            logo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg'
          },
          {
            name: 'C5',
            url: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
            drmUrl: 'https://drmUrltothisvideo.com/csdkslsd',
            logo: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg'
          },
          {
            name: 'C6',
            url: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
            drmUrl: 'https://drmUrltothisvideo.com/csdkslsd',
            logo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg'
          }
        ]
      }
    }
  ]
};
