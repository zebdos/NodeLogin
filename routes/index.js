var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index');
});

router.get('/rond', isLoggedIn, function(req, res, next) {
  res.render('circle');
});

router.get('/carre', isLoggedIn, function(req, res, next) {
  res.render('square');
});

router.get('/admin', isLoggedIn, function(req, res, next) {
  res.render('admin');
});

router.get('/savesecurity', isLoggedIn, function(req, res, next) {
  res.render('savesecurity');
});

function isLoggedIn(req, res, next) {
    // if the user is authenticated continue
    if (req.isAuthenticated())
        return next();

    res.render('index'); // carre, rond blabla
}


module.exports = router;
