const { User } = require("../src/models/user");


exports.doRegister= async (req,res)=>{

   
    let username=req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let user={"username":username,"email":email,"password":password};
    // checkemail = await User.findOne({email});
    // if(checkemail) return res.status(400).send("email Taken");
    user=new User(user);
   
    req.session.userinfo = user;
    req.app.locals['userinfo'] = user;
    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
  


   
    res.json({"signup":"ok"});
   

}

exports.doLogin= async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
 
    
    let user=await User.findOne({email,password});
    console.log(user);
    if(user){
        req.session.userinfo = user;
        req.app.locals['userinfo'] = user;
        res.json({"login":"ok"});
    }else{
        res.json({"login":"fail"});
        console.log("login fail");
    }
   
   
}

exports.showRegister=(req, res) => {
    res.render('signUp');
}

exports.showLogin=(req, res) => {
    res.render('login');
}


exports.logout=(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
            throw err;
        } else {
            res.render('/');
        }
    })

}

