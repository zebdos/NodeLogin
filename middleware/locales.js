var _ = require('underscore');

module.exports = function(req, res, next) {
    var locales = {};
    locales.isAuthenticated = req.isAuthenticated();
    if (req.isAuthenticated()) locales.username = req.user[0].username;
    if (req.isAuthenticated()) locales.user = req.user[0];
    _.extendOwn(res.locals, locales);
    next();
};
