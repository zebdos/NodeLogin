var _ = require('underscore');
var connectRoles = require('connect-roles');
var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/logged.js');
var hasRoles = require('../middleware/roles.js');

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  var roles = req.user[0].roles;
  if (_.contains(roles, 'admin')) res.redirect('/admin');
  if (_.contains(roles, 'carre')) res.redirect('/carre');
  if (_.contains(roles, 'rond')) res.redirect('/rond');
});

router.get('/rond', isLoggedIn, hasRoles('rond') , function(req, res, next) {
  res.render('circle');
});

router.get('/carre', isLoggedIn, hasRoles('carre'), function(req, res, next) {
  res.render('square');
});

router.get('/admin', isLoggedIn, hasRoles('admin'), function(req, res, next) {
  res.render('admin');
});

router.get('/savesecurity', isLoggedIn, hasRoles('admin'), function(req, res, next) {
  res.render('savesecurity');
});



module.exports = router;
