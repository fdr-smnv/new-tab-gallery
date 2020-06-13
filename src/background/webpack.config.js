const path = require('path');

const buildPath = path.resolve(process.cwd(), 'build');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  entry: path.join(srcPath, 'index.js'),

  output: {
    filename: 'background.js',
    path: buildPath,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json', '.css'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules)/,
        include: srcPath,
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
