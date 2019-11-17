const express = require("express");
const router = express.Router();
const path = require("path");
const credentials = require('./credentials.js');
const tutorsession = require('./tutorsession.js');

router.get('/', (req, res) => {
    res.render('index');
})

router.post('/clogin', credentials.doLogin);
router.post('/csignup', credentials.doRegister);
router.get('/signUp', credentials.showRegister);
router.get('/login', credentials.showLogin);
router.get('/logout', credentials.logout);

// get user booked sessions
router.get('/getSessions', tutorsession.getTutorSessions);

router.get('/findTutor', (req, res) => {
    
        res.render('findTutor');
})

router.get('/findTutor', (req, res) => {
    
    res.render('findTutor');
})

router.get('/post', (req, res) => {
    
    res.render('post');
})

router.get('/becomeTutor', (req, res) => {

    res.render('becomeTutor');
})

router.get('/userProfile', (req, res) => {

    res.render('userProfile');
})

module.exports = router;