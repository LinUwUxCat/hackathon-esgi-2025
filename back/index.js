const express = require('express');
const medecins = require('./medecins/medecins')
const demoRoutes = require('./demo/demo');

const app = express();

app.get('/ready', (req, res) => {
    res.status(200);
    res.send("API is running.");
});

app.use('/medecins', medecins);
app.use('/demo', demoRoutes);

app.listen(3050);