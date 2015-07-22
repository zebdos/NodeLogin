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

var routes = require('./routes/index');
var login = require('./routes/login');

var users = require('./data/users'); // user/password file
var salts = require('./data/salts'); // salts file

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/login', login);

// authentication test
authenticate("admin", "admin");

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
};

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Function used to generate salts (not used for authentication)
function createSalt(len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
};

function authenticate(username, password) {
  if (!salts[username]) return false;
  var salt = salts[username];
  var key = crypto.pbkdf2Sync(password, salt, 4096, 512, 'sha512');
  var hash = key.toString('hex');
  console.log(findUser(username).password === hash);
};

// Find user in data/users.js
function findUser(username) {
  return _.find(users, function(user) { return user.username == username });
}

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  if (!findUser(username)) { done(null, false); }
  return done(null, findUser(username));
});

passport.use(new localStrategy(
  function(username, password, done) {
    if (!findUser(username)) { done(null, false, { message: 'Wrong credentials.' }); }
    if (!authenticate(username), password) { done(null, false, { message: 'Wrong credentials.' }); }
    return done(null, username);
  }
));

module.exports = app;
