const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'fs': 'empty',
    'path': require.resolve('path-browserify'),
  })
);
