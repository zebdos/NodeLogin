var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/GTI619');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var ParamSecurite = new Schema({
  date: { type: Date, default: Date.now },
  maxLoginTry: Number,
  maxResetTryTime: Number, // In minute
  blockSecondMaxLogin : Boolean,
  maxTimeSamePassword : Number, // In Day
  passwordComplexityRegex : String,
  cantUseLastNumberPassword: Number, // The user cannot use the last * password
});



var User = new Schema({
  username: String,
  password : String, // The current password of the user
  salt : String,
  oldPasswords : [{ timeChange : Date, password: String, salt : String }],
  isAdmin : Boolean,
  lastLogin: Date,
  isLock: Boolean,
  hasFailMaxTry: Boolean, //connect has fail the maximum number of try
  roles : [String]
});

User.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
      user.password = hashPassword(user.password, user.salt);
  }
  return next();
});

User.methods.changePassword = function (newPassword, newSalt) {
  var oldPassord = this.password;
  var oldSalt = this.salt;

  var oldPasswordObj = {
    oldPassord: this.password,
    oldSalt: this.salt,
    timeChange : Date.now()
  };
  this.password = newPassword;
  this.salt = newSalt;
  this.oldPasswords.push(oldPasswordObj);
};

User.methods.verifyPassword = function (password) {
  return hashPassword(password, this.salt) == this.password;
};

User.methods.hasRole = function (roleName) {
  return this.roles.indexOf(roleName) != -1;
};

function hashPassword (password, salt) {
  return crypto.pbkdf2Sync(password, salt, 4096, 512, 'sha512');
}

module.exports = {
  User: mongoose.model("User", User),
  ParamSecurite: mongoose.model("ParamSecurite", ParamSecurite)
};
