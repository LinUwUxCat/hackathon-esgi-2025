const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { logError } = require('./../logger/logger');

const csvFilePath = path.join(__dirname, './../data', 'data_population.csv');

const results = {};

fs.createReadStream(csvFilePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
        let codeInsee = row.code_insee;
        if (/^\d{4}$/.test(codeInsee)) {
            if (codeInsee.length === 4) {
                codeInsee = '0' + codeInsee;
            }
            results[codeInsee] = {
                nb_hab: row['p11_tot'],
                nb_hab_0_14: row['p11_0014'],
                nb_hab_15_29: row['p11_1529'],
                nb_hab_30_44: row['p11_3044'],
                nb_hab_45_59: row['p11_4559'],
                nb_hab_60_74: row['p11_6074'],
                nb_hab_75_plus: row['p11_75p'],
            };
        }
    })
    .on('error', (err) => {
        logError(err);
    });

router.get('/', (req, res) => {
    res.status(200).json(results);
});

module.exports = router;