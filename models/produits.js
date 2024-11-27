// const bdd = require("./bddcam.js");
const bdd = require("./database.js");

async function getProductById (id) {
    sql = "SELECT * FROM produit WHERE id = ?";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, id, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

async function getPriceById (id) {
    sql = "SELECT prix_location FROM produit WHERE id = ?";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, id, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

async function getAllProducts () {
    sql = "SELECT * FROM produit";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

async function addProduct (type, description, marque, modele, prix_location, etat) {
    sql = "INSERT INTO produit (id, type, description, marque, modele, prix_location, etat) VALUES (default, ?)"; 
    return new Promise((resolve, reject) => {
        bdd.query(sql,[type, description, marque, modele, prix_location, etat], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};


async function deleteProduct (product_id) {
    sql = "DELETE FROM produit LEFT JOIN location ON location.produit_id = produit.id AND CURRENT_DATE BETWEEN location.date_debut AND location.date_retour_prevue WHERE produit.id = ? AND location.produit_id IS NULL;"; 
    return new Promise((resolve, reject) => {
        bdd.query(sql, product_id, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

async function rentProduct (date_debut, date_retour_prevue, prix_total, utilisateur_id, produit_id) {
    sql = "INSERT INTO location (id, date_debut, date_retour_prevue, date_retour_effective, prix_total, utilisateur_id, produit_id) VALUES (default, ?, ?, NULL, ?, ?, ?)"; 
    return new Promise((resolve, reject) => {
        bdd.query(sql,[date_debut, date_retour_prevue, prix_total, utilisateur_id, produit_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

async function getRentedProductsForUser (userId) {
    sql = "SELECT * FROM produit join location join utilisateur WHERE (produit.id = location.produit_id) AND (location.utilisateur_id = utilisateur.id) AND (utilisateur.id = ?) "; 
    return new Promise((resolve, reject) => {
        bdd.query(sql, userId, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

async function getRentedProducts (userId) {
    sql = "SELECT * FROM produit join location on location.produit_id = produit.id join utilisateur on location.utilisateur_id = utilisateur.id"; 
    return new Promise((resolve, reject) => {
        bdd.query(sql, userId, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};


module.exports = { getProductById, getAllProducts, addProduct, deleteProduct, rentProduct, getRentedProductsForUser, getRentedProducts};
