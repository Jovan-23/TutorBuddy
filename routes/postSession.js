const DB = require('../modules/db.js');

/**
 * show post session
 */
exports.showPost = (req, res) =>{
    res.render('post');
}

/**
 * tutor post session
 */
exports.doPost = (req, res) => {
    
    let reqData = req.body;
     reqData.tutorEmail = req.session.userinfo.email;
     reqData.tutorName = req.session.userinfo.username;
    let email = req.session.userinfo.email;
    let subject= req.body.subject;
    let course=req.body.course;
    let school=req.body.school;

    DB.find('TutorApplication', { email,school,subject,course}, (err, data) => {
        if (err) throw err;
        if (data.length ==1&&data[0].status=="accepted") {
            console.log("accepted");
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

    
   
}