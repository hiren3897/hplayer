const options = {
  basic: {
    source: 'https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd',
  },
  ui_configuration: {
    enableTooltips: true
  },
  advanced_features: [
    {
      name: 'auto_disconnect',
      visible: true,
      data: {
        sessionTimeout: 10,
        promptTime: 5,
        promptMessage: 'Are you still watching stream?',
        promptBtnName: 'Oui'
      }
    }
  ]
};
