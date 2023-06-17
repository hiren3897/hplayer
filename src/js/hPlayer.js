/*
* @licence Hiren Rathod
 */
import {
    applyFairplayEZDRMSettings,
    getDrmConfig,
    getDrmServer,
    getDrmServerNameForPayload,
    getFairPlayCert,
    selectStreamFormat
} from './drmConfigurations';
import shaka from '../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import '../../node_modules/@advanced-suite/front-shaka-player/dist/controls.css';
import '../scss/style.scss';
import {advancedFeatures, errors} from './const';
import {UAParser} from 'ua-parser-js';
import {
    checkPlatformDrmSupport,
    configureHlsFairplayCertificate,
    generateBackgroundImageURL,
    getErrorMessage,
    getUrlExtension,
    mergeDeep,
    regexTest,
    setTooltipsDisplay
} from "./util/sharedUtils";
import {getPlayerPlatformThumbnailsConfig, loadPlayerPlatformPlugin} from "./plugins/playerPlatformPlugin";
import {NotificationService} from "./notification/notificationService";
import {ChapterService} from "./features/services/chapterService";
import {checkAdvanceFeatureConfig, getSourceInfo} from "./hPlayerService";
import {Localization} from "./localization";

/**
 * Hexaglobe Player Main Class.
 * It will implement all functions and methods to setup, configure the ui
 * and player configuration's and advance UI features customisation using player.json
 * @type {HPlayer}
 */
export default class HPlayer {

    static LOAD_ASSET = 'loadSource_';
    static ASSET_LOADED = 'loadSource_success';
    static HEXA_PLAYER_ERROR = 'hexa_player_error';
    static HEXA_PLAYER_GEO_BLOCKING_ERROR = 'hexa_player_geo_blocking_error';
    static LOAD_METADATA = 'loadmetadata';
    static METADATA_LOADED = 'loadmetadata_success';
    static OVERFLOW_MENU_OPEN = 'overflowmenuopen';

    /**
     *
     * @param {!HTMLVideoElement} videoElement
     * @param {!HTMLElement} videoContainerElement
     * @param {Object} options
     */
    constructor(videoElement, videoContainerElement, options) {
        // Install built-in polyfills to patch browser incompatibilities.
        shaka.polyfill.installAll();
        // Check to see if the browser supports the basic APIs Shaka needs.
        if (!shaka.Player.isBrowserSupported()) {
            console.error('Shaka Player does not support this browser. ' +
                'Please see https://tinyurl.com/y7s4j9tr for the list of ' +
                'supported browsers.');

            // After scanning the page for elements, fire a special "loaded" event for
            // when the load fails. This will allow the page to react to the failure.
            shaka.ui.Overlay.dispatchLoadedEvent_('shaka-ui-load-failed',
                shaka.ui.Overlay.FailReasonCode.NO_BROWSER_SUPPORT);
            return;
        }
        // "local" because it is for local playback only, as opposed to the player proxy
        // object, which will route your calls to the ChromeCast receiver as necessary.
        const localPlayer = new shaka.Player(videoElement);
        // "Overlay" because the UI will add DOM elements inside the container,
        // to visually overlay the video element
        this.ui_ = new shaka.ui.Overlay(localPlayer, videoContainerElement,
            videoElement);

        /**
         *
         * @public {?shaka.ui.Controls}
         */
        this.controls_ = this.ui_.getControls();

        /**
         * @public {!HTMLMediaElement}
         */
        this.video_ = this.controls_.getVideo();

        /**
         * @public {shaka.Player}
         *
         */
        this.player_ = this.controls_.getPlayer();

        /**
         * Shaka Player version
         * @type {string}
         */
        this.player_.shakaVersion = shaka.Player.version;

        /**
         * Hexa-Player version
         * @type {string}
         */
        this.player_.hexaPlayerVersion = process.env.VERSION;
        /**
         * Load Source Asset
         * @type {null}
         * @private
         */
        this.loadSourceAsset_ = null;

        /**
         * Custom options for HexaPlayer
         * @type {Object}
         * @public
         */
        this.options_ = {...options};

        /**
         * Configure the video metadata
         * @type {{}}
         * @private
         */
        this.videoMetadata_ = this.options_.video_metadata ?? {};

        this.localization_  = null;

        this.controlsButtonPanel_ = null;

        this.noUrlExtension = false;

        this.controls_.addEventListener(HPlayer.LOAD_ASSET, (event) => {
            this.loadSource_(event.asset);
        });

        document.addEventListener(HPlayer.LOAD_METADATA, (event) => {
            this.setVideoMetaData(event.videoMetaData)
        })

        this.notificationService = new NotificationService(this.controls_)
        /**
         * Attaching notification service to be used by all features
         * @type {NotificationService}
         */
        this.controls_.getPlayer().playerNotificationService = this.notificationService;

    }

