const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

const __src = path.join(__dirname, 'src');
const __node_modules = path.join(__dirname, 'node_modules');

module.exports = {
  devtool: 'inline-sourcemap',
  target: 'node',
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
    }
  },
  resolveLoader: { fallback: __node_modules },
  eslint: {
    configFile: path.join(__dirname, '.test.eslintrc')
  }
}