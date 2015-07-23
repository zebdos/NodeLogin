var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*
router.get('/changePassword', function(req, res, next) {
  res.render('changePassword');

});*/

/* POST login. */
router.post('/',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

router.get('/changePassword', function(req, res, next) {
	res.render('changePassword');
});

router.get('/logout',
  function(req, res, next) {
      req.session.destroy();
      res.redirect('/');
});

module.exports = router;
