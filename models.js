var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/GTI619');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var ParamSecurite = new Schema({
  name: String,
  date: { type: Date, default: Date.now },
  maxLoginTry: Number,
  maxResetTryTime: Number, // In minute
  blockSecondMaxLogin : Boolean,
  maxTimeSamePassword : Number, // In Day
  passwordComplexityRegex : String,
  cantUseLastNumberPassword: Number // The user cannot use the last * password
});



var User = new Schema({
  username: String,
  password : String, // The current password of the user
  salt : String,
  oldPasswords : [{ timeChange : Date, password: String, salt : String }],
  isAdmin : Boolean,
  numberLoginTry: {type: Number, default: 0},
  lastConnectionFailDate: { type: Date, default: Date.now },
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

User.methods.changePassword = function (newPassword) {
  var oldPassord = this.password;
  var oldSalt = this.salt;

  var oldPasswordObj = {
    oldPassord: this.password,
    oldSalt: this.salt,
    timeChange : Date.now()
  };
  this.password = newPassword;
  this.salt = this.createSalt(32);
  this.oldPasswords.push(oldPasswordObj);
  this.save();
};

// Function used to generate salts (not used for authentication)
User.methods.createSalt = function (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
};

User.methods.verifyPassword = function (password) {
  return hashPassword(password, this.salt) == this.password;
};

User.methods.hasRole = function (roleName) {
  return this.roles.indexOf(roleName) != -1;
};

User.methods.alreadyUsedPassword = function (nbPassword, newPassword) {
  // for ( i= this.oldPasswords.length-1; i >= 0 i-nbPassword != i; --i) {
  //   var oldPassword = this.oldPasswords;
  // }
  // return true;
};

function hashPassword (password, salt) {
  return crypto.pbkdf2Sync(password, salt, 4096, 512, 'sha512').toString('hex');
}

module.exports = {
  User: mongoose.model("User", User),
  ParamSecurite: mongoose.model("ParamSecurite", ParamSecurite)
};
