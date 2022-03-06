
const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");

const session = require('express-session');

// Change salt periodically
app.use(session({ secret: 'salty' }));

app.use(express.json());

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