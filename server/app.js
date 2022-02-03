
const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

const gamesRoutes = require('./routes/games.js');

app.use('/', gamesRoutes);

app.use(express.static(path.resolve(__dirname, "../client")));

// Start listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});