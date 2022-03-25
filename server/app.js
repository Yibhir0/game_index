
const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
//Swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const compression = require('compression')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Game Index Endpoints Swagger Documentation',
        version: '1.0.0',
    },
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const session = require('express-session');

// Change salt periodically
app.use(session({ secret: 'salty' }));

app.use(express.json());

app.use(compression());

app.use(function (req, res, next) {
    res.set("Cache-control", "public, max-age=31536000");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

const api = require('./routes/api.js');

app.use('/', api);

app.use(cors());

//app.use(express.static(path.resolve(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../client/build")));

// Start listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});