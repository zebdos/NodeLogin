var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/login/',
  passport.authenticate('local', { successRedirect: '/changePassword',
                                   failureRedirect: '/changePassword',
                                   failureFlash: true }, 
    function(req, res) {
    	console.log("t ");

    })
);

module.exports = router;
