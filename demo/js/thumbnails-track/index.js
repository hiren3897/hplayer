const options = {
  basic: {
    source: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_with_4_tiles_thumbnails.mpd'
  },
  player_configurations: {
    streaming: {
      useNativeHlsOnSafari: false
    },
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
      name: 'thumbnail_track_vod',
      visible: true,
      data: {
        withWebVtt: false
      }
    }
  ]
};
