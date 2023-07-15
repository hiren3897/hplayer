const options = {
  basic: {
    source: 'https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd',
    poster: 'https://alchetron.com/cdn/big-buck-bunny-6636a6ca-0538-4211-a422-2b82ba76d7e-resize-750.jpeg'
    // drm_licence: "http:/drm/license" // First method <1>
  },
  player_configurations: {
    drm: {
      advanced: {
        'com.widevine.alpha': {
          audioRobustness: 'SW_SECURE_CRYPTO',
          videoRobustness: 'SW_SECURE_CRYPTO'
        }
      }
    }
  },
  ui_configuration: {
    castReceiverAppId: 'CC1AD845',
    addBigPlayButton: true,
    controlPanelElements: [
      'play_pause',
      'time_and_duration',
      'spacer',
      'playback_rate',
      'mute',
      'volume',
      'fullscreen',
      'airplay',
      'overflow_menu'
    ],
    overflowMenuButtons: [
      'cast',
      'quality',
    ],
    contextMenuElements: [
      'loop',
      'picture_in_picture',
      'statistics'
    ],
    customContextMenu: true,
    playbackRates: [0.5, 0.9, 1.4, 1.95, 2.5, 3.75, 4],
    enableKeyboardPlaybackControls: true
  },
  advanced_features: [
    {
      name: 'backward_button',
      visible: true,
      data: {
        backwardSeconds: 20,
        color: '#f0ea20'
      }
    },
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
    },
    {
      name: 'share',
      visible: true,
      data: {
        medias: [
          {
            name: 'facebook',
            contents: {
              url: 'https://www.hexaglobe.com/en',
              quote: 'your quotes to share',
              hashtag: '#hiren'
            }
          },
          {
            name: 'twitter',
            contents: {
              url: 'https://www.hexaglobe.com/en',
              title: 'hello from hplayer',
              via: 'hiren03',
              hashtags: 'IT, Telecom'
            }
          },
          {
            name: 'reddit',
            contents: {
              url: 'https://www.hexaglobe.com/en',
              title: 'hello from hplayer'
            }
          },
          {
            name: 'pinterest',
            contents: {
              url: 'https://www.hexaglobe.com/en',
              title: 'hello from hplayer',
              media: 'https://static.iquesta.com/logo/iquesta/Hexaglobe.gif'
            }
          },
          {
            name: 'linkedin',
            contents: {
              url: 'https://www.hexaglobe.com/en'
            }
          },
          {
            name: 'telegram',
            contents: {
              url: 'https://www.hexaglobe.com',
              title: 'hello from hplayer.'
            }
          },
          {
            name: 'vkontakte',
            contents: {
              url: 'https://www.hexaglobe.com',
              title: 'hello from hplayer.',
              image: 'https://static.iquesta.com/logo/iquesta/Hexaglobe.gif',
              comment: 'you comments for the post.'
            }
          },
          {
            name: 'whatsapp',
            contents: {
              url: 'https://www.hexaglobe.com',
              title: 'hello from hplayer.'
            }
          }
        ]
      }
    },
    {
      name: 'small_live_button',
      visible: true
    },
    {
      name: 'big_live_button',
      visible: true
    }
  ]
};
