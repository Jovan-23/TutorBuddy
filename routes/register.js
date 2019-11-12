const DB = require('../modules/db.js');


exports.doRegister = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let user = { "username": username, "email": email, "password": password };

    DB.find('users', { email }, (err, data) => {
        if (data.length > 0) {
            console.log("email taken");
            //email taken
            return;

        } else {
            DB.insert('users', {
                username, password, email
            }, (err, data) => {
                if (!err) {

                    req.session.userinfo = user;
                    req.app.locals['userinfo'] = user;
                    console.log(data);
                    console.log(122);
                    res.json({ "signup": "ok" })


                } else {
                    res.json({ "signup": "fail" })
                }
            })

        }


    })






}

exports.doLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    DB.find('users', { email, password }, (err, data) => {
        if (data.length > 0) {
            req.session.userinfo = data[0];
            req.app.locals['userinfo'] = data[0];
            console.log(123);
            console.log(req.session.userinfo);
            res.json({ "login": "ok" })


        } else {
            console.log("login fail");

        }


    })




}

exports.showRegister = (req, res) => {
    res.render('signUp');
}

exports.showLogin = (req, res) => {
    res.render('login');
}


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        } else {
            res.render('/');
        }
    })

}

