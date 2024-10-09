const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/', function(req, res){
    let data = {
        personne1 : {
            nom: "bob"
        }
        
    }
    res.render('index', {data});
});


app.use(function(req, res){
    res.status(404).render('404');
})



app.listen(3000, function(){
    console.log('Server running on port 3000');
})