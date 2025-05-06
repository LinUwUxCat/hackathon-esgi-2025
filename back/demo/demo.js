const express = require('express');
const router = express.Router();
const { getAllDemo } = require('./../services/demo');


router.get('/', (req, res) => {
    res.status(200).json(getAllDemo());
});

router.get('/:insee_id', (req, res) => {
    const id = req.query.insee_id;
    const demo = getAllDemo();
    const demobyid = demo[id];
    res.status(200);
    res.send(demobyid);
});

module.exports = router;