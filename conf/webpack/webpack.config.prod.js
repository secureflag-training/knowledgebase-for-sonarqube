const webpack = require('webpack');
const config = require('./webpack.config');
const getClientEnvironment = require('../env');
const TerserPlugin = require("terser-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

// Get environment variables to inject into our app.
const env = getClientEnvironment();

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env['process.env.NODE_ENV'] !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

// Don't attempt to continue if there are any errors.
config.bail = true;

config.plugins = [
  // Makes some environment variables available to the JS code, for example:
  // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
  // It is absolutely essential that NODE_ENV was set to production here.
  // Otherwise React will be compiled in the very slow development mode.
  new webpack.DefinePlugin(env),
  new DuplicatePackageCheckerPlugin(),
];

config.optimization = {
  minimize: true,
  minimizer: [new TerserPlugin()]
}

module.exports = config;
