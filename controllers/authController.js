const userModel = require("../models/user.js");
const md5 = require('md5'); 
const jwt = require('jsonwebtoken');
//const { use } = require("../routes/authRoutes.js");

// afficher les pages connexion et inscription
exports.showLoginPage = (req, res) => {
    res.render('connexion', {error : null});
}
exports.showRegisterPage = (req, res) => {
    res.render('inscription', {error : null});
}
exports.showRegisterPageForAgent = (req, res) => {
    res.render('inscriptionagent');
}

// fonctions inscription, connexion, déconnexion
exports.inscription = async (req, res) => {
    const {login, surname, firstname, ddn, email, password} = req.body;
    console.log(req.body);

    try {
        const emailExists = await userModel.checkEmail(email);
        if (emailExists.length > 0) {
            return res.render('inscription', { error: 'Cette adresse mail est déjà utilisée.'});
        }
        const hashedpassword = md5(password);

        await userModel.registerUser(login, surname, firstname, ddn, email, hashedpassword);

        return res.redirect('/connexion');
    } catch (err) {
        console.error("Erreur lors de l\'inscription de l'user:", err);
        return res.status(500).render('inscription', { error: 'Une erreur est survenue. Veuillez réessayer plus tard.'});
    }
};

exports.inscriptionAgent = async (req, res) => {  
    const {login, surname, firstname, ddn, email, password} = req.body;

    try {
        const emailExists = await userModel.checkEmail(email);
        if (emailExists.length > 0) {
            return res.render('inscriptionagent', { error: 'Cette adresse mail est déjà utilisée.'});
        }
        const hashedpassword = md5(password);

        await userModel.registerAgent(login, surname, firstname, ddn, email, hashedpassword);

        return res.redirect('/index');
    } catch (err) {
        console.error("Erreur lors de l\'inscription de l'agent:", err);
        return res.status(500).render('inscriptionagent', { error: 'Une erreur est survenue. Veuillez réessayer plus tard.'});
    }
};

exports.connexion = async (req, res) => {
    const login = req.body.login;
    const mdp = req.body.password;
    
    try {
        const user = await userModel.checkLogin(login);

        if (user != false && user.password == md5(mdp)){
            // Générer un token JWT
            const token = jwt.sign({ id: user.id, role: user.role }, 'bnoobesobus', { expiresIn: '1h' });

            // Enregistrer le token dans la session
            req.session.user = user;
            req.session.userId = user.id;
            req.session.type_utilisateur = user.type_utilisateur;
            req.session.token = token;

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
        res.redirect('/auth/connexion');
    });
};

