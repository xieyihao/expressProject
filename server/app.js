import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import lessMiddleware from 'less-middleware';

// var index = require('./routes/index');
// var users = require('./routes/users');
// var example = require('./routes/example');

import ExpressReactViews from 'express-react-views';
import index from './routes/index';
import example from './routes/example';
import pageOne from './routes/pageOne';
import test from './routes/test';

const app = new express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', ExpressReactViews.createEngine());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../www')));

console.log("【当前运行环境】", process.env.NODE_ENV,);
if (process.env.NODE_ENV == "local") {
  console.log("【是开发环境】");

  const webpack = require('webpack');
  const webpackConfig = require('../webpack/webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/', index);
app.use('/pageOne', pageOne);
app.use('/example', example);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'local' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.status === 404) {
    res.render('404');
  } else {
    res.render('error');
  }
});

module.exports = app;
