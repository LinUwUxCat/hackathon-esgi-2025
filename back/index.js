const express = require('express');

const app = express();

app.get('/ready', (req, res) => {
    res.status(200);
    res.send("API is running.");
});

app.listen(3050);