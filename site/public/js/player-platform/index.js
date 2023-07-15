const options = {
  basic: {
    poster: 'https://picsum.photos/640/360',
    videoId: 'playerPlatform:20210901_33951609_00000HR',
  },
  hexa_configurations: {
    player_platform: {
      endpoint: 'https://equidia-vodce-p-api.hexaglobe.net/video/info',
      publicKey: 'b16d48525feb78bb5f729ab781e2b3cc',
      hash: '03bbf347999d0e36882bcb3be9761e57ecf84af7f7922a81b76826edc014aa8e',
      expiresAt: '1631785491',
      // https://equidia-vodce-p-api.hexaglobe.net/video/info/20210901_33951609_00000HR/b16d48525feb78bb5f729ab781e2b3cc/03bbf347999d0e36882bcb3be9761e57ecf84af7f7922a81b76826edc014aa8e/1631785491
    },
  },
  ui_configuration: {
    addBigPlayButton: true,
    controlPanelElements: [
      'play_pause',
      'time_and_duration',
      'spacer',
      'mute',
      'volume',
      'fullscreen',
      'overflow_menu'
    ],
    overflowMenuButtons: [
      'captions',
      'quality',
      'language',
      'picture_in_picture',
      'cast',
      'playback_rate',
    ],
  },
};
