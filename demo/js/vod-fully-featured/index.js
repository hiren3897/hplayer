const options = {
  basic: {
    source: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_with_tiled_thumbnails.mpd',
    poster: 'https://alchetron.com/cdn/big-buck-bunny-6636a6ca-0538-4211-a422-2b82ba76d7e-resize-750.jpeg',
    chaptersData: {
      url: 'assets/text-track-en.vtt',
      lang: 'en'
    }
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
    enableTooltips: true,
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
      name: 'forward_button',
      visible: true,
      data: {
        forwardSeconds: 20,
        color: 'yellow'
      },
      position: 3
    },
    {
      name: 'express_mode',
      visible: true,
      data: {
        begin: '5%',
        express_speed: 3.5,
        end: '15%'
      }
    },
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
    },
    {
      name: 'thumbnail_track',
      visible: true
    },
    {
      name: 'subtitles',
      visible: true,
      data: [
        {
          url: 'assets/text-track-en.vtt',
          language: 'en',
          mimeType: 'text/vtt'
        },
        {
          url: 'assets/text-track-fr.vtt',
          language: 'fr',
          mimeType: 'text/vtt'
        }
      ]
    },
    {
      name: 'share',
      visible: true,
      data: {
        medias: [
          {
            name: 'facebook',
            contents: {
              url: 'https://hplayer-demo.netlify.app',
              quote: 'your quotes to share',
              hashtag: '#hiren'
            }
          },
          {
            name: 'twitter',
            contents: {
              url: 'https://hplayer-demo.netlify.app',
              title: 'hello from hplayer',
              via: 'hiren03',
              hashtags: 'IT, Telecom'
            }
          },
          {
            name: 'reddit',
            contents: {
              url: 'https://hplayer-demo.netlify.app',
              title: 'hello from hplayer'
            }
          },
          {
            name: 'pinterest',
            contents: {
              url: 'https://hplayer-demo.netlify.app',
              title: 'hello from hplayer',
              media: 'https://static.iquesta.com/logo/iquesta/Hexaglobe.gif'
            }
          },
          {
            name: 'linkedin',
            contents: {
              url: 'https://hplayer-demo.netlify.app'
            }
          },
          {
            name: 'telegram',
            contents: {
              url: 'https://hplayer-demo.netlify.app',
              title: 'hello from hplayer.'
            }
          },
          {
            name: 'vkontakte',
            contents: {
              url: 'https://hplayer-demo.netlify.app',
              title: 'hello from hplayer.',
              image: 'https://static.iquesta.com/logo/iquesta/Hexaglobe.gif',
              comment: 'you comments for the post.'
            }
          },
          {
            name: 'whatsapp',
            contents: {
              url: 'https://hplayer-demo.netlify.app',
              title: 'hello from hplayer.'
            }
          }
        ]
      }
    },
    {
      name: 'chapters_vod',
      visible: true,
      data: {
        chapterMarkerColor: '#ff0017'
      }
    }
  ]
};

const notificationConfig = {
  title: 'Success',
  style: 'hexa-notification-success',
  message: 'Hplayer Loaded',
  actions: ['close'],
  seconds: 5
};
setTimeout(() => {
  hplayer.showNotification(notificationConfig);
});
