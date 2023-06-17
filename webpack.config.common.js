const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const packageJson = require('./package.json');
const webpack = require('webpack');

/**
 * Build Datetime string to include in banner/licence and websocket
 * @returns {string}
 */
function getBuildDatetime() {
  let hours, minutes;
  const now = new Date();
  hours = now.getHours();
  hours = (hours >= 10) ? hours : '0' + hours;
  minutes = now.getMinutes();
  minutes = (minutes >= 10) ? minutes : '0' + minutes;
  let day = now.getDate();
  day = (day >= 10) ? day : '0' + day;
  const years = now.getFullYear();
  let months = now.getUTCMonth() + 1;
  months = (months >= 10) ? months : '0' + months;
  return `${years}-${months}-${day}-${hours}-${minutes}`;
}

const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin.GitRevisionPlugin();

/**
 * WIP
 * Version of player `1.0.${getBuildDatetime}`
 * @type {string}
 */
const version = packageJson.version.slice(0, -1) + getBuildDatetime();

module.exports = {
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new Dotenv({
      // path: './some.other.env', // load this now instead of the ones in '.env'
      safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: false, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false, // hide any errors
      defaults: true // load '.env.defaults' as the default values if empty.
    }),
    new ESLintPlugin({
      extensions: ['**/*js'],
      exclude: ['/node_modules/'],
      useEslintrc: true
    }),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(version),
      'process.env.commitHash': JSON.stringify(gitRevisionPlugin.commithash()),
    }),
    new webpack.BannerPlugin({
      banner: () => {
        return `HexaPlayer 
  Version: ${version}  
  commitHash: ${gitRevisionPlugin.commithash()}`;
      },
      raw: false
    }),
  ],
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify')
      /* webpack < 5 used to include polyfills for node.js core modules by default.
        This is no longer the case. Verify if you need this module and configure a polyfill for it.

            If you want to include a polyfill, you need to:
            - add a fallback 'resolve.fallback: { "stream": require.resolve("stream-browserify") }'
      - install 'stream-browserify'
  If you don't want to include a polyfill, you can use an empty module like this:
  resolve.fallback: { "stream": false } */
    }
  },
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'HPlayer.bundle.js',
    library: {
      name: 'HPlayer',
      type: 'umd',
      export: 'default',
      umdNamedDefine: true
    },
    globalObject: 'this'
  }
};
