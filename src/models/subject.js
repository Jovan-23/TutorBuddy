/*
This file contains the the schema (essentially a class) for the database, that
holds the information for a list of subjects of a specific school.
*/
// require mongoose
var mongoose = require("mongoose");
// create schoolSchema
var subjectSchema = new mongoose.Schema({
  school: String,
  subject: Array
});
// create School Model
module.exports = mongoose.model("Subject", subjectSchema);
