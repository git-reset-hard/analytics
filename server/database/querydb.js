const config = require('../config/env.json')[process.env.NODE_ENV || 'development'];
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = mongoose.connect(config.mongoConnect, {
  useMongoClient: true
});


var querySchema = mongoose.Schema({
  queryID: String,
  userId: String,
  list: Array,
  searchTerm: String,
  location: String,
  date: Date,
  isPersonalized: Boolean
});

var Query = mongoose.model('Query', querySchema);

var listSchema = mongoose.Schema({
  queryID: String,
  listID: String,
  list: Array,
  isPersonalized: Boolean
});

var List = mongoose.model('List', listSchema);


module.exports = {
  Query,
  List
};