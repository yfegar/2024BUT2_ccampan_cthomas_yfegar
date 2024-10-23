const userModel = require("../models/user.js");
const md5 = require('md5'); 

exports.inscription = (req, res) => {
    console.log(req.body);
   
    const {firstname, surname, email, password} = req.body; 
    if(userModel.checkEmail(email)) {
        let hashedpassword = md5(password);
        userModel.registerUser(surname,firstname,email,hashedpassword);
    };

    res.send("Formulaire envoyé.");
}