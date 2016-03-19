var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./passport.js')(passport);
var session = require('express-session');
var _ = require('lodash');

var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(req, res){
    res.render('login.ejs');
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : false
}));

app.get('/', isLoggedIn, function(req, res){
    res.render('index.ejs', {
        user : req.user
    });
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('login', function(user){
        console.log('User', user, 'logged in');
    });
    socket.on('create room', function(room){
        io.emit('create room', room);
    });
});

http.listen(app.get('port'), function(){
    console.log('App listening on port', app.get('port'));
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.get('/rooms', isLoggedIn, function(req, res) {
    res.json(rooms);
});

app.get('/rooms/:id', isLoggedIn, function(req, res) {
    var room = _.find(rooms, function(room) {
        console.log(room.id);
        return room.id === parseInt(req.params.id);
    });
    console.log('/rooms/', req.params.id, room);
    res.json(room);
});

app.get('/posts', isLoggedIn, function(req, res) {
    console.log(req.query);
    var _posts = _.filter(posts, function(post) {
        return post.roomId === parseInt(req.query.roomId);
    });
    res.json(_posts);
});

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

var rooms = [
    {
        id: 1,
        name: "first Room",
        adminId: 1
    },
    {
        id: 2,
        name: "second Room",
        adminId: 2
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
