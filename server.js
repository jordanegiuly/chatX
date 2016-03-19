var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(app.get('port'), function(){
    console.log('App listening on port', app.get('port'));
});
