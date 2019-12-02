const DB = require('../modules/db.js');
/**
 * user register
 */
exports.doRegister = (req, res) => {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let user = { "username": username, "email": email, "password": password };

    DB.find('users', { email }, (err, data) => {
        if (err) throw err;

        if (data.length > 0) {
            res.json({ "signup": "email taken" });
            //email taken
            return;
        } else {
            DB.insert('users', {
                username, password, email
            }, (err, data) => {
                if (!err) {
                    req.session.userinfo = user; // Current user.

                    req.app.locals['userinfo'] = user;
                    res.json({ "signup": "ok" })
                } else {
                    res.json({ "signup": "fail" })
                }
            })
        }
    })
}
/**
 * user login
 */
exports.doLogin = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    DB.find('users', { email, password }, (err, data) => {
        if (err) throw err;

        if (data.length > 0) {
            req.session.userinfo = data[0];
            req.app.locals['userinfo'] = data[0];
            res.json({ "login": "ok" })

        } else {
            res.json({"login":"fail"});
        }
    })
}
/**
 * show register page
 */
exports.showRegister = (req, res) => {
    res.render('signUp');
}
/**
 * show login page
 */
exports.showLogin = (req, res) => {
    res.render('login');
}

/**
 * user logout
 */
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        } else {
            res.render('index');
        }
    })
}

