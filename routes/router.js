const express = require("express");
const router = express.Router();
const path = require("path");
const register = require('./register.js');



router.get('/', (req, res) => {
    res.render('index');
})
router.post('/clogin', register.doLogin);
router.post('/csignup', register.doRegister);
router.get('/signUp', register.showRegister);
router.get('/login', register.showLogin);
router.get('/logout', register.logout);



router.get('/findTutor', (req, res) => {
    
        res.render('findTutor');

    
   

})

router.get('/becomeTutor', (req, res) => {


    res.render('becomeTutor');


})

router.get('/useProfile', (req, res) => {

    res.render('userProfile');


})

router.get("/home", (req, res) => {

    res.render("home");
});




module.exports = router;