    /**
     * @function
     * Setting up the shaka player with customised UI
     * @return {Promise<void>}
     */
    init_() {

        this.configureUI_();
        this.configurePlayer_();
        this.controls_.addEventListener('error', this.onUIErrorEvent_);
        this.player_.addEventListener('error', this.onPlayerErrorEvent_);

        this.loadSource_(this.options_.basic);

        this.localization_  = new Localization(this.controls_);

        // Handle the PIP mode for multiple PIP request triggered from many players.
        this.controls_.getLocalVideo().addEventListener('leavepictureinpicture', () => {
            this.onExitPipDestroyPlayer_()
        })

        this.iOSForceFullscreenButtonToUseWebKitFullScreen()

        // because it needs the player to setup first and then we dispatch the event
        setTimeout(() => {
            if (Object.entries(this.videoMetadata_).length > 0) {
                const loadVideoMetadata = new Event(HPlayer.LOAD_METADATA);
                loadVideoMetadata.videoMetaData = this.videoMetadata_;
                document.dispatchEvent(loadVideoMetadata);
            }
        }, 500)

        // Get the control button panel container
        this.controlsButtonPanel_ = this.controls_.getControlsContainer().querySelector('.shaka-controls-button-panel');

        if (this.controls_.getConfig().enableTooltips) {
            this.onOverflowMenuOpenHandler()
        }
    }

    /**
     * @function
     * @description - This function will be used to customised the UI of the player
     * with default OR our customised feature's
     */
    async configureUI_() {
        // get default UI configurations
        let uiConfiguration = {
            ...this.ui_.getConfiguration(),
            ...this.options_.ui_configuration
        };

        if (this.options_?.hexa_configurations?.player_platform) {
            const thumbnailsConfig =  await getPlayerPlatformThumbnailsConfig(this.options_.basic, this.options_?.hexa_configurations?.player_platform);
            if (typeof (thumbnailsConfig.data.webVttInfo.url) !== 'undefined') {
                this.options_.advanced_features.push(thumbnailsConfig)
            }
        }

        if (this.options_?.advanced_features) {
            // Chapter's VOD base seekBar configuration.
            if (this.options_.advanced_features.find(el => el.name === 'chapters_vod')) {
                const chapterConfig = this.options_.advanced_features.find(el => el.name === 'chapters_vod').data;
                uiConfiguration.seekBarColors = {
                    base: chapterConfig.seekBarColors?.base ?? 'transparent',
                    buffered: chapterConfig.seekBarColors?.buffered ?? 'transparent',
                    played: chapterConfig.seekBarColors?.played ?? 'transparent'
                };
            } else {
                uiConfiguration.seekBarColors = {
                    base: 'rgba(255, 255, 255, 0.3)',
                    buffered: 'rgba(255, 255, 255, 0.54)',
                    played: 'rgb(255, 255, 255)',
                };
            }

            // Chapter's Live base seekBar configuration.
            if (this.options_.advanced_features.find(el => el.name === 'chapters_live')) {
                const chapterConfig = this.options_.advanced_features.find(el => el.name === 'chapters_live')?.data;
                const defaultSeekBarColors = {
                    base: 'rgba(178,174,174,0.62)',
                    buffered: 'rgba(117,115,115,0.7)',
                    played: '#ffffff'
                }
                uiConfiguration.seekBarColors = {
                    base: chapterConfig.seekBarColors?.base ?? defaultSeekBarColors.base,
                    buffered: chapterConfig.seekBarColors?.buffered ?? defaultSeekBarColors.buffered,
                    played: chapterConfig.seekBarColors?.played ?? defaultSeekBarColors.played
                };
            }
        }

        // A fix for loadAsset bug
        // ERROR: TypeError: undefined is not an object (evaluating 'e.g.textContent=e.localization.resolve("AUTO_QUALITY")')
        const ua = (new UAParser()).getResult();
        if (ua.os.name === 'iOS' || ua.os.name === 'Mac OS' && ua.browser.name === 'Safari' && parseFloat(ua.browser.version) >= 12.1) {
            const qualityFeatureIndex = uiConfiguration.overflowMenuButtons.indexOf('quality')
            uiConfiguration.overflowMenuButtons.splice(qualityFeatureIndex, 1)
        }

        // configure if the advanced features have been configured by the client
        if (this.options_.advanced_features) {
            for (const [i, feature] of this.options_.advanced_features.entries()) {
                // if feature config flag returns to true we configure the feature else an error is displayed in the console.
                const featureConfigFlag = checkAdvanceFeatureConfig(feature, this.options_?.basic.chaptersData ?? null);
                if (feature?.visible && featureConfigFlag) {
                    const position = feature?.position ? feature.position : 2;
                    this.controls_.getPlayer()[`${feature.name}`] = feature.data;
                    this.configureAdvanceFeatures(feature);
                    uiConfiguration.controlPanelElements.splice(position, 0, feature.name);
                }
            }
        }

        // Expose full options object to the custom Element/feature
        this.controls_.options = this.options_;

        this.ui_.configure(uiConfiguration);
    }

