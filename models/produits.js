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


module.exports = { getProductById, getAllProducts, getPriceById };