const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const buildPath = path.resolve(process.cwd(), 'build');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  entry: path.join(srcPath, 'index.jsx'),

  output: {
    filename: 'newtab.js',
    path: buildPath,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules)/,
        include: srcPath,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
          },
        }, 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        include: srcPath,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[local]__[path][name]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'my-custom-hash',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.join(process.cwd(), 'src', 'manifest.json'),
        to: buildPath,
      },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'NewTabGallery',
      template: path.join(srcPath, 'index.html'), // `!!prerender-loader?string!${path.join(srcPath, 'index.html')}`
    }),
    new PrerenderSPAPlugin({
      staticDir: buildPath,
      routes: ['/'],
      indexPath: path.join(buildPath, 'index.html'),
      outputDir: path.join(buildPath),
    }),
  ],
};
