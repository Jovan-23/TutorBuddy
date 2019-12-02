const DB = require('../modules/db.js');
const credentials = require('./credentials.js');


//Access to BookedSession table. Grab all data.
exports.getTutorSessions = (req, res) => {
    DB.find('BookedSession', {}, (err, data) => {
        if (err) throw err;
        res.json({"data": data, 
                  "email": req.session.userinfo.email
                });
    });

}

//Access to PostedSession table. Grab all data.
exports.getPostedSessions = (req, res) => {
    DB.find('PostedSession',{}, (err,data) =>{
        if(err) throw err;
        res.json({"data": data,
                  "email" : req.session.userinfo.email,
                });
    });
}

//Insert a booked session from findTutor.
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
    }, (err,data) =>{
        if(err) throw err;
        else {
            res.json({"Post BookedSession" : "success"})
        }
    })
}

//Remove PostedSession once booked.
exports.deletePostedSessions = (req, res) =>{
    DB.deleteOne('PostedSession', {"_id" : new DB.ObjectID(req.body._id)},(err,data) =>{
        if (err) throw err;
    });
}