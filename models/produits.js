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


<<<<<<< HEAD
module.exports = { getProductById, getAllProducts, getPriceById };
=======
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


module.exports = { getProductById, getAllProducts, addProduct};
>>>>>>> d11a87679ac99cc92633b49a83eac9fa3aadc3df
