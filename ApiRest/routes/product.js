'use strict'

const express = require('express');
const ProductController = require('../controllers/product');

const router = express.Router();

router.get('/productos', ProductController.getProduct);
router.get('/search/:search', ProductController.searchProduct);
router.get('/productDiscount/:limit?', ProductController.productMoreDiscount);
router.get('/filterPrice/:price', ProductController.productFilterByPrice);
router.get('/filterCategory/:category', ProductController.productFilterByCategory);


module.exports = router;

