var _ = require('underscore');
var connectRoles = require('connect-roles');
var express = require('express');
var roles = require('../middleware/roles');
var router = express.Router();


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  var roles = req.user[0].roles;
  if (_.contains(roles, 'admin')) res.redirect('/admin');
  if (_.contains(roles, 'carre')) res.redirect('/square');
  if (_.contains(roles, 'rond')) res.redirect('/circle');
});

router.get('/rond', isLoggedIn, roles.is('rond'), function(req, res, next) {
  res.render('circle');
});

router.get('/carre', isLoggedIn, roles.is('carre'), function(req, res, next) {
  res.render('square');
});

router.get('/admin', isLoggedIn, roles.is('admin'), function(req, res, next) {
  res.render('admin');
});

router.get('/savesecurity', isLoggedIn, roles.is('admin'), function(req, res, next) {
  res.render('savesecurity');
});

function isLoggedIn(req, res, next) {
    // if the user is authenticated continue
    if (req.isAuthenticated())
        return next({ isAuthenticated: true });

    res.redirect('login');
    // res.render('index', { isAuthenticated: false });
}

module.exports = router;