    /**
     * Removes all source features if configured
     */
    removeSourceFeatures() {
        const features = ['playlist', 'express_mode', 'popup_list',
            'custom_popup_list', 'switch_channels', 'redirect',
            'chapters_vod', 'subtitles', 'image_overlay', 'thumbnail_track_vod', 'thumbnail_track_live', 'auto_disconnect', 'tags']
        for (const feature of features) {
            this.destroyAdvanceFeatures(feature);
        }
    }

    /**
     * Destroy all advanced feature before LOAD_ASSET Event is dispatched.
     * Removes the feature config from this.options_.advanced_features to prevent from double configuration.
     */
    destroyAdvanceFeatures(featureName) {
        // source feature
        const features = ['playlist', 'express_mode', 'popup_list',
            'custom_popup_list', 'switch_channels', 'redirect',
            'chapters_vod','chapters_live', 'subtitles', 'image_overlay', 'thumbnail_track_vod', 'thumbnail_track_live', 'auto_disconnect', 'tags']

        const uiConfiguration = this.ui_.getConfiguration()
        if (uiConfiguration.controlPanelElements.includes(featureName)) {
            const featureIndex = uiConfiguration.controlPanelElements.indexOf(featureName)
            uiConfiguration.controlPanelElements.splice(featureIndex, 1);
        }

        if (this.options_.advanced_features) {
            if (features.includes(featureName)) {
                this.options_.advanced_features = this.options_.advanced_features.filter(oldFeature => oldFeature.name !== featureName)
            }
        }

        if (this.options_?.advanced_features) {
            if (this.options_?.advanced_features.find(el => el.name === 'thumbnail_track_live')) {
                const featureIndex = uiConfiguration.controlPanelElements.indexOf('thumbnail_track_vod')
                if (featureIndex === -1) {
                    return
                }
                uiConfiguration.controlPanelElements.splice(featureIndex, 1);
            } else if (this.options_?.advanced_features.find(el => el.name === 'thumbnail_track_vod')) {
                const featureIndex = uiConfiguration.controlPanelElements.indexOf('thumbnail_track_live')
                if (featureIndex === -1) {
                    return
                }
                uiConfiguration.controlPanelElements.splice(featureIndex, 1);
            }
        }
        this.ui_.configure(uiConfiguration);
    }

    /**
     * Re-configure the ui with properties modifications
     * @param config {shaka.extern.UIConfiguration}
     */
    reConfigureUI(config) {
        this.ui_.configure(config);
    }

