var models = require('../models.js');
var User = models.User;
var ParamSecurite = models.ParamSecurite;
User.find({}).remove().exec();
ParamSecurite.find({}).remove().exec();

var admin = new User({
  username: "admin",
  password : "admin",
  salt : "bfbab2c6afbab13f7f18cf8091c3b51f",
  oldPasswords : [],
  isAdmin : true,
  lastLogin: Date.now(),
  isLock: false,
  hasFailMaxTry: false,
  roles: ["admin","rond","carre"]
});

var carre = new User({
  username: "carre",
  password : "carre",
  salt : "0a776e8b216f065fe345ff6ce851ff35",
  oldPasswords : [],
  isAdmin : false,
  lastLogin: Date.now(),
  isLock: false,
  hasFailMaxTry: false,
  roles: ["carre"]
});

var rond = new User({
  username: "rond",
  password : "rond",
  salt : "2be4fcf6013f370d2b6a84707865d367",
  oldPasswords : [],
  isAdmin : false,
  lastLogin: Date.now(),
  isLock: false,
  hasFailMaxTry: false,
  roles: ["rond"]
});

var paramSecurite = new ParamSecurite({
  name: 'default',
  maxLoginTry: 3,
  maxResetTryTime: 5,
  blockSecondMaxLogin : true,
  maxTimeSamePassword : 15,
  passwordComplexityRegex : '',
  cantUseLastNumberPassword: 3
});

paramSecurite.save(function (err) {
  if (err) return console.log(err);
  console.log('Param securite save');
})

admin.save(function (err) {
  if (err) return console.log(err);
  console.log('User admin save');
});

carre.save(function (err) {
  if (err) return console.log(err);
  console.log('User carre save');
});

rond.save(function (err) {
  if (err) return console.log(err);
  console.log('User rond save');
});
