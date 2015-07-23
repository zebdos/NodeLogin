var _ = require('underscore');

module.exports = function(roleName) {
  return function(req, res, next) {

    if (req.user[0].hasRole(roleName)) {
      return next();
    }
    else {
      res.render(403); // forbidden
    }
  };
};
