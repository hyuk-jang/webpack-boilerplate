// const webpack = require('webpack');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // mode가 development면 개발용, production이면 배포용
  mode: 'development',

  entry: {
    main: './source/index.js',
  },

  output: {
    path: '/dist',
    filename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: ['/node_modules'],
      },
      {
        test: /.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            // loader: MiniCssExtractPlugin.loader,
            // options: {
            //   reloadAll: false,
            // },
          },
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    // new MiniCssExtractPlugin({ filename: 'main.css' })
  ],

  optimization: {},
  // 웹팩이 알아서 경로나 확장자를 처리할 수 있게 도와주는 옵션
  resolve: {
    // 디렉토리의 node_modules를 인식
    modules: ['node_modules'],
    // 웹팩에서 알아서 처리해주기 때문에 파일에 저 확장자들을 입력할 필요가 없어집니다.
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};
