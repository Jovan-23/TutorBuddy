const DB = require('../modules/db.js');
const credentials = require('./credentials.js');

exports.getTutorSessions = (req, res) => {
   
    DB.find('BookedSession', {}, (err, data) => {
        if (err) throw err;
        res.json({"data": data, 
                  "email": req.session.userinfo.email
                });
    });

}

exports.getPostedSessions = (req, res) => {

    DB.find('PostedSession',{}, (err,data) =>{
        if(err) throw err;
        res.json({"data": data,
                  "email" : req.session.userinfo.email,
                });
    });
}

exports.postBookedSessions = (req, res) => {
    let tutorEmail = req.body.tutorEmail;
    let tutorName = req.body.tutorName;
    let studentEmail = req.session.userinfo.email;
    let studentName = req.session.userinfo.username;
    let course = req.body.course;
    let location = req.body.location;
    let time = req.body.time;
    let date = req.body.date;
    let rate = req.body.rate;
    DB.insert('BookedSession', 
    {"tutorEmail" : tutorEmail,
     "tutorName" : tutorName,
     "studentEmail" : studentEmail,
     "studentName" : studentName,
     "course" : course,
     "location" : location,
     "time" : time,
     "date" : date,
     "rate" : rate
    }, (err,data) =>{
        if(err) throw err;
        else {
            res.json({"Post BookedSession" : "success"})
        }
    })
}

exports.deletePostedSessions = (req, res) =>{
    console.log(req.body._id);
    DB.deleteOne('PostedSession', {"_id" : new DB.ObjectID(req.body._id)},(err,data) =>{
        if (err) throw err;
    });
}