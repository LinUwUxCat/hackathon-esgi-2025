const express = require('express');
const router = express.Router();
const { logError } = require('./../logger/logger');

router.get('/', async (req, res) => {

    let results = [];
    let offset = 0;
    let isFinished = false;

    do {
        const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/medecins/records?select=coordonnees%2C%20nom%2C%20code_insee&limit=100&offset=${offset}&refine=dep_name%3AAisne&refine=libelle_profession%3A%22M%C3%A9decin%20g%C3%A9n%C3%A9raliste%22`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if(response.status !== 200){
            logError("Erreur venant de l'API distante: -> " + json);
            res.status(response.status);
            res.send(response);
            return;
        }

        if (json.results.length === 0) {
            isFinished = true;
        } else {
            json.results.forEach(entry => {
                results.push({
                    code_insee: entry.code_insee,
                    nom: entry.nom,
                    lon: entry.coordonnees?.lon,
                    lat: entry.coordonnees?.lat
                });
            });
            offset += 100;
        }

    } while (!isFinished);

    res.status(200);
    res.send(results);
});

router.get('/insee', async (req, res) => {
    let results = {};

    let offset = 0;
    let isFinished = false;

    do {
        const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/medecins/records?select=code_insee&limit=100&offset=${offset}&refine=dep_name%3AAisne&refine=libelle_profession%3A%22M%C3%A9decin%20g%C3%A9n%C3%A9raliste%22`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if(response.status !== 200){
            logError("Erreur venant de l'API distante: -> " + json);
            res.status(response.status);
            res.send(response);
            return;
        }

        if (json.results.length === 0) {
            isFinished = true;
        } else {
            json.results.forEach(entry => {
                if(results[entry.code_insee]){
                    results[entry.code_insee].nb_med += 1;
                }else{
                    results[entry.code_insee] = {
                        nb_med: 1
                    }
                }
            });
            offset += 100;
        }

    } while (!isFinished);

    res.status(200);
    res.send(results);
});

module.exports = router;
