# Hexa-player

## 2.1.3 (hexaglobe custom shaka-player v4.4.7)

### Bug Fixes
- Remove language feature if only one language
- Material icons and symbols support.
- **FIX** Localization broken in 2.1.2.
- **Fix** for thumbnails VOD UI and programmatic setup.
- **Fix** broken notification on error.

### New Features
- Added tags feature
- Keyboard Accessibility

## 2.1.2 (hexaglobe custom shaka-player v4.4.5)

### Bug Fixes
- **UI CONFIG**: Fix `presentationTimeWithDuration` feature.

### New Features
- Add custom multiple audio languages feature.

## 2.1.1 (hexaglobe custom shaka-player v4.4.4)

### Bug Fixes
- Express mode calculation after the player is loaded
- player-platform bug fixes

### New feature
- vertical volume config
- player platform thumbnail support `tested with player-platform preprod`
- TimeToolTip feature 
- Custom Buttons feature

## 2.1.0 (hexaglobe custom shaka-player v4.3.4)
- This custom player has features from the shaka-player v4.3.0 official release and custom features added by hexaglobe

## Features
- **HLS**: Lazy-load HLS media playlists
- **UI CONFIG**: add `filterDuplicateResolutions` to keep the duplicate resolutions with the `HQ` marker on the highest stream bandwidth
- **UI CONFIG**: add `presentationTimeWithDuration` to display the presentation time with /duration(/00:00:00) or not.
- **config**: added **{basic.noUrlExtension}** config to support **source** urls without format extensions.

## Bug fixes
- Fix HLS lazy-loading exception during an update
- Fix the HLS lazy-loading exception on a switch
- Fix HLS lazy-loading with DRM
- HLS: Fix lazy-loading of TS content

## 2.0.2 (hexaglobe custom shaka-player v4.2.4)

- **DOC**: updated integration guide for classic http/https urls
- **UI**: Chapter UI improvements
- **Chapter Navigation**: Chapter Navigation bug fixes
- **UI**: adopted the identical tooltips UI as shaka-player for our advanced features buttons
- **Chapter Tooltips**: Fixes on updating chapter labels for the next, previous and last chapter buttons on time update and button navigation with localization.
- **Thumbnails VOD**: Fix on `mimeType` config + documentation
- **Chapters VOD**: Fixes on `getActiveChapter()` VOD


## v2.0.1 (hexaglobe custom shaka-player v4.2.4)

### Updates
- Added shaka-player v4.2.3 => v4.2.4 inludes new modifications of analytics. [see "Changes"](https://lofn.hexaglobe.net/-/web/detail/@advanced-suite/front-shaka-player)

### Fixes
- Adopted YouTube like behaviour for tooltips in the player.

## v2.0.0 (hexaglobe custom shaka-player v4.2.3)

### New Features

- Add support for Modern EME and legacy Apple Media Keys for FairPlay
- Automatic ABR quality restrictions based on size
- HLS:Support AES-128 in HLS
- ads:Fix IMA crash when autoplay is rejected
- Fix HLS live stream subtitle offsets
- OnBodyReceived EVENT on player. `Analytics Event`
- **loadmetadata** & **loadmetadata_success** events added in player to dispatch the video metadata.

### Bug Fixes
- HLS Fairplay Support (Safari Browser)


## v1.2.0 (shaka-player v3.3.2)

### New Features

- i18n support of button tooltips ["fr", "en" (default)]
- Thumbnails live support for DASH DEMO

- Thumbnails VOD support for DASH and HLS with thumbnails in source manifest/playlist.  DEMO

- Thumbnails VOD with WebVtt.  DEMO

- Tooltips on next/previous chapter buttons.

- Add Hexa Player error events DOCS

- Add Hexa Player Geo-blocking error events. DOCS

- Add error code descriptions on error fired.

- Auto disconnect feature

- Thumbnails OVP support


### Updates

- Live chapters UI upgrade (can change seek bar color, chapter color, onClickStartOverChapter)
- Express Mode UI evolution with marks of express mode start and stop.
- Remove dependency of moment.js library.

### Bug Fixes

- Live chapter fixes on no chapters available.
- Fullscreen button bug on loadAsset change.
- Live and VOD next/previous chapter tooltips fix
- Hide chapter navigation buttons on no chapter available.
