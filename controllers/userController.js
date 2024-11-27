const userModel = require("../models/user.js");

exports.updateInfo = async (req, res) => {
    const {password, nom, prenom, ddn, email, new_password} = req.body;
    try {
        const userId = req.session.userId;
        const user = await userModel.getUserById(userId); // await présent car getUserById est une Promise
        if(password == user.password) {
            await userModel.updateInfo({new_password, nom, prenom, ddn, email, userId});
            console.log("Changement des informations réussi.");
            res.render('/profil');
        }       
    } catch (err) {
        console.error('Erreur lors de la modification des informations:', err);
        res.status(500).send("Erreur serveur.");
    }
};