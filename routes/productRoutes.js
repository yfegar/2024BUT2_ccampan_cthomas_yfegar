const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');


router.post('/addproduct', productController.addProduct);


module.exports = router;