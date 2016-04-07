var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './example/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    // preLoaders: [
    //   { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
    // ],
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname)
        ],
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    modulesDirectories: [
      'src',
      'components',
      'node_modules',
    ],
    extensions: ['', '.json', '.js'],
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
};
