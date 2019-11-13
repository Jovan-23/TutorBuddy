/*
This file contains the the schema (essentially a class) for the database, that
holds the information for a list of course of a specific school.
*/
// require mongoose
var mongoose = require("mongoose");
// create schoolSchema
var courseSchema = new mongoose.Schema({
  school: String,
  subject: String,
  course: Array
});
// create School Model
module.exports = mongoose.model("Course", courseSchema);
