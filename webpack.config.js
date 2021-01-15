const path = require('path');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // mode가 development면 개발용, production이면 배포용
  mode: 'development',

  entry: './source/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /.(scss|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [],

  optimization: {},
  // 웹팩이 알아서 경로나 확장자를 처리할 수 있게 도와주는 옵션
  // resolve: {
  //   // 디렉토리의 node_modules를 인식
  //   modules: ['node_modules'],
  //   // 웹팩에서 알아서 처리해주기 때문에 파일에 저 확장자들을 입력할 필요가 없어집니다.
  //   extensions: ['.js', '.json', '.jsx', '.css'],
  // },
};
