const express = require("express");
const router = express.Router();
const path = require("path");
const credentials = require('./credentials.js');
const tutorsession = require('./tutorsession.js');
const DB = require('../modules/db.js');
const adminSession = require('./adminSession.js');

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

// get all posted sessions
router.get('/getPostedSessions', tutorsession.getPostedSessions);
router.post('/postBookedSessions', tutorsession.postBookedSessions)

// get tutor applications
router.get('/getAdminSession', adminSession.getAdminSession);

// get tutor applications
router.post('/updateAdminSession', adminSession.updateAdminSession);
router.post('/deleteTutor', adminSession.deleteTutor);


router.get('/findTutor', (req, res) => {    
        res.render('findTutor');
})


router.get('/findTutor', (req, res) => {
    res.render('findTutor');
})

router.get('/post', (req, res) => {
    res.render('post');
})

router.post('/doPost', (req, res) => {
    console.log(req.body);
    let data = req.body;
    data.tutorEmail = req.session.userinfo.email;
    data.tutorName = req.session.userinfo.username;
    DB.insert('PostedSession', data, (err, data) => {
        if (!err) {
            res.json({ "post": "ok" })
        } else {
            res.json({ "post": "fail" })
        }
    })
   
})
router.get('/becomeTutor', (req, res) => {
    res.render('becomeTutor');
})


router.post('/tutorApp', (req, res) => {
    console.log(req.body);
    let data = req.body;
    data.email = req.session.userinfo.email;
    data.tutorName = req.session.userinfo.username;
    DB.insert('TutorApplication', data, (err, data) => {
        if (!err) {
            res.json({ "apply": "ok" })
        } else {
            res.json({ "apply": "fail" })
        }
    })

});

router.get('/userProfile', (req, res) => {
    res.render('userProfile');
})

// administrator view index page
router.get('/indexAdminView', (req, res) => {
    res.render('indexAdminView');
})

// administrator view pending tutors page
router.get('/pendingTutors', (req, res) => {
    res.render('pendingTutors');
})

// administrator view current tutors page
router.get('/currentTutors', (req, res) => {
    res.render('currentTutors');
})

router.get('/getCourseInfo', (req, res) => {

    
    DB.find('Course',{} , (err, data) => {
        if (err) throw err;
       
        if (data.length <= 0) {
            console.log("error");
            return;
        } else {
           res.json({"data":data})
        }
    })
})


module.exports = router;