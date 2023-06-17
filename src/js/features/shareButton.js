import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import '../../../node_modules/ilyabirman-likely/release/likely.css';
import likely from '../../../node_modules/ilyabirman-likely/release/likely';

/**
 * Share button feature. To share urls on social medias.
 * @type {ShareButton}
 * @extends {shaka.ui.Element} shaka.ui.Element
 * @export
 */
const ShareButton = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    // Share configuration data
    this.shareCongif_ = this.controls.getPlayer().share;

    // Share Button on UI
    this.shareButton_ = document.createElement('button');
    this.shareButton_.classList.add('share-button');
    this.shareButton_.classList.add('shaka-tooltip');

    // tooltip
    this.shareButton_.setAttribute('data-i18n-aria-label-key', 'share-btn-title');

    // Share Icon
    this.shareIcon_ = document.createElement('span');
    this.shareIcon_.classList.add('hexa-player-icons');
    this.shareIcon_.classList.add('md-22');
    this.shareIcon_.textContent = 'share';
    this.shareButton_.appendChild(this.shareIcon_);
    this.parent.appendChild(this.shareButton_);

    // Share Container that will hold all the social media buttons.
    this.shareContainer_ = document.createElement('div');
    this.shareContainer_.classList.add('share-container');
    this.shareContainer_.classList.add('hexa-hidden');
    this.shareButton_.appendChild(this.shareContainer_);

    // Media container
    this.mediaContainer_ = document.createElement('div');
    this.mediaContainer_.classList.add('likely');
    this.shareContainer_.appendChild(this.mediaContainer_);

    // Populating the container
    this.renderSocialMediaButtons();

    // initiate the likely library to load.
    likely.initiate();

    // listening the click event on share button to open and close the dialog
    this.eventManager.listen(this.shareButton_, 'click', () => {
      this.openShareContainer();
    });
  }

  /**
   * Open Share container
   */
  openShareContainer() {
    this.shareContainer_.classList.toggle('hexa-hidden');
    if (this.shareContainer_.classList.contains('hexa-hidden')) {
      this.shareContainer_.style.pointerEvents = 'none';
    } else {
      this.shareContainer_.style.pointerEvents = 'all';
    }
  }

  /**
   * Render the social media buttons according to the user configuration.
   */
  renderSocialMediaButtons() {
    let html;
    for (const media of this.shareCongif_?.medias) {
      switch (media.name) {
        case 'facebook':
          html = `
            <div class=${media.name} 
            data-url=${media.contents.url ? media.contents.url : window.location.href} 
            data-hashtag=${media.contents.hashtag ? media.contents.hashtag : ''} 
            data-quote=${media.contents.quote ? media.contents.quote : ''}
            ></div>
            `;
          break;
        case 'linkedin':
          html = `
            <div class=${media.name} 
            data-url=${media.contents.url ? media.contents.url : window.location.href} 
            ></div>
            `;
          break;
        case 'twitter':
          html = `
            <div class=${media.name} 
            data-url=${media.contents.url ? media.contents.url : window.location.href} 
            data-title=${media.contents.title ? media.contents.title : ''} 
            data-via=${media.contents.via ? media.contents.via : ''}
            ></div>
            `;
          break;
        case 'pinterest':
          html = `
            <div class=${media.name} 
            data-url=${media.contents.url ? media.contents.url : window.location.href} 
            data-title=${media.contents.title ? media.contents.title : ''} 
            data-media=${media.contents.media ? media.contents.media : ''}
            ></div>
            `;
          break;
        case 'reddit':
          html = `
            <div class=${media.name} 
            data-url=${media.contents.url ? media.contents.url : window.location.href} 
            data-title=${media.contents.title ? media.contents.title : ''} 
            ></div>
            `;
          break;
        case 'telegram':
          html = `
            <div class=${media.name} 
            data-url=${media.contents.url ? media.contents.url : window.location.href} 
            data-title=${media.contents.title ? media.contents.title : ''} 
            ></div>
            `;
          break;
        case 'whatsapp':
          html = `
            <div class=${media.name} 
            data-url=${media.contents.url ? media.contents.url : window.location.href} 
            data-title=${media.contents.title ? media.contents.title : ''} 
            ></div>
            `;
          break;
        case 'vkontakte':
          html = `
            <div class=${media.name} 
            data-url=${media.contents.url ? media.contents.url : window.location.href} 
            data-title=${media.contents.title ? media.contents.title : ''} 
            data-image=${media.contents.image ? media.contents.image : ''}
            data-comment=${media.contents.comment ? media.contents.comment : ''} 
            ></div>
            `;
          break;
        default:
          html = `
            <div class="likely__widget">
                <a class="likely__button" style="color:black" href=${window.location.href}>
                    <span class="hexa-player-icons">
                        send
                    </span>
                </a>
            </div>
            `;
      }

      this.mediaContainer_.insertAdjacentHTML('afterbegin', html);
    }
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ShareButton.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
ShareButton.Factory = class {
  create(rootElement, controls) {
    return new ShareButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'share',
  new ShareButton.Factory());
