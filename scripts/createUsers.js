var models = require('../models.js');
var User = models.User;
User.find({}).remove().exec();

var admin = new User({
  username: "admin",
  password : "admin",
  salt : "qwerty123",
  oldPasswords : [],
  isAdmin : true,
  lastLogin: Date.now(),
  isLock: false,
  hasFailMaxTry: false
});

var carre = new User({
  username: "carre",
  password : "carre",
  salt : "qaaawerty123",
  oldPasswords : [],
  isAdmin : false,
  lastLogin: Date.now(),
  isLock: false,
  hasFailMaxTry: false
});

var rond = new User({
  username: "rond",
  password : "rond",
  salt : "qadsadsty123",
  oldPasswords : [],
  isAdmin : false,
  lastLogin: Date.now(),
  isLock: false,
  hasFailMaxTry: false
});

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
