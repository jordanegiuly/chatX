var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./passport.js')(passport);
var session = require('express-session');

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
