const express = require("express");
const router = express.Router();
const path = require("path");
const credentials = require('./credentials.js');
const tutorsession = require('./tutorsession.js');
const DB = require('../modules/db.js');
const adminSession = require('./adminSession.js');
// for email notification
const nodemailer = require('nodemailer');

//  sender
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tutorbuddy2019@gmail.com', // generated ethereal user
      pass: 'tutor2019' // generated ethereal password
    }
});

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
    
    let reqData = req.body;
     reqData.tutorEmail = req.session.userinfo.email;
     reqData.tutorName = req.session.userinfo.username;
    let email = req.session.userinfo.email;
    let subject= req.body.subject;
    let courseNumber=req.body.course;
    let school=req.body.school;
   

   
    


    DB.find('TutorApplication', { email,school,subject,courseNumber}, (err, data) => {
        if (err) throw err;
       
      
        if (data.length ==1&&data[0].status=="accepted") {
          
           reqData.Rate=data[0].Rate;
           
            DB.insert('PostedSession', reqData, (err, data) => {
              
                if (!err) {
                    res.json({ "post": "ok" })
                } else {
                    res.json({ "post": "fail" })
                }
            })
           
            return;
        } else {
           
        }
    })

    
   
})
router.get('/becomeTutor', (req, res) => {
    res.render('becomeTutor');
})


router.post('/tutorApp', (req, res) => {
   
    let dataInfo = req.body;
    dataInfo.email = req.session.userinfo.email;
    dataInfo.tutorName = req.session.userinfo.username;

    DB.insert('TutorApplication', dataInfo, (err, data) => {
        if (!err) {
            // send mail with defined transport object
            let mailOption = {
                from: 'tutorbuddy2019@gmail.com', // sender address
                to: 'tutorbuddy2019@gmail.com', // list of receivers
                subject: "TutorBuddy - New Application", // Subject line
                text: "New Application",
                html: '<p>You have received a new tutor application!</p> ' +
                        '<h3>Tutor Application Information</h3> <ul> ' + '<li>Tutor Name: '  + req.session.userinfo.username +'</li>' + 
                        '<li>Tutor Email: '  + req.session.userinfo.email +'</li>' + '<li>School: '  + dataInfo.school +' </li> ' + 
                        ' <li>Subject: ' + dataInfo.subject + '</li> <li>Course: ' + dataInfo.course + '</li> '+
                        ' <li>Education: ' + dataInfo.education + '</li> <li>GPA: ' + dataInfo.GPA + '</li> <li>Rate: ' + dataInfo.Rate + '</li></ul> '  // html body
            };
            // send the email
            transporter.sendMail(mailOption, function(err, data) {
                if(err) {
                    console.log("Sending Email failed: ", err);
                } else {
                    console.log("Email Sent!");
                }
            });
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