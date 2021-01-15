const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // mode가 development면 개발용, production이면 배포용
  mode: 'development',

  entry: {
    main: './source/index.js',
    sub: './source/about.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /.(scss|css)$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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

  plugins: [
    // main.css 1개의 파일만 내보냄. filename이 없을 경우 main.css, sub.css가 생김
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new HtmlWebpackPlugin({
      title: 'My App Index',
      filename: './index.html',
      template: './source/index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      title: 'My App About',
      filename: './about.html',
      template: './source/about.html',
      chunks: ['sub'],
    }),
  ],

  optimization: {},
  // 웹팩이 알아서 경로나 확장자를 처리할 수 있게 도와주는 옵션
  // resolve: {
  //   // 디렉토리의 node_modules를 인식
  //   modules: ['node_modules'],
  //   // 웹팩에서 알아서 처리해주기 때문에 파일에 저 확장자들을 입력할 필요가 없어집니다.
  //   extensions: ['.js', '.json', '.jsx', '.css'],
  // },
};
