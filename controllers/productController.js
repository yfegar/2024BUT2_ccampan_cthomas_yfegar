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
};

exports.rentProduct = async(req, res) => {
    const {product_id, start_date, end_date} = req.body; 
    console.log(req.body);

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (startDate >= endDate) {
        console.log('La date de fin doit être après la date de début.');
        return res.redirect('/details:id');
    }

    try {
        const userId = req.session.userId;
        const product = await productModel.getProductById(2);

        if(!product) {
            console.error('Produit introuvable');
            return res.redirect('/details:id');
        }

        const prix = product.prix_location;
        
        const dureeJours = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const prix_total = prix * dureeJours; 
    

        await productModel.rentProduct(start_date, end_date, prix_total, userId, product.id);
        console.log(start_date, end_date);
        res.redirect('/locations');
    } catch (err) {
        console.error('Erreur lors de la location du produit:', err);
        res.status(500).send("Erreur serveur.");
    }
};
