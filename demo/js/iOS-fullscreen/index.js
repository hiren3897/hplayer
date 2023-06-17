const options = {
  basic: {
    source: 'https://hexaglobe-preprod2-p-cdn.hexaglobe.net/4482a3c9b73372fbe9684fbe6137c393/6113f19d/hexaglobe/preprod-website-web-1/hxgpreprod_fre.smil/playlist.m3u8'
  },
  // Below is an example, everything is optional
  ui_configuration: {
    addBigPlayButton: true,
    controlPanelElements: [
      'play_pause',
      'time_and_duration',
      'spacer',
      'mute',
      'fullscreen',
      'volume',
      'overflow_menu'
    ],
    overflowMenuButtons: [
      'captions',
      'quality',
      'language',
      'picture_in_picture',
      'cast',
      'playback_rate'
    ]
  },
  player_configurations: {
    manifest: {
      hls: {
        useFullSegmentsForStartTime: true
      }
    }
  }
};
