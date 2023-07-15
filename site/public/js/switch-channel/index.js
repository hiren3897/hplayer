const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://picsum.photos/640/360'
  },
  player_configurations: {
    manifest: {
      hls: {
        useFullSegmentsForStartTime: true
      },
      availabilityWindowOverride: 30
    }
  },
  advanced_features: [
    {
      name: 'switch_channels',
      visible: true,
      data: {
        ui: 'list',
        channels: [
          {
            name: 'C1',
            source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            logo: 'https://picsum.photos/640/360'
          },
          {
            name: 'C2',
            source: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
            logo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg'
          },
          {
            name: 'C3',
            source: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
            logo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg'
          },
          {
            name: 'C4',
            source: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
            logo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg'
          },
          {
            name: 'C5',
            source: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
            logo: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg'
          },
          {
            name: 'C6',
            source: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
            logo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg'
          }
        ]
      }
    }
  ]
};
