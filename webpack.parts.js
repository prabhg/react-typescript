'use strict';

/**
 * This file is not standard part of webpack, but infact is a trick to break down each rule of webpack config into 
 * a callable function. The function will return the applicable rule, and thus we can create various configs for webpack
 * on the fly. e.g. we can create devConfig, prodConfig, stageConfig and others by "merge" the result of various function
 * calls. This way we can include a rule which has sourceMaps enabled for dev and stage, but not for prod.
 * 
 * Its true that we can achieve similar results by maintaining different webpack config file for each env - e.g.
 * webpack.config.prod.js, webpack.config.stage.js - but the breaking-into-parts method allows single config file to
 * be used, and keeps it much more readable by separating all the "rules" into webpack.parts.js file
 * 
 * This trick was noticed from:
 * https://survivejs.com/webpack/styling/separating-css/
 */

 const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.extractCSS = ({ include, exclude, createSourceMaps }) => {
  // Output extracted CSS to a file
  const extractTextPlugin = new ExtractTextPlugin({
    filename: '[name].bundle.css',
  });

  var usedLoaders = ['css-loader', 'sass-loader'];

  if (createSourceMaps) {
      usedLoaders = usedLoaders.map( (name) => name + '?sourceMap=true' )
  }

  return {
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          include,
          exclude,

          use: extractTextPlugin.extract(usedLoaders)
        },
      ],
    },
    plugins: [ extractTextPlugin ]
  };
};

exports.extractCSSByLoader = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const extractTextPlugin = new ExtractTextPlugin({
    filename: '[name].bundle.css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          include,
          exclude,

          use: extractTextPlugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ extractTextPlugin ]
  };
};
