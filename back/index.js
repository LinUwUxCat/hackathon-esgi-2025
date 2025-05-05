const express = require('express');
const medecins = require('./medecins/medecins')

const app = express();

app.get('/ready', (res) => {
    res.status(200);
    res.send("API is running.");
});

app.use('/medecins', medecins);

app.listen(3050);