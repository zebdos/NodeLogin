var express = require('express');
var passport = require('passport');
var isLoggedIn = require('../middleware/logged.js');
var router = express.Router();
var Users = require('../models.js').User;
var winston = require('winston');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

router.get('/changePassword', isLoggedIn, function(req, res, next) {
	res.render('changePassword');
});

router.post('/changePassword', isLoggedIn, function(req, res, next) {
   Users.findOne({username:req.user[0].username}, function (err, user) {
     if (err) return next(err);
     if (!user.verifyPassword(req.body.oldPassword)) return res.redirect('/');
     winston.log('info', user.username + ': change password');
     console.log('test2');
     console.log(req.body.newPassword);
     user.changePassword(req.body.newPassword);
     res.redirect('/');
   });
});

router.get('/logout',isLoggedIn,
  function(req, res, next) {
      req.session.destroy();
      res.redirect('/');
});

module.exports = router;
