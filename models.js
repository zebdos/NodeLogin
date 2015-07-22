var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/GTI619');

var ParamSecurite = mongoose.model('ParamSecurite', {
  maxLoginTry: Number,
  maxResetTryTime: Number, // In minute
  blockSecondMaxLogin : Boolean,
  maxTimeSamePassword : Number, // In Day
  passwordComplexityRegex : String,
  cantUseLastNumberPassword: Number, // The user cannot use the last * password
});


var User = mongoose.model('User', {
  username: String,
  password : String, // The current password of the user
  salt : String,
  oldPasswords : [{ timeChange : Date, password: String, salt : String }],
  isAdmin : Boolean
});
