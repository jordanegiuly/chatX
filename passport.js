var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

passport.serializeUser(function(login, done) {
    done(null, login);
});

passport.deserializeUser(function(login, done) {
    done(null, {login: login});
});

passport.use('local-login', new LocalStrategy({
    usernameField : 'login',
    passwordField : 'password',
    passReqToCallback : true
}, function(req, login, password, done) {
    return done(null, login);
}));

module.exports = passport;
