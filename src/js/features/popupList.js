import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import { createButton, createHTMLElement } from '../util/domUtils';
/**
 * This feature will be used to add a players list to the UI with all the information configured or provided by the clients.
 * @type {PopUpListPlayerDialog}
 * @extends {shaka.ui.Element} shaka.ui.Element
 */
const PopUpListPlayerDialog = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    // Players Pop-up list data
    this.playerPopUpListConfig_ = this.controls.getPlayer().popup_list;

    // The actual popup button that will be displayed
    this.buttonPopUp_ = createButton();
    this.buttonPopUp_.classList.add('player-popup-list-button');
    this.buttonPopUp_.classList.add('shaka-tooltip');

    const buttonIcon = createHTMLElement('span');
    buttonIcon.classList.add('icon-big');
    buttonIcon.classList.add('hexa-player-icons');
    buttonIcon.textContent = 'person';
    buttonIcon.style.color = '#2fdec3';
    this.buttonPopUp_.appendChild(buttonIcon);
    this.buttonPopUp_.setAttribute('data-i18n-aria-label-key', 'popup-btn-title');
    this.parent.appendChild(this.buttonPopUp_);

    // the container dialog to be displayed on click of icon
    this.popupContainer_ = createHTMLElement('div');
    this.popupContainer_.classList.add('popup-list-container');
    this.popupContainer_.classList.add('hexa-hidden');

    // close button to close the dialog
    this.closeButton_ = createButton();
    this.closeButton_.classList.add('popup-list--close-button');
    this.closeButton_.classList.add('shaka-tooltip');
    this.closeButton_.innerHTML = '&times;';
    this.popupContainer_.appendChild(this.closeButton_);
    this.parent.appendChild(this.popupContainer_);

    if (this.playerPopUpListConfig_?.list?.length) {
      this.populatePlayerListInsideContainer();
    } else {
      console.error('No player list provided');
    }

    // Listen for clicks on the popup button open the dialog container
    this.eventManager.listen(this.buttonPopUp_, 'click', () => {
      this.openModal();
    });

    // Listen for clicks on the close button to close the dialog container
    this.eventManager.listen(this.closeButton_, 'click', () => {
      this.closeModal();
    });
  }

  /**
   * @function
   * @description - to open the player popup list dialog container.
   */
  openModal() {
    this.popupContainer_.classList.remove('hexa-hidden');
    this.popupContainer_.style.pointerEvents = 'all';
  }

  /**
   * @function
   * @description - to open the player popup list dialog container.
   */
  closeModal() {
    this.popupContainer_.classList.add('hexa-hidden');
    this.popupContainer_.style.pointerEvents = 'none';
  }

  /**
   * @function
   * @memberOf  PopUpListPlayerDialog
   * @description - Populates the players information from the json data inside the container.
   *  to append the html markup that includes grid list of players with specific information
   *  like names, team, icon, otherinfo || title etc.
   * @param data
   */
  populatePlayerListInsideContainer(data) {
    const html = `
      <h2>${this.playerPopUpListConfig_.popup_title ?? ''}</h2>
      <p class="popup-list--desc ellipsis">${this.playerPopUpListConfig_.popup_desc ?? ''}</p>
    `;
    this.popupContainer_.insertAdjacentHTML('beforeend', html);

    for (const [i, player] of this.playerPopUpListConfig_.list.entries()) {
      const html = `
            <div class="popup-list--row">
                <div class="popup-list--index">${i + 1}</div>
                <img src="${player.avatar_url ?? ''}" alt="avatar image">
                <div class="popup-list--data">
                    <h3>${player.title}</h3><br>
                    <p class="popup-list-avatar--desc">${player.description ?? ''}</p>
                </div>
            </div>
            
        `;
      this.popupContainer_.insertAdjacentHTML('beforeend', html);
    }
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {PopUpListPlayerDialog.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
PopUpListPlayerDialog.Factory = class {
  create(rootElement, controls) {
    return new PopUpListPlayerDialog(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'popup_list',
  new PopUpListPlayerDialog.Factory());
