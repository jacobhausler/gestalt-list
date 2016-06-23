const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const argv = require('yargs').argv;
const nodeExternals = require('webpack-node-externals');

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
}

const config = {
  entry: path.join(__src, 'index.js'),
  target: 'node',
  output: {
    path: __dist,
    filename: 'index.js'
  },
  externals: [nodeExternals()],
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
      src: __src,
      modules: path.join(__src, 'modules'),
    }
  },
  resolveLoader: { fallback: __node_modules }
};

if (env === 'development') {
  config.devtool = 'inline-sourcemap';
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
