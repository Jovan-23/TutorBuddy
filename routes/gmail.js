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

// email of new application
exports.newApplication = (req, res) => {
    // send mail with defined transport object
    let mailOption1 = {
        from: 'tutorbuddy2019@gmail.com', // sender address
        to: 'tutorbuddy2019@gmail.com', // list of receivers
        subject: "TutorBuddy - New Application", // Subject line
        text: "New Application",
        html: '<p>You have received a new tutor application!</p> ' +
                '<h3>Tutor Application Information</h3> <ul> ' + '<li>Tutor Name: '  + req.session.userinfo.username +'</li>' + 
                '<li>Tutor Email: '  + req.session.userinfo.email +'</li>' + '<li>School: '  + req.body.school +' </li> ' + 
                ' <li>Subject: ' + req.body.subject + '</li> <li>Course: ' + req.body.course + '</li> '+
                ' <li>Education: ' + req.body.education + '</li> <li>GPA: ' + req.body.GPA + '</li></ul> '  // html body
    };
    transporter.sendMail(mailOption1, function(err, data) {
        if(err) {
            console.log("Sending Email failed: ", err);
        } else {
            console.log("Email Sent!");
        }
    });
}

// // approved for being a tutor 
// exports.approvingTutor = (req, res) => {
//     // send mail with defined transport object
//     let mailOption2 = {
//       from: 'Tutorbuddy2019@gmail.com', // sender address
//       to: req.session.userinfo.email, // list of receivers
//       subject: "TutorBuddy - Approved!", // Subject line
//       text: "Hi " + req.session.userinfo.username + "," + 
//             "\n\nCongratulations! You are now an approved tutor on TutorBuddy! \n " +
//              "Go ahead and post your first tutor session!\n\n" + "Thank you," // plain text body
//       };
  
//       transporter.sendMail(mailOption2, function(err, data) {
//           if(err) {
//               console.log("Sending Email failed: ", err);
//           } else {
//               console.log("Email Sent!");
//           }
//       });
//   }

//   // reject for being a tutor 
// exports.rejectingTutor = (req, res) => {
//     // send mail with defined transport object
//     let mailOption2 = {
//       from: 'Tutorbuddy2019@gmail.com', // sender address
//       to: req.session.userinfo.email, // list of receivers
//       subject: "TutorBuddy - Rejected!", // Subject line
//       text: "Congratulations! You are now an approved tutor on TutorBuddy! \n " +
//              "Go ahead and post your first tutor session!" // plain text body
//       };
  
//       transporter.sendMail(mailOption2, function(err, data) {
//           if(err) {
//               console.log("Sending Email failed: ", err);
//           } else {
//               console.log("Email Sent!");
//           }
//       });
//   }

