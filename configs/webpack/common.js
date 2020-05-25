// shared configs (dev and prod)
const paths = require('./paths');
const DotENV = require('dotenv-webpack');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (mode) => {
  return {
    mode: mode,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        // HMR React Hooks support
        // https://github.com/gaearon/react-hot-loader#hot-loaderreact-dom
        'react-dom': '@hot-loader/react-dom',
        // Folders
        'store': `${paths.appSrc}/store`,
        'pages': `${paths.appSrc}/pages`,
        'assets': `${paths.appSrc}/assets`,
        'components': `${paths.appSrc}/components`,
        'contracts': `${paths.appSrc}/contracts`,
        'helpers': `${paths.appSrc}/helpers`,
        'hooks': `${paths.appSrc}/hooks`,
        'models': `${paths.appSrc}/models`,
        'tests': `${paths.appSrc}/tests`,
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // Process application JS with Babel.
            // The preset includes JSX, Flow, TypeScript, and some ESnext features.
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              loader: require.resolve('babel-loader'),
              options: {
                // customize: require.resolve(
                //   'babel-preset-react-app/webpack-overrides'
                // ),
                babelrc: false,
                presets: [
                  [
                    require.resolve("@babel/preset-env"),
                    { targets: { browsers: "last 2 versions" } } // or whatever your project requires
                  ],
                  require.resolve("@babel/preset-typescript"),
                  require.resolve("@babel/preset-react")
                ],
                plugins: [
                  [
                    require.resolve('babel-plugin-macros'),
                  ],
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
                  ],
                  // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                  [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
                  [require.resolve("@babel/plugin-proposal-class-properties"), { loose: true }],
                  [require.resolve("react-hot-loader/babel")]
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: false,
              },
            },
            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                cacheCompression: false,
                sourceMaps: false,
                inputSourceMap: false,
              },
            },
            {
              test: /\.css$/,
              use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
            },
            {
              test: /\.(scss|sass)$/,
              loaders: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'sass-loader',
              ],
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader: require.resolve('file-loader'),
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    plugins: [
      // Support .env https://github.com/mrsteele/dotenv-webpack
      new DotENV({
        path: `${paths.dotenv}.${mode}`, // load this now instead of the ones in '.env'
        silent: false,
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        DEBUG: false
      }),
      // https://webpack.js.org/plugins/progress-plugin/
      // showing progress
      new webpack.ProgressPlugin({}),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
    ],
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    performance: {
      hints: mode === 'production' ? 'warning' : false,
    },
  }
};


