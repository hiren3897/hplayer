const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// List of features' demo
const featureList = [
  {
    name: 'backward-button', // maybe rename to jump-backward
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/BackwardButton/backward-button.adoc[]"'
  },
  {
    name: 'small-live-button',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/LiveButtons/small-live-button.adoc[]"'
  },
  {
    name: 'big-live-button',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/LiveButtons/big-live-button.adoc[]"'
  },
  {
    name: 'forward-button', // maybe rename to jump-forward
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/ForwardButton/forward-button.adoc[]"'
  },
  {
    name: 'screenshot',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Screenshot/screenshot.adoc[]"'
  },
  {
    name: 'express-mode',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/ExpressMode/express-mode.adoc[]"'
  },
  {
    name: 'poster',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Poster/poster-feature.adoc[]"'
  },
  {
    name: 'big-play-button',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/shaka-default.adoc[]"'
  },
  {
    name: 'picture-in-picture',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/shaka-default.adoc[]"'
  },
  {
    name: 'airplay',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/airplay.adoc[]"'
  },
  {
    name: 'chromecast',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/chromecast.adoc[]"'
  },
  {
    name: 'playlist',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Playlist/playlist.adoc[]"'
  },
  {
    name: 'switch-channel',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/SwitchChannel/switch-channel-feature.adoc[]"'
  },
  {
    name: 'share-button',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Share/share.adoc[]"'
  },
  {
    name: 'redirect',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Redirect/redirect.adoc[]"'
  },
  {
    name: 'redirect2',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Redirect/redirect.adoc[]"'
  },
  {
    name: 'thumbnails-track',
    html: 'demo/html/thumbnailTrack/thumbnails-track.ejs',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Thumbnails/thumbnails-track.adoc[]"',
    js: 'thumbnails-track.js'
  },
  {
    name: 'thumbnails',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Thumbnails/thumbnails.adoc[]"'
  },
  {
    name: 'chapters-vod',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Chapters/chapters-vod.adoc[]"'
  },
  {
    name: 'live-chapters',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Chapters/chapters-live.adoc[]"'
  },
  {
    name: 'basic-usage',
    adoc: '"include::./docs/demo-examples/demo-basic.adoc[]"'
  },
  {
    name: 'live-drm',
    adoc: '"include::./docs/demo-examples/live-drm.adoc[]"'
  },
  // Fixme do not use equidia player platform
  // Hash expires after 24h the demo page will always be broken.
  // {
  //  name: 'player-platform',
  //  adoc: '"include::./docs/demo-examples/player-platform.adoc[]"',
  // },
  {
    name: 'subtitles',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Subtitles/subtitles.adoc[]"'
  },
  {
    name: 'vod-fully-featured',
    adoc: '"include::./docs/demo-examples/demo-basic.adoc[]"'
  },
  {
    name: 'live-fully-featured',
    adoc: '"include::./docs/demo-examples/live-drm.adoc[]"'
  },
  {
    name: 'auto-pip',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/AutoPictureInPicture/autoPictureInPicture.adoc[]"'
  },
  {
    name: 'popup-list',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/PopupList/popup-list.adoc[]"'
  },
  {
    name: 'rewind',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/rewind.adoc[]"'
  },
  {
    name: 'fast-forward',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/fast-forward.adoc[]"'
  },
  {
    name: 'language',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/language.adoc[]"'
  },
  {
    name: 'loop',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/loop.adoc[]"'
  },
  {
    name: 'quality',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/quality.adoc[]"'
  },
  {
    name: 'playback',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/playback-rate.adoc[]"'
  },
  {
    name: 'image-overlay',
    html: 'demo/html/imageOverlay/image-overlay.ejs',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/ImageOverlay/imageOverlay.adoc[]"'
  },
  {
    name: 'manage-alerts',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/ManageAlerts/manage-alerts.adoc[]"'
  },
  {
    name: 'mini-player',
    html: 'demo/html/miniPlayer/mini-player.ejs',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/MiniPlayer/h-mini-player.adoc[]"',
    js: 'miniPlayer.js'
  },
  {
    name: 'multiplayer',
    html: 'demo/html/multiPlayer/multiplayer.ejs',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Multiplayer/multiplayer.adoc[]"',
    js: 'multiplayer.js'
  },
  {
    name: 'hplayer-api',
    html: 'demo/html/hPlayerApi/hplayer-api.ejs',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/AdvancedFunctions/hplayer-api.adoc[]"'
  },
  {
    name: 'iOS-fullscreen',
    html: 'demo/html/iOS-fullscreen/iso-fullscreen.ejs',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/iOSFullscreen/ios-fullscreen.adoc[]"',
  },
  {
    name: 'notification',
    html: 'demo/html/notification/notification.ejs',
    adoc: '"include::./docs/notification/notification.adoc[]"',
  },
  {
    name: 'abr',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/abr.adoc[]"',
  },
  // {
  //   name: 'player-restrictions',
  //   adoc: '"include::./docs/features-configuration/shaka-player-default-features/player-restrictions.adoc[]"',
  // },
  {
    name: 'dvr-mode-button',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/DvrModeButton/dvr-mode-button.adoc[]"',
  },
  {
    name: 'volume-vertical',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/VolumeBarVertical/volume-vertical.adoc[]"',
  },
  {
    name: 'keyboard-control-demo',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/keyboard.adoc[]"'
  },
  {
    name: 'context-menu-demo',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/context-menu.adoc[]"'
  },
  {
    name: 'player-statistics-demo',
    adoc: '"include::./docs/features-configuration/shaka-player-default-features/stats.adoc[]"'
  },
  {
    name: 'auto-disconnect',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/AutoDisconnect/auto-disconnect.adoc[]"'
  },
  {
    name: 'time-tooltip-demo',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/TimeTooltip/timeTooltip.adoc[]"'
  },
  {
    name: 'custom-buttons',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/CustomButtons/custom-buttons.adoc[]"'
  },
  {
    name: 'custom-audio-languages',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/CustomAudioLangauge/custom-audio-language.adoc[]"',
    html: 'demo/html/customAudioLanguage/custom-audio-langauge.ejs',
  },
  {
    name: 'tags',
    adoc: '"include::./docs/features-configuration/hplayer-advanced-features/Tags/tags.adoc[]"',
  }
];

