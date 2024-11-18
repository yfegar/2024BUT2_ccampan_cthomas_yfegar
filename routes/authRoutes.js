const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');


router.get('/connexion', authController.showLoginPage);
router.get('/inscription', authController.showRegisterPage);


router.post('/inscription', authController.inscription);
router.post('/connexion', authController.connexion);
router.post('/deconnexion', authController.deconnexion);

module.exports = router;

