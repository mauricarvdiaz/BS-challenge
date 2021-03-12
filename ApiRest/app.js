'use strict'

const express = require('express');

const app = express();

app.use(express.json());

//Se carga el archivo de las rutas.
const product_routes = require('./routes/product');
const category_routes = require('./routes/category');


//
app.use('/api', product_routes);
app.use('/api', category_routes);

module.exports = app;