const multipleHtmlPlugins = featureList.map(feature => {
  return new HtmlWebpackPlugin({
    filename: `${feature.name}.html`,
    title: feature.name,
    template: `${feature.html ?? 'demo/demo-feature-template.ejs'}`,
    templateParameters: {
      title: feature.name,
      options: `js/${feature.name}/index.js`,
      adoc: feature.adoc,
      js: `js/${feature.name}/${feature.js}`
    }
  });
});

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, 'demo/demo.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'demo/index.html'
    }),
    new ESLintPlugin({
      extensions: ['**/*js'],
      exclude: ['/node_modules/'],
      useEslintrc: true
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: './demo/js', to: './js' },
          { from: './demo/html', to: './html' },
          { from: './demo/css', to: './css' },
          { from: './demo/assets', to: 'assets' },
          { from: './dist/index.css', to: './css/index.css' },
          { from: './dist/HPlayer.bundle.js', to: './js/HPlayer.bundle.js' },
          { from: './cast_receiver', to: './cast_receiver' },
          { from: './docs', to: 'docs' }
          // { from: 'src/yyy.ext', to: 'dist/yyy.ext' }
        ]
      }
    )

  ].concat(multipleHtmlPlugins),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
        type: 'javascript/auto'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.adoc$/i,
        use: ['raw-loader']
      }
    ]
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  },
  output: {
    path: path.resolve(__dirname, 'site/public')
  }
};
