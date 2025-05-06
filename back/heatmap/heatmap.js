const express = require('express');
const router = express.Router();
const { getAllDemo, getAllCoord } = require('./../services/demo');
const { getMedecins } = require('./../services/medecins');

router.get('/', async (req, res) => {
    try {
        const demo = getAllDemo();
        const medecins = await getMedecins();
        const coord = getAllCoord();
        console.log(coord);

        const result = await Promise.all(
            Object.entries(demo).map(async ([insee, data]) => {
                const nb_hab = parseInt(data.nb_hab, 10);
                const nb_med = medecins[insee]?.nb_med || 0;
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
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});


module.exports = router;