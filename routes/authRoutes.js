const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');


router.get('/connexion', authController.showLoginPage);
router.get('/inscription', authController.showRegisterPage);
router.get('/inscriptionagent', authController.showRegisterPageForAgent);
router.get('/deconnexion', authController.deconnexion);


router.post('/inscription', authController.inscription);
router.post('/inscriptionagent', authController.inscriptionAgent);
router.post('/connexion', authController.connexion);
router.post('/deconnexion', authController.deconnexion);


module.exports = router;

