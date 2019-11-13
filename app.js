const express = require('express');
const app = express();
const session = require("express-session");
const bodyparser = require('body-parser');
const router = require('./routes/router.js');
const mongoose = require("mongoose");

const path = require('path');
const port = process.env.PORT || 3000

  


mongoose
  .connect(
    "mongodb+srv://admin:admin@tutorbuddy-csxjn.azure.mongodb.net/TutorBuddy?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to mongo...\n"))
  .catch(err => console.log("Failed connection to mongo ", err));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    },
    rolling: true
}))

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.use(router);  
app.use(express.static('public'));

app.listen(port, () => {
    console.log('run');
});


