// webpack.config.js
const path = require('path')
module.exports = {
  devtool: 'eval-source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.png$/,
        use: 'file-loader'
      },
      {
        test: /\.jpg$/,
        use: 'file-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
}