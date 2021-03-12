'use strict'

const express = require('express');
const ProductController = require('../controllers/category');

const router = express.Router();

router.get('/categorias', ProductController.getCategories);

module.exports = router;