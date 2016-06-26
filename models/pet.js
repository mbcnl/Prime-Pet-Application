var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// constructor to create schema
var petSchema = new Schema({
  name: String,
  type: String,
  age: Number,
  bio: String,
  img: String
});

// create collection
var Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
