// const bdd = require("./bddcam.js"); 
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

async function checkLogin (login) {
    sql = "SELECT * FROM utilisateur WHERE login = ?";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, login, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

async function checkEmail (email) {
    sql = "SELECT email FROM utilisateur WHERE email = ?";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, email, (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length > 0) {
                return resolve('inscription', {
                    message: 'Cette adresse e-mail est déjà utilisée.'
                });               
            } else {
                return true;
            }
        });
    });
};


async function registerUser (login, surname, firstname, ddn, email, hashedpassword) {
    sql = "INSERT INTO `utilisateur`(`id`, `login`, `password`, `nom`, `prenom`, `ddn`, `email`, `type_utilisateur`) VALUES (default, ?, ?, ?, ?, ?, ?,'client')";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, [login, hashedpassword, surname, firstname, ddn, email, ], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                console.log(results);
            }
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



module.exports = { getUserById, checkLogin, checkEmail, registerUser };