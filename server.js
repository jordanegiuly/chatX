var express = require('express');

var app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

app.listen(app.get('port'), function(){
    console.log('App listening on port', app.get('port'));
});
