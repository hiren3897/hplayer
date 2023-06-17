import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import { createButton, createHTMLElement } from '../util/domUtils';

/**
 * Add your custom buttons
 * @type {CustomButtons}
 * @extends {shaka.ui.Element} shaka.ui.Element
 * @export
 */
const CustomButtons = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    this.customButtonConfig_ = this.controls.getPlayer().custom_buttons;

    for (const [index, config] of Object.entries(this.customButtonConfig_)) {
      if (parseInt(index) > 4) {
        console.warn('you can add only 5 custom buttons');
        break;
      }
      const customButton = this.createCustomButton(config.buttonInfo);

      this.eventManager.listen(customButton, config.onEventType ?? 'click', config.onEventTypeHandler);
    }
  }

  createCustomButton(buttonInfo) {
    const isMaterialSymbol = buttonInfo.materialSymbols ?? false;
    const customButton = createButton();
    customButton.classList.add(buttonInfo.cssClass);
    customButton.classList.add('shaka-tooltip');
    customButton.setAttribute('aria-label', buttonInfo.name);

    const customButtonIcon = createHTMLElement('span');
    if (isMaterialSymbol) {
      customButtonIcon.classList.add('hexa-player-symbols');
    } else {
      customButtonIcon.classList.add('hexa-player-icons');
    }
    customButtonIcon.classList.add('md-22');
    customButtonIcon.style.color = buttonInfo.color;
    customButtonIcon.textContent = buttonInfo.iconName;
    customButton.appendChild(customButtonIcon);

    this.parent.appendChild(customButton);

    return customButton;
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ChaptersVOD.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
CustomButtons.Factory = class {
  create(rootElement, controls) {
    return new CustomButtons(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */
  'custom_buttons',
  new CustomButtons.Factory()
);
