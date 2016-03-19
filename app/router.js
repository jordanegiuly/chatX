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

    // router.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/',
    //     failureRedirect : '/login',
    //     failureFlash : false
    // }));

    router.get('/', isLoggedIn, function(req, res){
        res.render('index.ejs', {
            user : req.user
        });
    });

    modelsRouter.use(isLoggedIn);
    router.use(require('./routes/rooms.js')(modelsRouter));
    // router.use(require('./routes/posts.js')(modelsRouter));
    // router.use(require('./routes/users.js')(modelsRouter));

    router.get('/posts', isLoggedIn, function(req, res) {
        var _posts = _.filter(posts, function(post) {
            return post.roomId === parseInt(req.query.roomId);
        });
        console.log('GET /posts', req.query, _posts);
        res.json(_posts);
    });

    return router;
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// fake data

var users = [
    {
        id: 1,
        login: "first",
        avatar: ""
    },
    {
        id: 2,
        login: "second",
        avatar: ""
    }
];

var posts = [
    {
        id: 1,
        authorId: 1,
        roomId: 1,
        content: "Hey there!",
        timestamp: ""
    },
    {
        id: 2,
        authorId: 1,
        roomId: 1,
        content: "Wassup?",
        timestamp: ""
    },
    {
        id: 3,
        authorId: 2,
        roomId: 1,
        content: "I'm here.",
        timestamp: ""
    },
    {
        id: 4,
        authorId: 2,
        roomId: 2,
        content: "I'm all alone",
        timestamp: ""
    }
];
