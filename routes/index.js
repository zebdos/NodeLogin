var _ = require('underscore');
var connectRoles = require('connect-roles');
var express = require('express');
var router = express.Router();


function isLoggedIn(req, res, next) {

    // if the user is authenticated continue
    if (req.isAuthenticated())
        return next();
    console.log("isLoggedIn");
    res.redirect('login');
    // res.render('index', { isAuthenticated: false });
}

function hasRoles(roleName) {
  return function(req, res, next) {
    console.log(req.user[0]);
    if (req.user[0].hasRole(roleName)) return  next();
    else {
      res.render('302', 'Something broke!');
    }
  };
}

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  console.log("test");
  var roles = req.user[0].roles;
  console.log(roles);
  if (_.contains(roles, 'admin')) res.redirect('/admin');
  if (_.contains(roles, 'carre')) res.redirect('/carre');
  if (_.contains(roles, 'rond')) res.redirect('/rond');
});

router.get('/rond', isLoggedIn, hasRoles('rond'), function(req, res, next) {
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
