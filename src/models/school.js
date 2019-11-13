/*
This file contains the the schema (essentially a class) for the database, that
holds the information for a list of Schools.
*/
// require mongoose
var mongoose = require('mongoose');
// create schoolSchema
var schoolSchema = new mongoose.Schema({
  school: Array
});
// create School Model
module.exports = mongoose.model('School', schoolSchema);
