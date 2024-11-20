const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); // permet de récupérer les éléments du formulaire

app.use(session({
    secret: 'bnoobesobus', // clé de session
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    console.log('isAuth:', req.session && req.session.token ? true : false);
    res.locals.isAuth = req.session && req.session.token ? true : false;
    next();
});

app.get('/', async function(req, res){ // users/4 renverra le getUserById(4)
    /*
    if (!req.session.userId) { // en javascript, false = undefined
        return res.redirect("/login");
    }
*/
    try { // code toujous exécuté
        const user = await userModel.getUserById(1); // await présent car getUserById est une Promise
        res.render('index',   { user });
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

app.get('/catalogue', async function (req, res) {
    try { // code toujous exécuté
        // const produit = await productModel.getProductById(id); // await présent car getUserById est une Promise
        const listeProduits = await productModel.getAllProducts();
        res.render('catalogue', { listeProduits });
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

app.get('/catalogue-agent', async function (req, res) {
    try { // code toujous exécuté
        // const produit = await productModel.getProductById(id); // await présent car getUserById est une Promise
        const listeProduits = await productModel.getAllProducts();
        res.render('catalogue-agent', { listeProduits });
    } catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

app.get('/details/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const produit = await productModel.getProductById(id);
        res.render("details", { id, produit});
    }  catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});


app.get('/details-agent/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const produit = await productModel.getProductById(id);
        res.render("details-agent", { id, produit});
    }  catch (err) { // code exécuté seulement si il y a une exception dans le try
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

app.get('/apropos', (req, res) => {
    res.render("apropos");
});

app.get('/indexadmin', (req, res) => {
    res.render("indexadmin");
});

app.get('/faq', (req, res) => {
    res.render("faq");
});


// Define routes

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/', userRoutes);




/*
app.get('/inscription', function (req, res) {
    res.render("inscription", {error : null});
});*/

app.get('/connexion', function (req, res) {
    res.render("connexion", {error : null});
});

app.post('/connexion', async function (req, res) {
    const login = req.body.login;
    const mdp = req.body.password;

    const user = await userModel.checkLogin(login);

    if (user != false && user.password == md5(mdp)){
        // on démarre la session
        req.session.userId = user.id; // on décide de userId
        req.session.role = user.type_utilisateur; // on décide de role
        // on charge une page appropriée
        return res.redirect("/index"); // res.redirect != res.render
    }
    // res.render('connexion', {error : "Erreur dans le login/mdp"});
});


app.get('/locations', (req, res) => {
    res.render("locations");
});

app.get('/locations-agent', (req, res) => {
    res.render("locations-agent");
});

app.use(function(req, res){
    res.status(404).render('404');
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});




