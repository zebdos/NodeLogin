var _ = require('underscore');

var connectRoles = require('connect-roles');
var roles;
module.exports = function(app) {

    if (app) {
      roles = new connectRoles({
        failureHandler: function (req, res, action) {
          // optional function to customise code that runs when
          // user fails authorisation
          var accept = req.headers.accept || '';
          res.status(403);
          if (~accept.indexOf('html')) {
            res.render('access-denied', {action: action});
          } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
          }
        }
      });
      app.use(roles.middleware());

      roles.use('admin', function (req) {
        console.log(req.user);
        if (req.user[0].hasRole('admin')) {
          return true;
        }
      });

      roles.use('carre', function (req) {
        console.log(req.user);
        if (req.user[0].hasRole('carre')) {
          return true;
        }
      });

      roles.use('rond', function (req) {
        console.log(req.user);
        if (req.user[0].hasRole('rond')) {
          return true;
        }
      });
    }
    else {
      return roles;
    }
};
