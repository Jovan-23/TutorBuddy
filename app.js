const express = require('express');
const app = express();
const session = require("express-session");
const bodyparser = require('body-parser');
const router = require('./routes/router.js');


const path = require('path');
const port = process.env.PORT || 3000

  




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


