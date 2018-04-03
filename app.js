var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var config = require('./config');
var db = require('./db');

var app = express();
app.locals.db = db;

var initialize = async(app) => {
  app.locals.db = db;
  await db.initialize();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  // uncomment after placing your favicon in /public
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger(config.morgan.logger));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // setup index route
  app.use('/express-auth-app-n-user-template/', require('./routes/index'));

  //setup middlewares
  app.use(require('./middlewares/authentication_interceptor'));
  app.use(require('./middlewares/application_interceptor'));

  // setup routes
  var routes = fs.readdirSync('./routes');
  for (var i = 0; i < routes.length; i++) {
      var file = routes[i].substr(0, routes[i].lastIndexOf('.'));
      app.use('/express-auth-app-n-user-template/' + file, require('./routes/' + file));
  }

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


};
initialize(app);
module.exports = app;
