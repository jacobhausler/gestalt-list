const babelPolyfill = require('babel-polyfill');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

const __root = path.join(__dirname, '../../');
const __src = path.join(__root, 'src');
const __node_modules = path.join(__root, 'node_modules');

const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

module.exports = {
  devtool: 'cheap-module-source-map',
  target: 'node',
  output: {
    // sourcemap support for IntelliJ/Webstorm
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  externals: [nodeExternals()],
  // plugins: [
  //   new FlowStatusWebpackPlugin(),
  // ],
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
        include: __src,
      }
    ]
  },
  resolve: {
    alias: {
      src: __src,
      modules: path.join(__src, 'modules'),
      routes: path.join(__src, 'routes')
    }
  },
  eslint: {
    configFile: path.join(__root, 'config/eslint/.test.rc')
  },
}