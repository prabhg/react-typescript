const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'client/build');
const APP_DIR = path.resolve(__dirname, 'client/app');
const SCSS_DIR = path.resolve(__dirname, 'client/scss');

const config = {
  entry: [APP_DIR + '/index.tsx', SCSS_DIR + '/main.scss'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  // tell Webpack to load TypeScript files
  resolve: {
    // Look for modules in .ts(x) files first, then .js
    extensions: ['.ts', '.tsx', '.js'],

    // add 'src' to the modules, so that when you import files you can do so with 'src' as the relative route
    modules: ['client/app', 'node_modules'],
  },

  // loader rules
  module : {
    rules : [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { enforce: "pre", test: /\.scss$/, loader: "source-map-loader" },

      // js-hint
      // { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, use: [ { loader: 'jshint-loader' } ] },

      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, use: ['babel-loader', 'ts-loader'], include : APP_DIR, exclude: /node_modules/ },

      { test: /\.js$/, use: 'babel-loader', include : APP_DIR, exclude: /node_modules/ },
      { test: /\.jsx$/, use: 'babel-loader', include : APP_DIR, exclude: /node_modules/ },

      // this rule will take all "require('file.scss')" statements and will add all that css to <head> tag.
      // no separate css file will be created
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'], include : APP_DIR, exclude: /node_modules/ },

      // regular css files
      { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader?importLoaders=1' }) },

      // will process sass files without requiring require('file.scss') in js files
      // sourceMaps are enabled by:
      //    1) passing ?sourceMaps=true option to both css-loader as well as sass-loader
      //    2) adding devtool: "source-map" to webpack config
      { test: /\.(sass|scss)$/, use: ExtractTextPlugin.extract(['css-loader?sourceMap=true', 'sass-loader?sourceMap=true']) },

      // following is elaborate loader-rule for ExtractTextPlugin.
      /*{
        test:  /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:  [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,                            // create sourceMaps
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]-[local]___[hash:base64:5]'
              }
            },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ],
          publicPath: './client/dist'                       // file output path
        })
      }*/
    ]
  },

  // plugings
  plugins: [
    // HtmlWebpackPlugin automatically adds bundle.js to <body> and processed css file to <head>
    new HtmlWebpackPlugin({
      template: 'client/index.html',            // entry html file
      // filename: 'index.html',                // rename the file to this
      inject: 'body',                           // where to inject the script tag
      hash: true                                // adds a ?hash value to url
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css',            // [contenthash] value can be added to filename here
      allChunks: true,
      disable: false
    }),

    // Following two are need for Hot Module Replacement
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin()
  ],

  // config for webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname, 'client/build'),
    port: 8181,
    hot: false,                    // HMR i.e Hot Module Replacement
    stats: "minimal",             // show minimal stats
    compress: true,               // gzip enabled control flag
    headers: {                    // custom headers
      "X-Custom-Foo": "bar"
    }
  }
};

module.exports = config;
