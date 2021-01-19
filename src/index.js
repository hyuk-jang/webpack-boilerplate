import './style.scss';

import express from 'express';

import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';

import path from 'path';

import cookieParser from 'cookie-parser';

const compiler = webpack(
  {
    // webpack options
    stats: { colors: true },
  },
  // ...webpackConfig,
);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const port = 8080;

console.log('@port', port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  middleware(compiler, {
    publicPath: '/',
    // webpack-dev-middleware options
  }),
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
