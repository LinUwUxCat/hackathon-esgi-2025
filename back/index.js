const express = require('express');
const medecins = require('./medecins/medecins')
const demoRoutes = require('./demo/demo');
const heatmap = require('./heatmap/heatmap');
const cors = require("cors");

const app = express();
app.use(cors())
app.get('/ready', (req, res) => {
    res.status(200);
    res.send("API is running.");
});

app.use('/medecins', medecins);
app.use('/demo', demoRoutes);
app.use('/heatmap', heatmap);

app.listen(3050);