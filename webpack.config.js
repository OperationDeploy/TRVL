const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: './client/src/index.html',
  filename: 'index.html',
});
module.exports = {
  entry: './client/src/index.js',
  output: {
    // NEW
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  }, // NEW Ends
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
