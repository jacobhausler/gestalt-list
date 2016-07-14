const path = require('path');
const webpack = require('webpack');
// const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const argv = require('yargs').argv;
const nodeExternals = require('webpack-node-externals');

const __root = path.join(__dirname, '../../');
const __src = path.join(__root, 'src');
const __dist = path.join(__root, 'dist');
const __node_modules = path.join(__root, 'node_modules');

const env = process.env.NODE_ENV || 'development';

const globals = {
  __root: JSON.stringify(__root),
  'process.env': {
    'NODE_ENV': JSON.stringify(env)
  },
  NODE_ENV: env,
  __DEV__: env === 'development',
  __PROD__: env === 'production',
  __TEST__: env === 'test',
  __DEBUG__: env === 'development' && !argv.no_debug,
};

const config = {
  entry: ['babel-polyfill', path.join(__src, 'index.js')],
  target: 'node',
  output: {
    path: __dist,
    filename: 'index.js'
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin(globals),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: __src
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __src
      }
    ]
  },
  resolve: {
    alias: {
      src: __src,
      config: path.join(__src, 'config'),
      helpers: path.join(__src, 'helpers'),
      modules: path.join(__src, 'modules'),
    }
  },
  eslint: {
    configFile: path.join(__root, 'config/eslint/.dev.rc'),
    failOnError: true,
  },
};

if (env === 'development') {
  config.devtool = 'cheap-module-source-map';
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

// if (env === 'development' && !argv.no_type_check) {
//   config.plugins.push(new FlowStatusWebpackPlugin());
// }

if (process.env.TRAVIS) {
  config.eslint.failOnError = true;
}

module.exports = config;