    /**
     * @function
     * @description - this function will be used to configure the player for example: DRM configurations and all
     *
     */
    configurePlayer_() {
        // configuring the client desired configuration in the player config from options.
        if (this.options_.player_configurations) {
            this.player_.resetConfiguration();
            this.player_.configure(this.options_.player_configurations);
        }
    }

    /**
     * Configure AND import the feature script before configuring it in the shaka-player
     * @function
     * @description - it takes the feature and import it using require() statement
     * in the class before loading and configuring the shaka-player UI.
     * @param {Object} feature - advanced feature data to be configured
     */
    configureAdvanceFeatures(feature) {
        if (advancedFeatures[feature.name]) {
            require(`./features/${advancedFeatures[feature.name]}`);
        }
    }

    /**
     * this function will be used to set up the DRM configuration if the content is protected.
     *
     */
    async drmConfigurations_(assets) {
        const supportedDrmType = selectStreamFormat();
        // to configure the player
        return await getDrmConfig(supportedDrmType.drmType, assets?.drm_licence);
    }

    async fairplayServerCertConfig_(assets) {
        const supportedDrmType = selectStreamFormat();
        // configure the hlsfairplay certificate id Client is usign hlsfairplay
        if (supportedDrmType.drmType === 'hlsfairplay') {
            return await getFairPlayCert(assets.serverCertificate)
        }
    }

