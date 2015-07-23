var _ = require('underscore');

var connectRoles = require('connect-roles');
var roles = new connectRoles();


module.exports = {
  middleware : roles.middleware,
  roles : roles
};
