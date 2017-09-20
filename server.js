var express = require('express');
var bodyParser = require('body-parser');
var api = require('./server/routes/api/api');

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + '/dist/';
app.use(express.static(distDir));
app.use("/api", api);

/** Hack for getting swagger ui to work properly without having to add dist folder to git */
app.get('/api-docs', (req,res)=>{
  res.sendFile(__dirname + '/api-docs/index.html');
});

app.get('/swagger-ui.css', (req,res)=>{
  res.sendFile(__dirname + '/api-docs/swagger-ui.css');
});

app.get('/swagger-ui-bundle.js', (req,res)=>{
  res.sendFile(__dirname + '/api-docs/swagger-ui-bundle.js');
});

app.get('/swagger-ui-standalone-preset.js', (req,res)=>{
  res.sendFile(__dirname + '/api-docs/swagger-ui-standalone-preset.js');
});


var server = app.listen(process.env.PORT || 8080, function(){
    var port = server.address().port;
    console.log('App is running on port ', port);
});

