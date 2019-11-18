const DB = require('../modules/db.js');

exports.getTutorSessions = (req, res) => {
   
    DB.find('BookedSession', {},(err, data) => {
        if (err) throw err;
        res.json({"data":data})
    });
}