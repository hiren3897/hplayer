const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
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
              title: 'hello from hexaglobe player',
              via: 'hiren03',
              hashtags: 'IT, Telecom'
            }
          },
          {
            name: 'reddit',
            contents: {
              url: 'https://www.hexaglobe.com/en',
              title: 'hello from hexaglobe player'
            }
          },
          {
            name: 'pinterest',
            contents: {
              url: 'https://www.hexaglobe.com/en',
              title: 'hello from hexaglobe player',
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
              title: 'hello from hexaglobe player.'
            }
          },
          {
            name: 'vkontakte',
            contents: {
              url: 'https://www.hexaglobe.com',
              title: 'hello from hexaglobe player.',
              image: 'https://static.iquesta.com/logo/iquesta/Hexaglobe.gif',
              comment: 'you comments for the post.'
            }
          },
          {
            name: 'whatsapp',
            contents: {
              url: 'https://www.hexaglobe.com',
              title: 'hello from hexaglobe player.'
            }
          }
        ]
      }
    }
  ]
};
