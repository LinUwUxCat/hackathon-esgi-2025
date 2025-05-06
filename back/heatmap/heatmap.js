const express = require('express');
const router = express.Router();
const { getAllDemo, getAllCoord } = require('./../services/demo');
const { getMedecins } = require('./../services/medecins');
const { logError } = require('../logger/logger');

router.post('/', async (req, res) => {

    try {
        const demo = getAllDemo();
        const medecins = await getMedecins();
        const coord = getAllCoord();

        const result = await Promise.all(
            Object.entries(demo).map(async ([insee, data]) => {

                let added = req.body.insee_list.find(item => item.insee == insee);
                let nb_med = 0;
                if (added) nb_med = added.nb_med;

                const nb_hab = parseInt(data.nb_hab, 10);
                nb_med += medecins[insee]?.nb_med ?? 0;
                const ratio = nb_med > 0 ? (nb_hab / nb_med).toFixed(2) : 0;
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

        res.status(200).json(result);
    } catch (error) {
        logError(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});


module.exports = router;