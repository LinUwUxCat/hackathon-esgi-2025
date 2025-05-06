const express = require('express');
const router = express.Router();
const { getAllDemo, getAllCoord } = require('./../services/demo');
const { getMedecins } = require('./../services/medecins');
const { logError } = require('../logger/logger');

router.post('/', async (req, res) => {

    const demo = getAllDemo();
    const medecins = await getMedecins();
    const coord = getAllCoord();

    if(req.insee_list && req.insee_list.length > 0){
        try{
            req.insee_list.forEach(async element => {
                const res = await fetch(`https://geo.api.gouv.fr/communes?lat=${element.lat}&lon=${element.lon}`).json();
                if(medecins[res[0].code]){
                    medecins[res[0].code].nb_med += element.nb_med;
                }else{
                    medecins[res[0].code] = element.nb_med;
                }
            });
        }catch (error){
            logError(error);
            return;
        }
    }

    try {

        let maxRatio = 0;
        
        const result = await Promise.all(
            Object.entries(medecins).map(async ([insee, data]) => {

                const nb_med = parseInt(data.nb_med, 10) ?? 0;
                const nb_hab = demo[insee]?.nb_hab ?? 0;
                let ratio = 0;
                if(nb_med == 0){
                    ratio = 0;
                }else if(nb_hab = 0){
                    ratio = 1;
                }else{
                    ratio = nb_med / nb_hab;
                }
                maxRatio = ratio > maxRatio ? ratio : maxRatio;
                
                const lat = coord[insee]?.coord?.lat || null;
                const lon = coord[insee]?.coord?.lon || null;

                return {
                    insee,
                    nb_hab,
                    nb_med,
                    ratio,
                    lat,
                    lon,
                };
            })
        );

        result.forEach(element => {
            element.ratio /= maxRatio;
        });

        res.status(200).json(result);
    } catch (error) {
        logError(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

module.exports = router;