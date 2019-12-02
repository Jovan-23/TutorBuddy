const express = require("express");
const router = express.Router();
const path = require("path");
const credentials = require('./credentials.js');
const postsession = require('./postSession.js');
const tutorsession = require('./tutorsession.js');
const tutorAppSession = require('./tutorAppSession.js');
const courseHelper = require('./course.js');
const adminSession = require('./adminSession.js');


/**
 * show index page
 */
router.get('/', (req, res) => {
    res.render('index');
})
/**
 * show find tutor page
 */
router.get('/findTutor', (req, res) => {    
    res.render('findTutor');
})

/**
 * show user profile page
 */
router.get('/userProfile', (req, res) => {
    res.render('userProfile');
})


// get user booked sessions
router.get('/getSessions', tutorsession.getTutorSessions);

// get all posted sessions
router.get('/getPostedSessions', tutorsession.getPostedSessions);
router.post('/postBookedSessions', tutorsession.postBookedSessions)

//delete posted sessions
router.post('/deletePostedSessions',tutorsession.deletePostedSessions);

// get tutor applications
router.get('/getAdminSession', adminSession.getAdminSession);

// get tutor applications
router.post('/updateAdminSession', adminSession.updateAdminSession);
router.post('/deleteTutor', adminSession.deleteTutor);

// administrator view index page
router.get('/admin', (req, res) => {
    res.render('admin');
})

// administrator view pending tutors page
router.get('/pendingTutors', (req, res) => {
    res.render('pendingTutors');
})

// administrator view current tutors page
router.get('/currentTutors', (req, res) => {
    res.render('currentTutors');
})


/**
 * user login
 */
router.post('/clogin', credentials.doLogin);
/**
 * user register
 */
router.post('/csignup', credentials.doRegister);
/**
 * show register page
 */
router.get('/signUp', credentials.showRegister);
/**
 * show login page
 */
router.get('/login', credentials.showLogin);
/**
 * user logout
 */
router.get('/logout', credentials.logout);


/**
 * show tutor application page
 */
router.get('/becomeTutor',tutorAppSession.showTutorApp )

/**
 * do tutor application page
 */
router.post('/tutorApp',tutorAppSession.doTutorApp );

/**
 * show post session page
 */
router.get('/post', postsession.showPost);
/**
 * tutor post session
 */
router.post('/doPost', postsession.doPost );

/**
 * get course info
 */
router.get('/getCourseInfo',courseHelper.showCourseInfo );
/**
 * get approval course info
 */
router.get('/getApprCourseInfo', courseHelper.showApprCourseInfo);


module.exports = router;