import {createButton, createHTMLElement} from '../util/domUtils';
import {NotificationService} from "./notificationService";

export class Notification {

  /**
   * Title of notification
   * @private
   */
  title_;

  /**
   * Css style of notification
   * @private
   */
  style_

  /**
   * Message of notification to be displayed.
   * @private
   */
  message_

  /**
   * Action of notification.
   * @private
   */
  actions_

  /**
   * Parent Container of Notification
   * @private
   */
  container_

  /**
   * Header Container of Notification
   * @private
   */
  header_

  /**
   * Body Container of Notification
   * @private
   */
  body_

  /**
   * Notifications Container from Notification service
   * @private
   */
  serviceContainer_

  /**
   * Close Button
   * @private
   */
  closeButton_

  /**
   * Notification ID
   * @private
   */
  id_

  /**
   *
   * @param title
   * @param style
   * @param message
   * @param actions
   * @param notificationsContainer
   */
  constructor(title, style, message, actions = [], notificationsContainer) {

    this.title_ = title;

    this.style_ = style;

    this.message_ = message;

    this.actions_ = actions;

    this.serviceContainer_ = notificationsContainer;

    this.id_ = Date.now();

  }

  createTemplate() {
    this.container_ = createHTMLElement('div');
    this.container_.classList.add('hexa-notification');
    this.container_.id = this.id_;
    this.container_.classList.add('hexa-notification-position');
    this.container_.classList.add(`${this.style_}`)
    this.createNotificationHeader();
    this.createNotificationBody();
    this.addEventListeners();
    return this.container_
  }

  createNotificationHeader() {
    this.header_ = createHTMLElement('div');
    this.header_.classList.add('hexa-notification-header');
    const html = `
      <strong class="hexa-notification-message-type">${this.title_}</strong>
      <button type="button" class="hexa-notification-close-button" aria-label="Close Toast Notification">
        <span aria-hidden="true">&times;</span>
      </button>
    `;
    this.header_.insertAdjacentHTML('afterbegin', html);
    this.container_.appendChild(this.header_)
  }

  createNotificationBody() {
    this.body_ = createHTMLElement('div');
    this.body_.classList.add('hexa-notification-body');
    this.body_.textContent = this.message_;
    this.container_.appendChild(this.body_)
    this.createButtonsContainer()
  }

  createButtonsContainer() {
    this.buttonsContainer_ = createHTMLElement('div');
    this.buttonsContainer_.classList.add('hexa-notification-buttons-container');
    this.body_.appendChild(this.buttonsContainer_)
  }

  /**
   *
   * @param {string} customButtonName
   * @param {function} callBack
   */
  createCustomButton(customButtonName, callBack) {
    const customButton = createButton();
    customButton.classList.add(`hexa-notification-button`)
    customButton.title = `${customButtonName}`;
    customButton.textContent = `${customButtonName}`;
    customButton.ariaLabel = `${customButtonName}`;
    customButton.addEventListener('click', () => {
      callBack()
    })
    this.buttonsContainer_.appendChild(customButton)
  }


  onClose() {
    const closeNotificationEvent = new Event(NotificationService.CLOSE)
    closeNotificationEvent.id = this.id_;
    this.serviceContainer_.dispatchEvent(closeNotificationEvent)
  }

  getNotificationId () {
    return this.id_;
  }

  addEventListeners() {
    this.closeButton_ = this.header_?.children[1]
    if (this.actions_.find(el => el === 'close')) {
      this.closeButton_.style.display = 'block'
      this.closeButton_.addEventListener('click', () => {
        this.onClose()
      }, true)
    }
  }
}
