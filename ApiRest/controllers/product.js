'use strict'

const conexion = require('../database/db');

const controller = {

    //Se obtienen todos los productos
    getProduct: (req, res) => {
        const sql = 'Select * From product';

        conexion.query(sql, (err, results) => {
            if(err) throw err;
            else res.status(200).send(results)
        })
    },

    //Se busca un producto por nombre.
    searchProduct: (req, res) => {
        const productSearch = '%'.concat(req.params.search.concat('%'));
        const sql = "Select * From product Where name LIKE ?";

        conexion.query(sql, [productSearch], (err, results) => {
            if(err) throw err;
            else res.status(200).send(results)
        })
    },

    //Filtro de productos por categoria.
    productFilterByCategory: (req, res) => {
        const categorySearch = req.params.category;
        const sql = 'Select product.name As name, category.name As category, product.url_image, product.price, product.discount From product Inner Join category On product.category = category.id Where category.name = ?';

        conexion.query(sql, [categorySearch], (err, results) => {
            if(err) throw err;
            else res.status(200).send(results)
        })
    },


    //Filtro de productos por rango de precio.
    productFilterByPrice: (req, res) => {
        const [minPrice, maxPrice] = req.params.price.split('-');
        const sql = 'Select * From product Where price Between ? And ?';
    
        conexion.query(sql, [minPrice, maxPrice], (err, results) => {
            if(err) throw err;
            else res.status(200).send(results);
        });
    },

    //Productos con promocion.
    productMoreDiscount: (req, res) => {
        const sql = 'Select * From product Where discount > 0 Order By discount DESC';
        conexion.query(sql, (err, results) => {
            if(err) throw err;
            else res.status(200).send(results);
        });
    }
}

module.exports = controller;