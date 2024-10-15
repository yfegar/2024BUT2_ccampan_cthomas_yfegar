const express = require('express');
const app = express();
const userModel = require("./models/user.js");

app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/', async function(req, res){ // users/4 renverra le getUserById(4)
    try { // code toujous exécuté
        const user = await userModel.getUserById(1); // await présent car getUserById est une Promise
        res.render('index', { user });
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});


app.get('/catalogue', (req, res) => {
    res.render("catalogue");
});

app.get('/inscription', (req, res) => {
    res.render("inscription");
});
app.get('/apropos', (req, res) => {
    res.render("apropos");
});
app.get('/faq', (req, res) => {
    res.render("faq");
});
app.get('/connexion', (req, res) => {
    res.render("connexion");
});
app.get('/connexion', (req, res) => {
    res.render("connexion.ejs");
});
app.get('/locations', (req, res) => {
    res.render("locations");
});
app.use(function(req, res){
    res.status(404).render('404');
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});

