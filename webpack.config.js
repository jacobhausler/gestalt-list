const path = require('path');
const webpack = require('webpack');
const argv = require('yargs').argv;

var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

const __src = path.join(__dirname, 'src');
const __dist = path.join(__dirname, 'dist');
const __node_modules = path.join(__dirname, 'node_modules');

const env = process.env.NODE_ENV || 'development';

const globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(env)
  },
  NODE_ENV: env,
  __DEV__: env === 'development',
  __PROD__: env === 'production',
  __TEST__: env === 'test',
  __DEBUG__: env === 'development' && !argv.no_debug,
  __DEBUG_NEW_WINDOW__: !!argv.nw,
  __BASENAME__: JSON.stringify(process.env.BASENAME || '')
}

const config = {
  entry: path.join(__src, 'index.js'),
  target: 'node',
  output: {
    path: __dist,
    filename: 'index.js'
  },
  externals: nodeModules,
  plugins: [
    new webpack.DefinePlugin(globals)
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: __src,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __src,
      }
    ]
  },
  resolve: {
    fallback: __node_modules,
    alias: {
      src: __src
    }
  },
  resolveLoader: { fallback: __node_modules }
};

if (env === 'development') {
  config.devtool = 'sourcemap';
  config.plugins.push(
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      {
        raw: true,
        entryOnly: false
      }
    )
  );
}

module.exports = config;
