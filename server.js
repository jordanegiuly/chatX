var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

var app = express();
var server = require('http').Server(app);
var passport = require('./passport.js');

var io = require('socket.io')(server);

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

io.on('connection', require('./app/socket.js')(io));
app.use(require('./app/router.js')(passport));

server.listen(app.get('port'), function(){
    console.log('App listening on port', app.get('port'));
});
