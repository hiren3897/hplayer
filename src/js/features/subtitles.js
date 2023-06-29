import shaka from 'shaka-player/dist/shaka-player.ui';

/**
 * Load subtitles
 * FIXME this should not be an shaka.ui.Element, no DOM only load text track
 * @type {ChaptersVOD}
 * @extends {shaka.ui.Element} shaka.ui.Element
 * @export
 */
const Subtitles = class extends shaka.ui.Element {
  /**
   *
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    const subtitles = this.controls.getPlayer().subtitles;

    if (!Array.isArray(subtitles)) {
      console.error('Advanced feature: Invalid subtitles.');
      return;
    }

    this.eventManager.listenOnce(this.player, 'loaded', async() => {
      for (const subtitlesTrack of subtitles) {
        const track = await this.player.addTextTrackAsync(subtitlesTrack.url, subtitlesTrack.language, 'subtitles', subtitlesTrack.mimeType);
      }
    });
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {ChaptersVOD.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
Subtitles.Factory = class {
  create(rootElement, controls) {
    return new Subtitles(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */
  'subtitles',
  new Subtitles.Factory()
);
