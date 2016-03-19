var express = require('express');
var path = require('path');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

app.listen(app.get('port'), function(){
    console.log('App listening on port', app.get('port'));
});
