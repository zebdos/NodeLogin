var _ = require('underscore');

var connectRoles = require('connect-roles');
var roles = new connectRoles({
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

// roles.use(function (req, action) {
//   if (!req.isAuthenticated()) return action === 'access home page';
// });

roles.use(function (req) {
    if (!req.user[0]) {
        return true;
    }
});

// roles.use(function (req, act) {
//   console.log('toto');
//   // Admin has all rights
//   if (req.user.hasRole('admin')) return true;
//   switch (act) {
//     case 'admin':
//       return req.user.hasRole('admin');
//       break;
//     case 'carre':
//       return req.user.hasRole('carre')
//       break;
//     case 'rond':
//       req.user.hasRole('rond')
//       break;
//     default:
//   }
// });

roles.use('admin', function (req) {
  if (req.user[0].hasRole('admin')) {
    return true;
  }
});

roles.use('carre', function (req) {
  if (req.user[0].hasRole('carre')) {
    return true;
  }
});

roles.use('rond', function (req) {
  if (req.user[0].hasRole('rond')) {
    return true;
  }
});


// module.exports = {
//   middleware : roles.middleware,
//   roles : roles
// };

module.exports = roles;
