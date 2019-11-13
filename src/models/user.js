const mongoose = require("mongoose");


/*

This file contains the the schema (essentially a class) for the database, that
holds the information for a user account. This file will also contain the validation
for User account creation.

*/

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  }
 
});


exports.User = mongoose.model("User", schema);
