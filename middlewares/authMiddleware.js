exports.isAuth = (req, res, next) => {
    const currentLocation = req.url;
    if (req.session && req.session.token) {
        return next(currentLocation);
    }
    return res.redirect('/auth/connexion');
}