    /**
     * Reconfigure and load the player with new configurations.
     * @param options - hexaglobe player options.
     */
    loadAssets_(options) {
        if (!options.basic?.source) {
            console.error('No source configuration found.')
            return
        }

        this.options_ = mergeDeep(this.options_, options)

        if (!options.advanced_features) {
            this.removeSourceFeatures();
        } else {
            // because we need to destroy both source and non-source feature to prevent double configuration,
            // the non-source feature will be destroyed and reconfigured because it still stays in this.options_.advanced_features
            if (this.options_?.advanced_features) {
                for (const [i, feature] of this.options_?.advanced_features.entries()) {
                    this.destroyAdvanceFeatures(feature.name)
                }
                this.options_.advanced_features = [
                    ...this.options_.advanced_features,
                    ...options.advanced_features
                ].reverse().reduce((acc, current) => { // compare and remove if old non-source feature from merged array
                    const oldNonSourceFeature = acc.find(feature => feature.name === current.name);
                    if (!oldNonSourceFeature) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                this.configureUI_();
            } else {
                this.options_.advanced_features = options.advanced_features
                this.configureUI_()
            }

        }

        if (options.player_configurations) {
            this.options_.player_configurations = options.player_configurations
            this.configurePlayer_()
        }

        // destroy all active notifications on video change.
        const notifications = this.notificationService.getActiveNotifications()
        if (notifications) {
            for (const notification of notifications) {
                this.notificationService.destroy(notification.id_)
            }
        }

        if (options.basic) {
            this.loadSource_(options.basic);
        }

        // temp fix for iOS {it is resolved in v4.0}
        this.iOSForceFullscreenButtonToUseWebKitFullScreen()
    }

    /**
     * This function will be used to load video url in the player.
     */
    async loadSource_(asset) {
        if (!asset) {
            return;
        }

        if (asset.drm_licence && asset.drm_licence !== "undefined") {
            const playerConfig = this.player_.getConfiguration();
            playerConfig.drm.servers = await this.drmConfigurations_(asset);
            this.player_.configure(playerConfig);
        }

        if (asset.serverCertificate && asset.drm_licence !== "undefined") {
            const playerConfig = this.player_.getConfiguration();
            let fairplayCertUint8 = await this.fairplayServerCertConfig_(asset)
            playerConfig.drm = {
                advanced: {
                    "com.apple.fps.1_0": {
                        serverCertificate: fairplayCertUint8,
                        'videoRobustness': 'SW_SECURE_CRYPTO',
                        'audioRobustness': 'SW_SECURE_CRYPTO',
                    }
                }
            }
            this.player_.configure(playerConfig);
            if (regexTest('ezdrm', asset.drm_licence)) {
                applyFairplayEZDRMSettings(this.player_)
            }
        }

        // Update options on asset change
        this.options_.basic = {...asset};

        /**
         * Fixme have a default poster with hexaglobe player branding.
         * If no poster is set in options or directly on the video element.
         */
        if (asset.poster) {
            this.video_.setAttribute('poster', asset.poster);
        }

        if (asset.source) {

            // If no url extension is provided in the source url
            // then it applies to be classic http url to be played
            // example: source: http://example.m3u8 => noUrlExtension = false // DEFAULT
            // example: source: http://example/stream => noUrlExtension = true
            this.noUrlExtension = asset.noUrlExtension ??  false

            // fix for live flux change playbackRaye on loadAsset Trigger
            if (this.player_.getPlaybackRate() !== 1) {
                this.video_.defaultPlaybackRate = 1;
            }

            // In case where stream_info is configured and livePlugin is not activated.
            const sourceExtension = getUrlExtension(asset.source);
            if (sourceExtension === 'php' && !asset.livePlugin && this.noUrlExtension === false) {
                console.error('Live Plugin not activated. Please configure "livePlugin: true" in player configuration.')
                return
            }
            if (asset.livePlugin && asset.livePlugin !== 'undefined' || undefined) {
                this.loadSourceAsset_ = await getSourceInfo(this.options_.basic)
                /**
                 * Geo-blocking Notification message to the player
                 * @type {*}
                 */
                if (this.loadSourceAsset_?.geoBlockingStatusCode) {
                    const errorMessage = getErrorMessage(this.loadSourceAsset_?.geoBlockingStatusCode);
                    const loadNotificationEvent = new Event(NotificationService.LOAD_NOTIFICATION);
                    loadNotificationEvent.notificationConfig = {
                        title: 'ERROR',
                        style: 'hexa-notification-error',
                        message: `${errorMessage}`,
                    };
                    this.controls_.dispatchEvent(loadNotificationEvent);

                    //Geo blocking event
                    const hexaPlayerGeoBlockingErrorEvent = new Event(HPlayer.HEXA_PLAYER_GEO_BLOCKING_ERROR);
                    hexaPlayerGeoBlockingErrorEvent.code = this.loadSourceAsset_?.geoBlockingStatusCode;
                    hexaPlayerGeoBlockingErrorEvent.message = errorMessage;
                    hexaPlayerGeoBlockingErrorEvent.ipAddress = this.loadSourceAsset_?.msg
                    this.controls_.dispatchEvent(hexaPlayerGeoBlockingErrorEvent);
                    return
                }

                // else continue the player configurations
                const supportedDrm = selectStreamFormat();
                const drmServerName = getDrmServerNameForPayload();
                if (supportedDrm.drmType === 'hlsfairplay') {
                    await configureHlsFairplayCertificate(this.player_, this.loadSourceAsset_?.primary_cert ?? '');
                    if (regexTest('ezdrm', this.loadSourceAsset_?.primary_drm)) {
                        applyFairplayEZDRMSettings(this.player_)
                    }
                }
                const playerConfig = this.player_.getConfiguration();
                playerConfig.drm = {
                    servers: getDrmServer(drmServerName, this.loadSourceAsset_?.primary_drm ? this.loadSourceAsset_.primary_drm : this.loadSourceAsset_?.backup_drm ?? '')
                };
                await this.player_.configure(playerConfig);

            } else if (asset.source.startsWith('player-platform')) {
                this.loadSourceAsset_ = await loadPlayerPlatformPlugin(this.options_.basic,  this.options_.hexa_configurations.player_platform)
            } else {
                this.loadSourceAsset_ = asset;
            }

            // Handling too many LOAD_INTERRUPTED #7000
            try {
                if (!checkPlatformDrmSupport(this.loadSourceAsset_?.source, this.options_)) {
                    let message;
                    if (this.options_.basic?.drmProtected) {
                        message = 'DRM Error: playback type is not supported on this platform';
                    } else {
                        message = 'Video playback type is not supported on this platform';
                    }
                    this.showErrorNotification(message)
                    return;
                }
                await this.player_.load(this.loadSourceAsset_?.source);
            } catch (e) {
                if (e.code === 7000) {
                    // skipping // Handling too many LOAD_INTERRUPTED #7000
                    e.message = Object.entries(errors).find((o) => o[1] === 7000)[0];
                } else {
                    for (const [key, value] of Object.entries(errors)) {
                        if (value === e.code) {
                            e.message  = key
                        }
                    }
                    const hexaPlayerErrorEvent = new Event(HPlayer.HEXA_PLAYER_ERROR);
                    hexaPlayerErrorEvent.code = e.code;
                    hexaPlayerErrorEvent.message = e.message;
                    this.controls_.dispatchEvent(hexaPlayerErrorEvent);
                    this.showErrorNotification(e.code + ": " + e.message)
                }
            }
            const assetLoadedEvent = new Event(HPlayer.ASSET_LOADED);
            assetLoadedEvent.asset = asset;
            this.controls_.dispatchEvent(assetLoadedEvent);
            this.localization_.setLocale();
            return;
        }
        this.showErrorNotification('No asset configuration found.')
        // throw new Error(`No asset configuration found.`);
    }

    /**
     * Specific Function to update the popup list avatar data's
     * Accepts the list of data and update the list dynamically from outside the player.
     * @param data - List of avatar data
     */
    refreshPopupList(data) {
        const popupListChildes = document.querySelectorAll('.popup-list-container > .popup-list--row')
        const popupListContainer = document.querySelector('.popup-list-container')
        if (popupListContainer && popupListChildes) {
            for (const child of popupListChildes) {
                popupListContainer.removeChild(child)
            }
            for (const [i, player] of data.entries()) {
                let html = `
                  <div class="popup-list--row">
                      <div class="popup-list--index">${i + 1}</div>
                        <img src="${player.avatar_url ?? ''}" alt="avatar image">
                        <div class="popup-list--data">
                            <h3>${player.title}</h3>
                            <p class="popup-list-avatar--desc">${player.description ?? ''}</p>
                        </div>
                 </div>
                `;

                popupListContainer.insertAdjacentHTML('beforeend', html);
            }
        }
    }

    /**
     * Image Overlay Feature
     * Updates the image in the container.
     * @param images[]
     */
    updateOverlayImage(images) {
        const imageContainer = this.controls_.getPlayer()?.image_overlay_container;
        const backgroundImageURL = generateBackgroundImageURL(images)
        if (imageContainer) {
            imageContainer.style.backgroundImage = backgroundImageURL.join(',');
        }
    }

    /**
     * Image Overlay Feature
     * Clears the image in the container.
     */
    clearOverlayImage() {
        const imageContainer = this.controls_.getPlayer()?.image_overlay_container;
        if (imageContainer) {
            imageContainer.style.backgroundImage = '';
        }
    }


    /**
     * @param {!Event} event
     * @private
     */
    onErrorEvent_(event) {
        // This event should be shaka.Player.ErrorEvent
        this.onError_(event.detail);
    }

    onError_(error) {
        console.error('Error code', error.code, 'object', error);
        this.showErrorNotification(error)
    }

    onPlayerErrorEvent_(event) {
        // Extract the shaka.util.Error object from the event.
        this.onPlayerError_(event.detail);
    }

    onPlayerError_(error) {
        // Handle player error
        console.error('Error code', error.code, 'object', error);
        const hexaPlayerErrorEvent = new Event(HPlayer.HEXA_PLAYER_ERROR);
        hexaPlayerErrorEvent.code = error.code;
        for (const [key, value] of Object.entries(errors)) {
            if (value === error.code) {
                error.message  = key
            }
        }
        hexaPlayerErrorEvent.message = error.message;
        hexaPlayerErrorEvent.object = error;
        this.controls_.dispatchEvent(hexaPlayerErrorEvent);
    }

    onUIErrorEvent_(event) {
        // Extract the shaka.util.Error object from the event.
        this.onPlayerError_(event.detail);
    }

    onExitPipDestroyPlayer_() {
        if (!this.player_.getMediaElement().isConnected) {
            this.player_.destroy();
        }
    }

    initFailed(errorEvent) {
        // Handle the failure to load; errorEvent.detail.reasonCode has a
        // shaka.ui.FailReasonCode describing why.
        console.error('Unable to load the UI library!');
    }

    /**
     * mute video
     */
    mute() {
        this.video_.muted = true;
    }

    /**
     * unmute video
     */
    unmute() {
        this.video_.muted = false;
    }

    /**
     * Hide UI controls
     */
    hideUiControls() {
        this.manageControlsOfPlayer('none', 'none')
    }

    /**
     * show UI controls
     */
    showUiControls() {
        this.manageControlsOfPlayer('all', 'block')
    }

    manageControlsOfPlayer(pointerEvents, display) {
        const shakaControlsContainer = this.controls_.getControlsContainer();
        const shakaBottomControl = shakaControlsContainer.querySelector('.shaka-bottom-controls');
        shakaControlsContainer.style.pointerEvents = `${pointerEvents}`;
        shakaBottomControl.style.display = `${display}`;
    };

    /**
     * Set video quality to auto.
     */
    setAutoQuality() {
        this.player_.configure({
            abr: {
                enabled: true
            }
        });
    };

    /**
     * Set your video to highest quality.
     * @param qualityVariantIndex - default = 0 (highest from the VariantTracksArray)
     * @param clearBuffer
     */
    setHighQualityResolution(qualityVariantIndex = 0, clearBuffer = false) {
        const tracks = this.player_.getVariantTracks();
        this.player_.configure({
            abr: {
                enabled: false
            }
        });
        this.player_.selectVariantTrack(tracks[qualityVariantIndex], clearBuffer);
    }

    /**
     * Set your video to lowest quality.
     * @param qualityVariantIndex - default = null (lowest i.e. (tracks.length - 1) from the VariantTracksArray)
     * @param clearBuffer
     */
    setLowQualityResolution(qualityVariantIndex = undefined, clearBuffer = false) {
        const tracks = this.player_.getVariantTracks();
        //taking lowest quality
        const lowestQuality = tracks.length - 1;
        this.player_.configure({
            abr: {
                enabled: false
            }
        });
        this.player_.selectVariantTrack(tracks[qualityVariantIndex ?? lowestQuality], clearBuffer);
    }

    /**
     * Change Button tooltip.
     * @param buttonClassName
     * @param textContent
     */
    changeButtonTooltipContext(buttonClassName, textContent) {
        const toolTipElement = document.querySelector(`.${buttonClassName}`);
        if (toolTipElement) {
            toolTipElement.setAttributeNS(null, 'aria-label', textContent)
        } else {
            throw new Error('Configure the correct button classname')
        }
    }

    /**
     * On exitfullscreen in iOS safari browser adds a trick play continuity of the video
     */
    iOSTrickPlayVideoOnExitFullScreenMode() {
        this.controls_.getLocalVideo().addEventListener("webkitendfullscreen", () => {
            setTimeout(() => {
                if (this.video_.paused) {
                    this.video_.play();
                }
            }, 460); // 460 minimum edge require to exit fullScreenMode and trickPlay the video of paused
        }, false);
    }

    /**
     * Only For iOS
     * Force Fullscreen button to use webkitEnterFullscreen.
     */
    iOSForceFullscreenButtonToUseWebKitFullScreen() {
        const ua = (new UAParser()).getResult();
        if (ua.os.name === 'iOS' && parseFloat(ua.browser.version) >= 12.1) {
            const iOSFullScreenButton = this.controls_.getControlsContainer().querySelector('.shaka-fullscreen-button')
            iOSFullScreenButton.onclick = () => {
                this.video_.webkitEnterFullscreen();
            }
            this.iOSTrickPlayVideoOnExitFullScreenMode();
        }
    }

    showNotification(notificationConfig) {
        const loadNotificationEvent = new Event(NotificationService.LOAD_NOTIFICATION);
        loadNotificationEvent.notificationConfig = notificationConfig;
        this.controls_.dispatchEvent(loadNotificationEvent);
    }

    showErrorNotification(errorMessage) {
        this.notificationConfig_ = {
            title: 'ERROR',
            style: 'hexa-notification-error',
            message: errorMessage,
            actions: ['close']
        }
        this.showNotification(this.notificationConfig_)
    }

    /**
     * Updates the live chapters on the timeline.
     * @param chapters
     * @param keepOldChapter
     */
    updateLiveChapters(chapters, keepOldChapter = true) {
        if (!chapters) {
            console.error('No chapters provided to update.')
        }

        const updateChaptersEvent = new Event(ChapterService.UPDATE_CHAPTERS);
        updateChaptersEvent.chapters = chapters;
        updateChaptersEvent.keepOldChapters = keepOldChapter;
        this.controls_.dispatchEvent(updateChaptersEvent);
    }

    /**
     * Set the minBandwidth and maxBandwidth in ABR (Adaptive Bitrate Streaming).
     * Auto Resolution Management.
     * @param minBandwidth - The minimum bandwidth of a variant track, in bit/sec.
     * @param maxBandwidth - The maximum bandwidth of a variant track, in bit/sec.
     * @param bandwidthUpgradeTarget - The fraction of the estimated bandwidth which we should try to use when upgrading.
     * @param bandwidthDowngradeTarget - The largest fraction of the estimated bandwidth we should use. We should downgrade to avoid this.
     * @param switchInterval - The minimum amount of time that must pass between switches, in seconds. This keeps us from changing too often and annoying the user.
     */
    setPlayerAbrResolutionRange(minBandwidth = Infinity,
                                maxBandwidth = Infinity,
                                bandwidthUpgradeTarget = 0.85,
                                bandwidthDowngradeTarget = 0.95,
                                switchInterval = 8) {
        this.player_.configure({
            abr: {
                bandwidthUpgradeTarget: bandwidthUpgradeTarget,
                bandwidthDowngradeTarget: bandwidthDowngradeTarget,
                restrictions: {
                    minBandwidth: minBandwidth,
                    maxBandwidth: maxBandwidth
                },
                switchInterval: switchInterval
            }
        });
    }

    /**
     * Set the minBandwidth and maxBandwidth range in the player resolution menu.
     * @param minBandwidth
     * @param maxBandwidth
     */
    setPlayerResolutionRange(minBandwidth = Infinity, maxBandwidth = Infinity) {
        this.player_.configure({
            restrictions: {
                minBandwidth: minBandwidth,
                maxBandwidth: maxBandwidth
            }
        });
    }

    /**
     *
     * @return {boolean|*}
     */
    isFullScreenEnabled() {
        if (document.fullscreenEnabled) {
            return !document.fullscreenElement;
        }
        const video = /** @type {HTMLVideoElement} */(this.controls_.getLocalVideo());
        if (video.webkitSupportsFullscreen) {
            return video.webkitDisplayingFullscreen;
        }
        return false;
    }

    /**
     * @return {boolean}
     */
    isFullScreenSupported() {
        if (document.fullscreenEnabled) {
            return true;
        }
        const video = /** @type {HTMLVideoElement} */(this.controls_.getLocalVideo());
        if (video.webkitSupportsFullscreen) {
            return true;
        }
        return false;
    }


    /**
     * Get any control panel buttons
     * @param classname
     * @return {Element}
     */
    getControlPanelButtons(classname) {
        return this.controls_.getControlsContainer().querySelector(`.${classname}`)
    }

    /**
     * Get active chapter.
     * @return {*}
     */
    getActiveChapter() {
        if (typeof this.controls_.getPlayer()?.activeChapter === 'undefined') {
            console.warn('No current active chapter found...')
            return {}
        }
        return this.controls_.getPlayer()?.activeChapter;
    }

    /**
     * Set Video MetaData
     * @param videoMetaData
     */
    setVideoMetaData(videoMetaData) {
        this.videoMetadata_ = videoMetaData;
        // Set video metadata success event dispatch
        const setVideoMetadataEventSuccess = new Event(HPlayer.METADATA_LOADED)
        setVideoMetadataEventSuccess.videoMetaData = videoMetaData;
        document.dispatchEvent(setVideoMetadataEventSuccess)
    }

    /**
     *
     * Handles the tooltips when overflow menu is open or close
     * if open - the tooltips are disabled
     * if close - the tooltips are enabled
     */
    onOverflowMenuOpenHandler() {
        this.controlsButtonPanel_.addEventListener('mousemove', () => {
            if (this.controls_.anySettingsMenusAreOpen()) {
                setTooltipsDisplay(this.controlsButtonPanel_, false)
            } else {
                setTooltipsDisplay(this.controlsButtonPanel_, true)
            }
        })
    }
}

