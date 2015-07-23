var express = require('express');
var passport = require('passport');
var router = express.Router();
var models = require('../models.js');
var ParamSecurite = models.ParamSecurite;


router.post('/',
  function(req, res) {
      var paramSecurite = new ParamSecurite({
    		maxLoginTry: req.body.maxLoginTry,
    		maxResetTryTime: req.body.maxResetTryTime,
    		blockSecondMaxLogin : req.body.blockSecondMaxLogin,
    		maxTimeSamePassword : req.body.maxTimeSamePassword,
    		passwordComplexityRegex : req.body.passwordComplexityRegex,
    		cantUseLastNumberPassword: req.body.cantUseLastNumberPassword
     });
     console.log(paramSecurite);
    paramSecurite.update(function (err) {
        if (err) return console.log(err);
          console.log('ParamSecurite save');
    });
});

module.exports = router;
