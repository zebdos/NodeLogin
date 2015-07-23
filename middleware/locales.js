var _ = require('underscore');

module.exports = function(req, res, next) {
    var locales = {};
    locales.isAuthenticated = req.isAuthenticated();
    if (req.isAuthenticated()) locales.username = req.user.username;
    _.extendOwn(res.locals, locales);
    console.log(res.locals);
    next();
};
