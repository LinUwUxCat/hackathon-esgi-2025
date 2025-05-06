const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { logError } = require('./../logger/logger');
const { get } = require('http');

const csvFilePath = path.join(__dirname, './../data', 'data_population.csv');
const csvCoord = path.join(__dirname, './../data', 'coord.csv');

const results = {};
let coords = {};

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

fs.createReadStream(csvCoord)
    .pipe(csv({ separator: ',' }))
    .on('data', (row) => {
        let codeInsee = row.code_commune_insee;
        let coord = row._geopoint;

        // Nettoyage des coordonnées
        if (coord) {
            coord = coord.split(',');
            coord = {
                lat: parseFloat(coord[0]),
                lon: parseFloat(coord[1])
            };
        } else {
            coord = { lat: null, lon: null };
        }

        // Vérification que c'est bien un code à 4 chiffres numériques
        if (/^\d{5}$/.test(codeInsee)) {
            // On le passe à 5 chiffres avec un 0 devant
            const fullInsee = codeInsee;
            const codeNum = parseInt(codeInsee, 10);

            // Filtrage entre 2000 et 2999 inclus
            if (codeNum >= 2000 && codeNum <= 2999) {
                coords[fullInsee] = { coord };
            }
        }
    })
    .on('error', (err) => {
        logError(err.message);
    });

function getAllDemo() {
    return results;
}

function getAllCoord() {
    return coords;
}

async function getCoordByInsee(insee) {
    const coordResponse = await fetch(`https://geo.api.gouv.fr/communes/${insee}?fields=nom,centre,codesPostaux&format=json&geometry=centre`);
    let coord = await coordResponse.json();
    console.log(coord);
}

module.exports = { getAllDemo, getAllCoord };