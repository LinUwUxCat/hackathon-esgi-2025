const express = require('express');
const router = express.Router();
const { getAllDemo } = require('./../services/demo');


router.get('/', (req, res) => {
    res.status(200).json(getAllDemo());
});

module.exports = router;