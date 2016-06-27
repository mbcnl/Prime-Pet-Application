// dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Pet = require('../models/pet');
// get the express app
var app = express();

// URL to mongo db
var mongoURI = 'mongodb://localhost:27017/gotcha-db';
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

// post route to create
app.post('/createPet', function(req, res){
  console.log('hit createPet post route, req.body: ', req.body.name);
  // retrieved the req.body, put into object to be saved to db
  var addPetRecord = {
    name: req.body.name,
    type: req.body.type,
    age: req.body.age,
    bio: req.body.bio,
    img: req.body.img
  };
  console.log('in addPetRecord:', addPetRecord);
  var newPetRecord = Pet(addPetRecord);
  newPetRecord.save();
});

// get route to retrieve pet data
app.get('/getPet', function(req, res){
  console.log('hit getPet get route');
  Pet.find()
  .then(function(data){
    res.send(data);
  });
});

// delete route to delete pet by id
app.post('/deletePet', function (req, res){
  console.log(req.body.id);
  Pet.findOne({'_id': req.body.id}, function(err, pet){
    if(err){
      console.log(err);
    }else{
      Pet.remove({'_id': req.body.id}, function(err){
        if(err){
          console.log('remove ' + err);
        }else{
        }
      });
    }
  });
});
