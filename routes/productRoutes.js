const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');


router.post('/add', productController.addProduct);
router.post('/rent', productController.rentProduct);


module.exports = router;