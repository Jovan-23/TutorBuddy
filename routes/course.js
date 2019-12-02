const DB = require('../modules/db.js');

/**
 * show course info
 */
exports.showCourseInfo = (req, res) => {

    
    DB.find('Course',{} , (err, data) => {
        if (err) throw err;
       
        if (data.length <= 0) {
            console.log("error");
            return;
        } else {
           res.json({"data":data})
        }
    })
}

/**
 * show approval course info
 */
exports.showApprCourseInfo = (req, res) => {

    let reqData={"email":req.session.userinfo.email,"status":"accepted"};
    DB.find('TutorApplication',reqData , (err, data) => {
        if (err) throw err;
       
        console.log(data);
        if (data.length <= 0) {
          
            res.json({"data":"none"});
        } else {
           res.json({"data":data})
        }
     
    })
}