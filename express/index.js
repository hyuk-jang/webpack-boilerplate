const express = require('express');

const path = require('path');

const middleware = require('webpack-dev-middleware');

const webpack = require('webpack');

const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);

const app = express();
const port = 8080;

app.use(
  middleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true, lazy: true },
  }),
);

app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('index');
});

// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
