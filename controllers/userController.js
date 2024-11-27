const userModel = require("../models/user.js");
const md5 = require('md5');


exports.updateInfo = async (req, res) => {
    const { currentPassword, nom, prenom, ddn, email, password, id } = req.body;
    try {
        function formatDate(date = new Date()) {
            const year = date.toLocaleString('default', { year: 'numeric' });
            const month = date.toLocaleString('default', {
                month: '2-digit',
            });
            const day = date.toLocaleString('default', { day: '2-digit' });

            return [day, month, year].join('/');
        }

        const user = await userModel.getUserById(id); // await présent car getUserById est une Promise
        if (md5(currentPassword) == user.password) {
            await userModel.updateInfo({ password, nom, prenom, ddn, email, id });
            const updatedUser = await userModel.getUserById(id);
            console.log("Changement des informations réussi.");
            res.render('profil', { user: updatedUser, formatDate });
        }
    } catch (err) {
        console.error('Erreur lors de la modification des informations:', err);
        res.status(500).send("Erreur serveur.");
    }
};

exports.deleteAccount = async (req, res) => {
    const utilisateur_id = req.body.utilisateur_id;
    try {
        const checkRent = await userModel.checkRent(utilisateur_id);
        if (checkRent <= 0) {
            const user = await userModel.getUserById(utilisateur_id); 
            return res.status(400).render('profil', { user });
        } else {
            await userModel.deleteAccount(utilisateur_id);
            req.session.destroy((err) => {
                if (err) {
                    console.error('Erreur lors de la destruction de la session:', err);
                    return res.status(500).send('Erreur serveur');
                }
                res.render('inscription');
            })
        };
    } catch (err) {
        console.log('Erreur lors de la suppression du compte:', err);
        res.status(500).send('Erreur serveur');
    }
};
