const express = require('express');
const productModel = require("../models/produits.js");
const userModel = require("../models/user.js");

const router = express.Router();

router.get('/index', async function(req, res){ // users/4 renverra le getUserById(4)
    /*
    if (!req.session.userId) { // en javascript, false = undefined
        return res.redirect("/connexion");
    } 
    */
    try { // code toujous exécuté
        // console.log('Session actuelle : ', req.session);
        const userId = req.session.userId;
        console.log(userId);
        const user = await userModel.getUserById(userId); // await présent car getUserById est une Promise
        return res.render('index', { user });
        
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

router.get('/catalogue', async function (req, res) {
    try { // code toujous exécuté
        // const produit = await productModel.getProductById(id); // await présent car getUserById est une Promise
        const listeProduits = await productModel.getAllProducts();
        res.render('catalogue', { listeProduits });
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

router.get('/catalogue-agent', async function (req, res) {
    try { // code toujous exécuté
        // const produit = await productModel.getProductById(id); // await présent car getUserById est une Promise
        const listeProduits = await productModel.getAllProducts();
        res.render('catalogue-agent', { listeProduits });
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

router.get('/details/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const produit = await productModel.getProductById(id);
        res.render("details", { id, produit});
    }  catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

router.get('/apropos', (req, res) => {
    res.render("apropos");
});

router.get('/faq', (req, res) => {
    res.render("faq");
});

router.get('/locations', (req, res) => {
    res.render("locations");
});

router.get('/indexadmin', (req, res) => {
    res.render("indexadmin");
});


module.exports = router;

