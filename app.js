var _ = require('underscore');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');
var models = require('./models.js');
var User = models.User;
var ParamSecurite = models.ParamSecurite;
var routes = require('./routes/index');
var login = require('./routes/login');
var savesecurity = require('./routes/savesecurity');
var locales = require('./middleware/locales');
var winston = require('winston');
var roles = require('./middleware/roles');
var app = express();

//log
winston.add(winston.transports.File, { filename: 'access.log' });
winston.remove(winston.transports.Console);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'GTI619_LE_COURS_DE_SECURITE', resave: false, saveUninitialized: false, cookie:{maxAge:5*60*1000}}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
roles(app);


app.all('*', locales);
app.use('/', routes);
app.use('/login', login);
app.use('/savesecurity', savesecurity);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  User.find({ 'username' :  username }, function(err, user) {
    done(err, user);
  });
});

passport.use(new localStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {
    // console.log(username);
    User.findOne({ username:  username }, function(err, user) {
      if (err) return done(err);
      if (!user || !user.verifyPassword(password)) {
        winston.log('info', username + ': wrong credentials');
        user.numberLoginTry++;
        user.save(function (err) {
			       if (err) return console.log(err);
			          console.log('User saved');
		    });
        return done(err);
      }
      /*var paramSecurite = ParamSecurite.findOne({}, {}, { sort: { 'date' : -1 } });
      if(paramSecurite){
      	var delay = Math.floor(Math.abs(Date.now - user.lastConnectionFailDate) / 600000);
      	if(delay > paramSecurite.maxResetTryTime){

      	}
      }
      if(paramSecurite && user.numberLoginTry > paramSecurite.maxLoginTry){
      	console.log("Maximum of connection tries has been reached!");

      }*/
      user.numberLoginTry = 0;
      user.save(function (err) {
  		if (err) return console.log(err);
  		  console.log('User saved');
  	  });
      // user authenticated
      winston.log('info', username + ': connect');
      return done(null, user);
    });
}));


module.exports = app;
