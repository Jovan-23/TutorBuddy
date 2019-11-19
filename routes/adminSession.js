const DB = require('../modules/db.js');

exports.getAdminSession = (req, res) => {
    DB.find('TutorApplication', {},(err, data) => {
        
        if (err) throw err;
        res.json({"data":data})
    });
}

exports.updateAdminSession = (req, res) => {
    DB.update('TutorApplication',{"_id": new DB.ObjectID(req.body.id)}, {"status":"accepted"} ,(err, data)=> {

       
        if (err) throw err;
        res.json({"update":"ok"})
    });
}

exports.deleteTutor = (req, res) => {
    DB.deleteOne('TutorApplication',{"_id": new DB.ObjectID(req.body.id)},(err, data)=> {

       
        if(!err){
			res.json({ "delete": "ok" });
        }
    });
}