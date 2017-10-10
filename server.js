var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
const router = require('./server/routes/router');


var app = express();
var ssl = require('express-ssl');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(logger(process.env.NODE_ENV === 'development' ? 'dev':'combined'));

//Enable CORS
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

const port = process.env.PORT || 8080;
app.set('port', port);

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

router(app);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/application.html');
});

var server = app.listen(port, function(){
    var port = server.address().port;
    console.log('App is running on port', port);
});

