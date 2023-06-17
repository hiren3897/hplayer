import shaka from '../../../node_modules/@advanced-suite/front-shaka-player/dist/shaka-player.ui';
import { NotificationService } from '../notification/notificationService';
import { createHTMLElement } from '../util/domUtils';
import { ChapterService } from './services/chapterService';
import HexaglobePlayer from '../hexaPlayer';

/**
 * Tags Feature
 * @type {Tags}
 * @extends shaka.ui.Element
 */
const Tags = class extends shaka.ui.Element {
  /**
     *
     * @param {!HTMLElement} parent
     * @param {!shaka.ui.Controls} controls
     */
  constructor(parent, controls) {
    super(parent, controls);

    this.tagsConfig_ = this.controls.getPlayer().tags;

    // create a tag container
    this.tagsData_ = null;
    // parse the webvtt to get all the data

    this.tagsService_ = null;
    // mark the tags on the tag container

    this.eventManager.listen(this.player, 'loaded', async() => {
      this.shakaSeekbar_ = this.controls.getControlsContainer().querySelector('.shaka-seek-bar');
      this.shakaRangeContainer_ = this.controls.getControlsContainer().querySelector('.shaka-seek-bar-container');
      this.shakaRangeContainer_.style.zIndex = '2';
      this.controls.getVideoContainer().style.overflow = 'hidden';

      this.createTagContainer();

      this.eventManager.listen(this.controls, HexaglobePlayer.ASSET_LOADED, async() => {
        this.tagsConfig_ = this.controls.getPlayer().tags;
        this.tagsData_ = await this.getTagsData(this.tagsConfig_.tagWebVtt, 'en', 'text/vtt');
        this.tagsService_ = new ChapterService(this.tagsData_, this.player, this.controls);
        this.tagsService_.markChaptersOnTimeline('hexa-tags-container', 'tags');
      });
    });
  }

  /**
   * Gets the chapters information for the chapter WebVtt URl.
   * @param chapterUrl
   * @param language
   * @param mimeType
   * @return {Promise<shaka.extern.Track>}
   */
  async getTagsData(chapterUrl, language, mimeType) {
    await this.player.addChaptersTrack(`${chapterUrl}`, `${language}`, `${mimeType}`, 'metadata');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.player.getChapters(`${language}`, 'metadata').map(chapter => ({
          ...chapter,
          color: `${this.parserColorsAndTitle(chapter.title).color}`,
          title: `${this.parserColorsAndTitle(chapter.title).title}`
        })));
      }, 1.5 * 1000); // it by defaults requires a delay of 1.5 seconds to get the chapters
    });
  }

  parserColorsAndTitle(line) {
    if (!line.includes('<c')) {
      console.error(`The "${line}" does not begin with a <c.COLOR>`,);
      return;
    }
    const colorRegex = /<c\.(.*?)>/; // Regular expression to match the color code
    const titleRegex = />(.*?)</; // Regular expression to match the title

    const colorMatch = line.match(colorRegex);
    const titleMatch = line.match(titleRegex);

    const color = colorMatch ? colorMatch[1] : null; // Extract the color code from the match
    const title = titleMatch ? titleMatch[1] : null; // Extract the title from the match

    return { color, title }; // Return an object with the color and title properties
  }

  createTagContainer() {
    this.tagContainer_ = createHTMLElement('div');
    this.tagContainer_.classList.add('hexa-tags-container');
    this.tagContainer_.classList.add('shaka-tooltips-on');
    this.shakaRangeContainer_.insertBefore(this.tagContainer_, this.shakaRangeContainer_.childNodes[0]);
  }
};

/**
 * @method
 * @description - Factory that will create a button at run time. After creating a button you need to register it in {shaka.ui.Controls.registerElement}
 * @type {Tags.Factory}
 * @implements {shaka.extern.IUIElement.Factory}
 */
Tags.Factory = class {
  create(rootElement, controls) {
    return new Tags(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  /* This name will serve as a reference to the button in the UI configuration object */ 'tags',
  new Tags.Factory());
