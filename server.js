var express = require('express');
var bodyParser = require('body-parser');
var api = require('./server/routes/api/api')


var app = express();
app.use(bodyParser.json());

var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

app.use("/api", api);


var server = app.listen(process.env.PORT || 8080, function(){
    var port = server.address().port;
    console.log('App is running on port ', port);
});

