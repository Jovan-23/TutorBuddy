const DB = require('../modules/db.js');

exports.getAdminSession = (req, res) => {
    DB.find('TutorApplication', {},(err, data) => {
        console.log(data);
        if (err) throw err;
        res.json({"data":data})
    });
}

exports.updateAdminSession = (req, res) => {
    DB.update('TutorApplication',{"_id": req.body.id}, {"status":"accepted"} ,(err, data)=> {
        console.log(data);
        if (err) throw err;
        res.json({"data":data})
    });
}