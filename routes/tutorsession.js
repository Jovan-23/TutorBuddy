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