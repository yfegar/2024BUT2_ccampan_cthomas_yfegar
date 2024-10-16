app.use(function(req, res, next) {
    // code exécuté tout le temps
    if (req.session.userId) {
        req.local.isAuth = true; //local accessible dans les vues
        req.local.id = req.session.userID;
    } else {
        req.local.isAuth = false;
    }
    next(); 
})

