import { createHTMLElement } from '../util/domUtils';
import {Notification} from "./notification";

export class NotificationService {

    static CLOSE = 'notification_close';

    //Notification
    static LOAD_NOTIFICATION = 'loadNotification';
    static NOTIFICATION_LOADED = 'NotificationLoad_success';

    /**
     * List of Notifications Container
     * @private
     */
    notificationsContainer_;

    /**
     * Notifications []
     * @private
     */
    notifications_;

    /**
     * HPlayer video container
     * @private
     */
    videoContainer_

    /**
     * HPlayer controls
     * @private
     */
    controls_

    /**
     *
     * @param controls
     */
    constructor(controls) {
        /**
         *
         * @private
         */
        this.controls_ = controls;

        this.videoContainer_ = this.controls_.getVideoContainer();

        this.notifications_ = [];

        this.createNotificationsContainer()

        this.controls_.addEventListener(NotificationService.LOAD_NOTIFICATION, (event) => {
            const notificationConfig = event.notificationConfig;
            const actions = notificationConfig.actions ?? null;
            const notification = new Notification(event.notificationConfig.title,
                event.notificationConfig.style,
                event.notificationConfig.message,
                event.notificationConfig.actions,
                this.notificationsContainer_)
            const notificationElement = notification.createTemplate();
            if (actions !== null && actions.length > 1) {
                const actions = event.notificationConfig.actions.filter((e) => e !== 'close')
                for (const customAction of actions) {
                    notification.createCustomButton(customAction.btnName, customAction.callback)
                }
            }
            this.notifications_.push(notification) // list of notification created
            this.notificationsContainer_.appendChild(notificationElement); // on append display remove display none
            this.notificationLoaded(event.notificationConfig);
            // If seconds are configured
            if (event.notificationConfig?.seconds) {
                setTimeout(() => {
                    this.destroy(notification.getNotificationId())
                },event.notificationConfig?.seconds * 1000)
            }
        });

        this.notificationsContainer_.addEventListener(NotificationService.CLOSE, (event) => {
            this.destroy(event.id)
        })
    }

    createNotificationsContainer() {
        this.notificationsContainer_ = createHTMLElement('div');
        this.notificationsContainer_.classList.add('hexa-notifications-container');
        this.videoContainer_.appendChild(this.notificationsContainer_);
    }

    /**
     * Dispatch NOTIFICATION_LOADED event when notification is created.
     */
    notificationLoaded(config) {
        const notificationLoadedEvent = new Event(NotificationService.NOTIFICATION_LOADED)
        notificationLoadedEvent.notificationConfig = {
            title: config.title,
            style: config.style,
            message: config.message,
            actions: config.actions,
            seconds: config.seconds
        };
        this.controls_.dispatchEvent(notificationLoadedEvent)
    }

    destroy(notificationId) {
        for (const [index , value] of this.notifications_.entries()) {
            if (value.id_ === notificationId) {
                this.notificationsContainer_.removeChild(value.container_)
                this.notifications_.splice(index,1)
            }
        }
    }

    getActiveNotifications() {
        return this.notifications_
    }
}
