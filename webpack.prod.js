const path = require('path');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',

  plugins: [],

  externals: [
    // webpack의 번들링 과정에서 외부 모듈을 제외할 수 있게 해주는 패키지
    // 해당 모듈을 사용할 경우 HMR이 작동하지 않음
    nodeExternals(),
  ],
});
