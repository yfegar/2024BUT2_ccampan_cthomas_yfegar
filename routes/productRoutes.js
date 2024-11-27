const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');


router.post('/add', productController.addProduct);
router.post('/delete', productController.deleteProduct);
router.post('/rent', productController.rentProduct);


module.exports = router;