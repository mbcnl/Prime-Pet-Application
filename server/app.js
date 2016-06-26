// dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// get the express app
var app = express();

// URL to mongo db
var mongoURI = 'mongodb://localhost:27017/DATABASENAME';
// connects to db & document store, returns object to give access to client
var MongoDB = mongoose.connect(mongoURI).connection;
// on error message
MongoDB.on('error', function(err){
  console.log('mongodb connection error:', err);
});
// once open success message
MongoDB.once('open', function(){
  console.log('mongodb connection open!');
});

// parse json
app.use(bodyParser.json());
// set static folder to public
app.use(express.static('public'));

// spin up the server
var server = app.listen(8000, 'localhost', function(req, res){
  console.log('server listening: 8000');
});

// base url to show path resolved index.html
app.get('/', function(req, res){
  res.sendFile(path.resolve('views/index.html'));
});

// get route to retrieve
app.get('/getRoute', function(req, res){

});

// post route to create
app.post('/postRoute', function(req, res){

});
