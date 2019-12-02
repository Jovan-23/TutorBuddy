const DB = require('../modules/db.js');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tutorbuddy2019@gmail.com', // generated ethereal user
      pass: 'tutor2019' // generated ethereal password
    }
});
/**
 * do tutor application page
 */
exports.doTutorApp = (req, res) => {
   
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
}

/**
 * show tutor application page
 */
exports.showTutorApp = (req, res) => {
    res.render('becomeTutor');
}
