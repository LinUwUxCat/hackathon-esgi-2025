const express = require('express');
const demoRoutes = require('./demo/demo');

const app = express();

app.get('/ready', (req, res) => {
    res.status(200);
    res.send("API is running.");
});

app.use('/demo', demoRoutes);

app.listen(3050);