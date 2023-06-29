import shaka from 'shaka-player/dist/shaka-player.ui';
import { NotificationService } from '../notification/notificationService';

/**
 * Auto Disconnect Feature
 * @type {AutoDisconnectFeature}
 * @extends shaka.ui.Element
 */
const AutoDisconnectFeature = class extends shaka.ui.Element {


  /**
   * DRM session Timer Counter
   */
  sessionTimeoutCounter;

  /**
   * Notification Prompt Counter
   */
  promptTimeCounter;
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    this.autoDisconnectFeatureConfig_ = this.controls.getPlayer().auto_disconnect;

    this.notificationService_ = this.controls.getPlayer().playerNotificationService;

    this.eventManager.listen(this.player, 'loaded', () => {
      clearInterval(this.sessionTimeoutCounter);
      clearInterval(this.promptTimeCounter);
      this.sessionTimeoutCounter = null;
      this.promptTimeCounter = null
      this.sessionTimeoutCounter = setInterval(() => {
        const notificationConfig = {
          title: 'ALERT!!!',
          style: 'hexa-notification-info',
          // TODO localization
          message: this.autoDisconnectFeatureConfig_.promptMessage,
          actions: ['close', {
            btnName: this.autoDisconnectFeatureConfig_.promptBtnName,
            callback: () => {
              clearInterval(this.sessionTimeoutCounter);
              clearInterval(this.promptTimeCounter);
              this.promptTimeCounter = null
              const notifications = this.notificationService_.getActiveNotifications();
              if (notifications) {
                for (const notification of notifications) {
                  this.notificationService_.destroy(notification.id_);
                }
              }
            }
          }],
          seconds: this.autoDisconnectFeatureConfig_.promptTime
        };
        this.showPrompt(notificationConfig);
        clearInterval(this.sessionTimeoutCounter);
      }, this.autoDisconnectFeatureConfig_.sessionTimeout * 1000);
    });
  }

  /**
   * Toast Notification
   * @param notificationConfig
   */
  showPrompt(notificationConfig) {
    const loadNotificationEvent = new Event(NotificationService.LOAD_NOTIFICATION);
    loadNotificationEvent.notificationConfig = notificationConfig;
    this.controls.dispatchEvent(loadNotificationEvent);
    clearInterval(this.promptTimeCounter)
    this.promptTimeCounter = null
    this.promptTimeCounter = setInterval(async() => {
      await this.player.detach();
      clearInterval(this.sessionTimeoutCounter);
      clearInterval(this.promptTimeCounter);
      this.sessionTimeoutCounter = null;
      this.promptTimeCounter = null
    }, this.autoDisconnectFeatureConfig_.promptTime * 1000);
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {AutoDisconnectFeature.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
AutoDisconnectFeature.Factory = class {
  create(rootElement, controls) {
    return new AutoDisconnectFeature(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'auto_disconnect',
  new AutoDisconnectFeature.Factory());
