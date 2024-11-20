const userModel = require("../models/user.js");
const md5 = require('md5'); 
const jwt = require('jsonwebtoken');

// afficher les pages connexion et inscription
exports.showLoginPage = (req, res) => {
    res.render('connexion', {error : null});
}
exports.showRegisterPage = (req, res) => {
    res.render('inscription', {error : null});
}

// fonctions inscription, connexion, déconnexion
exports.inscription = (req, res) => {
    console.log(req.body);
   
    const {login, surname, firstname, ddn, email, password} = req.body; 
    if(userModel.checkEmail(email)) {
        let hashedpassword = md5(password);
        userModel.registerUser(login, surname, firstname, ddn, email, hashedpassword);
    };  
    if (userModel.checkEmail(email).length > 0) {
        return res.render('/inscription', { error: 'Cette adresse mail est déjà utilisée.'});              
    }
    return res.redirect('/user/index');
};

exports.connexion = async (req, res) => {
    const login = req.body.login;
    const mdp = req.body.password;
    // console.log(login, md5(mdp));

    const user = await userModel.checkLogin(login);
    console.log(user);

    if (user != false && user.password == md5(mdp)){
        // Générer un token JWT
        const token = jwt.sign({ id: user.id, role: user.role }, 'bnoobesobus', { expiresIn: '1h' });

        // Enregistrer le token dans la session
        req.session.token = token;
        req.session.type_utilisateur = user.type_utilisateur;
        // res.send({message: 'Connexion réussie.'});
        console.log(user.type_utilisateur);
        return res.render('index', {user} );

    } else {
        res.status(400).send('Mot de passe/login incorrect.');
    }
};

exports.deconnexion = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        res.send('Logged out successfully');
        return res.redirect('/');
    });
};

