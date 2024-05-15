// Tuodaan tarvittavat kirjastot
const express = require('express'); // Express.js web-sovelluskehyksen tuonti
const axios = require('axios'); // Axios-kirjaston tuonti HTTP-pyyntöjen tekemiseen
const path = require('path'); // Path-kirjaston tuonti polkujen käsittelyyn
const bodyParser = require('body-parser'); // Body-parser-kirjaston tuonti pyyntöjen rungon jäsentämiseen
require('dotenv').config(); // Dotenv-kirjaston tuonti ympäristömuuttujien käsittelyyn

// Luodaan uusi Express-sovellus
const app = express();
app.set('view engine', 'ejs'); // Asetetaan EJS näkymämoottoriksi
const port = 3000; // Määritetään portti, jossa sovellus kuuntelee

// Käytetään body-parser middlewarea jäsentämään pyyntöjen runko
app.use(bodyParser.urlencoded({ extended: false }));

// Määritetään reitti juureen
app.get('/', (req, res) => {
    // Lähetetään index.html-tiedosto vastauksena
    res.sendFile(path.join(__dirname + '/index.html'));
});
