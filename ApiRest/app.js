'use strict'

const express = require('express');
//Se carga el archivo de las rutas.
const product_routes = require('./routes/product');
const category_routes = require('./routes/category');

const app = express();
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//
app.use('/api', product_routes);
app.use('/api', category_routes);

module.exports = app;