var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/rond', function(req, res, next) {
  res.render('cercle');
});

router.get('/carre', function(req, res, next) {
  res.render('square');
});

router.get('/admin', function(req, res, next) {
  res.render('admin');

});

function isLoggedIn(req, res, next) {
    // if the user is authenticated continue
    if (req.isAuthenticated())
        return next();

    res.render('index'); // carre, rond blabla
}

module.exports = router;
