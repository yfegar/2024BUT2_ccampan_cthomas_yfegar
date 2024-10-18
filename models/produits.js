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

module.exports = { getProductById };