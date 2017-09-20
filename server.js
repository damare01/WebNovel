var express = require('express');
var bodyParser = require('body-parser');
var api = require('./server/routes/api/api')


var app = express();
app.use(bodyParser.json());

app.use("/api", api);



var server = app.listen(process.env.PORT || 8080, function(){
    var port = server.address().port;
    console.log('App is running on port ', port);
});

