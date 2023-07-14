const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://alchetron.com/cdn/big-buck-bunny-6636a6ca-0538-4211-a422-2b82ba76d7e-resize-750.jpeg'
  },
  ui_configuration: {
    enableTooltips: true,
  },
  advanced_features: [
    {
      name: 'custom_buttons',
      visible: true,
      data: [
        {
          buttonInfo: {
            name: 'MyCustomButton',
            iconName: 'transcribe', // material UI icons reference only https://fonts.google.com/icons
            color: 'white',
            cssClass: 'my-custom-button' // should be inherited in like: ".shaka-video-container .my-custom-button"
          },
          onEventType: 'click',
          onEventTypeHandler: () => {
            const notificationConfig = {
              title: 'Success',
              style: 'hexa-notification-success',
              message: 'Hello! From custom button',
              actions: ['close'],
              seconds: 5
            };
            hplayer.showNotification(notificationConfig);
          }
        },
        {
          buttonInfo: {
            name: 'MyCustomButton2',
            iconName: 'download', // material UI icons reference only https://fonts.google.com/icons
            color: 'green',
            cssClass: 'my-custom-button2' // should be inherited in like: ".shaka-video-container .my-custom-button"
          },
          onEventType: 'click',
          onEventTypeHandler: () => {
            const notificationConfig = {
              title: 'Success',
              style: 'hexa-notification-success',
              message: 'Hello! From custom button 2',
              actions: ['close'],
              seconds: 5
            };
            hplayer.showNotification(notificationConfig);
          }
        }
      ]
    }
  ]
};
