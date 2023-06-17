/**
 * Creates an element, and cast the type from Element to HTMLElement.
 *
 * @param {string} tagName
 * @return {!HTMLElement}
 */
export const createHTMLElement = (tagName) => {
  /** @type {!HTMLElement} */
  return document.createElement(tagName);
};

/**
 * Create a "button" element with the correct type.
 * @return {!HTMLButtonElement}
 */
export const createButton = () => {
  /** @type {!HTMLButtonElement} */
  return document.createElement('button');
};

/**
 * Remove all of the child nodes of an element.
 * @param {!Element} element
 * @export
 */
export const removeAllChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

/**
 * Returns all child elements.
 * @param tagName
 * @return {NodeListOf<Element>}
 */
export const getAllChildElements = (tagName) => {
  return document.querySelectorAll(`${tagName}`);
};

export const getNextVideoPopupDialogTemplate = (containerConfig) => {
  return `
      <div class="redirect-video-card" style="background-image: url(${containerConfig?.thumbnail})">
        <p class="hexa-redirect-message">Playing next video in ...</p>
        <div class="redirect-video-card-title">
            ${containerConfig?.title}
        </div>
        <div id="hexa-redirect-clock">
            <span id="hexa-redirect-seconds">${containerConfig?.auto_second}</span>
            <div class="pie spinner"></div>
        </div>
    </div>
      `;
};

export const createPlayAndStopButtons = () => {
  const playButtonElement = createButton();
  playButtonElement.classList.add('redirect-play-button');
  playButtonElement.textContent = 'Play';
  playButtonElement.style.cursor = 'pointer';

  const stopButtonElement = createButton();
  stopButtonElement.classList.add('redirect-stop-button');
  stopButtonElement.textContent = 'Stop';
  stopButtonElement.style.cursor = 'pointer';

  return {
    playButtonElement,
    stopButtonElement
  };
};
