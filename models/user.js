const bdd = require("./database.js");

async function getUserById (id) {
    sql = "SELECT * FROM utilisateur WHERE id = ?";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, id, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

async function getUserByName (name) {

}

async function getAllUsers () {

}

async function getAllUsersByRole (role) {

}

async function promoteUser () {

}

module.exports = { getUserById };