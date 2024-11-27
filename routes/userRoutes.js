const express = require('express');
const productModel = require("../models/produits.js");
const userModel = require("../models/user.js");
const userController = require('../controllers/userController.js');


const router = express.Router();

router.post('/update', userController.updateInfo);
router.post('/deleteaccount', userController.deleteAccount);


router.get('/index', async function(req, res){
    /*
    if (!req.session.userId) { // en javascript, false = undefined
        return res.redirect("/connexion");
    } 
    */
    try { // code toujous exécuté
        // console.log('Session actuelle : ', req.session);
        const currentLocation = req.url;
        const userId = req.session.userId;
        console.log(userId);
        console.log("====")
        const user = await userModel.getUserById(userId); // await présent car getUserById est une Promise
        return res.render('index', { user, currentLocation });
        
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

router.get('/profil', async function(req, res){ 
        
    try { // code toujous exécuté

        function formatDate(date = new Date()) {
            const year = date.toLocaleString('default', {year: 'numeric'});
            const month = date.toLocaleString('default', {
              month: '2-digit',
            });
            const day = date.toLocaleString('default', {day: '2-digit'});
          
            return [day, month, year].join('/');
        }

        const currentLocation = req.url;
        const userId = req.session.userId;
        console.log(userId);
        console.log("====")
        const user = await userModel.getUserById(userId); // await présent car getUserById est une Promise
        return res.render('profil', { user, currentLocation, formatDate });
        
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});


router.get('/catalogue', async function (req, res) {
    try { // code toujous exécuté
        
        const currentLocation = req.url;
        const userId = req.session.userId;
        console.log(userId);
        console.log("====")
        const user = await userModel.getUserById(userId); // await présent car getUserById est une Promise
        // const produit = await productModel.getProductById(id); // await présent car getUserById est une Promise
        const listeProduits = await productModel.getAllProducts();
        res.render('catalogue', { listeProduits, user, currentLocation });
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

router.get('/locations', async function (req, res) {
    try { // code toujous exécuté
        
        function formatDate(date = new Date()) {
            const year = date.toLocaleString('default', {year: 'numeric'});
            const month = date.toLocaleString('default', {
              month: '2-digit',
            });
            const day = date.toLocaleString('default', {day: '2-digit'});
          
            return [day, month, year].join('/');
        }

        const currentLocation = req.url;
        const userId = req.session.userId;
        console.log(userId);
        console.log("====")
        const user = await userModel.getUserById(userId); // await présent car getUserById est une Promise
        // const produit = await productModel.getProductById(id); // await présent car getUserById est une Promise
        const listeLocations = await productModel.getRentedProductsForUser(userId);
        res.render('locations', { listeLocations, user, currentLocation, formatDate });
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

router.get('/details/:id', async function (req, res) {
    try {
        const currentLocation = req.url;
        const userId = req.session.userId;
        console.log(userId);
        console.log("====")   
        const user = await userModel.getUserById(userId); // await présent car getUserById est une Promise

        const id = req.params.id;
        const produit = await productModel.getProductById(id);
        res.render("details", { id, produit, user, currentLocation});
    }  catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

/*
router.get('/catalogue-agent', async function (req, res) {
    try { // code toujous exécuté
        
        const userId = req.session.userId;
        console.log(userId);
        console.log("====")   
        const user = await userModel.getUserById(userId); // await présent car getUserById est une Promise
        // const produit = await productModel.getProductById(id); // await présent car getUserById est une Promise
        const listeProduits = await productModel.getAllProducts();
        res.render('catalogue-agent', { listeProduits, user });
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});
*/


/*
router.get('/details-agent/:id', async function (req, res) {
    try {
        const userId = req.session.userId;
        console.log(userId);
        console.log("====")   
        const user = await userModel.getUserById(userId); // await présent car getUserById est une Promise
        
        const id = req.params.id;
        const produit = await productModel.getProductById(id);
        res.render("details-agent", { id, produit, user});
    }  catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});
*/

router.get('/apropos', (req, res) => {
    const currentLocation = req.url;
    res.render("apropos", currentLocation);
});

router.get('/faq', (req, res) => {
    const currentLocation = req.url;
    res.render("faq", currentLocation);
});



/*
router.get('/indexadmin', (req, res) => {
    res.render("indexadmin");
});
*/

module.exports = router;

