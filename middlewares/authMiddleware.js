const authenticate = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.status(403).send('Not logged in');
    }

    // Vérifier le token JWT
    jwt.verify(token, 'bnoobesobus', (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        req.user = decoded; // Ajouter les infos utilisateur décodées à la requête
        next();
    });
};