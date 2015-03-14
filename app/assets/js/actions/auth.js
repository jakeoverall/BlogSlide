var Login = require("../components/auth/Login");
var db = require('./../config/db-connect');

var Authenticated = {
    statics: {
        willTransitionTo: function (transition) {
            if (!db.actions.isLoggedIn()) {
                Login.attemptedTransition = transition;
                transition.redirect('login');
            }
        }
    }
};

module.exports = Authenticated;