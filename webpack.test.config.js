const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

const __src = path.join(__dirname, 'src');
const __node_modules = path.join(__dirname, 'node_modules');

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
      chai: chai
    }
  },
  resolveLoader: { fallback: __node_modules },
  eslint: {
    configFile: path.join(__dirname, '.test.eslintrc')
  }
}