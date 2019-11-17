const DB = require('../modules/db.js');

exports.getTutorSessions = (req, res) => {
    DB.find('BookedSession', (err, data) => {
        if (err) throw err;
        for(var i = 0; i < data.length; i++) {
            if(data.tutorEmail.localeCompare(req.session.userinfo.email) == 0 ||
            data.studentEmail.localeCompare(req.session.userinfo.email) == 0) {
                    req.app.locals['bookedSessions'] = data[0];
            }
        }
    });
}
