import { createHTMLElement } from '../util/domUtils';
import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import { NotificationService } from '../notification/notificationService';
/**
 * This is a ManageAlerts feature will be used to push and display the alerts in the video player if any new content has been available.
 * @type {ManageAlerts}
 */
const ManageAlerts = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    this.manageAlertData = this.controls.getPlayer().manage_alerts;

    // wrap the div element outside the container
    this.wrapper = createHTMLElement('div');
    this.wrapper.classList.add('hexa-notification-wrapper');

    // Notification container
    this.notificationContainer = createHTMLElement('div');
    this.notificationContainer.classList.add('notification-container');
    this.notificationContainer.classList.add('hexa-destroy');
    this.wrapper.appendChild(this.notificationContainer);

    // label
    this.alertLabel = createHTMLElement('span');
    this.alertLabel.classList.add('hexa-alert-label');
    this.notificationContainer.append(this.alertLabel);
    this.parent.appendChild(this.wrapper);

    this.eventsource = null;
    this.events = [];

    // Listen for clicks on the label to play the video
    this.eventManager.listen(this.player, 'loaded', () => {
      this.subscribe();
    });
  }

  subscribe() {
    const url = this.getUrl(this.manageAlertData.serverUrl, this.manageAlertData.topics);

    this.eventSource = this.getEventSource(url);
    this.eventSource.onopen = event => {
      if (event) { this.events.push(event); }
    };
    this.eventSource.onmessage = event => {
      event.preventDefault();
      this.displayNotification(event.data);
      /* const destroyNotification = setInterval(() => {
        this.destroyNotification();
        clearInterval(destroyNotification);
      }, this.manageAlertData.onScreenTime * 1000); */
    };
  }

  getEventSource(url) {
    return new EventSource(url, { withCredentials: true });
  }

  getUrl(hubUrl, topics) {
    const url = new URL(hubUrl);
    topics.forEach(topic => url.searchParams.append('topic', topic));
    return url.toString();
  }

  displayNotification(data) {
    data = JSON.parse(data);
    const notificationConfig = {
      title: 'New Video Alert',
      style: 'hexa-notification-info',
      message: data.message,
      actions: ['close'],
      seconds: 10
    };
    this.showManageAlertNotification(notificationConfig);
    /* this.alertLabel.textContent = data.message;
    this.notificationContainer.classList.add('hexa-display');
    this.notificationContainer.classList.remove('hexa-destroy'); */
  }

  destroyNotification() {
    this.notificationContainer.classList.add('hexa-destroy');
    this.notificationContainer.classList.remove('hexa-display');
  }

  /**
   * Toast Notification
   * @param notificationConfig
   */
  showManageAlertNotification(notificationConfig) {
    const loadNotificationEvent = new Event(NotificationService.LOAD_NOTIFICATION);
    loadNotificationEvent.notificationConfig = notificationConfig;
    this.controls.dispatchEvent(loadNotificationEvent);
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ManageAlerts.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */

ManageAlerts.Factory = class {
  create(rootElement, controls) {
    return new ManageAlerts(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'manage_alerts',
  new ManageAlerts.Factory());
