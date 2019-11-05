const express = require('express');
const app = express();
const session = require("express-session");
const bodyparser = require('body-parser');
const login = require('./routes/login.js');
const register = require('./routes/register.js');

const path = require('path');
const port = process.env.PORT || 3000
const DB=require('./modules/db.js');  

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

app.use(express.static('public'));

app.get('/',(req, res) => {
    // var data={"fName":"Kag"};
    // DB.find('User',data,(err,data)=>{
    //     console.log(data);
    // })
    res.render('index');
})

app.get('/findTutor',(req, res) => {
    res.render('findTutor');
})

app.get('/becomeTutor',(req, res) => {
    res.render('becomeTutor');
})
app.get('/signUp',(req, res) => {
    res.render('signUp');
})
app.get('/useProfile',(req, res) => {
    res.render('userProfile');
})
app.get('/login',(req, res) => {
    res.render('login');
})


app.listen(port, () => {
    console.log('run');
});
