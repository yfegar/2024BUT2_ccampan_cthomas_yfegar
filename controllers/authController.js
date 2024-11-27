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
    return res.render('index');
};

exports.connexion = async (req, res) => {
    const login = req.body.login;
    const mdp = req.body.password;
    
    try {
        const user = await userModel.checkLogin(login);
        // console.log(user, user.password);

        if (user != false && user.password == md5(mdp)){
            // Générer un token JWT
            const token = jwt.sign({ id: user.id, role: user.role }, 'bnoobesobus', { expiresIn: '1h' });

            // Enregistrer le token dans la session
            req.session.user = user;
            req.session.userId = user.id;
            req.session.type_utilisateur = user.type_utilisateur;
            req.session.token = token;

            // res.send({message: 'Connexion réussie.'});
            return res.redirect('/index');

        } else {
            res.render('connexion', {error: 'Mot de passe/login incorrect.'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur serveur');
    }

};

exports.deconnexion = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erreur serveur lors de la déconnexion.');
        }
        // res.send('Logged out successfully');
        res.redirect('/auth/connexion');
    });
};

