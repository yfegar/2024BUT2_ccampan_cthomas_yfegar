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

// Define routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/', userRoutes);


app.use(function(req, res){
    res.status(404).render('404');
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});




