app.use(function(req, res, next) {
    // code exécuté tout le temps
    if (req.session.userId) {
        req.locals.isAuth = true; //local accessible dans les vues
        req.locals.id = req.session.userID;
    } else {
        req.locals.isAuth = false;
    }
    next(); 
})

