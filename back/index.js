const express = require('express');
const medecins = require('./medecins/medecins')
const demoRoutes = require('./demo/demo');
const heatmap = require('./heatmap/heatmap');
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.get('/ready', (req, res) => {
    res.status(200);
    res.send("API is running.");
});

app.use('/medecins', medecins);
app.use('/demo', demoRoutes);
app.use('/heatmap', heatmap);

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3050);