'use strict'

const conexion = require('../database/db');

const controller = {

    getCategories: (req, res) => {
        const sql = 'Select * From category';

        conexion.query(sql, (err, results) => {
            if(err) throw err;
            else res.status(200).send(results)
        })
    }

}

module.exports = controller;