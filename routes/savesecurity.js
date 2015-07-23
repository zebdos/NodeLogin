var express = require('express');
var passport = require('passport');
var router = express.Router();


router.post('/savesecurity',
  passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/admin',
                                   failureFlash: true }, 
    function(req, res) {
    	console.log("YAY");
      /*var paramSecurit = new ParamSecurit({
		maxLoginTry: ,
		maxResetTryTime: ,
		blockSecondMaxLogin : ,
		maxTimeSamePassword : ,
		passwordComplexityRegex : ,
		cantUseLastNumberPassword: ,
	  });
      router.save(function (err) {
		if (err) return console.log(err);
		console.log('User admin save');
	  });*/
    })
);

module.exports = router;
