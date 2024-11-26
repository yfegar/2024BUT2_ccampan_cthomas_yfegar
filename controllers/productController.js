const productModel = require("../models/produits.js");

exports.addProduct = async (req, res) => {
    const {type, description, marque, modele, prix_location, etat} = req.body;
    try {
        await productModel.addProduct({type, description, marque, modele, prix_location, etat});

        console.log("Ajout du produit réussi.");
        res.redirect('/index');
    } catch (err) {
        console.error('Erreur lors de l\'ajout du produit:', err);
        res.status(500).send("Erreur serveur.");
    }
}