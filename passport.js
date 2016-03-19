var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User = require('./app/models/user');

passport.serializeUser(function(user, done) {
    done(null, user.login);
});

passport.deserializeUser(function(login, done) {
    done(null, User.find(login));
});

passport.use('local-login', new LocalStrategy({
    usernameField : 'login',
    passwordField : 'login',
    passReqToCallback : true
}, function(req, login, password, done) {
    console.log("local-login");
    var user = User.find(login);
    if (user) {
        console.log('found user', user);
        return done(null, user);
    }
    else {
        user = User.create(login);
        console.log('new user', user);
        return done(null, user);
    }
}));

module.exports = passport;
