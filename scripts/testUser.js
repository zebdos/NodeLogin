var models = require('../models.js');
var User = models.User;


 User.findOne({username:"admin"}, function (err, user){
   console.log("Good Password:"+user.verifyPassword('admin'));
   console.log("Bad Password:"+user.verifyPassword('1234'));
   console.log("Has role rond :"+user.hasRole("rond"));
   console.log("Has role carre :"+user.hasRole("carre"));

 });


User.findOne({username:"carre"}, function (err, user) {
  user.changePassword('carre2',"salt2");
  console.log("Carre has role rond :"+user.hasRole("rond"));
  user.save(function(err){
    if (err) return console.log(err);
    console.log("test change password:"+user.verifyPassword('carre2'));
  });
});
