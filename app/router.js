var express = require('express');
var _ = require('lodash');

module.exports = function(passport) {
    var router = express.Router();
    var modelsRouter = express.Router();

    router.get('/login', function(req, res){
        res.render('login.ejs');
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : false
    }));

    router.get('/', isLoggedIn, function(req, res){
        res.render('index.ejs', {
            user : req.user
        });
    });

    modelsRouter.use(isLoggedIn);
    router.use(require('./routes/rooms.js')(modelsRouter));
    router.use(require('./routes/messages.js')(modelsRouter));
    router.use(require('./routes/users.js')(modelsRouter));

    return router;
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
