const DB = require('../modules/db.js');
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

exports.getAdminSession = (req, res) => {
    DB.find('TutorApplication', {},(err, data) => {
        
        if (err) throw err;
        res.json({"data":data})
    });
}

exports.updateAdminSession = (req, res) => {
    DB.update('TutorApplication',{"_id": new DB.ObjectID(req.body.id)}, {"status":"accepted"} ,(err, data)=> {
        if (err) throw err;
        // send mail with defined transport object
        let mailOption = {
            from: 'tutorbuddy2019@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "TutorBuddy - Approved", // Subject line
            text: "Approved Application",
            html: '<p>Hi ' + req.body.name + ',</p> ' +
                    '<p>Congratulations! Here are the informaton of the approved course: </p> ' + 
                    '<ul> <li>School: '  + req.body.school +' </li> ' + 
                        ' <li>Subject: ' + req.body.subject + '</li> <li>Course: ' + req.body.course + '</li></ul>'
                    + '<p> Go ahead and post your first tutoring session with TutorBuddy! </p>' +
                    '<p>Thank you,<br/>TutorBuddy</p>'
            };
        // send the email
        transporter.sendMail(mailOption, function(err, data) {
            if(err) {
                console.log("Sending Email failed: ", err);
            } else {
                console.log("Email Sent!");
            }
        });
        res.json({"update":"ok"})
    });
}

exports.deleteTutor = (req, res) => {
    DB.deleteOne('TutorApplication',{"_id": new DB.ObjectID(req.body.id)},(err, data)=> {
        
       
        if(!err){
            // send mail with defined transport object
        let mailOption = {
            from: 'tutorbuddy2019@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "TutorBuddy - Rejected", // Subject line
            text: "Rejected Application",
            html: '<p>Hi ' + req.body.name + ',</p> ' +
                    '<p>Sorry to let you know that your application for: </p> ' + 
                    '<ul> <li>School: '  + req.body.school +' </li> ' + 
                        ' <li>Subject: ' + req.body.subject + '</li> <li>Course: ' + req.body.course + '</li></ul>'
                    + '<p> is rejected. <br/>Please apply again when you meet our requirements! </p>' +
                    '<p>Thank you,<br/>TutorBuddy</p>'
            };
        // send the email
        transporter.sendMail(mailOption, function(err, data) {
            if(err) {
                console.log("Sending Email failed: ", err);
            } else {
                console.log("Email Sent!");
            }
        });
			res.json({ "delete": "ok" });
        }
    });
}