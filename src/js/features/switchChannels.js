import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import { returnDrmUrlWithSupportType } from '../drmConfigurations';
import { createHTMLElement } from '../util/domUtils';
import HexaglobePlayer from '../hexaPlayer';

/**
 * This is a Switch Channel feature that is used to switch live streaming channel's. This feature is mainly designed for Live player.
 * @type {SwitchChannel}
 * @extends {shaka.ui.Element} shaka.ui.Element
 */
const SwitchChannel = class extends shaka.ui.Element {
  /**
   *
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    // The switch channel config
    this.switchChannelConfig_ = this.controls.getPlayer().switch_channels;

    // The zapping container that holds all channel logo's
    this.switchChannelContainer_ = createHTMLElement('div');
    this.switchChannelContainer_.classList.add('switch-channel-container');

    // the main switch channel icon appearance
    this.channelIcon_ = createHTMLElement('div');
    this.channelIcon_.classList.add('switch-channel-dropdown');
    this.channelIcon_.classList.add('shaka-tooltip');
    this.channelIcon_.classList.add('channel-top-left');
    this.channelIcon_.style.background = 'rgba(243,33,106,0.85)';
    this.channelIcon_.setAttribute('data-i18n-aria-label-key', 'switch-channel-btn-title');

    // span element a child element of {this.channelIcon_}
    const spanIcon_ = createHTMLElement('span');
    spanIcon_.classList.add('hexa-player-icons');
    spanIcon_.classList.add('md-30');
    spanIcon_.textContent = 'switch_video';
    this.channelIcon_.appendChild(spanIcon_);
    this.switchChannelContainer_.appendChild(this.channelIcon_);

    // List of channels container that appears on hover.
    this.channelList_ = createHTMLElement('div');
    this.channelList_.classList.add('channel-dropdown_menu-to-right');
    this.channelList_.classList.add('hexa-dropdown_menu-1');
    this.switchChannelContainer_.appendChild(this.channelList_);
    this.parent.appendChild(this.switchChannelContainer_);

    // populate the switch channel container with the preferred UI
    if (this.switchChannelConfig_.ui === 'circle') {
      this.renderChannelList(this.switchChannelConfig_.channels);
    } else {
      this.renderDropDownLayout2(this.switchChannelConfig_.channels);
    }

    // A click event bind on each channel to play the contents on select
    const channelsList = this.channelList_.children;
    for (const channel of channelsList) {
      this.eventManager.listen(channel, 'click', async(e) => {
        const asset = {
          source: channel.getAttribute('data-source') ?? undefined,
          livePlugin: channel.getAttribute('data-livePlugin') ?? undefined,
          drmProtected: channel.getAttribute('data-drmProtected') ?? undefined,
          availableFormats: channel.getAttribute('data-availableFormats') ?? undefined,
          drm_licence: channel.getAttribute('data-drmLicence') ?? undefined,
          serverCertificate: channel.getAttribute('data-serverCertificate') ?? undefined,
        };
        // eslint-disable-next-line no-mixed-operators
        if (asset.livePlugin && asset.drmProtected && asset.availableFormats !== 'undefined' || undefined) {
          asset.livePlugin = true;
          asset.drmProtected = asset.drmProtected.includes('true');
          asset.availableFormats = asset.availableFormats.split(',');
        }
        if (this.switchChannelConfig_.ui === 'circle') {
          document.querySelectorAll('.hexa-dropdown_menu-1 > *')?.forEach(e => e.classList.remove('switch-channel-active-circle'));
          e?.target.classList.add('switch-channel-active-circle');
        } else {
          document.querySelectorAll('.hexa-dropdown-items')?.forEach(e => e.classList.remove('hexa-channel-active-highlight'));
          e?.target.classList.add('hexa-channel-active-highlight');
        }
        this.channelList_.classList.remove('hexa-show-dropdown-content');
        this.loadSource(asset);
      });
    }

    this.eventManager.listen(this.channelIcon_, 'click', () => {
      this.channelList_.classList.toggle('hexa-show-dropdown-content');
    });
  }

  /**
   * @function
   * @memberOf SwitchChannel
   * @description - Render the channel list in the zapping container
   * @param {!Object<JSON>} channelLists - includes the list of video channels url, thumbnails, time and other relevant information's.
   */
  renderChannelList(channelLists) {
    // Using Mock Template
    for (const [i, data] of channelLists.entries()) {
      const html = `
            <div class="right-${i + 1}" 
            data-channel-id=${data.name ?? undefined}
            data-source=${data.source ?? undefined} 
            data-livePlugin=${data.livePlugin ?? undefined} 
            data-drmProtected=${data.drmProtected ?? undefined} 
            data-availableFormats=${data.availableFormats ?? undefined} 
            data-drmLicence=${data.drm_licence ?? undefined} 
            data-serverCertificate=${data.serverCertificate ?? undefined} 
            aria-label=${data.name ?? undefined}
            title=${data.name ?? undefined}
            style="background-image: url(${data.logo})"></div>
        `;
      this.channelList_.insertAdjacentHTML('beforeend', html);
    }
  }

  renderDropDownLayout2(channels) {
    this.switchChannelContainer_.removeAttribute('class');
    this.channelIcon_.removeAttribute('class');
    this.channelList_.removeAttribute('class');

    this.switchChannelContainer_.classList.add('hexa-dropdown-layout-container');
    this.channelIcon_.classList.add('hexa-dropdown-layout-button');
    this.channelIcon_.textContent = 'Channels';

    this.channelList_.classList.add('hexa-dropdown-content');
    this.channelList_.id = 'hexa-dropdown-content';

    for (const [i, data] of channels.entries()) {
      const html = `
            <div class="hexa-dropdown-items" 
            data-channel-id=${data.name ?? undefined}
            data-source=${data.source ?? undefined}
            data-livePlugin=${data.livePlugin ?? undefined} 
            data-drmProtected=${data.drmProtected ?? undefined} 
            data-availableFormats=${data.availableFormats ?? undefined}
            data-drmLicence=${data?.drm_licence ? data?.drm_licence : undefined} 
            data-serverCertificate=${data?.serverCertificate ?? undefined} 
            title=${data.name ?? undefined}>${data.name}</div>
        `;
      this.channelList_.insertAdjacentHTML('beforeend', html);
    }
  }

  loadSource(asset) {
    const loadSourceEvent = new Event(HexaglobePlayer.LOAD_ASSET);
    loadSourceEvent.asset = asset;
    this.controls.dispatchEvent(loadSourceEvent);
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {SwitchChannel.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
SwitchChannel.Factory = class {
  create(rootElement, controls) {
    return new SwitchChannel(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'switch_channels',
  new SwitchChannel.Factory());

/**
 * @function
 * @memberOf SwitchChannel
 * @description - Render the channel list in the zapping container for Big UI or more that 6 channels
 * @param {!Object<JSON>} data - includes the list of video channels url, thumbnails, time and other relevant information's.
 */
const renderChannelListForBigUI = (data) => {

};
