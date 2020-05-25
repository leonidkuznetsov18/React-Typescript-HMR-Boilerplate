// development configs
const merge = require('webpack-merge');
const webpack = require('webpack');
const paths = require('./paths');
const commonConfig = require('./common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = merge(commonConfig('development'), {
  devtool: 'cheap-module-eval-source-map',
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    // TODO: remove this when upgrading to webpack 5
    futureEmitAssets: true,
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    globalObject: 'this',
  },
  entry: [
    require.resolve('react-hot-loader/patch'), // activate HMR for React
    require.resolve('webpack-dev-server/client'),// bundle the client for webpack-dev-server and connect to the provided endpoint
    require.resolve('webpack/hot/only-dev-server'), // bundle the client for hot reloading, only- means to only hot reload for successful updates
    paths.appIndexJs // the entry point of our app
  ],
  devServer: {
    // this setting need to serve public folder content (images, favicon, etc...)
    contentBase: paths.appPublic,
    contentBasePublicPath: '/',
    watchContentBase: true,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      index: '/',
    },
    hot: true, // enable HMR on the server
    port: 3000,
    host: '0.0.0.0',
    https: false,
    injectClient: false,
    publicPath: '/',
    overlay: false,
    clientLogLevel: 'none',
    quiet: false,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    // }
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      {
        inject: true,
        template: paths.appHtml,
      }
    ),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new CaseSensitivePathsPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  },
});
