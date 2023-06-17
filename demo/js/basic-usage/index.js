const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  // Below is an example, everything is optional
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
  }
};

const notificationConfig = {
  title: 'Success',
  style: 'hexa-notification-success',
  message: 'Hexaglobe player Loaded',
  actions: ['close'],
  seconds: 5
};
setTimeout(() => {
  hexaPlayer.showNotification(notificationConfig);
});
