const _       = require('lodash');
const webpack = require('webpack');

const dev = process.env.NODE_ENV === 'dev';

const base = {
  entry: {
    ifd: './lib/index.js'
  },
  devtool: dev ? '#eval-source-map' : 'source-map',
  output: {
    path: './dist/',
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }]
  },
  plugins: dev ? [new webpack.NoErrorsPlugin()]
               : [
                 new webpack.optimize.OccurrenceOrderPlugin(true),
                 new webpack.LoaderOptionsPlugin({
                   minimize: true,
                   debug: false
                 })
               ]
};

const min = _.defaultsDeep({}, base);
min.output.filename = '[name].min.js';
if (!dev) {
  min.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = [base, min];
