const userModel = require("../models/user.js");
const md5 = require('md5'); 

exports.inscription = (req, res) => {
    console.log(req.body);
   
    const {login, surname, firstname, ddn, email, password} = req.body; 
    if(userModel.checkEmail(email)) {
        let hashedpassword = md5(password);
        userModel.registerUser(login, surname, firstname, ddn, email, hashedpassword);
        res.redirect("/");
    };

    
}