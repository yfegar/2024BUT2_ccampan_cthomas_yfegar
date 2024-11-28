const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const userModel = require("./models/user.js");


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); // permet de récupérer les éléments du formulaire

app.use(session({
    secret: 'bnoobesobus', // clé de session
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 *60
    }
}));

app.use((req, res, next) => {
    console.log('isAuth:', req.session && req.session.token ? true : false);
    res.locals.isAuth = req.session && req.session.token ? true : false;
    next();
});


app.get('/apropos', (req, res) => {
    res.render("apropos");
});


app.get('/faq', (req, res) => {
    res.render("faq");
});


// Define routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/', userRoutes);


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

app.use(function(req, res){
    res.status(404).render('404');
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});