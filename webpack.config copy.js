const path = require('path');

const { ProgressPlugin, SourceMapDevToolPlugin } = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const nodeExternals = require('webpack-node-externals');

module.exports = {
  // mode가 development면 개발용, production이면 배포용
  mode: 'development',

  devServer: {
    // 정적 Path
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },

  entry: {
    main: './source/index.js',
    sub: './source/about.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // filename: '[name].[chunkhash].js',
  },

  module: {
    rules: [
      // babel
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      // CSS & SCSS
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
    // 빌드의 진행률을 보여주는 플러그인
    new ProgressPlugin(),
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
    // 미리 청크해시값을 알 수 있게 json 구조로 나와있습니다. 이 데이터를 사용하셔서 script의 src로 사용하시면 됩니다.
    new WebpackManifestPlugin({
      fileName: 'assets.json',
      basePath: '/',
    }),
    // 난독화된 파일의 소스맵을 그려서 개발자의 디버깅을 도와줍니다.
    new SourceMapDevToolPlugin(),
  ],

  optimization: {
    // 결과물로 나온 파일의 사이즈를 줄여줌(압축) - production 일 경우 기본 내장
    minimizer: [new TerserPlugin()],

    // 청크간에 겹치는 패키지들을 별도의 파일로 추출해주는 코드. 벤더(vendor)라고 표현
    splitChunks: {
      chunks: 'initial',
      name: 'vendor',
    },
  },
  // 웹팩이 알아서 경로나 확장자를 처리할 수 있게 도와주는 옵션
  resolve: {
    // 디렉토리의 node_modules를 인식
    modules: ['node_modules'],
    // 웹팩에서 알아서 처리해주기 때문에 파일에 저 확장자들을 입력할 필요가 없어집니다.
    extensions: ['.js', '.json', '.jsx', '.css'],
  },

  externals: [nodeExternals()],
};
