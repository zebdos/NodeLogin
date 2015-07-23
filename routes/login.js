var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


/* POST login. */
router.post('/',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

router.get('/logout',
  function(req, res, next) {
      req.session.destroy();
      res.redirect('/');
});

module.exports = router;
