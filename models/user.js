const bdd = require("./database.js");

async function getUserById (id) {
    sql = "SELECT * FROM utilisateur WHERE id = ?";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

async function getUserByLogin (login) {
    sql = "SELECT * FROM utilisateur WHERE login = ?";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, [login], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
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
    sql = "SELECT * FROM utilisateur WHERE email = ?";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, email, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};


async function registerUser (login, surname, firstname, ddn, email, hashedpassword) {
    sql = "INSERT INTO `utilisateur`(`id`, `login`, `password`, `nom`, `prenom`, `ddn`, `email`, `type_utilisateur`) VALUES (default, ?, ?, ?, ?, ?, ?,'client')";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, [login, hashedpassword, surname, firstname, ddn, email], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

async function registerAgent (login, surname, firstname, ddn, email, hashedpassword) {
    sql = "INSERT INTO `utilisateur`(`id`, `login`, `password`, `nom`, `prenom`, `ddn`, `email`, `type_utilisateur`) VALUES (default, ?, ?, ?, ?, ?, ?,'agent')";  // ? sert de paramètre 
    return new Promise((resolve, reject) => {
        bdd.query(sql, [login, hashedpassword, surname, firstname, ddn, email], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

async function updateInfo (password, nom, prenom, ddn, email, id) {
    sql = "UPDATE `utilisateur` SET `password`= ?,`nom`= ? ,`prenom`= ?,`ddn`= ?,`email`= ? WHERE `id` = ?"; 
    return new Promise((resolve, reject) => {
        bdd.query(sql, [password, nom, prenom, ddn, email, id], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

async function checkRent (utilisateur_id) {
    sql = "SELECT COUNT (*) FROM `location` WHERE utilisateur_id = ? AND date_retour_effective IS NULL"; 
    return new Promise((resolve, reject) => {
        bdd.query(sql, utilisateur_id, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

async function deleteAccount (utilisateur_id) {
    sql = "DELETE FROM `utilisateur` WHERE id = ?"; 
    return new Promise((resolve, reject) => {
        bdd.query(sql, [utilisateur_id], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { getUserById, getUserByLogin, checkLogin, checkEmail, registerUser, registerAgent, updateInfo, deleteAccount, checkRent};