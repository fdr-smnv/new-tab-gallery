const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const buildPath = path.resolve(__dirname, 'build');
const commonConfig = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@background': path.resolve(__dirname, 'src', 'background'),
      '@newtab': path.resolve(__dirname, 'src', 'newtab'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new CleanWebpackPlugin(),
  ],
};

const backgroundSourcePath = path.resolve(commonConfig.context, 'background');
const newtabSourcePath = path.resolve(commonConfig.context, 'newtab');

const backgroundWebpackConfig = {
  ...commonConfig,
  entry: path.resolve(backgroundSourcePath, 'index.js'),
  output: {
    filename: 'background.js',
    path: buildPath,
    publicPath: '/',
  },
  resolve: {
    ...commonConfig.resolve,
    extensions: ['.js', '.jsx', '.scss', '.json', '.css'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules)/,
        include: backgroundSourcePath,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};

const newtabWebpackConfig = {
  ...commonConfig,
  entry: path.resolve(newtabSourcePath, 'index.jsx'),
  output: {
    filename: 'newtab.js',
    path: buildPath,
    publicPath: '/',
  },
  resolve: {
    ...commonConfig.resolve,
    extensions: ['.js', '.jsx', '.scss', '.json'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules)/,
        include: newtabSourcePath,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
            },
          },
        ].concat(isDev ? 'eslint-loader' : []),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        include: newtabSourcePath,
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
    new CopyPlugin({
      patterns: [
        {
          from: path.join(process.cwd(), 'src', 'manifest.json'),
          to: buildPath,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'NewTabGallery',
      template: path.join(newtabSourcePath, 'static', 'index.html'), // `!!prerender-loader?string!${path.join(srcPath, 'index.html')}`
    }),
    new PrerenderSPAPlugin({
      staticDir: buildPath,
      routes: ['/'],
      indexPath: path.join(buildPath, 'index.html'),
      outputDir: path.join(buildPath),
    }),
  ],
};

module.exports = [backgroundWebpackConfig, newtabWebpackConfig];
