const newtabWebpackConfig = require('./src/newtab/webpack.config');
const backgroundWebpackConfig = require('./src/background/webpack.config');

module.exports = [
  newtabWebpackConfig,
  backgroundWebpackConfig,
];
