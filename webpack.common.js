const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const nodeExternals = require('webpack-node-externals');

module.exports = {
  // context: path.resolve(__dirname, 'src'),

  entry: {
    main: ['./src/index.js', './src/style.scss'],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new HtmlWebpackPlugin({
      title: 'Jang Hyuk Title!',
      template: './views/index.ejs',
      filename: 'index.html',
      // minify: false,
      // chunks: ['index'],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   reloadAll: false,
            // },
          },
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // Img
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:6].[ext]',
          outputPath: 'images',
          publicPath: 'images',
          emitFile: true,
          esModule: false,
        },
      },
    ],
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },

  externals: [nodeExternals()],
};
